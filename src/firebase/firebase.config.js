// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBBSbBFg1F4eYqiwCVh0DrM1E1jfe_KWzY",
  authDomain: "react-fire-base-80542.firebaseapp.com",
  projectId: "react-fire-base-80542",
  storageBucket: "react-fire-base-80542.firebasestorage.app",
  messagingSenderId: "812383168890",
  appId: "1:812383168890:web:513df6ed04214d01aa0ec3"
};

// Initialize Firebase
initializeApp(firebaseConfig);
const auth = getAuth();
export {auth};
