// import React, { useEffect, useState } from "react";
import { View, Text, Alert, TouchableOpacity, StyleSheet, ImageBackground,TouchableWithoutFeedback } from "react-native";
import { StatusBar } from "expo-status-bar";
import { styles } from '../style';
import { SafeAreaView } from 'react-native-safe-area-context';
import IconFA6 from 'react-native-vector-icons/FontAwesome6';
import IconEnypto from 'react-native-vector-icons/Entypo';
import IconIonicons from 'react-native-vector-icons/Ionicons';


const History = ({navigation}) => {

    return (
        <SafeAreaView style={styles.background}>
            <StatusBar hidden={false} backgroundColor='black' style='light' />
            <View style={ { flex:1, alignItems: 'center', justifyContent: 'flex-start' }}>
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 40, textDecorationLine: 'underline' }}>Questions Review</Text>
                <TouchableWithoutFeedback onPress={()=>navigation.navigate('QuestionList')}>
                <View style={[InPageStyle.historyQuestionBox, { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }]}>
                    <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <IconFA6 name='database' size={60} style={{ color: 'black' }}></IconFA6>
                        <Text style={{ fontSize: 30 }}>Database</Text>
                    </View>
                </View>
                </TouchableWithoutFeedback>
                <View style={[InPageStyle.historyQuestionBox, { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }]}>
                    <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <IconIonicons name='logo-javascript' size={60} style={{ color: 'black' }}></IconIonicons>
                        <Text style={{ fontSize: 30 }}>Programming</Text>
                    </View>
                </View>
                <View style={[InPageStyle.historyQuestionBox, { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }]}>
                    <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <IconEnypto name='network' size={60} style={{ color: 'black' }}></IconEnypto>
                        <Text style={{ fontSize: 30 }}>Networking</Text>
                    </View>
                </View>
                <View style={[InPageStyle.historyQuestionBox, { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }]}>
                    <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <IconFA6 name='cloud' size={60} style={{ color: 'black' }}></IconFA6>
                        <Text style={{ fontSize: 30 }}>Cloud Computing</Text>
                    </View>
                </View>
            </View>
        </SafeAreaView>


    );
};


export default History;

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


