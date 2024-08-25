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

import { BlurView } from 'expo-blur';
// import Tabbar from './Tabbar';


export default function Dashboard({navigation}) {
const goToQuiz=()=>{
    navigation.navigate('Quiz');
}

    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={styles.background}>
                <View style={{
                    flexDirection: 'column', justifyContent: 'center', alignItems: 'center'
                }}>
                    <StatusBar hidden />
                    <View style={styles.searchView}>
                        <Icon name='search' style={{ color: '#495057' }} size={30}></Icon>
                        <TextInput style={{ fontSize: 20, fontWeight: 'bold', width: '80%' }} placeholder='username' placeholderTextColor='#495057'></TextInput>
                    </View>

                    <View style={styles.boxContainer}>
                        <TouchableOpacity style={{width:'100%',flex:1,justifyContent:'center',alignItems:'center'}} onPress={goToQuiz}>
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

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: '#000000',
        gap: 40

    },
    searchView: {
        height: 60,
        width: '90%',
        backgroundColor: '#f0efeb',
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingLeft: 30,

    },
    boxContainer: {
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 15,
        marginTop: 40
    },
    boxes: {
        height: 150,
        width: '90%',
        flexDirection: 'row',
        borderRadius: 20,
        justifyContent: 'flex-start',
        alignItems: 'flex-end',

    },
    textStyle: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 30,
        marginLeft: 15,
        marginBottom: 15
    },
    textStyle2: {
        color: '#ffffff',
        fontWeight: '900',
        fontSize: 25,
        marginLeft: 15,
        marginBottom: 15
    }


})