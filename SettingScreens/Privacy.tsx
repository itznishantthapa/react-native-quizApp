import { View, Text, TouchableOpacity, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import { styles } from '../style'
import { StatusBar } from 'expo-status-bar'
import IconF from 'react-native-vector-icons/Feather'
import { SafeAreaView } from 'react-native-safe-area-context'

const Privacy = ({navigation}) => {

    const handleBack=()=>{
        navigation.navigate('Setting');
    }

    const handlePasswordEdit=()=>{
        navigation.navigate('PrivacyEdit');
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
                    <Text style={{ fontSize: 30, fontWeight: 'bold', marginRight: '8%', color: 'white' }}>Privacy & Security</Text>
                    <View></View>
                </View>

              
                <View style={styles.accountBox}>
                    <TouchableWithoutFeedback onPress={handlePasswordEdit}>
                        <View style={styles.accountBoxSections}>
                            <Text style={styles.sectionText}>Change Password</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>






            </View>
        </SafeAreaView>
    )
}

export default Privacy

