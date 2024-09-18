import { View, Text, TouchableOpacity, Modal, Alert } from 'react-native'
import React from 'react'
import { styles } from '../style'
import { StatusBar } from 'expo-status-bar'
import IconF from 'react-native-vector-icons/Feather'
import IconAnt from 'react-native-vector-icons/AntDesign'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useState, useContext } from 'react'
import { MyContext } from '../AppProvider'
import { deleteUserAccount } from '../db'
import { TextInput } from 'react-native-gesture-handler'

const DeleteConfirmationModal = ({ isVisible, onClose, onConfirm }) => {



  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Confirm Deletion</Text>
          <Text style={styles.modalMessage}>
            Are you sure you want to delete this account?
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onConfirm} style={styles.deleteButton}>
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};


const AccountDeletion = ({ navigation }) => {
  const { userData } = useContext(MyContext);
  const [isModalVisible, setModalVisible] = useState(false);
  const [userPassword, setUserPass] = useState(null);

  const handleDelete = async() => {
    if (userPassword) {
     await deleteUserAccount(userPassword);
      // Handle the deletion logic here
      setModalVisible(false);
      navigation.navigate('Profile');
   
    }else{
      Alert.alert('Error','Please enter your password to delete the account');
    }

  };


  const handleBack = () => {
    navigation.navigate('Account');
  }
  return (
    <SafeAreaView style={styles.background}>
      <StatusBar hidden={false} backgroundColor='' style='light' />
      <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}>

        {/* setting box */}
        <View style={styles.settingBox}>
          <TouchableOpacity onPress={handleBack}>
            <IconF name='arrow-left' size={50} style={{ color: 'white', marginLeft: 5 }}></IconF>
          </TouchableOpacity>
          <Text style={{ fontSize: 30, fontWeight: 'bold', marginRight: '8%', color: 'white' }}>Account Deletion</Text>
          <View></View>
        </View>

        <View style={styles.deleteContainer}>
          <Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold', marginRight: '28%' }}>Hi {userData.fullName}, sorry to see you go !</Text>
          <View style={styles.deleteInfoBox}>
            <Text style={{ textDecorationLine: 'underline' }}>After deletion of your account</Text>
            <View style={styles.infoPointContainer}>
              <View style={styles.infoPoints}>
                <IconAnt name='arrowright'></IconAnt>
                <Text>You will lose your progress.</Text>
              </View>
              <View style={styles.infoPoints}>
                <IconAnt name='arrowright'></IconAnt>
                <Text>Friend connections will be lost.</Text>
              </View>
              <View style={styles.infoPoints}>
                <IconAnt name='arrowright'></IconAnt>
                <Text>Account cannot be recovered.</Text>
              </View>
              <TextInput style={{ borderWidth: 1, borderColor: 'grey', color: 'grey', width: '80%', padding: 5, margin: 5,borderRadius:5 }} placeholder='Enter your password' placeholderTextColor='grey' onChangeText={(text) => {
                setUserPass(text)
              }}></TextInput>
            </View>
          </View>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Text style={{ color: 'white', textDecorationLine: 'underline', fontSize: 20 }}>Delete Account</Text>
          </TouchableOpacity>
        </View>


        <DeleteConfirmationModal
          isVisible={isModalVisible}
          onClose={() => setModalVisible(false)}
          onConfirm={handleDelete}
        />





      </View>
    </SafeAreaView>
  )
}

export default AccountDeletion


