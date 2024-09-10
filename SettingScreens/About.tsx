import { View, Text, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, Modal,Linking } from 'react-native'
import React from 'react'
import { styles } from '../style'
import { StatusBar } from 'expo-status-bar'
import IconF from 'react-native-vector-icons/Feather'
import IconAnt from 'react-native-vector-icons/AntDesign'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useState } from 'react'
import IconFA from 'react-native-vector-icons/FontAwesome';



const About = ({ navigation }) => {
    const handleBack = () => {
        navigation.navigate('Setting');
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
                    <Text style={{ fontSize: 30, fontWeight: 'bold', marginRight: '8%', color: 'white' }}>About</Text>
                    <View></View>
                </View>

                <View style={{ width: '80%', padding: 10 }}>
                    <Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold', textAlign: 'left' }}>App version @2.1.0</Text>
                    <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center',gap:1}}>
                    <Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold', textAlign: 'left' }}>Designed and developed by</Text>
                    <TouchableOpacity  onPress={()=>{ Linking.openURL('https://nishantthapa.me/');}} style={{flexDirection:'row',justifyContent:'center'}}>
                    <Text style={{ color: '#2196f3', fontSize: 15, fontWeight: 'bold', textAlign: 'left',textDecorationLine:'underline' }}>(Nishant Thapa)</Text>
                    <IconFA name='hand-pointer-o' size={30} style={{color:'white',position:'absolute',marginTop:12}}></IconFA>
                    </TouchableOpacity>
                    </View>
                   
                </View>







            </View>
        </SafeAreaView>
    )
}

export default About


