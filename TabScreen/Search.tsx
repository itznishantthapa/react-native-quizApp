import { ScrollView, StyleSheet, Text, TextInput, View, ImageBackground, Touchable, TouchableOpacity } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import Icon from 'react-native-vector-icons/FontAwesome';
import { styles } from '../style'
import  { useRef,useState,useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Search({ navigation }) {



    const textInputRef = useRef(null);

    useFocusEffect(
      React.useCallback(()=>{
        textInputRef.current.focus();
      },[])
    );
    



    const goToQuiz = () => {
        navigation.navigate('Quiz');
    }

    const handleSearch=()=>{
        textInputRef.current.focus();
    }

    return (
        <SafeAreaView style={styles.root}>
            {/* <ScrollView style={styles.background_Dashboard}> */}
            <View style={styles.background_Dashboard}>
                <View style={{
                    flexDirection: 'column', justifyContent: 'center', alignItems: 'center'
                }}>
                    <StatusBar hidden={false} backgroundColor='black' style='light'/>
                    <View style={styles.searchView}>
                        <TouchableOpacity onPress={handleSearch}>
                        <Icon name='search' style={{ color: '#495057' }} size={30}></Icon>
                        </TouchableOpacity>
                        <TextInput ref={textInputRef}  style={{ fontSize: 20, fontWeight: 'bold', width: '80%' }} placeholder='username' placeholderTextColor='#495057'></TextInput>
                    </View>

                

                  



                </View>
                </View>
            {/* </ScrollView> */}
        </SafeAreaView>
    )
}

