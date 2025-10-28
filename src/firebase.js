import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCERpjRQ0zjONuOO19O3C_MWKz2if1hrfw",
  authDomain: "alumsphere-e5d33.firebaseapp.com",
  projectId: "alumsphere-e5d33",
  storageBucket: "alumsphere-e5d33.firebasestorage.app",
  messagingSenderId: "853638923629",
  appId: "1:853638923629:web:b5f8beaf747f46e768c664",
  measurementId: "G-ZB7X8ECX2M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firestore database
export const db = getFirestore(app);

// Authentication
export const auth = getAuth(app);

// Firestore functions
export { 
  collection, 
  addDoc, 
  query, 
  where, 
  orderBy, 
  onSnapshot, 
  serverTimestamp,
  doc,
  getDoc,
  setDoc,
  updateDoc 
} from "firebase/firestore";