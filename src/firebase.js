// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// TODO: Replace with your actual Firebase project configuration
// Get this from Firebase Console > Project Settings > General > Your apps > Web app config
const firebaseConfig = {
  apiKey: "AIzaSyAeVywvosnkohmfB4MFm8nIFBBttHDZ04Y",
  authDomain: "learn-381bb.firebaseapp.com",
  projectId: "learn-381bb",
  storageBucket: "learn-381bb.firebasestorage.app",
  messagingSenderId: "335087908005",
  appId: "1:335087908005:web:440a7738e9329d13c3094c",
  measurementId: "G-1W2GRD7NCC"
};

// Validate Firebase config
const validateFirebaseConfig = (config) => {
  const requiredFields = ['apiKey', 'authDomain', 'projectId', 'storageBucket', 'messagingSenderId', 'appId'];
  return requiredFields.every(field => config[field] && !config[field].includes('your-') && !config[field].includes('123456789'));
};

// Check if config is properly set up
const isConfigValid = validateFirebaseConfig(firebaseConfig);

if (!isConfigValid) {
  console.warn('⚠️ Firebase configuration is using placeholder values. Authentication will not work until you replace these with your actual Firebase project config.');
  console.warn('Get your config from: https://console.firebase.google.com/ > Project Settings > General > Your apps > Web app');
}

// Initialize Firebase
let app;
let firebaseAuth;
let firebaseGoogleProvider;

try {
  app = initializeApp(firebaseConfig);
  firebaseAuth = getAuth(app);
  firebaseGoogleProvider = new GoogleAuthProvider();
  firebaseGoogleProvider.setCustomParameters({
    prompt: 'select_account'
  });
} catch (error) {
  console.error('❌ Firebase initialization failed:', error);
  // Create dummy objects to prevent crashes
  firebaseAuth = null;
  firebaseGoogleProvider = null;
}

// Initialize Firebase Authentication and get a reference to the service
export const auth = firebaseAuth;
export const googleProvider = firebaseGoogleProvider;
export { app as default };