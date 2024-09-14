// AppContext.js
import React, { useState, createContext } from 'react';
import { saveLocalData,getLocalData } from './localStorage';

const MyContext=createContext()

export const AppProvider = ({ children }) => {
  // State to manage user data
  const [userData, setUserData] = useState({ fullName: '',email:'' });




   // Function to add a new answer to the quizData
  async function addQuizAnswer(question, selectedOption, correctAns) {
    try{
      const existingData =await getLocalData('quizData');
      let questionAnswersArray = [];
      if(existingData){
          questionAnswersArray=JSON.parse(existingData);
      }
  
      const updateQuestionAnswersArray = [...questionAnswersArray, { question, selectedOption, correctAns }];
       saveLocalData('quizData',updateQuestionAnswersArray);
    }catch(error){
         console.log('Error happened.')
         console.error(error)

    }

}

   

  return (
    <MyContext.Provider value={{ userData, setUserData, addQuizAnswer}}>
      {children}
    </MyContext.Provider>
  );
};

export {MyContext};
