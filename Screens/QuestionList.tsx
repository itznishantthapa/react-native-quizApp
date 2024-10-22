import React, { useContext, useState, useRef } from "react";
import { View, Text, ScrollView, Animated, Easing } from "react-native";
import { StatusBar } from "expo-status-bar";
import { MyContext } from '../backend/AppProvider';  // Import context
import { styles } from '../style/style';
import { SafeAreaView } from 'react-native-safe-area-context';
import IconM from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from "react-native-gesture-handler";
import { useRoute } from '@react-navigation/native';
import { deleteLocalData } from "../backend/localStorage";

const QuestionList = () => {
  const route = useRoute();
  const { category } = route.params as { category: string }; // Type the params for TypeScript

  const { QuestionAnswer, setQuestionAnswer } = useContext(MyContext);
  const [questions, setQuestions] = useState(QuestionAnswer);

  // Animated values for each question
  const animatedValues = useRef(questions.map(() => new Animated.Value(1))).current; // Array of animated values (opacity/slide)

  const handleDeleteAll = async () => {
    await deleteLocalData(category);
    // Trigger the animation for all items
    animateDeleteAll();
  };


  // Function to animate each question sliding and disappearing
  const animateDeleteAll = () => {
    const animations = questions.map((_, index) =>
      Animated.timing(animatedValues[index], {
        toValue: 0, // Move the opacity/position to 0 (disappear)
        duration: 500, // Animation duration in milliseconds
        easing: Easing.inOut(Easing.ease), // Smooth easing for natural effect
        useNativeDriver: true, // Use native driver for better performance
      })
    );

    // Start the animations for all questions
    Animated.stagger(100, animations).start(() => {
      // After the animation, clear the data from the state
      setQuestionAnswer([]);
      setQuestions([]);
    });
  };

  return (
    <SafeAreaView style={styles.background}>
      <StatusBar hidden={false} backgroundColor="black" style="light" />
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' }}>
          {
            questions.length?(
              <View style={{ flexDirection: 'row', width: '90%', justifyContent: 'space-between' }}>
              <View></View>
              <Text style={{ color: 'white', fontSize: 20 }}>Solved Questions</Text>
              <TouchableOpacity onLongPress={handleDeleteAll} >
              <IconM name="delete-sweep" size={30} style={{ color: 'white' }} />
            </TouchableOpacity>
            </View>
            ):( <View style={{ flexDirection:'column', alignItems: 'center', justifyContent: 'center',height:'100%' }}><IconM name="delete-circle-outline" size={100} style={{ color: 'white' }} />
            <Text style={{color:'white',fontSize:30}}>No questions to display.</Text>
            </View> )
          }

        <ScrollView showsVerticalScrollIndicator={false}>
          {questions.map((answer, index) => (
            <Animated.View
              key={index}
              style={{
                transform: [
                  {
                    translateX: animatedValues[index].interpolate({
                      inputRange: [0, 1],
                      outputRange: [300, 0], // Slide from right to left
                    }),
                  },
                ],
                opacity: animatedValues[index], // Fade out
                backgroundColor: answer.selectedOption === answer.correctAns ? '#80ed99' : '#ffafcc',
                padding: 15,
                marginTop: 20,
                borderRadius: 20,
              }}
            >
              <Text>{index + 1}. {answer.question}</Text>
              <View style={{ flexDirection: 'column', marginTop: 6, gap: 3 }}>
                <Text>Correct answer: {answer.correctAns}</Text>
                <Text>Your answer: {answer.selectedOption}</Text>
              </View>
            </Animated.View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default QuestionList;
