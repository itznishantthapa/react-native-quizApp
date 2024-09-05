import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native'
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
import { doc, getDoc } from 'firebase/firestore';
import { useState, useEffect } from 'react';


export default function Profile({ navigation }) {
  // State to store user's name and email
  const [userData, setUserData] = useState({ fullName: '', email: '' });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser; // Get the current authenticated user
        if (user) {
          const userDoc = await getDoc(doc(firestore, 'users', user.uid)); // Fetch user data from Firestore

          if (userDoc.exists()) {
            const data = userDoc.data() as { fullName: string; email: string }; // Type assertion in typescripts
            setUserData({
              fullName: data.fullName || 'Unknown Name', // Fallback in case fullName is missing
              email: data.email || 'Unknown Email',     // Fallback in case email is missing

              //if not typescripts this can be done with simple
              // setUserData(userDoc.data());
            });


          }
        }
      } catch (error) {
        console.error("Error fetching user data: ", error);
      }
    };

    fetchUserData(); // Call the function to fetch data
  }, [userData]);

  const handleGear = () => {
    navigation.navigate('Setting');
  }

  return (
    <>
      <View style={styles.root}>
        <StatusBar style={'light'} hidden={false} backgroundColor='black' />
        <View style={[styles.background, { justifyContent: 'space-between' }]}>
          <View style={stylesHere.profieText_gear_container}>
            <View></View>
            <Text style={stylesHere.profileText}>Profile</Text>
            <TouchableOpacity onPress={handleGear}>
              <Icon name="gear" size={35} color="white" />
            </TouchableOpacity>
          </View>

          <View style={stylesHere.profileContainer}>
            <Image source={lady} style={stylesHere.profileImage}></Image>
          </View>

          <View style={stylesHere.iconsNameContainer}>
            <View style={stylesHere.name_usernameContainer}>
            {/* Conditional rendering */}
              {userData ? (
                <>
                  <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{userData.fullName}</Text>
                  <Text>{userData.email}</Text>
                </>
              ) : (
                <TouchableOpacity style={[styles.deleteButton, { backgroundColor: 'green' }]}>
                  <Text style={styles.buttonText}>Sign In</Text>
                </TouchableOpacity>
              )}

            </View>
            <View style={stylesHere.gameInfo}>

              <TouchableOpacity style={stylesHere.gameInfoIcons}>
                {/* <View style={stylesHere.gameInfoIcons}> */}
                <Image style={stylesHere.iconImage} source={rank}></Image>
                <Text style={{ fontWeight: 'bold', fontSize: 20 }}>#99</Text>
                <Text style={{ fontWeight: 'bold' }}>World</Text>
                <Text style={{ fontWeight: 'bold' }}>Rank</Text>
                {/* </View> */}
              </TouchableOpacity>

              <TouchableOpacity style={stylesHere.gameInfoIcons}>
                <Image style={stylesHere.iconImage} source={console_logo}></Image>
                <Text style={{ fontWeight: 'bold', fontSize: 20 }}>250</Text>
                <Text style={{ fontWeight: 'bold' }}>Games</Text>
                <Text style={{ fontWeight: 'bold' }}>Played</Text>
              </TouchableOpacity>
              <TouchableOpacity style={stylesHere.gameInfoIcons}>
                <Image style={stylesHere.iconImage} source={points}></Image>
                <Text style={{ fontWeight: 'bold', fontSize: 20 }}>1,082</Text>
                <Text style={{ fontWeight: 'bold' }}>Points</Text>
                <Text style={{ fontWeight: 'bold' }}>Total</Text>
              </TouchableOpacity>
              <TouchableOpacity style={stylesHere.gameInfoIcons}>
                <Image style={stylesHere.iconImage} source={charge}></Image>
                <Text style={{ fontWeight: 'bold', fontSize: 20 }}>72%</Text>
                <Text style={{ fontWeight: 'bold' }}>Completion</Text>
                <Text style={{ fontWeight: 'bold' }}>rate</Text>
              </TouchableOpacity>
              <TouchableOpacity style={stylesHere.gameInfoIcons}>
                <Image style={stylesHere.iconImage} source={correct}></Image>
                <Text style={{ fontWeight: 'bold', fontSize: 20 }}>80%</Text>
                <Text style={{ fontWeight: 'bold' }}>Correct</Text>
                <Text style={{ fontWeight: 'bold' }}>answers</Text>
              </TouchableOpacity>
              <TouchableOpacity style={stylesHere.gameInfoIcons}>
                <Image style={stylesHere.iconImage} source={wrong}></Image>
                <Text style={{ fontWeight: 'bold', fontSize: 20 }}>20%</Text>
                <Text style={{ fontWeight: 'bold' }}>Incorrect</Text>
                <Text style={{ fontWeight: 'bold' }}>answers</Text>
              </TouchableOpacity>

            </View>
            <Text style={{ fontSize: 30, fontWeight: 'bold', marginLeft: 20 }}>Friends (6)</Text>

            <ScrollView style={{ marginTop: 31 }}>
              <View style={{ alignItems: 'center', flexDirection: 'column', gap: 10, paddingTop: 10 }}>

                <TouchableOpacity style={stylesHere.friendBox}>
                  <Text style={stylesHere.friendRank}>#1</Text>
                  <Image source={lady} style={stylesHere.friendImage}></Image>
                  <Text style={stylesHere.friendUsername} >@username</Text>
                </TouchableOpacity>
                <TouchableOpacity style={stylesHere.friendBox}>
                  <Text style={stylesHere.friendRank}>#1</Text>
                  <Image source={lady} style={stylesHere.friendImage}></Image>
                  <Text style={stylesHere.friendUsername} >@username</Text>
                </TouchableOpacity>
                <TouchableOpacity style={stylesHere.friendBox}>
                  <Text style={stylesHere.friendRank}>#1</Text>
                  <Image source={lady} style={stylesHere.friendImage}></Image>
                  <Text style={stylesHere.friendUsername} >@username</Text>
                </TouchableOpacity>
                <TouchableOpacity style={stylesHere.friendBox}>
                  <Text style={stylesHere.friendRank}>#1</Text>
                  <Image source={lady} style={stylesHere.friendImage}></Image>
                  <Text style={stylesHere.friendUsername} >@username</Text>
                </TouchableOpacity>

              </View>
            </ScrollView>

          </View>
        </View>

      </View>
    </>
  )
}

