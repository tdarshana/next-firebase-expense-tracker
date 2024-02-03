// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBLg846pAu2A4kp7nSjj8rfAEUl7uE72to",
  authDomain: "expense-tracker-c5a70.firebaseapp.com",
  projectId: "expense-tracker-c5a70",
  storageBucket: "expense-tracker-c5a70.appspot.com",
  messagingSenderId: "809982033124",
  appId: "1:809982033124:web:cbf51ed999fda1b6b6c0f1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)