// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: 'AIzaSyByh9-ucAZmPmmYjsvMA94aL1BlXFIBPQk',
  authDomain: 'react-native-quiz-v2.firebaseapp.com',
  projectId: 'react-native-quiz-v2',
  storageBucket: 'react-native-quiz-v2.appspot.com',
  messagingSenderId: '1058251948585',
  appId: '1:1058251948585:android:d001e79370319173c81238',
};

const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with persistent storage
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export { auth };
export default app;
