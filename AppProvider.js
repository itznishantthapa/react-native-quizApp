// AppContext.js
import React, { useState, createContext } from 'react';
import { saveLocalData,getLocalData } from './localStorage';

const MyContext=createContext()

export const AppProvider = ({ children }) => {
  // State to manage user data
  const [userData, setUserData] = useState({ fullName: '',email:'' });
  const [QuestionAnswer, setQuestionAnswer] = useState([]);



   // Function to add a new answer to the quizData
  async function addQuizAnswer(question, selectedOption, correctAns,categories) {
    try{
      const existingData =await getLocalData(categories);
      let questionAnswersArray = [];
      if(existingData){
          questionAnswersArray=JSON.parse(existingData);
      }
  
      const updateQuestionAnswersArray = [...questionAnswersArray, { question, selectedOption, correctAns }];
       saveLocalData(categories,updateQuestionAnswersArray);
       console.log('Data saved to ------------->',categories)
    }catch(error){
         console.log('Error happened.')
         console.error(error)

    }

}

const getQuizData =  async(categories) => {
  const data =await  getLocalData(categories);
  const newData = JSON.parse(data);

  if(data){
      setQuestionAnswer(newData);
  }else{
      setQuestionAnswer([]);
  }
}

   

  return (
    <MyContext.Provider value={{ userData, setUserData, addQuizAnswer,getQuizData,QuestionAnswer}}>
      {children}
    </MyContext.Provider>
  );
};

export {MyContext};
