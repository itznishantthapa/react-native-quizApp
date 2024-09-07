import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Alert } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import React from 'react'
import { styles } from '../style'
import Icon from 'react-native-vector-icons/FontAwesome';
import lady from '../assets/lady.jpeg'
import console_logo from '../assets/console_logo.png'
import rank from '../assets/rank.png'
import correct from '../assets/correct.png'
import wrong from '../assets/wrong.png'
import points from '../assets/points.png'
import charge from '../assets/charge.png'
import IconF from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

import { auth, firestore } from '../firebaseConfig'; // Import Firestore and Auth
import { doc, getDoc, updateDoc, collection ,getDocs } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';


import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';



export default function Profile({ navigation, gameInfo, setgameInfo }) {
  console.log(gameInfo)
  // State to store user's name and email //
  const [userData, setUserData] = useState({ fullName: '', email: '' });

  // --------------------------------SIGNUP USER FETCHING--------------------------------------
  const [signedUpUsers, setsignedUpUsers] = useState([])

  // Function to fetch users from Firestore
  const fetchUsers = async () => {
    try {
      const querySnapshot = await getDocs(collection(firestore, 'users')); // assuming 'users' is the collection
      const usersData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setsignedUpUsers(usersData);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  // Fetch users when the component mounts
  useEffect(() => {
    fetchUsers();
  }, []);
  // ----------------------------------------------------------------------------------------------------------


  // Function to fetch user data
  const fetchUserData = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const userDoc = await getDoc(doc(firestore, 'users', user.uid));
        if (userDoc.exists()) {
          const data = userDoc.data() as { fullName: string, email: string }; // Type assertion here
          setUserData(data);
          console.log('Data is fetched');
        }
      }
      else {
        setUserData({ fullName: '', email: '' }); // Clear data when not logged in
      }



    } catch (error) {
      Alert.alert("Network Error", "Please connect to the internet.");
    }
  };







  const handleGear = () => {
    navigation.navigate('Setting');
  }




  // Profile Image Setting---------------------------------------------------------------------------------------------

  const [imageUri, setImageUri] = useState(null); // State to hold the image URI

  // Function to handle selecting an image
  const pickImage = async () => {
    // Ask for permission to access the image library
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      alert("You've refused to allow this app to access your photos!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });


    // Check if result is valid and not cancelled
    if (!result.canceled && auth.currentUser) { // Update 'cancelled' to 'canceled'
      setImageUri(result.assets[0].uri);// Display image locally
      uploadImageToFirebase(result.assets[0].uri); // Call function to upload image
    } else {
      console.log('Image selection was cancelled');
      Alert.alert('Please SignIn', 'You must sign in to change the profile')
    }
  };

  // profile update to the firebase--------------------------------------------------------------------------

  const uploadImageToFirebase = async (uri) => {
    const user = auth.currentUser; // Get current user
    if (!user) {
      console.log('No user is currently logged in');
      return;
    }

    try {
      const storage = getStorage();
      const storageRef = ref(storage, `profileImages/${user.uid}`); // Create a storage reference with the user UID

      // Fetch the file blob from the URI
      const response = await fetch(uri);
      if (!response.ok) {
        throw new Error(`Failed to fetch the image. Status: ${response.status}`);
      }

      const blob = await response.blob();

      // Upload file to Firebase Storage
      await uploadBytes(storageRef, blob);
      console.log('Image uploaded to Firebase Storage');
      Alert.alert('Successful Message', 'You profile has been updated.')

      // Get the download URL of the uploaded image
      const downloadURL = await getDownloadURL(storageRef);

      // Store the download URL in Firestore
      const userDocRef = doc(firestore, 'users', user.uid);
      await updateDoc(userDocRef, { profileImage: downloadURL });

      console.log('Profile image URL updated in Firestore');
    } catch (error) {
      console.error('Error uploading image: ', error);
    }
  };


  // profile fetching from the firebase----------------------------------------------------------------------------------------------->>>>>>>>>>>
  const fetchProfileImage = async () => {
    const user = auth.currentUser; // Get current user
    if (!user) {
      console.log('No user is currently logged in');
      return null;
    }

    try {
      const userDocRef = doc(firestore, 'users', user.uid);
      const docSnap = await getDoc(userDocRef);
      if (docSnap.exists()) {
        const userData = docSnap.data();
        return userData.profileImage; // Return the stored profile image URL
      } else {
        console.log('No such document!');
        return null;
      }
    } catch (error) {
      console.error('Error fetching profile image: ', error);
      return null;
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      const loadProfileImage = async () => {
        const incommingUri = await fetchProfileImage(); // Fetch image URL from Firestore
        if (incommingUri) {
          // setProfileImageUri(imageUri);
          setImageUri(incommingUri);
          console.log('pp is set')
          console.log(incommingUri)
        }
      };

      loadProfileImage();
    }, [])
  )




  // profile finished---------------------------------------------------------------------------x

  // Function to fetch the latest gameInfo from Firestore
  const fetchGameInfo = async () => {
    const user = auth.currentUser;
    if (!user) {
      console.log('No user is currently logged in');
      return;
    }

    try {
      const gameDoc = await getDoc(doc(firestore, 'users', user.uid));
      if (gameDoc.exists()) {
        const fetchedGameInfo = gameDoc.data().gameInfo;
        if (fetchedGameInfo) {
          setgameInfo(fetchedGameInfo); // Update local gameInfo state with Firestore data
          console.log('GameInfo fetched', fetchedGameInfo);
        }
      }
    } catch (error) {
      console.error('Error fetching gameInfo: ', error);
    }
  };

  // Function to upload gameInfo to Firestore
  const uploadGameInfo = async () => {
    const user = auth.currentUser;
    if (!user) {
      console.log('No user is currently logged in');
      return;
    }

    try {
      const userDocRef = doc(firestore, 'users', user.uid);
      await updateDoc(userDocRef, { gameInfo }); // Update gameInfo in Firestore
      console.log('GameInfo updated in Firestore');
    } catch (error) {
      console.error('Error uploading gameInfo: ', error);
    }
  };

  // Fetch user data when the screen is focused (e.g., after a login)
  useFocusEffect(
    React.useCallback(() => {
      fetchUserData();  // Re-fetch the data when the screen is focused
      fetchGameInfo();
    }, [])
  );

  // Example usage: Upload gameInfo after game session is completed
  useEffect(() => {
    if (gameInfo) {
      uploadGameInfo(); // Upload the latest gameInfo to Firestore
    }
  }, [gameInfo]);


  // const navigation = useNavigation();


  const handleUserProfile=(user,signedUpUsers)=>{
    navigation.navigate('UserProfile',{user,signedUpUsers})
  }

  const handleBackArrow=()=>{
    navigation.navigate('Dashboard');
}
  return (
    <>
      <View style={styles.root}>
        <StatusBar style={'light'} hidden={false} backgroundColor='black' />
        <View style={[styles.background, { justifyContent: 'space-between' }]}>
          <View style={styles.profieText_gear_container}>
          <TouchableOpacity onPress={handleBackArrow}>
                        <IconF name='arrow-left' size={50} style={{ color: 'white', marginLeft: 5 }}></IconF>
                    </TouchableOpacity>
            <Text style={styles.profileText}>Profile</Text>
            <TouchableOpacity onPress={handleGear}>
              <Icon name="gear" size={35} color="white" />
            </TouchableOpacity>
          </View>

          <View style={styles.profileContainer}>
            <TouchableOpacity onLongPress={pickImage}>
              {/* <Image  source={imageUri ? { uri: profileImageUri } : require("../assets/lady.jpeg")} style={styles.profileImage}></Image> */}
              <Image source={auth.currentUser ? { uri: imageUri } : require('../assets/person.jpg')} style={styles.profileImage}></Image>
            </TouchableOpacity>
          </View>

          <View style={styles.iconsNameContainer}>
            <View style={styles.name_usernameContainer}>
              {/* Conditional rendering */}
              {auth.currentUser ? (
                <>
                  <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{userData.fullName}</Text>
                  <Text>{userData.email}</Text>
                </>
              ) : (
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Welcome !</Text>
              )}

            </View>
            <View style={styles.gameInfo}>

              <TouchableOpacity style={styles.gameInfoIcons}>
                {/* <View style={styles.gameInfoIcons}> */}
                <Image style={styles.iconImage} source={rank}></Image>
                <Text style={{ fontWeight: 'bold', fontSize: 20 }}>#{gameInfo.worldRank}</Text>
                <Text style={{ fontWeight: 'bold' }}>World</Text>
                <Text style={{ fontWeight: 'bold' }}>Rank</Text>
                {/* </View> */}
              </TouchableOpacity>

              <TouchableOpacity style={styles.gameInfoIcons}>
                <Image style={styles.iconImage} source={console_logo}></Image>
                <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{gameInfo.gamePlayed}</Text>
                <Text style={{ fontWeight: 'bold' }}>Games</Text>
                <Text style={{ fontWeight: 'bold' }}>Played</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.gameInfoIcons}>
                <Image style={styles.iconImage} source={points}></Image>
                <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{gameInfo.points}</Text>
                <Text style={{ fontWeight: 'bold' }}>Points</Text>
                <Text style={{ fontWeight: 'bold' }}>Total</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.gameInfoIcons}>
                <Image style={styles.iconImage} source={charge}></Image>
                <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{((((gameInfo.points) / 4) * 100) / (gameInfo.gamePlayed * 10)).toFixed(2)}% </Text>
                <Text style={{ fontWeight: 'bold' }}>Accuracy</Text>
                <Text style={{ fontWeight: 'bold' }}>rate</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.gameInfoIcons}>
                <Image style={styles.iconImage} source={correct}></Image>
                <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{((gameInfo.points) / 4)}</Text>
                <Text style={{ fontWeight: 'bold' }}>Correct</Text>
                <Text style={{ fontWeight: 'bold' }}>answers</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.gameInfoIcons}>
                <Image style={styles.iconImage} source={wrong}></Image>
                <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{((gameInfo.gamePlayed) * 10) - ((gameInfo.points) / 4)}</Text>
                <Text style={{ fontWeight: 'bold' }}>Incorrect</Text>
                <Text style={{ fontWeight: 'bold' }}>answers</Text>
              </TouchableOpacity>

            </View>
            <Text style={{ fontSize: 30, fontWeight: 'bold', marginLeft: 20 }}>Friends ({auth.currentUser?signedUpUsers.length-1:0})</Text>

            <ScrollView style={{ marginTop: 31 }}>
              <View style={{ alignItems: 'center', flexDirection: 'column', gap: 10, paddingTop: 10 }}>
              { auth.currentUser?
              signedUpUsers.filter(user => user.id !== auth.currentUser.uid) // Filter out the current user
              .map((user, index) => (
                  <TouchableOpacity key={user.id} style={styles.friendBox} onPress={()=>handleUserProfile(user,signedUpUsers)}>
                    <Text style={styles.friendRank}>#{index+1}</Text>
                    <Image source={user.profileImage ? { uri: user.profileImage } : require('../assets/person.jpg')} style={styles.friendImage} /> 
                    <Text style={styles.friendUsername}>{user.fullName}</Text>
                  </TouchableOpacity>
                )):''
              
              }
              </View>
            </ScrollView>

          </View>
        </View>

      </View>
    </>
  )
}

