import { View, Text, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, Modal } from 'react-native'
import React from 'react'
import { styles } from '../style'
import { StatusBar } from 'expo-status-bar'
import IconF from 'react-native-vector-icons/Feather'
import IconAnt from 'react-native-vector-icons/AntDesign'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useState } from 'react'



const About = ({ navigation }) => {
 const handleBack=()=>{
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


                </View>







            </View>
        </SafeAreaView>
    )
}

export default About


