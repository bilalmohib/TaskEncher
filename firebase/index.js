// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
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

  apiKey: "AIzaSyC73jJz3lqIO_qTnbV8ei4OLPygL1QRzaI",
  authDomain: "taskencher.firebaseapp.com",
  projectId: "taskencher",
  storageBucket: "taskencher.appspot.com",
  messagingSenderId: "1052740073596",
  appId: "1:1052740073596:web:548143663a11c4cce5b1f9",
  measurementId: "G-L0F850N8Z9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
export { auth, db, storage, app as default };
