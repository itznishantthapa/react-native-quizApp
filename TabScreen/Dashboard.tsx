import { ScrollView, StyleSheet, Text, TextInput, View, ImageBackground, Touchable, TouchableOpacity } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import Icon from 'react-native-vector-icons/FontAwesome';
import cosmos from '../assets/cosmos.jpg'
import lady from '../assets/lady.jpeg'
import console from '../assets/console.jpg'
import hills from '../assets/hills.png'
import pool from '../assets/pool.png'
import venom from '../assets/venom.jpeg'
import { styles } from '../style'
import  { useRef } from 'react';

export default function Dashboard({ navigation }) {



    const textInputRef = useRef(null);

    // const handleButtonPress = () => {
    //     // Focus the TextInput when button is pressed
    //     if (textInputRef.current) {
    //       textInputRef.current.focus();
    //     }
    //   };



    const goToQuiz = () => {
        navigation.navigate('Quiz');
    }

    const handleSearch=()=>{
        textInputRef.current.focus();
    }

    return (
        <View style={styles.root}>
            <ScrollView style={styles.background_Dashboard}>
                <View style={{
                    flexDirection: 'column', justifyContent: 'center', alignItems: 'center'
                }}>
                    <StatusBar hidden />
                    <View style={styles.searchView}>
                        <TouchableOpacity onPress={handleSearch}>
                        <Icon name='search' style={{ color: '#495057' }} size={30}></Icon>
                        </TouchableOpacity>
                        <TextInput ref={textInputRef}  style={{ fontSize: 20, fontWeight: 'bold', width: '80%' }} placeholder='username' placeholderTextColor='#495057'></TextInput>
                    </View>

                    <View style={styles.boxContainer}>
                        <TouchableOpacity style={{ width: '100%', flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={goToQuiz}>
                            <ImageBackground source={cosmos} resizeMode="cover" imageStyle={{ borderRadius: 20, width: '100%' }} style={styles.boxes}>
                                <Text style={styles.textStyle}>Astronomy</Text>
                            </ImageBackground>
                        </TouchableOpacity>
                        <ImageBackground source={console} resizeMode="cover" imageStyle={{ borderRadius: 20, width: '100%' }} style={styles.boxes}>
                            <Text style={styles.textStyle}>Gaming</Text>
                        </ImageBackground>
                        <ImageBackground source={lady} resizeMode="cover" imageStyle={{ borderRadius: 20, width: '100%' }} style={styles.boxes}>
                            <Text style={styles.textStyle}>Science</Text>
                        </ImageBackground>
                        <ImageBackground source={hills} resizeMode="cover" imageStyle={{ borderRadius: 20, width: '100%' }} style={styles.boxes}>
                            <Text style={styles.textStyle}>Geography</Text>
                        </ImageBackground>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '100%', height: 150, gap: 8, marginTop: 12 }}>
                        <ImageBackground source={pool} resizeMode='cover' imageStyle={{ height: 150, width: '100%', borderRadius: 20 }} style={{ height: 150, width: '45%', justifyContent: 'center' }}>
                            <Text style={styles.textStyle2}>Your Ranking</Text>
                        </ImageBackground>
                        <ImageBackground source={venom} resizeMode='cover' imageStyle={{ height: 150, width: '100%', borderRadius: 20, }} style={{ height: 150, width: '45%', justifyContent: 'center' }}>

                            <Text style={styles.textStyle2}>Total Question  Solved</Text>

                        </ImageBackground>
                    </View>



                </View>
            </ScrollView>
        </View>
    )
}

