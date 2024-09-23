import { Text, View, Image, TouchableOpacity, ScrollView, Alert } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import React from 'react'
import { styles } from '../style/style'
import console_logo from '../assets/console_logo.png'
import rank from '../assets/rank.png'
import correct from '../assets/correct.png'
import wrong from '../assets/wrong.png'
import points from '../assets/points.png'
import charge from '../assets/charge.png'

import { auth } from '../firebaseConfig'; // Import Firestore and Auth
import { useRoute } from '@react-navigation/native';



export default function UserProfile({ navigation }) {
  const route = useRoute();
  const {user, signedUpUsers} = route.params as { user: any, signedUpUsers: any[] };

  const handleUserProfile = (user: any, signedUpUsers: any[]) => {
    navigation.navigate('UserProfile', { user, signedUpUsers })
  }


  return (
    <>
      <View style={styles.root}>
        <StatusBar style={'light'} hidden={false} backgroundColor='black' />
        <View style={[styles.background, { justifyContent: 'space-between' }]}>
          <View style={[styles.profieText_gear_container, { flexDirection: 'column', width: '100%', justifyContent: 'center', alignItems: 'center' }]}>
            <Text style={styles.profileText}>{user.fullName}</Text>
          </View>

          <View style={styles.profileContainer} >
            <TouchableOpacity >
              {/* <Image  source={imageUri ? { uri: profileImageUri } : require("../assets/lady.jpeg")} style={styles.profileImage}></Image> */}
              <Image source={user.profile ? { uri: user.profile } : require('../assets/person.jpg')} style={styles.profileImage}></Image>
            </TouchableOpacity>
          </View>

          <View style={styles.iconsNameContainer}>
            <View style={styles.name_usernameContainer}>


            </View>
            <View style={styles.gameInfo}>

              <TouchableOpacity style={styles.gameInfoIcons}>
                {/* <View style={styles.gameInfoIcons}> */}
                <Image style={styles.iconImage} source={rank}></Image>
                <Text style={{ fontWeight: 'bold', fontSize: 20 }}>#{user.gameInfo ? user.gameInfo.totalAttempted : 'NA'}</Text>
                <Text style={{ fontWeight: 'bold' }}>World</Text>
                <Text style={{ fontWeight: 'bold' }}>Rank</Text>
                {/* </View> */}
              </TouchableOpacity>

              <TouchableOpacity style={styles.gameInfoIcons}>
                <Image style={styles.iconImage} source={console_logo}></Image>
                <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{user.gameInfo ? user.gameInfo.gamePlayed : 0}</Text>
                <Text style={{ fontWeight: 'bold' }}>Games</Text>
                <Text style={{ fontWeight: 'bold' }}>Played</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.gameInfoIcons}>
                <Image style={styles.iconImage} source={points}></Image>
                <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{user.gameInfo ? user.gameInfo.points : 0}</Text>
                <Text style={{ fontWeight: 'bold' }}>Points</Text>
                <Text style={{ fontWeight: 'bold' }}>Total</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.gameInfoIcons}>
                <Image style={styles.iconImage} source={charge}></Image>
                <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{user.gameInfo ? ((((user.gameInfo.points) / 4) * 100) / (user.gameInfo.gamePlayed * 10)).toFixed(2) : 0}%</Text>
                <Text style={{ fontWeight: 'bold' }}>Accuracy</Text>
                <Text style={{ fontWeight: 'bold' }}>rate</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.gameInfoIcons}>
                <Image style={styles.iconImage} source={correct}></Image>
                <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{user.gameInfo ? ((user.gameInfo.points) / 4) : 0}</Text>
                <Text style={{ fontWeight: 'bold' }}>Correct</Text>
                <Text style={{ fontWeight: 'bold' }}>answers</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.gameInfoIcons}>
                <Image style={styles.iconImage} source={wrong}></Image>
                <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{user.gameInfo ? ((user.gameInfo.gamePlayed) * 10) - ((user.gameInfo.points) / 4) : 0}</Text>
                <Text style={{ fontWeight: 'bold' }}>Incorrect</Text>
                <Text style={{ fontWeight: 'bold' }}>answers</Text>
              </TouchableOpacity>

            </View>
            <Text style={{ fontSize: 30, fontWeight: 'bold', marginLeft: 20 }}>Friends ({signedUpUsers.length-1})</Text>

            <ScrollView style={{ marginTop: 31 }}>
              <View style={{ alignItems: 'center', flexDirection: 'column', gap: 10, paddingTop: 10 }}>


                {/* I want to filter out the user.fullName user from the signedUpUsers array and display the rest of the users in the signedUpUsers array. I am trying to do this by using the filter method but it is not working. Can someone help me with this? */}
                {auth.currentUser ?
                  signedUpUsers.filter((allUser) => allUser.fullName !== user.fullName)
                  .map((user, index) => (
                    <TouchableOpacity key={user.id} style={styles.friendBox} onPress={() => handleUserProfile(user, signedUpUsers)}>
                      <Text style={styles.friendRank}>#{index + 1}</Text>
                      <Image source={user.profile ? { uri: user.profile } : require('../assets/person.jpg')} style={styles.friendImage} />
                      <Text style={styles.friendUsername}>{user.fullName}</Text>
                    </TouchableOpacity>
                  )) : ''

                }


              </View>
            </ScrollView>

          </View>
        </View>

      </View>
    </>
  )
}

