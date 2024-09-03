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
import { Colors } from 'react-native/Libraries/NewAppScreen'


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
    return (
        <SafeAreaView style={styles.background}>
            <StatusBar hidden={false} backgroundColor='' style='light' />
            <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}>

                {/* setting box */}
                <View style={stylesHere.settingBox}>
                    <TouchableOpacity onPress={handleBackArrow}>
                        <IconF name='arrow-left' size={50} style={{ color: 'white', marginLeft: 5 }}></IconF>
                    </TouchableOpacity>
                    <Text style={{ fontSize: 30, fontWeight: 'bold', marginRight: '8%', color: 'white' }}>Settings</Text>
                    <View></View>
                </View>

                {/* Account box */}
                <View style={stylesHere.accountBox}>
                    {/* Account Box Sections */}
                    <TouchableWithoutFeedback>
                        <View style={stylesHere.accountBoxSections}>
                            <IconV name='person-outline' size={24} style={{ color: 'white' }} ></IconV>
                            <Text style={stylesHere.sectionText}>Account</Text>
                            <Icon name='angle-right' size={24} style={{ marginLeft: 'auto', color: 'white' }}></Icon>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback>
                        <View style={stylesHere.accountBoxSections}>
                            <IconV name='notifications-outline' size={24} style={{ color: 'white' }}></IconV>
                            <Text style={stylesHere.sectionText}>Notifications</Text>
                            <Icon name='angle-right' size={24} style={{ marginLeft: 'auto', color: 'white' }}></Icon>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback>
                        <View style={stylesHere.accountBoxSections}>
                            <IconF name='lock' size={24} style={{ color: 'white' }}></IconF>
                            <Text style={stylesHere.sectionText}>Privacy & Security</Text>
                            <Icon name='angle-right' size={24} style={{ marginLeft: 'auto', color: 'white' }}></Icon>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback>
                        <View style={stylesHere.accountBoxSections}>
                            <IconF5 name='hands-helping' size={24} style={{ color: 'white' }}></IconF5>
                            <Text style={stylesHere.sectionText}>Help and Support</Text>
                            <Icon name='angle-right' size={24} style={{ marginLeft: 'auto', color: 'white' }}></Icon>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback>
                        <View style={stylesHere.accountBoxSections}>
                            <IconF name='help-circle' size={24} style={{ color: 'white' }}></IconF>
                            <Text style={stylesHere.sectionText}>About</Text>
                            <Icon name='angle-right' size={24} style={{ marginLeft: 'auto', color: 'white' }}></Icon>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={handleLogout}>
                        <View style={stylesHere.accountBoxSections}>
                            <IconSimple name='logout' size={24} style={{ color: 'white' }}></IconSimple>
                            <Text style={stylesHere.sectionText}>Logout</Text>
                            <Icon name='angle-right' size={24} style={{ marginLeft: 'auto', color: 'white' }}></Icon>
                        </View>
                    </TouchableWithoutFeedback>
                </View>






            </View>
        </SafeAreaView>
    )
}

export default Setting

const stylesHere = StyleSheet.create({
    settingBox: {
        height: '10%',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    accountBox: {
        height: '50%',
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center'

    },
    accountBoxSections: {

        flexDirection: 'row',
        justifyContent: 'flex-start',
        gap: 8, alignItems: 'center',
        width: '80%',
        borderBottomWidth: 1,
        borderColor: 'white',
        height: 60
    },
    sectionText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white'

    }

});
