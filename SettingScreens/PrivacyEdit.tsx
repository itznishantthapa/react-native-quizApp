import { View, Text, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, TextInput } from 'react-native'
import React from 'react'
import { styles } from '../style'
import { StatusBar } from 'expo-status-bar'
import IconF from 'react-native-vector-icons/Feather'
import { SafeAreaView } from 'react-native-safe-area-context'
import IconF6 from 'react-native-vector-icons/FontAwesome6'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';

import { auth, firestore } from '../firebaseConfig'; // Import Firestore and Auth
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from 'firebase/auth';
import { useState, useEffect, } from 'react';
import { Alert } from 'react-native'

const PrivacyEdit = ({ navigation }) => {

    const [usercurrentPassword, setusercurrentPassword] = useState('')
    const [usernewPassword, setusernewPassword] = useState('')
    const [userConfirmPassword, setConfirmPassword] = useState('')
    const [passwordVisible, setPasswordVisible] = useState(true);




    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    // Function to re-authenticate the user
    const reauthenticateUser = async () => {
    const user = auth.currentUser; // Get the current authenticated user
  
    if (user) {
      const credential = EmailAuthProvider.credential(user.email, usercurrentPassword); 
      await reauthenticateWithCredential(user, credential); 
      console.log('User re-authenticated');
    }
  };

  const handleUpdatePassword = async () => {
    if(usernewPassword===userConfirmPassword ){

        try {
          // Re-authenticate user before updating password
          await reauthenticateUser();
      
          const user = auth.currentUser; // Get the currently logged-in user
      
          if (user) {
            await updatePassword(user, usernewPassword); // Update the password
            Alert.alert("Success", "Password has been updated.");
            navigation.navigate('Privacy');
          }
        } catch (error) {
          Alert.alert("Error","Failed to update password.");
        }
    }else{
        Alert.alert('Invalid Confirmation');
    }

  };




    const handleBack = () => {
        navigation.navigate('Privacy');
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
                    <Text style={{ fontSize: 30, fontWeight: 'bold', marginRight: '8%', color: 'white' }}>Password</Text>
                    <View></View>
                </View>

                {/* Account box */}
                <View style={[styles.accountBox, { gap: 10 }]}>
                    {/* Account Box Sections */}
                    <TouchableWithoutFeedback>
                        <View style={[styles.accountBoxSections, { borderWidth: 1, borderRadius: 10, justifyContent: 'space-evenly', flexDirection: 'row', alignItems: 'center' }]}>
                            <TextInput  secureTextEntry={passwordVisible} placeholder='Enter current password' placeholderTextColor='white' onChangeText={setusercurrentPassword} style={[styles.sectionText, { paddingLeft: 10, width: '80%' }]}></TextInput>
                            <TouchableOpacity onPress={togglePasswordVisibility}>
                            <FontAwesomeIcon icon={passwordVisible ? faEyeSlash : faEye} size={25} color="#adb5bd" />
                        </TouchableOpacity>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback>
                        <View style={[styles.accountBoxSections, { borderWidth: 1, borderRadius: 10, justifyContent: 'space-evenly', flexDirection: 'row', alignItems: 'center' }]}>
                            <TextInput  secureTextEntry={passwordVisible} placeholder='Enter new password' onChangeText={setusernewPassword} placeholderTextColor='white' style={[styles.sectionText, { paddingLeft: 10, width: '80%' }]}></TextInput>
                            <TouchableOpacity onPress={togglePasswordVisibility}>
                            <FontAwesomeIcon icon={passwordVisible ? faEyeSlash : faEye} size={25} color="#adb5bd" />
                        </TouchableOpacity>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback>
                        <View style={[styles.accountBoxSections, { borderWidth: 1, borderRadius: 10, justifyContent: 'space-evenly', flexDirection: 'row', alignItems: 'center' }]}>
                            <TextInput  secureTextEntry={passwordVisible} placeholder='Confirm password' onChangeText={setConfirmPassword} placeholderTextColor='white' style={[styles.sectionText, { paddingLeft: 10, width: '80%' }]}></TextInput>
                            <TouchableOpacity onPress={togglePasswordVisibility}>
                            <FontAwesomeIcon icon={passwordVisible ? faEyeSlash : faEye} size={25} color="#adb5bd" />
                        </TouchableOpacity>
                        </View>
                    </TouchableWithoutFeedback>

                    <TouchableOpacity style={styles.outlineButton} onPress={handleUpdatePassword}>
                    <Text style={styles.outlineButtonText}>Update password</Text>
                   </TouchableOpacity>



                </View>






            </View>
        </SafeAreaView>
    )
}

export default PrivacyEdit


