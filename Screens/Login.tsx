import { StatusBar } from 'expo-status-bar';
import { Text, TextInput, View, TouchableOpacity, Alert, KeyboardAvoidingView } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import React, { useState } from 'react';
import { styles } from '../style.js'
//Internet connection validation
import NetInfo from '@react-native-community/netinfo';
import { signAccount } from '../db.js';

export default function Login({ navigation }) {
   const [passwordVisible, setPasswordVisible] = useState(true);


    const [email, setUsername] = useState('');
    const [password, setPassword] = useState('');


    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const toggleLogin = () => {
        navigation.navigate('Signup');
    }


    const handleLogin = async () => {
       
        // Basic validation
        if (!email || !password) {
            Alert.alert("Error","empty fields");
            return;
        }

        //Checking the internet connection
        const networkState = await NetInfo.fetch();
        if(!networkState.isConnected){
            Alert.alert("Network Error","Please connect to the internet.");
            return
        }

          await signAccount(navigation,email,password);
            setUsername("");
            setPassword("");

    };


    return (
        <KeyboardAvoidingView
            style={styles.root}>
            <StatusBar hidden={false} backgroundColor='black' style='light' />

            {/* <ImageBackground source={neon2} style={styles.background}> */}
            <View style={styles.background}>
                <View style={styles.innerView}>
                    <TextInput value={email} onChangeText={setUsername} style={styles.inputField} placeholder='Enter your email' placeholderTextColor='#adb5bd' />

                    <View style={[styles.inputField, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
                        <TextInput
                            value={password} 
                            onChangeText={setPassword}
                            // style={{ fontWeight: 'bold', width: '75%', color: '#adb5bd' } }
                            style={[styles.inputField,{width:'90%',flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingLeft:0}]}
                            placeholder='Enter your password'
                            placeholderTextColor='#adb5bd'
                            secureTextEntry={passwordVisible}
                        />
                        <TouchableOpacity onPress={togglePasswordVisibility}>
                            <FontAwesomeIcon icon={passwordVisible ? faEyeSlash : faEye} size={25} color="#adb5bd" />
                        </TouchableOpacity>
                    </View>

                    <View style={{ height: 80, width: '80%', justifyContent: 'space-between', alignItems: 'center', position: 'absolute', top: '60%' }}>

                        <View style={styles.login}>
                            <TouchableOpacity style={styles.login} onPress={handleLogin}>
                                <Text style={{ fontWeight: 'bold', fontSize: 18, }}>Login</Text>
                            </TouchableOpacity>

                        </View>

                        <TouchableOpacity onPress={toggleLogin}>
                            <Text style={{ color: 'white', marginTop: 6 }}>Don't have an account?</Text>
                        </TouchableOpacity>
                    </View>



                </View>
            </View>
            {/* </ImageBackground> */}
        </KeyboardAvoidingView>
    );
}

