import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Signup from './components/Signup';
import Login from './components/Login';
import Creation from './components/Creation';
import { ImageBackground, View, StyleSheet, Alert } from 'react-native';
import QuizApp from './components/QuizApp';
import Tabbar from './components/Tabbar';
import { useState, useEffect } from 'react';
// import { enableScreens } from 'react-native-screens';


// enableScreens();

const Stack = createNativeStackNavigator();






export default function App() {

  const [data, setData] = useState(null);
  const [counter, setCounter] = useState(0);
  const [playerPoints, setPlayerPoints] = useState(0);
  const [question, setQuestion] = useState(null);
  const [options, setOptions] = useState([]);

  const handleOptionClick = (choosed) => {
    if (counter < data.length - 1) {
      setCounter(counter + 1);
    }
    if (choosed === data[counter].correctAnswer && counter < data.length - 1) {
      setPlayerPoints(playerPoints + 1);
    }
  };

  useEffect(() => {
    if (data && counter === data.length - 1) {
      Alert.alert("Quiz Complete", `Your score is ${playerPoints}`);
      // alert();
    }
  }, [playerPoints, counter]);

  useEffect(() => {
    fetch("https://the-trivia-api.com/v2/questions")
      .then((response) => response.json())
      .then((rawData) => {
        setData(rawData);
        changeQuestion(rawData, counter);
      });
  }, []);

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


  

  return (
    // <View style={styles.container}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{
        headerShown: false, 
        animation: 'slide_from_right', 
      }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Creation" component={Creation} />


        <Stack.Screen name="Quiz"  >
          {props => <QuizApp {...props} question={question} options={options} handleOptionClick={handleOptionClick} />}
        </Stack.Screen>
        <Stack.Screen name="Tabbar"  >
          {props => <Tabbar {...props} question={question} options={options} handleOptionClick={handleOptionClick} />}
        </Stack.Screen>


        {/* <Stack.Screen name="Tabbar" component={Tabbar} /> */}
      </Stack.Navigator>
    </NavigationContainer>
    // </View>





  );
}



