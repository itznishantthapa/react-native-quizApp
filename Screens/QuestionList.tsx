// import React, { useEffect, useState } from "react";
import { View, Text, Alert, TouchableOpacity, StyleSheet, ImageBackground } from "react-native";
import { StatusBar } from "expo-status-bar";
import { styles } from '../style';
import { SafeAreaView } from 'react-native-safe-area-context';
import IconFA6 from 'react-native-vector-icons/FontAwesome6';
import IconEnypto from 'react-native-vector-icons/Entypo';
import IconIonicons from 'react-native-vector-icons/Ionicons';


const QuestionList = () => {

    return (
        <SafeAreaView style={styles.background}>
            <StatusBar hidden={false} backgroundColor='black' style='light' />
            <View style={ { flex:1, alignItems: 'center', justifyContent: 'flex-start' }}>
              <Text style={{color:'white'}}>Hello</Text>
            </View>
        </SafeAreaView>


    );
};


export default QuestionList;

const InPageStyle = StyleSheet.create({
    historyQuestionBox:
    {
        width: '90%',
        height: '15%',
        borderRadius: 20,
        marginTop: 20,
        backgroundColor: '#eaf4f4',
    },


})


