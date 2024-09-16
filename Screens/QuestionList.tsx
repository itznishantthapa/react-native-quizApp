import React, { useContext,useEffect,useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { MyContext } from '../AppProvider';  // Import context
import { styles } from '../style';
import { SafeAreaView } from 'react-native-safe-area-context';
import IconIon from 'react-native-vector-icons/Ionicons'
import { TouchableOpacity } from "react-native-gesture-handler";



const QuestionList = () => {

const {QuestionAnswer}=useContext(MyContext);

const handleThreeLines=()=>{
  
}

  return (
    <SafeAreaView style={styles.background}>
      <StatusBar hidden={false} backgroundColor='black' style='light' />
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' }}>
        <View style={{flexDirection:'row',width:'90%',justifyContent:'space-between'}}>
          <View></View>
        <Text style={{ color: 'white', fontSize: 20 }}>Solved Questions</Text>
        <TouchableOpacity onPress={handleThreeLines}>
        <IconIon name='reorder-three' size={30} style={{color:'white',}}></IconIon>
        </TouchableOpacity>
        </View>
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
