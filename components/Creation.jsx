import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, ImageBackground, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import React, { useState } from 'react';
import neon2 from '../assets/neon2.jpg';


export default function Creation({navigation}) {
    const [passwordVisible, setPasswordVisible] = useState(true);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };
    const toggleLogin = () => {
        navigation.navigate('Login');
    }

    return (
        <KeyboardAvoidingView
            style={styles.root}
        >
            <StatusBar style='auto' />
            <ImageBackground source={neon2} style={styles.background}>
                <View style={styles.innerView}>
                    <TextInput style={styles.inputField} placeholder='Enter your full name' placeholderTextColor='#adb5bd' />
                    <TextInput style={styles.inputField} placeholder='Create username' placeholderTextColor='#adb5bd' />

                    <View style={[styles.inputField, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
                        <TextInput
                            style={{ fontWeight: 'bold', width: '75%', color: '#adb5bd' }}
                            placeholder='Create your password'
                            placeholderTextColor='#adb5bd'
                            secureTextEntry={passwordVisible}
                        />
                        <TouchableOpacity onPress={togglePasswordVisibility}>
                            <FontAwesomeIcon icon={passwordVisible ? faEyeSlash : faEye} size={25} color="#adb5bd" />
                        </TouchableOpacity>
                    </View>


                    <View style={[styles.inputField, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
                        <TextInput
                            style={{ fontWeight: 'bold', width: '75%', color: '#adb5bd' }}
                            placeholder='Confirm your password'
                            placeholderTextColor='#adb5bd'
                            secureTextEntry={passwordVisible}
                        />
                        <TouchableOpacity onPress={togglePasswordVisibility}>
                            <FontAwesomeIcon icon={passwordVisible ? faEyeSlash : faEye} size={25} color="#adb5bd" />
                        </TouchableOpacity>
                    </View>

                    <View style={{ height: 80, width: '80%', justifyContent: 'space-between', alignItems: 'center', position: 'absolute', top: '80%' }}>

                        <View style={styles.login}>
                            <Text style={{ fontWeight: 'bold', fontSize: 18, }}>Create</Text>
                        </View>

                        <TouchableOpacity onPress={toggleLogin}>
                            <Text style={{ color: 'white', marginTop: 6 }}>Already have an account?</Text>
                        </TouchableOpacity>
                    </View>



                </View>
            </ImageBackground>
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
