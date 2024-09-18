import { Alert } from 'react-native';
import { auth, firestore } from './firebaseConfig'; 
import { doc, getDoc, updateDoc,setDoc,deleteDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword,signInWithEmailAndPassword,deleteUser, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';

//For firebase storage to store the files like {image,files,video etc}
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';




//Function that creates new account
export async function createAccount(navigation,email,password,dataToBeSaved) {
    try {
         // Create user with email and password
         await createUserWithEmailAndPassword(auth, email, password);
         await saveToFirebase(dataToBeSaved)
         Alert.alert("Successfull Message", "Account has been created.")
         navigation.navigate('Tabbar');
    } 
    catch (error) {
        Alert.alert("Error", "Somthing went error.");
    }
};


//Function that login the users
export async function signAccount(navigation,email,password) {
    try {
        await signInWithEmailAndPassword(auth, email, password);
        Alert.alert("Successfull Message", "Login successfull.")
        navigation.navigate('Dashboard');
    }
    catch (error) {
        Alert.alert("Login Failed", "invalid credentials");
    }

};




//Function that sets the data to the database
export async function saveToFirebase(dataToBeSaved) {

    try {
        const user= auth.currentUser;
        if(user){
            
            const id =user.uid;
            const userRef=doc(firestore,'users',id);
            await setDoc(userRef,dataToBeSaved)
        }else {
            console.log("Error", "No user is logged in.");
        }
   } 
   catch (error) {
       Alert.alert("Error", "Somthing went error.");
   }

}




//Function that fetch data from the database
export async function getFromFirebase() {
    try {
        const user = auth.currentUser;
        if (user) {
            const id = user.uid;
            const userRef = doc(firestore, 'users', id);
            const userAllDataInJSON = await getDoc(userRef);
            console.log('I have fetched data for you.');
            return userAllDataInJSON;
        } else {
            console.log("Error", "No user is logged in.");
        }
    } catch (error) {
        Alert.alert("Error", "Something went wrong.");
    }
   } 






//Function that updates the data in the firebase
export async function updateToFirebase(dataToBeUpdated) {
    try {
        const user = auth.currentUser;
        if (user) {
            const id = user.uid;
            const userRef = doc(firestore, 'users', id);
            await updateDoc(userRef, dataToBeUpdated);
            console.log(' has been updated.');
        } else {
            console.log("Error", "No user is logged in.");
        }
    } catch (error) {
        Alert.alert("Error", "Something went wrong.");
    }

}

// Function to re-authenticate the user
async function reauthenticateUser(password) {
    const user = auth.currentUser;
    if (user && user.email) {
        const credential = EmailAuthProvider.credential(user.email, password);
        await reauthenticateWithCredential(user, credential);
    }
}


export async function deleteUserAccount(password) {
    try {
        const user = auth.currentUser;
        if (user) {
            await reauthenticateUser(password);
     
            const id = user.uid;
            const userRef = doc(firestore, 'users', id);

            // Delete user data from Firestore
            await deleteDoc(userRef);
            console.log('User data has been deleted from Firestore.');

            // Delete user authentication record
            await deleteUser(user);
            console.log('User authentication record has been deleted.');
            Alert.alert("Success", "Your account has been deleted.");
            return;
           
        }
    } catch (error) {
        Alert.alert("Error", "Password Incorrect.");
    }
}


//Function to store the files in the firebase storage------------------------>STORAGE
export async function fileUploadToFirebaseStorage(fileName,uri) {
    try {
        const user= auth.currentUser;
        const id =user.uid;
        const storage = getStorage();
        const storageRef= ref(storage,`${fileName}/${id}`)
    
        // Fetch the file blob from the URI
        const response = await fetch(uri);
        const blob = await response.blob();
    
        // Upload file to Firebase Storage
        await uploadBytes(storageRef, blob);
    
    
        // Get the download URL of the uploaded image so that we can store the url into the user's database.
        const fileURL = await getDownloadURL(storageRef);
        updateToFirebase({profile:fileURL});
        Alert.alert('Successful Message', `Your ${fileName} has been updated.`)
    
   } 
   catch (error) {
       Alert.alert("Error", "Somthing went error.");
   }
   
}





export async function saveLocally(key,value) {
    await AsyncStorage.setItem(key,JSON.stringify(value));
    console.log("Data saved successfully")
}
export async function getLocally(key) {
    const localdata=await AsyncStorage.getItem(key);
    return JSON.parse(localdata)
}