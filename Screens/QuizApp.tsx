// import React, { useEffect, useState } from "react";
import { View, Text, Alert, TouchableOpacity, StyleSheet, ImageBackground } from "react-native";
import { StatusBar } from "expo-status-bar";
import { styles } from '../style';


const QuizApp = ({ question, options, handleOptionClick, counter,isOver, fetchQuestion }) => {

    return (
        <View style={{ flex: 1 }}>
            <StatusBar hidden={false} backgroundColor='black' style='light' />
            <View style={[styles.background, { alignItems: 'center', justifyContent: 'space-evenly' }]}>

                <Text style={{ color: 'white', fontSize: 25, fontWeight: '900',position:'absolute',top:'10%'}}>Question {counter + 1}/10</Text>
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


