import { ScrollView, StyleSheet, Text, TextInput, View, ImageBackground, Touchable, TouchableOpacity } from 'react-native'
import React,{useState} from 'react'
import { StatusBar } from 'expo-status-bar'
import Icon from 'react-native-vector-icons/FontAwesome';
import cosmos from '../assets/cosmos.jpg'
import lady from '../assets/lady.jpeg'
import console from '../assets/console.jpg'
import hills from '../assets/hills.png'
import pixels from '../assets/pixels.jpeg'
import clock from '../assets/clock.jpg'
import { styles } from '../style'
import { useRef } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import PopUp from '../Screens/PopUp';

export default function Dashboard({ navigation, fetchQuestion,setQuestionAmount }) {

    const [isModalVisible, setModalVisible] = useState(false);
    const handleSetQuestions = (questionNo:number) => {
        // Handle logic here
        setQuestionAmount(questionNo)
        setModalVisible(false);
      };
    

    const textInputRef = useRef(null);


    const goToQuiz = (category: string) => {
           fetchQuestion(category);        
        navigation.navigate('Quiz'); // Pass category as a parameter
    }

    const handleSearch = () => {
        textInputRef.current.focus();
    }

    return (
        <SafeAreaView style={styles.root}>
            <StatusBar hidden={false} backgroundColor='black' style='light' />
            <ScrollView style={styles.background_Dashboard}>

                <View style={{
                    flexDirection: 'column', justifyContent: 'center', alignItems: 'center'
                }}>

                    <View style={styles.searchView}>
                        <TouchableOpacity onPress={handleSearch}>
                            <Icon name='search' style={{ color: '#495057' }} size={30}></Icon>
                        </TouchableOpacity>
                        <TextInput ref={textInputRef} style={{ fontSize: 20, fontWeight: 'bold', width: '80%' }} placeholder='username' placeholderTextColor='#495057'></TextInput>
                    </View>

                    <View style={styles.boxContainer}>

                        <TouchableOpacity style={{ width: '100%', flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={() => goToQuiz('database')} >
                            <ImageBackground source={cosmos} resizeMode="cover" imageStyle={{ borderRadius: 20, width: '100%' }} style={styles.boxes}>
                                <Text style={styles.textStyle}>Database</Text>
                            </ImageBackground>
                        </TouchableOpacity>

                        <TouchableOpacity   style={{ width: '100%', flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={() => goToQuiz('gaming')}>
                        <ImageBackground source={console} resizeMode="cover" imageStyle={{ borderRadius: 20, width: '100%' }} style={styles.boxes}>
                            <Text style={styles.textStyle}>Gaming</Text>
                        </ImageBackground>
                        </TouchableOpacity>

                        <TouchableOpacity  style={{ width: '100%', flex: 1, justifyContent: 'center', alignItems: 'center' }}onPress={() => goToQuiz('science')}>
                        <ImageBackground source={lady} resizeMode="cover" imageStyle={{ borderRadius: 20, width: '100%' }} style={styles.boxes}>
                            <Text style={styles.textStyle}>Science</Text>
                        </ImageBackground>
                        </TouchableOpacity>
                        
                        <TouchableOpacity  style={{ width: '100%', flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={() => goToQuiz('geography')}>
                        <ImageBackground source={hills} resizeMode="cover" imageStyle={{ borderRadius: 20, width: '100%' }} style={styles.boxes}>
                            <Text style={styles.textStyle}>Geography</Text>
                        </ImageBackground>
                        </TouchableOpacity>

                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '100%', height: 150, gap: 8, marginTop: 12 }}>
                        <TouchableOpacity style={{width:'45%',flexDirection:'column',justifyContent:'center',alignItems:'center'}} onPress={()=>setModalVisible(true)}>
                        <ImageBackground source={pixels} resizeMode='cover' imageStyle={{ height: 150, width: '100%', borderRadius: 20 }} style={{ height: 150, width: '100%', justifyContent: 'center',alignItems:'center' }}>
                            <Text style={[styles.textStyle2,{fontSize:18,fontWeight:'900'}]}>Set Question</Text>
                        </ImageBackground>
                        </TouchableOpacity>

                        <TouchableOpacity style={{width:'45%',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                        <ImageBackground source={clock} resizeMode='cover' imageStyle={{ height: 150, width: '100%', borderRadius: 20, }} style={{ height: 150, width: '100%', justifyContent: 'center',alignItems:'center' }}>

                            <Text style={[styles.textStyle2,{fontSize:18,fontWeight:'900'}]}></Text>

                        </ImageBackground>
                            </TouchableOpacity>
                    </View>


                <PopUp
                        isVisible={isModalVisible}

                        handleSetQuestions={handleSetQuestions} 
                />


                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

