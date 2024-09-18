import React, { useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import { styles } from '../style';
import { MyContext } from '../AppProvider';  // Import context



const QuizApp = ({ question, options,categories,correctAns, handleOptionClick, counter,isOver, fetchQuestion ,noOfQuestions}) => {
    const { addQuizAnswer } = useContext(MyContext);

    //Whenever i clicked the options, the list of the question and choosed option and correct answer list should be forwarded to the QuestionsList screen so that i can displaed the solve question and answer there.
     const handleClickForDualScreen = (selectedOption: any) => {
        handleOptionClick(selectedOption);
        addQuizAnswer(question, selectedOption, correctAns,categories);
     }


    return (
        <View style={{ flex: 1 }}>
            <StatusBar hidden={false} backgroundColor='black' style='light' />
            <View style={[styles.background, { alignItems: 'center', justifyContent: 'space-evenly' }]}>

                <Text style={{ color: 'white', fontSize: 25, fontWeight: '900',position:'absolute',top:'10%'}}>Question {counter + 1}/{noOfQuestions}</Text>
                <View style={styles.container}>
                    <Text style={styles.question}>{question}</Text>
                    <View style={styles.optionsContainer}>
                        {options.map((option, index) => (
                            <TouchableOpacity
                                key={index}
                                style={styles.optionButton}
                                onPress={() => handleClickForDualScreen(option)}
                            >
                                <Text style={styles.optionText}>{option}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                    <View style={{position:'absolute',top:'80%'}}>
                    {isOver && (
                        <TouchableOpacity
                            style={styles.outlineButton}
                            onPress={fetchQuestion}>
                            <Text style={styles.outlineButtonText}>Restart</Text>
                        </TouchableOpacity>
                    )}
                    </View>   
            </View>
        </View>


    );
};


export default QuizApp;


