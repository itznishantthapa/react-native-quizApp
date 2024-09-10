import { Text, View, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useCallback,useContext } from 'react';
import { styles } from '../style';
import Icon from 'react-native-vector-icons/FontAwesome';
import console_logo from '../assets/console_logo.png';
import rank from '../assets/rank.png';
import correct from '../assets/correct.png';
import wrong from '../assets/wrong.png';
import points from '../assets/points.png';
import charge from '../assets/charge.png';
import IconF from 'react-native-vector-icons/Feather';
import Iconfontisto from 'react-native-vector-icons/Fontisto';
import { auth, firestore } from '../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { useFocusEffect } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { fileUploadToFirebaseStorage, getFromFirebase, getLocally, updateToFirebase } from '../db';
import {MyContext} from '../AppProvider'








type GameInfo = {
  gamePlayed: number;
  points: number;
  totalAttempted: number;
  worldRank: string;
};

type UserData = {
  id: string;
  fullName: string;
  email: string;
  profile?: string;
  gameInfo?: GameInfo; // Make gameInfo optional in case some users don't have this field
};







export default function Profile({ navigation, gameInfo, setgameInfo }) {
  const {userData,setUserData}=useContext(MyContext);

  const [imageUri, setImageUri] = useState(null);
  const [signedUpUsers, setsignedUpUsers] = useState([]);

  // Function to handle selecting an image
  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert("You've refused to allow this app to access your photos!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled && auth.currentUser) {
      setImageUri(result.assets[0].uri);
      await fileUploadToFirebaseStorage('profile', result.assets[0].uri);
    } else {
      Alert.alert('Please SignIn', 'You must sign in to change the profile');
    }
  };
  // ----------------------------------------------------------------------------------------------------

  // Only proceed with Firebase operations if the user is authenticated
  useEffect(() => {
    if (auth.currentUser) {
      fetchUserData();
      fetchGameInfo();
      fetchProfileImage();
      fetchUsers();
    }
  }, [auth.currentUser]);


  // Fetching user data from Firestore
  const fetchUserData = async () => {
    try {
      const userDoc = await getFromFirebase();
      const data = userDoc.data();
      if (data) {
        setUserData({ fullName: data.fullName, email: data.email });
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  // Fetching game information from Firestore
  const fetchGameInfo = async () => {
    try {
      const userAllData = await getFromFirebase();
      const userAllDataInObj = userAllData.data();
      if (userAllDataInObj && userAllDataInObj.gameInfo) {
        setgameInfo(userAllDataInObj.gameInfo);
      }
    } catch (error) {
      console.error('Error fetching game info:', error);
    }
  };

  // Fetching user's profile image from Firestore
  const fetchProfileImage = async () => {
    try {
      const userAllData = await getFromFirebase();
      const userAllDataInObj = userAllData.data();
      if (userAllDataInObj && userAllDataInObj.profile) {
        setImageUri(userAllDataInObj.profile);
      }
    } catch (error) {
      console.error('Error fetching profile image:', error);
    }
  };

  // Fetching list of signed up users from Firestore
  const fetchUsers = async () => {
    try {
      const querySnapshot = await getDocs(collection(firestore, 'users'));
      
      // Map users data and include their ID
      const usersData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()as Omit<UserData, 'id'>,   //type assertion for typescripts
      }));


      // Sort users by gameInfo.points in descending order (highest points first)
      const sortedUsers = usersData.sort((a, b) => {
        const pointsA = a.gameInfo?.points || 0;  // Handle undefined gameInfo
        const pointsB = b.gameInfo?.points || 0;
        return pointsB - pointsA;  // Sort by points in descending order
      });
  
      setsignedUpUsers(sortedUsers); // Update state with sorted users
    } catch (error) {
      console.error('Error fetching and sorting users:', error);
    }
  };


  // ----------------------------------------------------------------------------------------------------

//   async function nameUpdateFromLocalStorage() {
//     const data = await getLocally('userData');
//     setUserData((dic)=>({...dic,fullName:data.fullName}));
//     console.log('finally set the name------------------------------------------------>')
//   }

//   useFocusEffect(
//     useCallback(() => {
//         nameUpdateFromLocalStorage();    
//   }, [])
// );
  

  // Updating game info in Firestore
  useEffect(() => {
    if (auth.currentUser && gameInfo.gamePlayed) {
      const uploadGameInfo = async () => {
        await updateToFirebase({ gameInfo });
      };
      uploadGameInfo();
    }
  }, [gameInfo.gamePlayed]);

  // Navigation handlers
  const handleGear = () => {
    navigation.navigate('Setting');
  };

  const handleUserProfile = (user: any,signedUpUsers) => {
    navigation.navigate('UserProfile', { user,signedUpUsers });
  };

  const handleBackArrow = () => {
    navigation.navigate('Dashboard');
  };

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
              <Image source={imageUri ? { uri: imageUri } : require('../assets/person.jpg')} style={styles.profileImage}></Image>
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

            <View style={styles.friendTextAndNotificationContainer}>
            <Text style={{ fontSize: 30, fontWeight: 'bold',}}>Friends ({auth.currentUser?signedUpUsers.length-1:0})</Text>
            <Iconfontisto name='bell' size={50}></Iconfontisto>
            </View>

            <ScrollView style={{ marginTop: 31 }}>
              <View style={{ alignItems: 'center', flexDirection: 'column', gap: 10, paddingTop: 10 }}>
              { auth.currentUser?
              signedUpUsers.filter(user => user.id !== auth.currentUser.uid) // Filter out the current user
              .map((user, index) => (
                  <TouchableOpacity key={user.id} style={styles.friendBox} onPress={()=>handleUserProfile(user,signedUpUsers)}>
                    <Text style={styles.friendRank}>#{index+1}</Text>
                    <Image source={user.profile ? { uri: user.profile } : require('../assets/person.jpg')} style={styles.friendImage} /> 
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

