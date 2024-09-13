import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveLocalData=async(key,value)=>{

    const jsonValue=JSON.stringify(value);  
    await AsyncStorage.setItem(key,jsonValue); //No need for asynchronous function implementation while calling.
    console.log('Data saved locally.')
}

export const getLocalData=async(key)=>{
        const savedData=await AsyncStorage.getItem(key);
        console.log('Data get locally.')
        return savedData; //Please retrive this data with JSON.parse(..your data...) asynchronously .
}

// Update data
export const updateLocalData = async (key, newValue) => {
    await saveLocalData(key, newValue); // Simply saving will update the data
    console.log('Data updated locally.');
};

// Delete data
export const deleteLocalData = async (key) => {
    await AsyncStorage.removeItem(key);
    console.log('Data deleted locally.');
};