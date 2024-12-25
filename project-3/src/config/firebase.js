// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDJPg7iNrVa_D3_ZmdfIISioC-TeMhVZ7M",
  authDomain: "vite-contact-fe851.firebaseapp.com",
  projectId: "vite-contact-fe851",
  storageBucket: "vite-contact-fe851.firebasestorage.app",
  messagingSenderId: "1068409318812",
  appId: "1:1068409318812:web:0f89bf10e22697dc77ac59"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);