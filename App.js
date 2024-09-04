import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator,CardStyleInterpolators } from '@react-navigation/stack';
import Signup from './Screens/Signup';
import Login from './Screens/Login';
import Creation from './Screens/Creation';
import { ImageBackground, View, StyleSheet, Alert } from 'react-native';
import QuizApp from './Screens/QuizApp';
import Tabbar from './Screens/Tabbar';
import { useState, useEffect } from 'react';
import { enableScreens } from 'react-native-screens';
import Setting from './Screens/Setting';
import Account from './SettingScreens/Account';
import AccountEdit from './SettingScreens/AccountEdit';
import AccountDeletion from './SettingScreens/AccountDeletion';



enableScreens(false);

const Stack = createStackNavigator();






export default function App() {

  const [data, setdata] = useState(null);
  const [counter, setCounter] = useState(0);
  const [playerPoints, setPlayerPoints] = useState(0);
  const [question, setQuestion] = useState(null);
  const [options, setOptions] = useState([]);
  const [isOver, setisOver] = useState(false)

  const handleOptionClick = (choosed) => {
    if (!(counter === data.length - 1)) {


      if (choosed === data[counter].correctAnswer) {
        setPlayerPoints(playerPoints + 1);
      }

      setCounter(counter + 1);
    } else {
      // Added this else block to handle the case when it's the last question
      if (choosed === data[counter].correctAnswer) {
        setPlayerPoints(playerPoints + 1);
      }
      Alert.alert("Quiz Complete", `Your score is ${playerPoints + 1}`);
      setisOver(true);
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
    fetch("https://the-trivia-api.com/v2/questions")
      // fetch("http://192.168.1.66:8000/api/questions/")
      .then((response) => response.json())
      .then((rawdata) => {
        setdata(rawdata);
        changeQuestion(rawdata, 0);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });


  };

  useEffect(() => {
    fetchQuestions();
  }, []);



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
  Account: CardStyleInterpolators.forHorizontalIOS,
  AccountEdit: CardStyleInterpolators.forFadeFromBottomAndroid,
  AccountDeletion: CardStyleInterpolators.forFadeFromBottomAndroid,
  Tabbar: CardStyleInterpolators.forFadeFromBottomAndroid,
};


  return (
    // <View style={styles.container}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login"
      
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
        <Stack.Screen name="Setting" component={Setting} />
        <Stack.Screen name="Account" component={Account} />
        <Stack.Screen name="AccountEdit" component={AccountEdit} />
        <Stack.Screen name="AccountDeletion" component={AccountDeletion} />
        <Stack.Screen name="Quiz">
        {props => <QuizApp {...props} question={question} options={options} counter={counter} isOver={isOver} handleOptionClick={handleOptionClick} fetchQuestion={fetchQuestions} />}
        </Stack.Screen>
        <Stack.Screen name="Tabbar">
        {props => <Tabbar {...props} question={question} options={options} handleOptionClick={handleOptionClick} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
    // </View>





  );
}



