// import React, { useEffect, useState } from "react";
import { View, Text, Button, Alert, TouchableOpacity, StyleSheet, ImageBackground } from "react-native";
import { StatusBar } from "expo-status-bar";
import { styles } from '../style';

const Rapid = ({question,options,handleOptionClick}) => {
    return (
        <View style={{flex:1}}>
          <StatusBar style={'light'} hidden={false}/>
            <View  style={styles.background}>


              <View  style={{width:'100%',flexDirection:'row',justifyContent:'center',height:60,marginBottom:50}}>
                  <Text style={{color:'white',fontSize:30,fontWeight:'bold', fontFamily:'monospace',textDecorationLine:'underline'}}>Random Quiz</Text>
              </View>


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
            </View>
        </View>


    );
};


export default Rapid;
