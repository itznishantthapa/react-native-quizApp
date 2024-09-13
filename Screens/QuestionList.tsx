import React, { useContext,useEffect,useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { MyContext } from '../AppProvider';  // Import context
import { styles } from '../style';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getLocalData,deleteLocalData } from "../localStorage";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";



const QuestionList = () => {
  const [QuestionAnswer, setQuestionAnswer] = useState([]);



  useEffect(() => {
    
         const getQuizData =  async() => {
            const data =await  getLocalData('quizData');
            const newData = JSON.parse(data);
            console.log('This is the data getLocally-------------------->',data);
            if(data){
                setQuestionAnswer(newData);
            }else{
                setQuestionAnswer([]);
            }
         }
        getQuizData();
  }, [])
  


  return (
    <SafeAreaView style={styles.background}>
      <StatusBar hidden={false} backgroundColor='black' style='light' />
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' }}>
        <Text style={{ color: 'white', fontSize: 20 }}>Solved Questions</Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          {QuestionAnswer.map((answer, index) => (
            <View key={index} style={{   backgroundColor: answer.selectedOption === answer.correctAns ? '#92e6a7' : '#ffccd5', padding: 15, marginTop: 20, borderRadius: 20 }}>
              <Text>{index + 1}. {answer.question}</Text>
              <View style={{ flexDirection: 'column', marginTop: 6, gap: 3 }}>
                <Text>Correct answer: {answer.correctAns}</Text>
                <Text>Your answer: {answer.selectedOption}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default QuestionList;
