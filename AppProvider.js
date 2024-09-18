import React, { useState, createContext, useEffect } from 'react';
import { saveLocalData, getLocalData } from './localStorage';
import { auth,firestore } from './firebaseConfig';
import { getFromFirebase } from './db';
import { Alert } from 'react-native';
import { getDocs, collection } from 'firebase/firestore'; 


// Create the context
const MyContext = createContext();

// Context Provider component
export const AppProvider = ({ children }) => {
  // State to manage user data
  const [userData, setUserData] = useState({ fullName: '', email: '' });
  const [QuestionAnswer, setQuestionAnswer] = useState([]);  // State for quiz data
  const [imageUri, setImageUri] = useState(null);  // State for profile image URI
  const [signedUpUsers, setsignedUpUsers] = useState([]);  // State for signed-up users
  const [topic, setTopic] = useState({database_cloud:'Database',programming_dsa:'Programming',networking_softEng:'Networking',os_aiMl:'Operating System'});




  // Function to add a new answer to the quizData
  const addQuizAnswer = async (question, selectedOption, correctAns, categories) => {
    try {
      const existingData = await getLocalData(categories);  // Fetch data from local storage
      let questionAnswersArray = existingData ? JSON.parse(existingData) : [];
      
      // Prepend the new answer to the array to ensure latest answers appear first
      const updateQuestionAnswersArray = [{ question, selectedOption, correctAns }, ...questionAnswersArray];
      saveLocalData(categories, updateQuestionAnswersArray);  // Save updated array to local storage

      console.log('Data saved to category:', categories);
    } catch (error) {
      console.error('Error saving quiz data:', error);
    }
  };

  // Function to fetch quiz data from local storage
  const getQuizData = async (categories) => {
    try {
      const data = await getLocalData(categories);  // Fetch data from local storage
      setQuestionAnswer(data ? JSON.parse(data) : []);  // Update state
    } catch (error) {
      console.error('Error fetching quiz data:', error);
    }
  };

  // Function to fetch user data from Firestore
  const fetchUserData = async () => {
    try {
      const userDoc = await getFromFirebase();  // Fetch user document from Firestore
      const data = userDoc.data();  // Extract user data
      if (data) {
        setUserData({ fullName: data.fullName, email: data.email });  // Set user data
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong fetching user data.");
    }
  };


  // Function to fetch user's profile image from Firestore
  const fetchProfileImage = async () => {
    try {
      const userAllData = await getFromFirebase();  // Fetch complete user data
      const userAllDataInObj = userAllData.data();  // Extract user data object
      if (userAllDataInObj && userAllDataInObj.profile) {
        setImageUri(userAllDataInObj.profile);  // Set profile image URI
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong fetching profile image.");
    }
  };

  // Function to fetch list of signed-up users from Firestore
  const fetchUsers = async () => {
    try {
      const querySnapshot = await getDocs(collection(firestore, 'users'));  // Fetch users collection
      
      // Map users data and include their ID
      const usersData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      // Sort users by gameInfo.points in descending order
      const sortedUsers = usersData.sort((a, b) => {
        const pointsA = a.gameInfo?.points || 0;
        const pointsB = b.gameInfo?.points || 0;
        return pointsB - pointsA;
      });

      setsignedUpUsers(sortedUsers);  // Update signed-up users state
    } catch (error) {
      Alert.alert("Error", "Something went wrong fetching users.");
    }
  };

  // Listen to auth state changes to fetch user-related data
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        fetchUserData();
        fetchProfileImage();
        fetchUsers();  // Fetch signed-up users when a user is authenticated
      } else {
        setUserData({ fullName: '', email: '' });  // Reset user data on logout
        setImageUri(null); 
      }
    });

    // Cleanup subscription on component unmount
    return () => unsubscribe();
  }, []);

  return (
    <MyContext.Provider value={{
      userData, setUserData, addQuizAnswer, getQuizData, 
      QuestionAnswer, imageUri, setImageUri, 
      signedUpUsers,
      topic,setTopic,setQuestionAnswer
    }}>
      {children}
    </MyContext.Provider>
  );
};

// Exporting context for use in other components
export { MyContext };
