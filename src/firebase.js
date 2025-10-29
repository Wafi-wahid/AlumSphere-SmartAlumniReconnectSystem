// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBj8w3fiAtt2M84Cbf6tSnmm6vevmZ8Xzk",
  authDomain: "messaging-mentor.firebaseapp.com",
  projectId: "messaging-mentor",
  storageBucket: "messaging-mentor.firebasestorage.app",
  messagingSenderId: "734111631379",
  appId: "1:734111631379:web:0c7a2765a7abd1c3bc17e6",
  measurementId: "G-YE686P7DDY"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); // Firestore database export
