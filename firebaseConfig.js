// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore'; 
import { getStorage, ref, getDownloadURL } from 'firebase/storage';  

const firebaseConfig = {
  apiKey: '---------Your API key here------------',
  authDomain: 'v3quiz-ef69a.firebaseapp.com', 
  projectId: 'v3quiz-ef69a',
  storageBucket: 'v3quiz-ef69a.appspot.com',
  messagingSenderId: '397796130021',
  appId: '1:397796130021:android:95e8747e5bb7083c14280c',

};

const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with persistent storage
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});
// Initialize Firestore
const firestore = getFirestore(app); 
const storage =getStorage(app);

export { auth,firestore,storage };
export default app;
