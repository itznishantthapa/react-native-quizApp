// import { Text, View, StyleSheet } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet, Text, TextInput, View, ImageBackground, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import neon2 from '../assets/neon2.jpg';

export default function Signup({navigation})  {
   const handleCreation=()=>{
    navigation.navigate('Creation');
   }
        return (


            <KeyboardAvoidingView
                style={styles.root}
            >
                   <StatusBar style={'light'}/>
                {/* <ImageBackground source={neon2} style={styles.background}> */}
                <View style={styles.background}>
                    <View style={styles.innerView}>
                        <Text style={{color:'white',fontWeight:'900',fontSize:30,marginBottom:20}}>How do you want to sign up?</Text>
                        <View style={styles.loginOptions}>
                            <TouchableOpacity style={styles.loginOpt} onPress={handleCreation}>
                            <View style={styles.loginOpt}>
                                <Icon name="" size={20} color="#000" />
                                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Create your account</Text>
                            </View>
                            </TouchableOpacity>
                           
                            <View style={styles.loginOpt}>
                                <Icon name="apple" size={20} color="#000" />
                                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Sign in with Apple</Text>
                            </View>
                            <View style={styles.loginOpt}>
                                <Icon name="google" size={20} color="#000" />
                                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Sign in with Google</Text>
                            </View>
                        </View>
                    </View>
                    </View>
                {/* </ImageBackground> */}
            </KeyboardAvoidingView>



        )
    
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
    innerView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
    },
    background: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor:'#000000'
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
        backgroundColor: '#ffffff',
        borderRadius: 20,
    },
});
