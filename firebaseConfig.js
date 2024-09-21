// firebaseConfig.js

// Import necessary Firebase modules
import { initializeApp, getApps } from 'firebase/app';  // getApps checks if Firebase is already initialized
import { initializeAuth, getReactNativePersistence } from 'firebase/auth'; // Firebase Authentication with persistence
import AsyncStorage from '@react-native-async-storage/async-storage'; // AsyncStorage for storing auth state in React Native
import { getFirestore } from 'firebase/firestore';  // Firestore for database functionality
import { getStorage } from 'firebase/storage';  // Firebase Storage for handling file uploads/downloads

// Firebase configuration object containing project-specific details
const firebaseConfig = {
  // Your Firebase project's API key and other details
  apiKey: 'AIzaSyAOj6Q03_dxq_ySxsN3Mzv43-81iHRgox8',
  authDomain: 'v3quiz-ef69a.firebaseapp.com',
  projectId: 'v3quiz-ef69a',
  storageBucket: 'v3quiz-ef69a.appspot.com',
  messagingSenderId: '397796130021',
  appId: '1:397796130021:android:95e8747e5bb7083c14280c',
};

// Initialize Firebase app only if it's not already initialized
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0]; // Use the already initialized app
}

// Initialize Firebase Auth with persistent storage using AsyncStorage
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Initialize Firestore (Cloud Firestore database)
const firestore = getFirestore(app);

// Initialize Firebase Storage for file handling (uploads/downloads)
const storage = getStorage(app);

// Export the initialized instances to use across the app
export { auth, firestore, storage };
export default app;
