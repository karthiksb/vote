// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB4vbKDZtUmV8JeCH45-KsUUzRbJz3b-1k",
  authDomain: "election-management-syst-1b85a.firebaseapp.com",
  projectId: "election-management-syst-1b85a",
  storageBucket: "election-management-syst-1b85a.appspot.com",
  messagingSenderId: "261550894715",
  appId: "1:261550894715:web:6f39d86ac0005eea69bcde",
  measurementId: "G-NP2SFNCBRC",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { app, db };
