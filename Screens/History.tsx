// import React, { useEffect, useState } from "react";
import { View, Text, Alert, TouchableOpacity, StyleSheet, ImageBackground,TouchableWithoutFeedback } from "react-native";
import { StatusBar } from "expo-status-bar";
import { styles } from '../style';
import { SafeAreaView } from 'react-native-safe-area-context';
import IconFA6 from 'react-native-vector-icons/FontAwesome6';
import IconEnypto from 'react-native-vector-icons/Entypo';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import IconMc from 'react-native-vector-icons/MaterialCommunityIcons';
import { useContext } from "react";
import { MyContext } from "../AppProvider";


const History = ({navigation}) => {
    const {getQuizData,topic} = useContext(MyContext);


    const handleDualByHistory=(category: string)=>{
        getQuizData(category);
        navigation.navigate('QuestionList');
    }


    return (
        <SafeAreaView style={styles.background}>
            <StatusBar hidden={false} backgroundColor='black' style='light' />
            <View style={ { flex:1, alignItems: 'center', justifyContent: 'flex-start' }}>
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 40, textDecorationLine: 'underline' }}>Questions Review</Text>


                <TouchableWithoutFeedback onPress={()=>handleDualByHistory((topic.database_cloud).toLowerCase())}>
                <View style={[InPageStyle.historyQuestionBox, { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }]}>
                    <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        {
                            topic.database_cloud==='Database'?( <IconFA6 name='database' size={60} style={{ color: 'black' }}></IconFA6>):(<IconFA6 name='cloud' size={60} style={{ color: 'black' }}></IconFA6>)
                        }
                       
                        <Text style={{ fontSize: 30 }}>{topic.database_cloud}</Text>
                    </View>
                </View>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback onPress={()=>handleDualByHistory((topic.programming_dsa).toLowerCase())}>
                <View style={[InPageStyle.historyQuestionBox, { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }]}>
                    <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        {
                            topic.programming_dsa==='Programming'?( <IconFA6 name='laptop-code' size={60} style={{ color: 'black' }}></IconFA6>):(<IconFA6 name='laptop-code' size={60} style={{ color: 'black' }}></IconFA6>)
                        }
                        <Text style={{ fontSize: 30 }}>{topic.programming_dsa}</Text>
                    </View>
                </View>
                </TouchableWithoutFeedback>


                <TouchableWithoutFeedback onPress={()=>handleDualByHistory((topic.networking_softEng).toLowerCase())}>
                <View style={[InPageStyle.historyQuestionBox, { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }]}>
                    <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        {
                            topic.networking_softEng==='Networking'?( <IconEnypto name='network' size={60} style={{ color: 'black' }}></IconEnypto>):(<IconEnypto name='network' size={60} style={{ color: 'black' }}></IconEnypto>)
                        }
                        <Text style={{ fontSize: 30 }}>{topic.networking_softEng}</Text>
                    </View>
                </View>
                </TouchableWithoutFeedback>


                <TouchableWithoutFeedback onPress={()=>handleDualByHistory((topic.os_aiMl).toLowerCase())}>
                <View style={[InPageStyle.historyQuestionBox, { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }]}>
                    <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    {
                        topic.os_aiMl==='Operating System'?( <IconIonicons name='hardware-chip' size={60} style={{ color: 'black' }}></IconIonicons>):(<IconMc name='robot' size={60} style={{ color: 'black' }}></IconMc>)
                    }
                        <Text style={{ fontSize: 30 }}>{topic.os_aiMl}</Text>
                    </View>
                </View>
                </TouchableWithoutFeedback>
               
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


