import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, ImageBackground, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import React, { useState } from 'react';
import neon2 from '../assets/neon2.jpg';


export default function Login({ navigation }) {
    const [passwordVisible, setPasswordVisible] = useState(true);


    const [username, setUsername] = useState('');
    const [Password, setPassword] = useState('');



    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const toggleLogin = () => {
        navigation.navigate('Signup');
    }
    const handleLogin = () => {
        if(!(Password.trim()==='' && username.trim()==='')){

            if(Password==='111' && username==='nishant'){
    
                navigation.navigate('Tabbar');
            }else{
                alert('Invalid Creditentials')
            }
        }else{
            alert("Please login");
        }
    }



    return (
        <KeyboardAvoidingView
            style={styles.root}
        >
            <StatusBar style={'light'}/>

            {/* <ImageBackground source={neon2} style={styles.background}> */}
            <View style={styles.background}>
                <View style={styles.innerView}>
                    <TextInput value={username} onChangeText={setUsername} style={styles.inputField} placeholder='Enter your email' placeholderTextColor='#adb5bd' />

                    <View style={[styles.inputField, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
                        <TextInput
                            value={Password} onChangeText={setPassword}
                            style={{ fontWeight: 'bold', width: '75%', color: '#adb5bd' }}
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

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
    background: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor:'#000000'
    },
    innerView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
    },
    inputField: {
        width: '80%',
        height: 40,
        borderBottomWidth: 1,
        borderColor: '#adb5bd',
        paddingLeft: 10,
        color: '#adb5bd',
        fontWeight: 'bold',
    },
    login: {
        width: '100%',
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8f9fa',
        borderRadius: 20,
    },
    loginOptions: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
        height: 130,
        width: '60%',
    },
    loginOpt: {
        width: '100%',
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
        backgroundColor: '#0466c8',
        borderRadius: 20,
    },
});
