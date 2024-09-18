// import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import { styles } from '../style';
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import { MyContext } from "../AppProvider";
import { useContext } from "react";
import { auth } from "../firebaseConfig";
import IconM from 'react-native-vector-icons/MaterialCommunityIcons';


const Chart = ({ navigation }) => {

    const { signedUpUsers } = useContext(MyContext);


    const handleUserProfile = (user: any, signedUpUsers: any) => {
        navigation.navigate('UserProfile', { user, signedUpUsers });
    };

    const handleSignUp = () => {
        navigation.navigate('Login')
    }

    return (
        <SafeAreaView style={styles.background}>
            <StatusBar hidden={false} backgroundColor='black' style='light' />
            {auth.currentUser ?
                (<Text style={{ color: 'white', fontWeight: 'bold', fontSize: 25, marginTop: 10, marginLeft: 20 }}>Leaderboard</Text>
                ) : ''

            }

            <ScrollView style={{}}>
                <View style={{ alignItems: 'center', flexDirection: 'column', gap: 10, paddingTop: 10 }}>
                    {auth.currentUser ?
                        signedUpUsers.map((user, index) => (
                            <TouchableOpacity key={user.id} style={[styles.friendBox, { backgroundColor: '#001533', width: '90%' }]} onPress={() => handleUserProfile(user, signedUpUsers)}>
                                <Text style={styles.friendRank}>#{index + 1}</Text>
                                <Image source={user.profile ? { uri: user.profile } : require('../assets/person.jpg')} style={styles.friendImage} />
                                <Text style={styles.friendUsername}>{user.fullName}</Text>
                            </TouchableOpacity>
                        )) : (<TouchableOpacity style={{ flexDirection: 'row' }} onPress={handleSignUp}>
                            <Text style={{ color: '#00b4d8', fontWeight: 'bold', fontSize: 18, marginTop: 30, textDecorationLine: 'underline' }}>Please sign in to see leadership board</Text>
                            <IconM name='bird' size={18} style={{ color: '#00b4d8' }}></IconM>
                        </TouchableOpacity>)

                    }


                </View>
            </ScrollView>

        </SafeAreaView>








    );
};


export default Chart


