// import React, { useEffect, useState } from "react";
import { View, Text, Alert, TouchableOpacity, StyleSheet, ImageBackground } from "react-native";
import neon2 from '../assets/neon2.jpg';
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
                            style={style_this.outlineButton}
                            onPress={fetchQuestion}
                        >
                            <Text style={style_this.outlineButtonText}>Restart</Text>
                        </TouchableOpacity>
                    )}
                    </View>

                    
            </View>
        </View>


    );
};


export default QuizApp;


const style_this = StyleSheet.create({
    outlineButton: {
        borderColor: '#ffffff', // White outline
        borderWidth: 2, // Thickness of the outline
        borderRadius: 8, // Rounded corners
        paddingVertical: 10, // Vertical padding for the button
        paddingHorizontal: 20, // Horizontal padding for the button
        alignItems: 'center', // Center the text inside the button
    },
    outlineButtonText: {
        color: '#ffffff', // White text
        fontSize: 16, // Font size for the text
        fontWeight: 'bold', // Make the text bold
    },
});