const stylesHere = StyleSheet.create({
  profileContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
    position: 'absolute',
    top: '13%',
    width: '100%'
  },
  profieText_gear_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    // backgroundColor: 'grey',
    height: '20%',
    width: '100%'

  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50, // Half of the width/height to make it circularrr 
    borderWidth: 2, // Optional: adds a border around the image
    borderColor: '#000', // Optional: border color
  },
  profileText: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
    marginLeft: 10


  },
  gameInfo: {
    height: '40%',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    gap: 10,
    marginTop: 10
  },
  gameInfoIcons: {
    height: '45%',
    width: '30%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    // borderColor: 'grey',
    // borderWidth: 2,
    backgroundColor: 'white'
  },
  iconsNameContainer: {
    backgroundColor: '#dee2e6',
    height: '80%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    flexDirection: 'column'
  },
  name_usernameContainer: {

    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50
  },

  iconImage: {
    height: '30%',
    // width: '100%',
    width: '30%',
    objectFit: 'contain'

  },
  friendBox: {
    // borderWidth: 1,
    // borderColor: 'black',
    width: '80%',
    height: 80,
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 20,
    alignItems: 'center',
    paddingLeft: 20,
    backgroundColor: '#ced4da'
  },
  friendImage: {
    width: 70,
    height: 70,
    borderRadius: 50, // Half of the width/height to make it circular
    // borderWidth: 2, // Optional: adds a border around the image
    // borderColor: '#000',
  },
  friendRank: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  friendUsername: {
    fontSize: 25,
    fontWeight: 'bold'
  }

});