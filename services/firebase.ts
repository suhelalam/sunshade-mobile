import { initializeApp } from "firebase/app";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAuth, getReactNativePersistence, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB8WK6urgOOuPwB2vv1JQ8-aSpWvdsby84",
  authDomain: "sunshade-cb8bb.firebaseapp.com",
  projectId: "sunshade-cb8bb",
  storageBucket: "sunshade-cb8bb.firebasestorage.app",
  messagingSenderId: "628917329145",
  appId: "1:628917329145:web:61340f12c193b235e91628",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const db = getFirestore(app);
export const auth = (() => {
  try {
    return initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage),
    });
  } catch {
    return getAuth(app);
  }
})();
export const storage = getStorage(app);

export default app;
