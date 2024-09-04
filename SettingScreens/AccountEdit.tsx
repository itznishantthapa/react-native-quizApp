import { View, Text, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, TextInput } from 'react-native'
import React from 'react'
import { styles } from '../style'
import { StatusBar } from 'expo-status-bar'
import IconF from 'react-native-vector-icons/Feather'
import { SafeAreaView } from 'react-native-safe-area-context'
import IconF6 from 'react-native-vector-icons/FontAwesome6'

import { auth, firestore } from '../firebase/firebaseConfig'; // Import Firestore and Auth
import { doc, getDoc,updateDoc } from 'firebase/firestore';
import { useState, useEffect } from 'react';

const AccountEdit = ({navigation}) => {

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
  }, []);





    const handleBack=()=>{
        navigation.navigate('Account');
    }
    return (
        <SafeAreaView style={styles.background}>
            <StatusBar hidden={false} backgroundColor='' style='light' />
            <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}>

                {/* setting box */}
                <View style={styles.settingBox}>
                    <TouchableOpacity onPress={handleBack}>
                        <IconF name='arrow-left' size={50} style={{ color: 'white', marginLeft: 5 }}></IconF>
                    </TouchableOpacity>
                    <Text style={{ fontSize: 30, fontWeight: 'bold', marginRight: '8%', color: 'white' }}>Edit Info</Text>
                    <View></View>
                </View>

                {/* Account box */}
                <View style={[styles.accountBox,{gap:10}]}>
                    {/* Account Box Sections */}
                    <TouchableWithoutFeedback>
                        <View style={[styles.accountBoxSections,{borderWidth:1,borderRadius:10,justifyContent:'space-evenly',flexDirection:'row',alignItems:'center'}]}>
                            <TextInput value={userData.fullName}  placeholderTextColor='white' style={[styles.sectionText,{paddingLeft:10,width:'80%'}]}></TextInput>
                            <IconF6 name='pen-to-square' size={30} style={{color:'white'}}></IconF6>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback>
                        <View style={[styles.accountBoxSections,{borderWidth:1,borderRadius:10,justifyContent:'space-evenly'}]}>
                            <TextInput value={userData.email}  placeholderTextColor='white' style={[styles.sectionText,{paddingLeft:10,width:'80%'}]}></TextInput>
                            <IconF6 name='pen-to-square' size={30} style={{color:'white'}}></IconF6>
                        </View>
                    </TouchableWithoutFeedback>

                </View>






            </View>
        </SafeAreaView>
    )
}

export default AccountEdit


