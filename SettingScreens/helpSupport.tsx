import { View, Text, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, Modal } from 'react-native'
import React from 'react'
import { styles } from '../style'
import { StatusBar } from 'expo-status-bar'
import IconF from 'react-native-vector-icons/Feather'
import IconAnt from 'react-native-vector-icons/AntDesign'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useState } from 'react'
import { TextInput } from 'react-native-gesture-handler'
import { auth, firestore } from '../firebaseConfig';
import { Linking } from 'react-native'

import { Alert } from 'react-native'

const HelpSupport = ({ navigation }) => {

  const [message, setmessage] = useState('')

    const handleSubmition=()=>{
        //i want to open a user gmail and ready to send a mail to itsnishantu@gmail.com , make a default subject and the body is the input text
        // / Check if the message is not empty
        if (message.trim().length === 0) {
            Alert.alert('Error', 'Please enter a message.');
            return;
        }

        const recipientEmail = 'itsnishantu@gmail.com';
        const subject = 'Help and Support Request'; // Default subject
        const body = message; // Body is the user's input

        // Construct the mailto link
        const mailtoURL = `mailto:${recipientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        // Open the mail client
        Linking.openURL(mailtoURL)
            .catch((error) => Alert.alert('Error', 'Could not open mail client.'));
    };



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
                    <TextInput placeholder='please let us know your issue...' value={message} onChangeText={setmessage} placeholderTextColor='black' multiline={true} style={[styles.deleteInfoBox,{height:'30%'}]}>
                    </TextInput>
                    <TouchableOpacity style={styles.outlineButton} onPress={handleSubmition}>
                    <Text style={styles.outlineButtonText}>Submit</Text>
                   </TouchableOpacity>
                </View>
               
            </View>
        </SafeAreaView >
    )
}

export default HelpSupport


