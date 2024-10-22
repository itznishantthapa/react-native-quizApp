import { Text, View, TouchableOpacity, TouchableWithoutFeedback, Alert } from 'react-native'
import React from 'react'
import { styles } from '../style/style'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/FontAwesome';
import IconV from 'react-native-vector-icons/Ionicons';
import IconF from 'react-native-vector-icons/Feather';
import IconF5 from 'react-native-vector-icons/FontAwesome5';
import IconSimple from 'react-native-vector-icons/SimpleLineIcons';
import IconAnt from 'react-native-vector-icons/AntDesign';
import { logout,isAuthenticated } from '../backend/authService'



const Setting = ({ navigation, setgameInfo }) => {

    // Initial state for gameInfo
    const initialGameInfo = {
        worldRank: 'NA',
        gamePlayed: 0,
        points: 0,
        totalAttempted: 0
    };


    const handleLogout = () => {
        Alert.alert(
            "Confirm Logout",
            "Are you sure you want to logout?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Logout",
                    onPress: async () => {
                        const result = await logout(); // Use service to handle logout
                        if (result.success) {
                            setgameInfo(initialGameInfo); // Reset the game info
                            navigation.navigate('Profile');
                        } else {
                            console.error("Error logging out: ", result.error);
                        }
                    },
                    style: "destructive"
                }
            ]
        );
    };

    const handleSignIn = () => {
        navigation.navigate('Login')
    }

    const handleBackArrow = () => {
        navigation.navigate('Profile');
    }
    const handleAccount = () => {
        navigation.navigate('Account');
    }
    const handleAbout = () => {
        navigation.navigate('About');
    }
    const handleNotification = () => {
        navigation.navigate('Notifications');
    }
    const handlePrivacy = () => {
        navigation.navigate('Privacy');
    }

    const handleHelpSupport = () => {
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

                    {
                      isAuthenticated() ? (
                            <TouchableWithoutFeedback onPress={handleAccount}>
                                <View style={styles.accountBoxSections}>
                                    <IconV name='person-outline' size={24} style={{ color: 'white' }} ></IconV>
                                    <Text style={styles.sectionText}>Account</Text>
                                    <Icon name='angle-right' size={24} style={{ marginLeft: 'auto', color: 'white' }}></Icon>
                                </View>
                            </TouchableWithoutFeedback>
                        ) : null
                    }

                    {
                      isAuthenticated() ? (
                            <TouchableWithoutFeedback onPress={handleNotification}>
                                <View style={styles.accountBoxSections}>
                                    <IconV name='notifications-outline' size={24} style={{ color: 'white' }}></IconV>
                                    <Text style={styles.sectionText}>Notifications</Text>
                                    <Icon name='angle-right' size={24} style={{ marginLeft: 'auto', color: 'white' }}></Icon>
                                </View>
                            </TouchableWithoutFeedback>
                        ) : null
                    }

                    {isAuthenticated() ? (
                        <TouchableWithoutFeedback onPress={handlePrivacy}>
                            <View style={styles.accountBoxSections}>
                                <IconF name='lock' size={24} style={{ color: 'white' }}></IconF>
                                <Text style={styles.sectionText}>Privacy & Security</Text>
                                <Icon name='angle-right' size={24} style={{ marginLeft: 'auto', color: 'white' }}></Icon>
                            </View>
                        </TouchableWithoutFeedback>
                    ) : null
                    }

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

                    {
                       isAuthenticated()? (
                            <TouchableWithoutFeedback onPress={handleLogout}>
                                <View style={styles.accountBoxSections}>
                                    <IconSimple name='logout' size={24} style={{ color: 'white' }}></IconSimple>
                                    <Text style={styles.sectionText}>Logout</Text>
                                    <Icon name='angle-right' size={24} style={{ marginLeft: 'auto', color: 'white' }}></Icon>
                                </View>
                            </TouchableWithoutFeedback>
                        ) : (
                            <TouchableWithoutFeedback onPress={handleSignIn}>
                                <View style={styles.accountBoxSections}>
                                    <IconAnt name='login' size={24} style={{ color: 'white' }}></IconAnt>
                                    <Text style={styles.sectionText}>Sign In</Text>
                                    <Icon name='angle-right' size={24} style={{ marginLeft: 'auto', color: 'white' }}></Icon>
                                </View>
                            </TouchableWithoutFeedback>
                        )
                    }

                </View>
            </View>
        </SafeAreaView>
    )
}

export default Setting

