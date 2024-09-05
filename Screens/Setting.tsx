import { StyleSheet, Text, View, TouchableOpacity, TouchableWithoutFeedback,Alert } from 'react-native'
import React from 'react'
import { styles } from '../style'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/FontAwesome';
import IconV from 'react-native-vector-icons/Ionicons';
import IconF from 'react-native-vector-icons/Feather';
import IconF5 from 'react-native-vector-icons/FontAwesome5';
import IconSimple from 'react-native-vector-icons/SimpleLineIcons';


const Setting = ({navigation}) => {

    const handleLogout=()=>{
        Alert.alert(
            "Confirm Logout",
            "Are you sure you want to logout?",
            [
              {
                text: "Cancel",
                style: "cancel"
              },
              {
                text: "Logout",
                onPress: () => {
                  // Handle the logout action here
                  navigation.navigate('Login');
                  console.log("User logged out");
                },
                style: "destructive"
              }
            ]
          );
       
    }

    const handleBackArrow=()=>{
        navigation.navigate('Profile');
    }
    const handleAccount=()=>{
        navigation.navigate('Account');
    }
    const handleAbout=()=>{
        navigation.navigate('About');
    }
    const handleNotification=()=>{
        navigation.navigate('Notifications');
    }
    const handlePrivacy=()=>{
        navigation.navigate('Privacy');
    }

    const handleHelpSupport=()=>{
        navigation.navigate('HelpSupport');
    }
    return (
        <SafeAreaView style={styles.background}>
            <StatusBar hidden={false} backgroundColor='' style='light' />
            <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}>

                {/* setting box */}
                <View style={styles.settingBox}>
                    <TouchableOpacity onPress={handleBackArrow}>
                        <IconF name='arrow-left' size={50} style={{ color: 'white', marginLeft: 5 }}></IconF>
                    </TouchableOpacity>
                    <Text style={{ fontSize: 30, fontWeight: 'bold', marginRight: '8%', color: 'white' }}>Settings</Text>
                    <View></View>
                </View>

                {/* Account box */}
                <View style={styles.accountBox}>
                    {/* Account Box Sections */}
                    <TouchableWithoutFeedback onPress={handleAccount}>
                        <View style={styles.accountBoxSections}>
                            <IconV name='person-outline' size={24} style={{ color: 'white' }} ></IconV>
                            <Text style={styles.sectionText}>Account</Text>
                            <Icon name='angle-right' size={24} style={{ marginLeft: 'auto', color: 'white' }}></Icon>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={handleNotification}>
                        <View style={styles.accountBoxSections}>
                            <IconV name='notifications-outline' size={24} style={{ color: 'white' }}></IconV>
                            <Text style={styles.sectionText}>Notifications</Text>
                            <Icon name='angle-right' size={24} style={{ marginLeft: 'auto', color: 'white' }}></Icon>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback  onPress={handlePrivacy}>
                        <View style={styles.accountBoxSections}>
                            <IconF name='lock' size={24} style={{ color: 'white' }}></IconF>
                            <Text style={styles.sectionText}>Privacy & Security</Text>
                            <Icon name='angle-right' size={24} style={{ marginLeft: 'auto', color: 'white' }}></Icon>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={handleHelpSupport}>
                        <View style={styles.accountBoxSections}>
                            <IconF5 name='hands-helping' size={24} style={{ color: 'white' }}></IconF5>
                            <Text style={styles.sectionText}>Help and Support</Text>
                            <Icon name='angle-right' size={24} style={{ marginLeft: 'auto', color: 'white' }}></Icon>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={handleAbout}>
                        <View style={styles.accountBoxSections}>
                            <IconF name='help-circle' size={24} style={{ color: 'white' }}></IconF>
                            <Text style={styles.sectionText}>About</Text>
                            <Icon name='angle-right' size={24} style={{ marginLeft: 'auto', color: 'white' }}></Icon>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={handleLogout}>
                        <View style={styles.accountBoxSections}>
                            <IconSimple name='logout' size={24} style={{ color: 'white' }}></IconSimple>
                            <Text style={styles.sectionText}>Logout</Text>
                            <Icon name='angle-right' size={24} style={{ marginLeft: 'auto', color: 'white' }}></Icon>
                        </View>
                    </TouchableWithoutFeedback>
                </View>






            </View>
        </SafeAreaView>
    )
}

export default Setting

