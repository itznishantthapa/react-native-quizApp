import { Alert } from 'react-native';
import { auth, firestore } from './firebaseConfig'; 
import { doc, getDoc, updateDoc, collection ,getDocs,setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';

//For firebase storage to store the files like {image,files,video etc}
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';




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




//Function that sets the data to the database
export async function saveToFirebase(dataToBeSaved) {
    // const userId = userCredential.user.uid; ------------------>if it is necessary
    const user= auth.currentUser;
    const id =user.uid;
    const userRef=doc(firestore,'users',id);
    await setDoc(userRef,dataToBeSaved)
}




//Function that fetch data from the database
export async function getFromFirebase() {
    const user= auth.currentUser;
    const id =user.uid;
    const userRef=doc(firestore,'users',id);
   const userAllDataInJSON= await getDoc(userRef) ;
   console.log('I have fetched data for you.')
   return userAllDataInJSON;  
}





//Function that updates the data in the firebase
export async function updateToFirebase(dataToBeUpdated) {
    const user= auth.currentUser;
    const id =user.uid;
    const userRef=doc(firestore,'users',id);
    await updateDoc(userRef,dataToBeUpdated);
    console.log('Data has been updated.')
}



//Function to store the files in the firebase storage------------------------>STORAGE
export async function fileUploadToFirebaseStorage(fileName,uri) {
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


