import { View, Text, TouchableOpacity, TouchableWithoutFeedback, TextInput ,Alert} from 'react-native'
import React,{useContext} from 'react'
import { styles } from '../style'
import { StatusBar } from 'expo-status-bar'
import IconF from 'react-native-vector-icons/Feather'
import { SafeAreaView } from 'react-native-safe-area-context'
import IconF6 from 'react-native-vector-icons/FontAwesome6'
import {useEffect } from 'react';
import { getFromFirebase, updateToFirebase,saveLocally } from '../db'
import { MyContext } from '../AppProvider'






const AccountEdit = ({navigation}) => {

const {userData,setUserData}=useContext(MyContext);

  useEffect(() => {

 async function fetchUserData() {
  try {
    const userDoc = await getFromFirebase();
    const data = userDoc.data();
    if (data) {
      setUserData((data: { fullName: any })=>({...data,fullName:data.fullName }));
    }
  } catch (error) {
    Alert.alert("Error", "Something went wrong.");
  }
 }
    fetchUserData(); // Call the function to fetch data
  }, []);

  const updateUserData=async()=>{
    await updateToFirebase({fullName:userData.fullName})
    await saveLocally('userData',userData);
    navigation.navigate('Setting')
  }

    const handleBack=()=>{
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
                    <Text style={{ fontSize: 30, fontWeight: 'bold', marginRight: '8%', color: 'white' }}>Edit Info</Text>
                    <View></View>
                </View>

                {/* Account box */}
                <View style={[styles.accountBox,{gap:10}]}>
                    {/* Account Box Sections */}
                    <TouchableWithoutFeedback >
                        <View style={[styles.accountBoxSections,{borderWidth:1,borderRadius:10,justifyContent:'space-evenly'}]}>
                          {/* Dictionary ko value set garda yesstie oder ma hunu parxa */}
                            <TextInput value={userData.fullName}  onChangeText={(newName)=>{setUserData(()=>({...userData,fullName:newName}))}} placeholderTextColor='white' style={[styles.sectionText,{paddingLeft:10,width:'80%'}]}></TextInput>
                            <IconF6 name='pen-to-square' size={30} style={{color:'white'}}></IconF6>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={()=>{
                      Alert.alert('Go Back to Profile', 'tap and hold profile picture to change');
                    }}>
                        <View style={[styles.accountBoxSections,{borderWidth:1,borderRadius:10,justifyContent:'space-evenly'}]}>
                          {/* Dictionary ko value set garda yesstie oder ma hunu parxa */}
                            <Text style={[styles.sectionText,{paddingLeft:10,width:'80%'}]}>Choose profile picture</Text>
                            <IconF6 name='pen-to-square' size={30} style={{color:'white'}}></IconF6>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableOpacity style={styles.outlineButton} onPress={updateUserData}>
                    <Text style={styles.outlineButtonText}>Save</Text>
                   </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default AccountEdit


