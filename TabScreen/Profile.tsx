import {Text, View, Image, TouchableOpacity, ScrollView, Alert } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import React from 'react'
import { styles } from '../style'
import Icon from 'react-native-vector-icons/FontAwesome';
import console_logo from '../assets/console_logo.png'
import rank from '../assets/rank.png'
import correct from '../assets/correct.png'
import wrong from '../assets/wrong.png'
import points from '../assets/points.png'
import charge from '../assets/charge.png'
import IconF from 'react-native-vector-icons/Feather';
import { auth, firestore } from '../firebaseConfig'; // Import Firestore and Auth
import { collection ,getDocs } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { fileUploadToFirebaseStorage, getFromFirebase,updateToFirebase } from '../db';



export default function Profile({ navigation, gameInfo, setgameInfo}) {
  // State to store user's name and email
  const [userData, setUserData] = useState({ fullName: '', email: '' });
  const [imageUri, setImageUri] = useState(null);  
  
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


















// updating data--------------------------------------------------------------------------------------------------------------------
const uploadGameInfo = async () => {
  await updateToFirebase({gameInfo})
  console.log("Game data is updated to firestore.")
};
useEffect(() => {
  if (gameInfo) {
    uploadGameInfo();
  }
}, [gameInfo]);
// -----------------------------------------------------------------------------------------------------------------------------------------










      
const uploadImageToFirebase = async (uri: string) => {
  await fileUploadToFirebaseStorage('profile',uri);
};

  // Function to handle selecting an image
  const pickImage = async () => {
    //Permisson?
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert("You've refused to allow this app to access your photos!");
      return;
    }
    //If granted, lunching gallary
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    //If selected, setUp to state & uploading to firebase
    if (!result.canceled && auth.currentUser) { 
      setImageUri(result.assets[0].uri);
      uploadImageToFirebase(result.assets[0].uri); 
    } else {
      console.log('Image selection was cancelled');
      Alert.alert('Please SignIn', 'You must sign in to change the profile')
    }
  };

 
  const handleGear = () => {
    navigation.navigate('Setting');
  }
  const handleUserProfile=(user: any,signedUpUsers: any[])=>{
    navigation.navigate('UserProfile',{user,signedUpUsers})
  }
  const handleBackArrow=()=>{
    navigation.navigate('Dashboard');
}


  // fetching data------------------------------------------------------------------------------------------------------------
  const fetchUserData = async () => {
    const userDoc = await getFromFirebase();
    const data = userDoc.data() as { fullName: string, email: string }; // Type assertion here
    setUserData(data);
  };
  const fetchGameInfo = async () => {
    const userAllData = await getFromFirebase();
    const userAllDataInObj= userAllData.data()
    setgameInfo(userAllDataInObj.gameInfo)
    console.log('Game data is updated locally from the firebase.')
  };
  useFocusEffect(
    React.useCallback(() => {
      fetchUserData();  
      fetchGameInfo();
    }, [])
  );



  const fetchProfileImage = async () => {
    const userAllData=await getFromFirebase();
    const userAllDataInObj= userAllData.data();
    return userAllDataInObj.profile;
  };
  useFocusEffect(
    React.useCallback(() => {
      const loadProfileImage = async () => {
        const incommingUri = await fetchProfileImage();
        if (incommingUri) {
          setImageUri(incommingUri);
        }
      };

      loadProfileImage();
    }, [])
  )
   
// ------------------------------------------------------------------------------------------------------------------------------


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

