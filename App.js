import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Signup from './components/Signup';
import Login from './components/Login';
import Creation from './components/Creation';
import { ImageBackground, View,StyleSheet } from 'react-native';
import QuizApp from './components/QuizApp';
import Tabbar from './components/Tabbar';
const Stack = createNativeStackNavigator();


export default function App() {

  return (
    // <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="Creation" component={Creation} />
          <Stack.Screen name="Quiz" component={QuizApp} />
          <Stack.Screen name="Tabbar" component={Tabbar} />
        </Stack.Navigator>
      </NavigationContainer>
    // </View>





  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
});


