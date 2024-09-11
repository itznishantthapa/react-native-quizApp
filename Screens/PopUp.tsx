import { View, Text, TouchableOpacity,Modal,ImageBackground } from 'react-native'
import React from 'react'
import { styles } from '../style'
import wrong from '../assets/wrong.png'



const PopUp = ({ isVisible, handleSetQuestions,setModalVisible }) => {
    return (
      <Modal
        transparent={true}
        animationType="fade"
        visible={isVisible}
      >


        <View style={styles.modalOverlay}>
          <View style={[styles.modalContainer,{width:'80%',height:150}]}>
            <TouchableOpacity style={{height:30,width:30,position:'absolute',left:'100%',top:10,borderWidth:3,borderColor:'red',borderRadius:50}} onPress={()=>setModalVisible(false)}>
            <ImageBackground source={wrong}  style={{height:'100%',width:'100%'}}></ImageBackground>
            </TouchableOpacity>
            <Text style={[styles.modalTitle,{textDecorationLine:'underline'}]}>Set questions to attempt.</Text>
             <View style={{width:'100%',flexDirection:'row',justifyContent:'space-evenly',alignItems:'center'}}>
            <TouchableOpacity style={styles.questionsAttempt} onPress={()=>handleSetQuestions(10)}><Text style={{fontWeight:'bold',fontSize:22,color:'white'}}>10</Text></TouchableOpacity>
            <TouchableOpacity style={styles.questionsAttempt} onPress={()=>handleSetQuestions(20)}><Text style={{fontWeight:'bold',fontSize:22,color:'white'}}>20</Text></TouchableOpacity>
            <TouchableOpacity style={styles.questionsAttempt} onPress={()=>handleSetQuestions(30)}><Text style={{fontWeight:'bold',fontSize:22,color:'white'}}>30</Text></TouchableOpacity>
            <TouchableOpacity style={styles.questionsAttempt} onPress={()=>handleSetQuestions(50)}><Text style={{fontWeight:'bold',fontSize:22,color:'white'}}>50</Text></TouchableOpacity>
            <TouchableOpacity style={styles.questionsAttempt} onPress={()=>handleSetQuestions(100)}><Text style={{fontWeight:'bold',fontSize:22,color:'white'}}>100</Text></TouchableOpacity>

             </View>
          </View>
        </View>



      </Modal>
    );
  };
  

export default PopUp;


