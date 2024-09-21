import { View, Text, TouchableOpacity, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import { styles } from '../style/style'
import { StatusBar } from 'expo-status-bar'
import IconF from 'react-native-vector-icons/Feather'
import { SafeAreaView } from 'react-native-safe-area-context'

const Account = ({navigation}) => {

    const handleBack=()=>{
        navigation.navigate('Setting');
    }

    const handleEdit=()=>{
        navigation.navigate('AccountEdit');
    }
    const handleDelete=()=>{
        navigation.navigate('AccountDeletion');
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
                    <Text style={{ fontSize: 30, fontWeight: 'bold', marginRight: '8%', color: 'white' }}>Account</Text>
                    <View></View>
                </View>

                {/* Account box */}
                <View style={styles.accountBox}>
                    {/* Account Box Sections */}
                    <TouchableWithoutFeedback onPress={handleEdit}>
                        <View style={styles.accountBoxSections}>
                            <Text style={styles.sectionText}>Edit profile</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={handleDelete}>
                        <View style={styles.accountBoxSections}>
                            <Text style={styles.sectionText}>Delete account</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>






            </View>
        </SafeAreaView>
    )
}

export default Account

