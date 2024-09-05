import { View, Text, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, Modal } from 'react-native'
import React from 'react'
import { styles } from '../style'
import { StatusBar } from 'expo-status-bar'
import IconF from 'react-native-vector-icons/Feather'
import IconAnt from 'react-native-vector-icons/AntDesign'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useState } from 'react'
import { TextInput } from 'react-native-gesture-handler'



const HelpSupport = ({ navigation }) => {


    const handleBack = () => {
        navigation.navigate('Setting');
    }
    return (
        <SafeAreaView style={styles.background}>
            <StatusBar hidden={false} backgroundColor='' style='light' />
            <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}>
                <View style={styles.settingBox}>
                    <TouchableOpacity onPress={handleBack}>
                        <IconF name='arrow-left' size={50} style={{ color: 'white', marginLeft: 5 }}></IconF>
                    </TouchableOpacity>
                    <Text style={{ fontSize: 30, fontWeight: 'bold', marginRight: '8%', color: 'white' }}>Help and Support</Text>
                    <View></View>
                </View>

                <View style={styles.deleteContainer}>
                    <TextInput placeholder='please let us know your issue...' placeholderTextColor='black' multiline={true} style={styles.deleteInfoBox}>
                    </TextInput>
                    <TouchableOpacity style={styles.outlineButton}>
                    <Text style={styles.outlineButtonText}>Submit</Text>
                </TouchableOpacity>
                </View>
               
            </View>
        </SafeAreaView >
    )
}

export default HelpSupport


