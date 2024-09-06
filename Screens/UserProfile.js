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

import { auth, firestore } from '../firebase/firebaseConfig'; // Import Firestore and Auth
import { doc, getDoc, updateDoc, collection ,getDocs } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';


import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useRoute,RouteProp } from '@react-navigation/native'; 

// Define the type for the route params
// type UserProfileRouteProp = RouteProp<{ UserProfile: { user: { fullName: string, email: string } } }, 'UserProfile'>;


export default function UserProfile({navigation}) {
    // const route = useRoute<UserProfileRouteProp>();
    const route = useRoute();
    const  {user,signedUpUsers}  = route.params; // Access the user data passed from the Profile screen

    const handleUserProfile=(user,signedUpUsers)=>{
      navigation.navigate('UserProfile',{user,signedUpUsers})
    }
  

  return (
    <>
      <View style={styles.root}>
        <StatusBar style={'light'} hidden={false} backgroundColor='black' />
        <View style={[styles.background, { justifyContent: 'space-between' }]}>
          <View style={[styles.profieText_gear_container,{flexDirection:'column',width:'100%',justifyContent:'center',alignItems:'center'}]}>
            <Text style={styles.profileText}>{user.fullName}</Text>
          </View>

          <View style={styles.profileContainer} >
            <TouchableOpacity >
              {/* <Image  source={imageUri ? { uri: profileImageUri } : require("../assets/lady.jpeg")} style={styles.profileImage}></Image> */}
              <Image source={user.profileImage ? { uri: user.profileImage } : require('../assets/person.jpg')} style={styles.profileImage}></Image>
            </TouchableOpacity>
          </View>

          <View style={styles.iconsNameContainer}>
            <View style={styles.name_usernameContainer}>
       

            </View>
            <View style={styles.gameInfo}>

              <TouchableOpacity style={styles.gameInfoIcons}>
                {/* <View style={styles.gameInfoIcons}> */}
                <Image style={styles.iconImage} source={rank}></Image>
                <Text style={{ fontWeight: 'bold', fontSize: 20 }}>#{user.gameInfo?user.gameInfo.worldRank:'NA'}</Text>
                <Text style={{ fontWeight: 'bold' }}>World</Text>
                <Text style={{ fontWeight: 'bold' }}>Rank</Text>
                {/* </View> */}
              </TouchableOpacity>

              <TouchableOpacity style={styles.gameInfoIcons}>
                <Image style={styles.iconImage} source={console_logo}></Image>
                <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{user.gameInfo?user.gameInfo.gamePlayed:0}</Text>
                <Text style={{ fontWeight: 'bold' }}>Games</Text>
                <Text style={{ fontWeight: 'bold' }}>Played</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.gameInfoIcons}>
                <Image style={styles.iconImage} source={points}></Image>
                <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{user.gameInfo?user.gameInfo.points:0}</Text>
                <Text style={{ fontWeight: 'bold' }}>Points</Text>
                <Text style={{ fontWeight: 'bold' }}>Total</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.gameInfoIcons}>
                <Image style={styles.iconImage} source={charge}></Image>
                <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{user.gameInfo?((((user.gameInfo.points) / 4) * 100) / (user.gameInfo.gamePlayed * 10)).toFixed(2):0}%</Text>
                <Text style={{ fontWeight: 'bold' }}>Accuracy</Text>
                <Text style={{ fontWeight: 'bold' }}>rate</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.gameInfoIcons}>
                <Image style={styles.iconImage} source={correct}></Image>
                <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{user.gameInfo?((user.gameInfo.points) / 4):0}</Text>
                <Text style={{ fontWeight: 'bold' }}>Correct</Text>
                <Text style={{ fontWeight: 'bold' }}>answers</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.gameInfoIcons}>
                <Image style={styles.iconImage} source={wrong}></Image>
                <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{user.gameInfo?((user.gameInfo.gamePlayed) * 10) - ((user.gameInfo.points) / 4):0}</Text>
                <Text style={{ fontWeight: 'bold' }}>Incorrect</Text>
                <Text style={{ fontWeight: 'bold' }}>answers</Text>
              </TouchableOpacity>

            </View>
            <Text style={{ fontSize: 30, fontWeight: 'bold', marginLeft: 20 }}>Friends ({signedUpUsers.length})</Text>

            <ScrollView style={{ marginTop: 31 }}>
              <View style={{ alignItems: 'center', flexDirection: 'column', gap: 10, paddingTop: 10 }}>

              { auth.currentUser?
              signedUpUsers.map((user, index) => (
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

