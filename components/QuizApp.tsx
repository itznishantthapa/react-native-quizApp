import React, { useEffect, useState } from "react";
import { View, Text, Button, Alert, TouchableOpacity, StyleSheet, ImageBackground } from "react-native";
import neon2 from '../assets/neon2.jpg';
import { StatusBar } from "expo-status-bar";

const QuizApp = () => {
    const [data, setData] = useState(null);
    const [counter, setCounter] = useState(0);
    const [playerPoints, setPlayerPoints] = useState(0);
    const [question, setQuestion] = useState(null);
    const [options, setOptions] = useState([]);

    const handleOptionClick = (choosed) => {
        if (counter < data.length - 1) {
            setCounter(counter + 1);
        }
        if (choosed === data[counter].correctAnswer) {
            setPlayerPoints(playerPoints + 1);
        }
    };

    useEffect(() => {
        if (data && counter === data.length - 1) {
            Alert.alert("Quiz Complete", `Your score is ${playerPoints}`);
        }
    }, [playerPoints, counter]);

    useEffect(() => {
        fetch("https://the-trivia-api.com/v2/questions")
            .then((response) => response.json())
            .then((rawData) => {
                setData(rawData);
                changeQuestion(rawData, counter);
            });
    }, []);

    useEffect(() => {
        if (data) {
            changeQuestion(data, counter);
        }
    }, [counter]);

    const changeQuestion = (data, counter) => {
        const options = [
            ...data[counter].incorrectAnswers,
            data[counter].correctAnswer,
        ];

        // Shuffle the options array
        for (let i = options.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [options[i], options[j]] = [options[j], options[i]];
        }

        setQuestion(data[counter].question.text);
        setOptions(options);
    };

    return (
        <View style={{flex:1}}>
          <StatusBar style={'light'} hidden={false}/>
            <ImageBackground source={neon2} style={styles.background}>
                <View style={styles.container}>
 
                    <Text style={styles.question}>{question}</Text>
                    <View style={styles.optionsContainer}>
                        {options.map((option, index) => (
                            <TouchableOpacity
                                key={index}
                                style={styles.optionButton}
                                onPress={() => handleOptionClick(option)}
                            >
                                <Text style={styles.optionText}>{option}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </ImageBackground>
        </View>


    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        // alignItems:'center'
    },
    container: {
        flexDirection: 'column',
        justifyContent: "center",
        alignItems: "center",
    },
    question: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: "center",
        paddingHorizontal: 20,
        color: '#edf6f9',
        fontWeight: 'bold'
    },
    optionsContainer: {
        width: "100%",
        paddingHorizontal: 20,
    },
    optionButton: {
        backgroundColor: "#5a189a",
        padding: 15,
        marginVertical: 10,
        borderRadius: 10,
        alignItems: "center",
    },
    optionText: {
        color: "#fff",
        fontSize: 18,
    },
});

export default QuizApp;
