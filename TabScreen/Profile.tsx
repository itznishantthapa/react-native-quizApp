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
import {MyContext} from '../AppProvider';
import IconPerson from 'react-native-vector-icons/Ionicons'





export default function Profile({ navigation,gameInfo,setgameInfo }) {
  // const {userData,setUserData}=useContext(MyContext);
  const {userData,imageUri,setImageUri,signedUpUsers}=useContext(MyContext);
  // const {gameInfo}=useContext(MyContext);



  // Function to handle selecting an image
  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert("Error", "You've refused to allow this app to access your photos.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled && auth.currentUser) {
      setImageUri(result.assets[0].uri);
      await fileUploadToFirebaseStorage('profile', result.assets[0].uri);
    } 
    else if(!auth.currentUser) {
      Alert.alert('Please SignIn', 'You must sign in to change the profile');
    }
  };
  // ----------------------------------------------------------------------------------------------------


    // Function to fetch game info from Firestore 
    const fetchGameInfo = async () => {
      try {
        const userAllData = await getFromFirebase();  // Fetch complete user data
        const userAllDataInObj = userAllData?.data();  // Extract user data object
        if (userAllDataInObj && userAllDataInObj.gameInfo) {
          setgameInfo(userAllDataInObj.gameInfo);  // Set game info state
        }
      } catch (error) {
        Alert.alert("Error", "Something went wrong fetching game info.");
      }
    };


  useEffect(() => {
    if(auth.currentUser){
      fetchGameInfo();
    }else{
      console.log('No user signed in');
    }
  }, [gameInfo?.gamePlayed]);
  
  


  // Updating game info in Firestore
  useEffect(() => {
    if (auth.currentUser && gameInfo.gamePlayed) {
      const uploadGameInfo = async () => {
        await updateToFirebase({ gameInfo });
      };
      uploadGameInfo();
    }
  }, [auth.currentUser]);

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
                <Text style={{ fontWeight: 'bold' }}>Completed</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.gameInfoIcons}>
                <Image style={styles.iconImage} source={points}></Image>
                <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{gameInfo.points}</Text>
                <Text style={{ fontWeight: 'bold' }}>Points</Text>
                <Text style={{ fontWeight: 'bold' }}>Total</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.gameInfoIcons}>
                <Image style={styles.iconImage} source={charge}></Image>
                <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{((((gameInfo.points) / 4) * 100) / (gameInfo.totalAttempted)).toFixed(2)}% </Text>
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
                <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{(gameInfo.totalAttempted) - ((gameInfo.points) / 4)}</Text>
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

