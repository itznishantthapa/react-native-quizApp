import { StatusBar } from 'expo-status-bar';
import { Alert, Text, TextInput, View, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import React, { useState } from 'react';
import neon2 from '../assets/neon2.jpg';
import { styles } from '../style'

// import auth from '@react-native-firebase/auth';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';


// Internet connection checking
import NetInfo from '@react-native-community/netinfo';



export default function Creation({ navigation }) {
    const [passwordVisible, setPasswordVisible] = useState(true);



    const [email, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirm_password, setConfirmPassword] = useState('');
    const [fullName, setFullName] = useState('');  // Added state for full name

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };
    const toggleLogin = () => {
        navigation.navigate('Login');
    }



    const handleSignup = async () => {
        if (!email || !password) {
            Alert.alert("Error", "emails and password fields cannot be empty.");
            return;
        }
        else if (password.length < 6) {
            Alert.alert("Error", "Password is too short.");
            return;
        }
        else if (!(password === confirm_password)) {
            Alert.alert("Confirmation Denied", "Password mismatched. ");
            return;
        }

        // Check network connection
        const networkState = await NetInfo.fetch();
        if (!networkState.isConnected) {
            Alert.alert("Network Error", "No internet connection. Please check your connection and try again.");
            return;
        }

        try {

            //storing the credentials into a variable first
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);

            console.log('User signed up successfull');
            Alert.alert("Successfull Message", "Account has been created.")
            navigation.navigate('Tabbar');
        }
        catch (error) {
            Alert.alert("Error", "please fill the form correctly");
        }
    };


    return (
        <KeyboardAvoidingView
            style={styles.root}
        >
            <StatusBar hidden={false} backgroundColor='black' style='light' />
            {/* <ImageBackground source={neon2} style={styles.background}> */}
            <View style={styles.background}>
                <View style={styles.innerView}>
                    <TextInput style={styles.inputField} value={fullName} onChangeText={setFullName} placeholder='Enter your full name' placeholderTextColor='#adb5bd' />
                    <TextInput style={styles.inputField} value={email} onChangeText={setUsername} placeholder='example@gmail.com' placeholderTextColor='#adb5bd' />

                    <View style={[styles.inputField, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
                        <TextInput
                            style={{ fontWeight: 'bold', width: '75%', color: '#adb5bd' }}
                            placeholder='Create your password'
                            placeholderTextColor='#adb5bd'
                            secureTextEntry={passwordVisible}
                            value={password}
                            onChangeText={setPassword}
                            autoCapitalize='none'
                        />
                        <TouchableOpacity onPress={togglePasswordVisibility}>
                            <FontAwesomeIcon icon={passwordVisible ? faEyeSlash : faEye} size={25} color="#adb5bd" />
                        </TouchableOpacity>
                    </View>


                    <View style={[styles.inputField, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
                        <TextInput
                            style={{ fontWeight: 'bold', width: '75%', color: '#adb5bd' }}
                            value={confirm_password}
                            onChangeText={setConfirmPassword}
                            placeholder='Confirm your password'
                            placeholderTextColor='#adb5bd'
                            secureTextEntry={passwordVisible}
                        />
                        <TouchableOpacity onPress={togglePasswordVisibility}>
                            <FontAwesomeIcon icon={passwordVisible ? faEyeSlash : faEye} size={25} color="#adb5bd" />
                        </TouchableOpacity>
                    </View>

                    <View style={{ height: 80, width: '80%', justifyContent: 'space-between', alignItems: 'center', position: 'absolute', top: '80%' }}>

                        <TouchableOpacity style={styles.login} onPress={handleSignup}>
                            <Text style={{ fontWeight: 'bold', fontSize: 18, }}>Create</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={toggleLogin}>
                            <Text style={{ color: 'white', marginTop: 6 }}>Already have an account?</Text>
                        </TouchableOpacity>
                    </View>



                </View>
            </View>
            {/* </ImageBackground> */}
        </KeyboardAvoidingView>
    );
}


