// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  // apiKey: process.env.REACT_APP_API_KEY,
  // authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  // projectId: process.env.REACT_APP_PROJECT_ID,
  // storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  // messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  // appId: process.env.REACT_APP_APP_ID,
  // measurementId: process.env.REACT_APP_MEASUREMENT_ID

  apiKey: "AIzaSyCizj_hKFU4s6cqVt3GTf18W9oMn9G-4pA",
  authDomain: "architectsstaffmanager.firebaseapp.com",
  databaseURL: "https://architectsstaffmanager-default-rtdb.firebaseio.com",
  projectId: "architectsstaffmanager",
  storageBucket: "architectsstaffmanager.appspot.com",
  messagingSenderId: "550911242330",
  appId: "1:550911242330:web:5c5fc2e0a60ea05c3be863",
  measurementId: "G-483Y28377N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export { auth, db, app as default };
