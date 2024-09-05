import { View, Text, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, TextInput } from 'react-native'
import React from 'react'
import { styles } from '../style'
import { StatusBar } from 'expo-status-bar'
import IconF from 'react-native-vector-icons/Feather'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useState } from 'react'
import IconF6 from 'react-native-vector-icons/FontAwesome6'


const Notifications = ({ navigation }) => {
    const [isOn, setisOn] = useState(false)
    const handleBack = () => {
        navigation.navigate('Setting');
    }
    const handleNotyOnOff = () => {
        if (!isOn) {
            setisOn(true)
        } else {
            setisOn(false)
        }
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
                    <Text style={{ fontSize: 30, fontWeight: 'bold', marginRight: '8%', color: 'white' }}>Manage notifications</Text>
                    <View></View>
                </View>

                <View style={[styles.accountBox, { gap: 10 }]}>
                    <TouchableWithoutFeedback>
                        <View style={[styles.accountBoxSections, { borderWidth: 1, borderRadius: 10, justifyContent: 'space-evenly', flexDirection: 'row', alignItems: 'center' }]}>
                            <Text style={[styles.sectionText, { paddingLeft: 10, width: '60%' }]}>Notifications</Text>
                            <TouchableOpacity style={[styles.deleteButton, { width: '30%', backgroundColor: isOn ? 'green' : 'red' }]} onPress={handleNotyOnOff}>
                                <Text style={[styles.buttonText, { textAlign: 'center' }]}>Trun {isOn ? "on" : "off"}</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableWithoutFeedback>


                </View>






            </View>
        </SafeAreaView>
    )
}

export default Notifications


