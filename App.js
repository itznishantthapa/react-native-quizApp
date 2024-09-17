import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import Login from './Screens/Login';
import Creation from './Screens/Creation';
import { Alert } from 'react-native';
import QuizApp from './Screens/QuizApp';
import Tabbar from './Screens/Tabbar';
import { useState, useEffect, createContext, useContext } from 'react';
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

import { storage } from './firebaseConfig';
import { ref, getDownloadURL } from 'firebase/storage';

import UserProfile from './Screens/UserProfile';
import { saveLocalData, getLocalData } from './localStorage';
import { fileUploadToFirebaseStorage, getFromFirebase, updateToFirebase } from './db';
import { AppProvider, MyContext } from './AppProvider';
import History from './Screens/History';
import QuestionList from './Screens/QuestionList';



enableScreens(false);

const Stack = createStackNavigator();



// const MyContext = createContext();
// const { addQuizAnswer } = useContext(MyContext);




export default function App() {

  const [data, setdata] = useState(null);
  const [counter, setCounter] = useState(0);
  const [playerPoints, setPlayerPoints] = useState(0);
  const [question, setQuestion] = useState(null);
  const [options, setOptions] = useState([]);
  const [correctAns, setCorrectAns] = useState(null);
  const [isOver, setisOver] = useState(false);
  const [questionAmount, setQuestionAmount] = useState(30);
  const [categories, setcategories] = useState(null);





  const [gameInfo, setgameInfo] = useState(
    {
      worldRank: 'NA',
      gamePlayed: 0,
      points: 0,
      totalAttempted: 0

    })




  const handleOptionClick = (choosed) => {

    if (!(counter === questionAmount - 1)) {
      if (choosed === data[counter].correctAnswer) {
        setPlayerPoints(playerPoints + 1);
        setgameInfo((prevGameInfo) =>
          ({ ...prevGameInfo, points: prevGameInfo.points + 4 })) //setting the player points on each correct answer
      }
      setCounter(counter + 1);

      setgameInfo((prevGameInfo) => ({ ...prevGameInfo, totalAttempted: (prevGameInfo.totalAttempted) + 1 })) //totalQuestion Solved

    } else {
      if (!isOver) {
        // Added this else block to handle the case when it's the last question
        if (choosed === data[counter].correctAnswer) {
          setPlayerPoints(playerPoints + 1);
          setgameInfo((prevGameInfo) => ({ ...prevGameInfo, points: prevGameInfo.points + 4 }))
        }
        setgameInfo((prevGameInfo) => ({ ...prevGameInfo, totalAttempted: (prevGameInfo.totalAttempted) + 1 })) //totalQuestion Solved
        setgameInfo((prevGameInfo) => ({ ...prevGameInfo, gamePlayed: (prevGameInfo.gamePlayed) + 1 }))   //Everytime questions load considers as game played
        Alert.alert("Game Complete", `You have scored ${playerPoints} out of ${questionAmount}`);
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

  const fetchQuestion = (category) => {
    setCounter(0);
    setPlayerPoints(0);
    setisOver(false);
    setcategories((category).toLowerCase())


    let questionData;
    switch (category) {
      case 'Database':
        questionData = require('./data/database.json');
        break;
      case 'Hardware':
        questionData = require('./data/hardware.json'); //all set, just need json nowwwwwww.
        break;

      case 'Programming':
        questionData = require('./data/react.json');
        break;
      case 'DSA':
        questionData = require('./data/react.json');
        break;

      case 'Networking':
        questionData = require('./data/networking.json');
        break;
      case 'Software Engineering':
        questionData = require('./data/networking.json');
        break;

      case 'Operating System':
        questionData = require('./data/networking.json');
        break;
      case 'AI & ML':
        questionData = require('./data/networking.json');
        break;

      default:
        Alert.alert('Error', 'Category not found.');
        return;
    }

    // Shuffle the questionData array
    for (let i = questionData.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [questionData[i], questionData[j]] = [questionData[j], questionData[i]];
    }

    setdata(questionData);
    console.log(questionData.length)
    changeQuestion(questionData, 0);

  };





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
    setCorrectAns(data[counter].correctAnswer);
    // setcategories((data[counter].category).toLowerCase());
    
  };


  // Define a mapping of screen names to their interpolators
  const screenInterpolators = {
    Login: CardStyleInterpolators.forVerticalIOS,
    Creation: CardStyleInterpolators.forFadeFromBottomAndroid,
    Setting: CardStyleInterpolators.forFadeFromBottomAndroid,
    History: CardStyleInterpolators.forFadeFromBottomAndroid,
    UserProfile: CardStyleInterpolators.forFadeFromBottomAndroid,
    QuestionList: CardStyleInterpolators.forHorizontalIOS,


    Account: CardStyleInterpolators.forFadeFromBottomAndroid,
    Notifications: CardStyleInterpolators.forFadeFromBottomAndroid,
    Privacy: CardStyleInterpolators.forFadeFromBottomAndroid,
    About: CardStyleInterpolators.forFadeFromBottomAndroid,
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
      await saveLocalData('gameInfo', gameInfo);
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
          <Stack.Screen name="Creation" component={Creation} />
          <Stack.Screen name="Setting" >
            {props => <Setting {...props} setgameInfo={setgameInfo} />}
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
          <Stack.Screen name="History" component={History} />
          <Stack.Screen name="QuestionList" component={QuestionList} />


          <Stack.Screen name="Quiz">
            {props => <QuizApp {...props} question={question} options={options} correctAns={correctAns} categories={categories} counter={counter} isOver={isOver} handleOptionClick={handleOptionClick} fetchQuestion={fetchQuestion} noOfQuestions={questionAmount} />}
          </Stack.Screen>
          <Stack.Screen name="Tabbar">
            {props => <Tabbar {...props} question={question} options={options} counter={counter} isOver={isOver} handleOptionClick={handleOptionClick} fetchQuestion={fetchQuestion} gameInfo={gameInfo} setgameInfo={setgameInfo} setQuestionAmount={setQuestionAmount} />}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </AppProvider>

  );
}

// export {MyContext}

