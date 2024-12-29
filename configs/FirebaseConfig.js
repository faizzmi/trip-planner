// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyChfZuBEMfuHbCsY7ZIjWP1BEPnMF9RHGQ",
  authDomain: "personal-project-ede68.firebaseapp.com",
  projectId: "personal-project-ede68",
  storageBucket: "personal-project-ede68.firebasestorage.app",
  messagingSenderId: "612445412959",
  appId: "1:612445412959:web:5fcf88d659eee851ce45ea",
  measurementId: "G-Q33MXJ45LK"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);