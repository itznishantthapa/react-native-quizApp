import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Signup from './components/Signup';
import Login from './components/Login';
import Creation from './components/Creation';
import { ImageBackground } from 'react-native';
import QuizApp from './components/QuizApp';
import Dashboard from './components/Dashboard';
const Stack = createNativeStackNavigator();


export default function App() {

  return (



    <NavigationContainer>
    <Stack.Navigator initialRouteName="Login" screenOptions={{headerShown:false}  }>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Creation" component={Creation} />
      <Stack.Screen name="Quiz" component={QuizApp} />
      <Stack.Screen name="Dashboard" component={Dashboard} />
    </Stack.Navigator>
  </NavigationContainer>

 
  );
}


