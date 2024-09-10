import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import Signup from './Screens/Signup';
import Login from './Screens/Login';
import Creation from './Screens/Creation';
import { Alert } from 'react-native';
import QuizApp from './Screens/QuizApp';
import Tabbar from './Screens/Tabbar';
import { useState, useEffect, createContext } from 'react';
import { enableScreens } from 'react-native-screens';
import Setting from './Screens/Setting';
import Account from './SettingScreens/Account';
import AccountEdit from './SettingScreens/AccountEdit';
import AccountDeletion from './SettingScreens/AccountDeletion';
import About from './SettingScreens/About';
import Notifications from './SettingScreens/Notification';
import Privacy from './SettingScreens/Privacy';
import PrivacyEdit from './SettingScreens/PrivacyEdit';
import HelpSupport from './SettingScreens/helpSupport';

import {storage } from './firebaseConfig';
import { ref, getDownloadURL } from 'firebase/storage';

import UserProfile from './Screens/UserProfile';
import { saveLocalData,getLocalData } from './localStorage';
import { fileUploadToFirebaseStorage, getFromFirebase,updateToFirebase } from './db';
import { AppProvider } from './AppProvider';


enableScreens(false);

const Stack = createStackNavigator();



const MyContext = createContext();




export default function App() {

  const [data, setdata] = useState(null);
  const [counter, setCounter] = useState(0);
  const [playerPoints, setPlayerPoints] = useState(0);
  const [question, setQuestion] = useState(null);
  const [options, setOptions] = useState([]);
  const [isOver, setisOver] = useState(false)
  const [quizData, setquizData] = useState(null)

  const [gameInfo, setgameInfo] = useState(
    {
      worldRank:'NA',
      gamePlayed:0,
      points:0 ,
      totalAttempted:0

    })




  const handleOptionClick = (choosed) => {
    if (!(counter === data.length - 1)) {


      if (choosed === data[counter].correctAnswer) {
        setPlayerPoints(playerPoints + 1);
        setgameInfo((prevGameInfo)=>
          ({...prevGameInfo,   points:prevGameInfo.points+4})) //setting the player points on each correct answer
      
      }

      setCounter(counter + 1);
      setgameInfo((prevGameInfo)=>({...prevGameInfo,   totalAttempted:(prevGameInfo.totalAttempted)+1})) //totalQuestion Solved
     
    } else {
      if(!isOver){

        // Added this else block to handle the case when it's the last question
        if (choosed === data[counter].correctAnswer) {
          setPlayerPoints(playerPoints + 1);
          setgameInfo((prevGameInfo)=>({...prevGameInfo,   points:prevGameInfo.points+4}))
        }
        setgameInfo((prevGameInfo)=>({...prevGameInfo,   totalAttempted:(prevGameInfo.totalAttempted)+1}))   //totalQuestion Solved
        setgameInfo((prevGameInfo)=>({...prevGameInfo,   gamePlayed:(prevGameInfo.gamePlayed)+1}))   //total game completed or played
     
        Alert.alert("Quiz Complete", `Your score is ${playerPoints}`);
        setisOver(true);
      }
    }
  };

  useEffect(() => {
    if (data && counter === data.length - 1 && question === null) {
      Alert.alert("Quiz Complete", `Your score is ${playerPoints}`);
      setisOver(true);
    }
  }, [playerPoints, counter]);



  //making function to fetch question and wrap into useEffect, cuz i also want to fetch when the button is pressed

  const fetchQuestions = () => {
    setCounter(0);
    setPlayerPoints(0);
    setisOver(false);
    // fetch("https://the-trivia-api.com/v2/questions")
      fetch("https://firebasestorage.googleapis.com/v0/b/v3quiz-ef69a.appspot.com/o/Questions%2Fastronomy.json?alt=media&token=ce7f7b3d-a6df-4b78-bba1-0276ef33f425")
      .then((response) => response.json())
      .then((rawdata) => {
        setdata(rawdata);
        changeQuestion(rawdata, 0);
      })
      .catch(error => {
        Alert.alert("Network Error","Please connect to the internet.");
      });


  };

  useEffect(() => {
    fetchQuestions();
  }, []);


// // ----------------------------------------------------------------------------------------------------(Optionnal)
  useEffect(() => {
    const fetchQuizData = async () => {
      const storageRef = ref(storage, 'Questions/astronomy.json'); // Use correct path
      try {
        const url = await getDownloadURL(storageRef);
        const response = await fetch(url);
        const data = await response.json();
        setquizData(data);
        console.log(url)
      } catch (error) {
        console.log('Here is the error')
        console.error("Error fetching quiz data: ", error);
      }
    };

    fetchQuizData();
  }, []);
// -------------------------------------------------------------------------------------------------------

  //Logic to change the question.

  useEffect(() => {
    if (data) {
      changeQuestion(data, counter);
    }
  }, [counter]);

  const changeQuestion = (data, counter) => {
    const incorrectOptions = data[counter].incorrectAnswers;
    const options = [
      ...incorrectOptions,
      data[counter].correctAnswer,
    ];

    // Shuffle the options array
    for (let i = options.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [options[i], options[j]] = [options[j], options[i]];
    }

    setQuestion(data[counter].question.text);
    setOptions(options);
  };


  // Define a mapping of screen names to their interpolators
  const screenInterpolators = {
    Login: CardStyleInterpolators.forVerticalIOS,
    Signup: CardStyleInterpolators.forFadeFromBottomAndroid,
    Creation: CardStyleInterpolators.forHorizontalIOS,
    Setting: CardStyleInterpolators.forFadeFromBottomAndroid,
    UserProfile: CardStyleInterpolators.forFadeFromBottomAndroid,


    Account: CardStyleInterpolators.forHorizontalIOS,
    Notifications: CardStyleInterpolators.forHorizontalIOS,
    Privacy: CardStyleInterpolators.forHorizontalIOS,
    About: CardStyleInterpolators.forHorizontalIOS,
    HelpSupport: CardStyleInterpolators.forFadeFromBottomAndroid,

    AccountEdit: CardStyleInterpolators.forFadeFromBottomAndroid,
    PrivacyEdit: CardStyleInterpolators.forFadeFromBottomAndroid,
    AccountDeletion: CardStyleInterpolators.forFadeFromBottomAndroid,
    Tabbar: CardStyleInterpolators.forFadeFromBottomAndroid,
  };

  // ---------STORING DATA TO ASYNC STORAGE----------------------------------------------------------------
    // Step 2: Load gameInfo from AsyncStorage when the component mounts
    useEffect(() => {
      const loadGameInfo = async () => {
          getLocalData('gameInfo')
      };
      loadGameInfo();
    }, []);
  
    // Step 3: Save gameInfo to AsyncStorage whenever it changes
    useEffect(() => {
      const saveGameInfo = async () => {
          await saveLocalData('gameInfo',gameInfo);
      };
      saveGameInfo();
    }, [gameInfo]);
    // ------------------------------------------(STORING END)----------------------------------------------------------------------------






  return (
    // <View style={styles.container}>
    <AppProvider >
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Tabbar"

        screenOptions={({ route }) => ({
          // Apply the interpolator based on the screen name
          cardStyleInterpolator: screenInterpolators[route.name] || CardStyleInterpolators.forHorizontalIOS,
          // Include other common settings
          headerShown: false,
          gestureEnabled: true,
          detachPreviousScreen: false,
        })} >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Creation" component={Creation} />
        <Stack.Screen name="Setting" >
          {props =><Setting {...props} setgameInfo={setgameInfo} />}
          </Stack.Screen>
        <Stack.Screen name="Account" component={Account} />
        <Stack.Screen name="AccountEdit" component={AccountEdit} />
        <Stack.Screen name="AccountDeletion" component={AccountDeletion} />
        <Stack.Screen name="About" component={About} />
        <Stack.Screen name="Notifications" component={Notifications} />
        <Stack.Screen name="Privacy" component={Privacy} />
        <Stack.Screen name="PrivacyEdit" component={PrivacyEdit} />
        <Stack.Screen name="HelpSupport" component={HelpSupport} />
        <Stack.Screen name="UserProfile" component={UserProfile} />


        <Stack.Screen name="Quiz">
          {props => <QuizApp {...props} question={question} options={options} counter={counter} isOver={isOver} handleOptionClick={handleOptionClick} fetchQuestion={fetchQuestions} />}
        </Stack.Screen>
        <Stack.Screen name="Tabbar">
          {props => <Tabbar {...props} question={question} options={options} counter={counter} isOver={isOver} handleOptionClick={handleOptionClick} fetchQuestion={fetchQuestions} gameInfo={gameInfo} setgameInfo={setgameInfo}/>}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
    </AppProvider>





  );
}

export {MyContext}

