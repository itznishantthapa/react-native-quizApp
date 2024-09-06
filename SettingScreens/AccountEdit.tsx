import { View, Text, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, TextInput ,Alert} from 'react-native'
import React from 'react'
import { styles } from '../style'
import { StatusBar } from 'expo-status-bar'
import IconF from 'react-native-vector-icons/Feather'
import { SafeAreaView } from 'react-native-safe-area-context'
import IconF6 from 'react-native-vector-icons/FontAwesome6'

import { auth, firestore } from '../firebase/firebaseConfig'; // Import Firestore and Auth
import { doc, getDoc,updateDoc } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { EmailAuthProvider, reauthenticateWithCredential, updateEmail } from 'firebase/auth';




const AccountEdit = ({navigation}) => {

      // State to store user's name and email
  const [userData, setUserData] = useState({ fullName: '', otherInfo: '' });





  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser; // Get the current authenticated user
        if (user) {
          const userDoc = await getDoc(doc(firestore, 'users', user.uid)); // Fetch user data from Firestore

          if (userDoc.exists()) {
            const data = userDoc.data() as { fullName: string }; // Type assertion in typescripts
            setUserData({
              fullName: data.fullName || 'Unknown Name', // Fallback in case fullName is missing
              otherInfo: 'add more info..'    // Fallback in case email is missing

              //if not typescripts this can be done with simple
              // setUserData(userDoc.data());
            });


          }
        }
      } catch (error) {
        Alert.alert("Network Error","Please connect to the internet.");
      }
    };

    fetchUserData(); // Call the function to fetch data
  }, []);


  

  const updateUserData=async()=>{
    try {
      const user = auth.currentUser; // Get the current authenticated user
      if (user) 
        {
          await updateDoc(doc(firestore, 'users', user.uid),{
           fullName:userData.fullName,
        });

        console.log('Update success')
        navigation.navigate('Setting');

      }
    } catch (error) {
      Alert.alert("Network Error","Please connect to the internet.");
    }
  }


  





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
                    <TouchableWithoutFeedback >
                        <View style={[styles.accountBoxSections,{borderWidth:1,borderRadius:10,justifyContent:'space-evenly'}]}>
                          {/* Dictionary ko value set garda yesstie oder ma hunu parxa */}
                            <TextInput value={userData.fullName}  onChangeText={(newName)=>{setUserData({...userData,fullName:newName})}} placeholderTextColor='white' style={[styles.sectionText,{paddingLeft:10,width:'80%'}]}></TextInput>
                            <IconF6 name='pen-to-square' size={30} style={{color:'white'}}></IconF6>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={()=>{
                      Alert.alert('Go Back to Profile', 'tap and hold profile picture to change');
                    }}>
                        <View style={[styles.accountBoxSections,{borderWidth:1,borderRadius:10,justifyContent:'space-evenly'}]}>
                          {/* Dictionary ko value set garda yesstie oder ma hunu parxa */}
                            <Text style={[styles.sectionText,{paddingLeft:10,width:'80%'}]}>Choose profile picture</Text>
                            <IconF6 name='pen-to-square' size={30} style={{color:'white'}}></IconF6>
                        </View>
                    </TouchableWithoutFeedback>
                 
                    <TouchableOpacity style={styles.outlineButton} onPress={updateUserData}>
                    <Text style={styles.outlineButtonText}>Save</Text>
                   </TouchableOpacity>

                </View>






            </View>
        </SafeAreaView>
    )
}

export default AccountEdit


