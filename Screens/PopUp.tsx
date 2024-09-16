import { View, Text, TouchableOpacity, Modal, ImageBackground, TouchableWithoutFeedback } from 'react-native';
import React, { useState } from 'react';
import { styles } from '../style';

const PopUp = ({ isVisible, handleSetQuestions, setModalVisible,setTopic }) => {
  // State to track active question and topics
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [activeTopics, setActiveTopics] = useState({
    database: true,
    hardware: false,
    programming: true,
    dsa: false,
    networking: true,
    softwareEngineering: false,
    operatingSystem: true,
    aiML: false
  });

  // Function to handle setting the selected question number
  const handleQuestionSelect = (num) => {
    setSelectedQuestion(num);
    handleSetQuestions(num);
  };

  // Function to handle selecting a topic
  const handleTopicSelect = (topic: string) => {
    setTopicInDashboard(topic);
    setActiveTopics((prevState) => {
      let newState = { ...prevState };

      // Logic for pairs: When one is selected, the other gets deselected
      switch (topic) {
        case 'database':
          newState.database = true;
          newState.hardware = false;
          break;
        case 'hardware':
          newState.hardware = true;
          newState.database = false;
          break;
        case 'programming':
          newState.programming = true;
          newState.dsa = false;
          break;
        case 'dsa':
          newState.dsa = true;
          newState.programming = false;
          break;
        case 'networking':
          newState.networking = true;
          newState.softwareEngineering = false;
          break;
        case 'softwareEngineering':
          newState.softwareEngineering = true;
          newState.networking = false;
          break;
        case 'operatingSystem':
          newState.operatingSystem = true;
          newState.aiML = false;
          break;
        case 'aiML':
          newState.aiML = true;
          newState.operatingSystem = false;
          break;
      }
      return newState;
    });
  };


  const setTopicInDashboard =(topic)=>{
    switch (topic) {
      case 'database':
        setTopic(prevData=>({...prevData,database_cloud:'Database'}));
        break;
      case 'hardware':
        setTopic(prevData=>({...prevData,database_cloud:'Hardware'}));
        break;
      case 'programming':
        setTopic(prevData=>({...prevData,programming_dsa:'Programming'}));
        break;
      case 'dsa':
        setTopic(prevData=>({...prevData,programming_dsa:'DSA'}));
        break;
      case 'networking':
        setTopic(prevData=>({...prevData,networking_softEng:'Networking'}));
        break;
      case 'softwareEngineering':
        setTopic(prevData=>({...prevData,networking_softEng:'Software Engineering'}));
        break;
      case 'operatingSystem':
        setTopic(prevData=>({...prevData,os_aiMl:'Operating System'}));
        break;
      case 'aiML':
        setTopic(prevData=>({...prevData,os_aiMl:'AI & ML'}));
        break;
    }
  }

  return (
    <Modal transparent={true} animationType="fade" visible={isVisible}>
      <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContainer, { width: '80%', height: 'auto' }]}>
            <Text style={[styles.modalTitle, { textDecorationLine: 'underline' }]}>
              Set questions to attempt.
            </Text>

            {/* Question number selection */}
            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
              {[10, 20, 30, 50, 100].map((num) => (
                <TouchableOpacity
                  key={num}
                  style={[
                    styles.questionsAttempt,
                    selectedQuestion === num && { backgroundColor: 'green' } 
                  ]}
                  onPress={() => handleQuestionSelect(num)}
                >
                  <Text style={{ fontWeight: 'bold', fontSize: 22, color: 'white' }}>{num}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Topic selection */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: '90%', marginTop: 20 }}>
              <TouchableWithoutFeedback onPress={() => handleTopicSelect('database')}>
                <Text
                  style={{
                    backgroundColor: activeTopics.database ? 'green' : 'grey',
                    padding: 10,
                    borderRadius: 20,
                    fontWeight: 'bold',
                    color: 'white'
                  }}
                >
                  Database
                </Text>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={() => handleTopicSelect('hardware')}>
                <Text
                  style={{
                    backgroundColor: activeTopics.hardware ? 'green' : 'grey',
                    padding: 10,
                    borderRadius: 20,
                    fontWeight: 'bold',
                    color: 'white'
                  }}
                >
                  Hardware
                </Text>
              </TouchableWithoutFeedback>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: '90%', marginTop: 20 }}>
              <TouchableWithoutFeedback onPress={() => handleTopicSelect('programming')}>
                <Text
                  style={{
                    backgroundColor: activeTopics.programming ? 'green' : 'grey',
                    padding: 10,
                    borderRadius: 20,
                    fontWeight: 'bold',
                    color: 'white'
                  }}
                >
                  Programming
                </Text>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={() => handleTopicSelect('dsa')}>
                <Text
                  style={{
                    backgroundColor: activeTopics.dsa ? 'green' : 'grey',
                    padding: 10,
                    borderRadius: 20,
                    fontWeight: 'bold',
                    color: 'white'
                  }}
                >
                  DSA
                </Text>
              </TouchableWithoutFeedback>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: '90%', marginTop: 20 }}>
              <TouchableWithoutFeedback onPress={() => handleTopicSelect('networking')}>
                <Text
                  style={{
                    backgroundColor: activeTopics.networking ? 'green' : 'grey',
                    padding: 10,
                    borderRadius: 20,
                    fontWeight: 'bold',
                    color: 'white'
                  }}
                >
                  Networking
                </Text>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={() => handleTopicSelect('softwareEngineering')}>
                <Text
                  style={{
                    backgroundColor: activeTopics.softwareEngineering ? 'green' : 'grey',
                    padding: 10,
                    borderRadius: 20,
                    fontWeight: 'bold',
                    color: 'white'
                  }}
                >
                  Software Engineering
                </Text>
              </TouchableWithoutFeedback>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: '90%', marginTop: 20 }}>
              <TouchableWithoutFeedback onPress={() => handleTopicSelect('operatingSystem')}>
                <Text
                  style={{
                    backgroundColor: activeTopics.operatingSystem ? 'green' : 'grey',
                    padding: 10,
                    borderRadius: 20,
                    fontWeight: 'bold',
                    color: 'white'
                  }}
                >
                  Operating System
                </Text>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={() => handleTopicSelect('aiML')}>
                <Text
                  style={{
                    backgroundColor: activeTopics.aiML ? 'green' : 'grey',
                    padding: 10,
                    borderRadius: 20,
                    fontWeight: 'bold',
                    color: 'white'
                  }}
                >
                  AI & ML
                </Text>
              </TouchableWithoutFeedback>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default PopUp;
