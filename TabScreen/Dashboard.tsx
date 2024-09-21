import { ScrollView, Text, View, ImageBackground,  TouchableOpacity } from 'react-native'
import React, { useState, useContext } from 'react'
import { StatusBar } from 'expo-status-bar'
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconAnt from 'react-native-vector-icons/AntDesign';
import Fdatabase from '../assets/Fdatabase.png'
import Fhardware from '../assets/Fhardware3.jpg'
import Fprogramming from '../assets/Fprogramming.jpg'
import Fdsa from '../assets/Fdsa.png'
import Fnetwork from '../assets/Fnetwork.png'
import FsoftwareEngineering from '../assets/Fengineering1.jpg'
import FoperatingSystem from '../assets/Fos.png'
import FaiML from '../assets/Fai.jpg'

import { styles } from '../style/style'
import { SafeAreaView } from 'react-native-safe-area-context';
import PopUp from '../Screens/PopUp';
import { MyContext } from '../backend/AppProvider';
import IconFan from 'react-native-vector-icons/Fontisto';

export default function Dashboard({ navigation, fetchQuestion, setQuestionAmount }) {

    const { topic, setTopic } = useContext(MyContext);


    const [isModalVisible, setModalVisible] = useState(false);
    const handleSetQuestions = (questionNo: number) => {
        // Handle logic here
        setQuestionAmount(questionNo)
        setModalVisible(false);
    };




    const goToQuiz = (category: string) => {
        fetchQuestion(category);
        navigation.navigate('Quiz');
    }


    return (
        <SafeAreaView style={styles.root}>
            <StatusBar hidden={false} backgroundColor='black' style='light' />

            <ScrollView style={styles.background_Dashboard}>

                <View style={{
                    flexDirection: 'column', justifyContent: 'center', alignItems: 'center'
                }}>
                    <View style={styles.searchView}>
                        <Text style={{ fontSize: 30, color: 'black', fontWeight:900}}>Quizit</Text>
                        <IconFan name='fire' size={30} style={{color:'#00b4d8'}}></IconFan>

                    </View>

                    <View style={styles.boxContainer}>

                        <TouchableOpacity style={{ width: '100%', flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={() => goToQuiz(topic.database_cloud)} >
                            <ImageBackground source={topic.database_cloud === 'Database' ? Fdatabase : Fhardware} resizeMode="cover" imageStyle={{ borderRadius: 20, width: '100%' }} style={styles.boxes}>
                                <Text style={styles.textStyle}>{topic.database_cloud}</Text>
                            </ImageBackground>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ width: '100%', flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={() => goToQuiz(topic.programming_dsa)}>
                            <ImageBackground source={topic.programming_dsa === 'Programming' ? Fprogramming : Fdsa} resizeMode="cover" imageStyle={{ borderRadius: 20, width: '100%' }} style={styles.boxes}>
                                <Text style={styles.textStyle}>{topic.programming_dsa}</Text>
                            </ImageBackground>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ width: '100%', flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={() => goToQuiz(topic.networking_softEng)}>
                            <ImageBackground source={topic.networking_softEng === 'Networking' ? Fnetwork : FsoftwareEngineering} resizeMode="cover" imageStyle={{ borderRadius: 20, width: '100%' }} style={styles.boxes}>
                                <Text style={styles.textStyle}>{topic.networking_softEng}</Text>
                            </ImageBackground>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ width: '100%', flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={() => goToQuiz(topic.os_aiMl)}>
                            <ImageBackground source={topic.os_aiMl === 'Operating System' ? FoperatingSystem : FaiML} resizeMode="cover" imageStyle={{ borderRadius: 20, width: '100%' }} style={styles.boxes}>
                                <Text style={styles.textStyle}>{topic.os_aiMl}</Text>
                            </ImageBackground>
                        </TouchableOpacity>

                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '100%', height: 150, gap: 8, marginTop: 12 }}>
                        <TouchableOpacity style={{ width: '45%', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }} onPress={() => setModalVisible(true)}>
                            {/* <ImageBackground source={pixels} resizeMode='cover' imageStyle={{ height: 150, width: '100%', borderRadius: 20 }} style={{ height: 150, width: '100%', justifyContent: 'center',alignItems:'center' }}>
                            <Text style={[styles.textStyle2,{fontSize:18,fontWeight:'900'}]}>Set Question</Text>
                        </ImageBackground> */}
                            <View style={{ height: 150, width: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffa200', borderRadius: 20 }}>
                                <IconAnt name='select1' size={60}></IconAnt>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ width: '45%', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }} onPress={() => navigation.navigate('History')}>
                            {/* <ImageBackground source={clock} resizeMode='cover' imageStyle={{ height: 150, width: '100%', borderRadius: 20, }} style={{ height: 150, width: '100%', justifyContent: 'center',alignItems:'center' }}>

                            <Text style={[styles.textStyle2,{fontSize:18,fontWeight:'900'}]}></Text>

                        </ImageBackground> */}
                            <View style={{ height: 150, width: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#2c0735', borderRadius: 20 }}>
                                <IconEntypo name='back-in-time' size={60} style={{ color: 'white' }}></IconEntypo>
                            </View>
                        </TouchableOpacity>
                    </View>


                    <PopUp
                        isVisible={isModalVisible}
                        handleSetQuestions={handleSetQuestions}
                        setModalVisible={setModalVisible}
                        setTopic={setTopic}
                    />


                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

