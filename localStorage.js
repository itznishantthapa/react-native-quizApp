import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveLocalData=async(key,value)=>{

    const jsonValue=JSON.stringify(value);  //converted the value into JSON string.
    await AsyncStorage.setItem(key,jsonValue);
    console.log('Data saved locally.')
}

export const getLocalData=async(key)=>{
        const savedData=await AsyncStorage.getItem(key);
        console.log('Data get locally.')
        return savedData;
}