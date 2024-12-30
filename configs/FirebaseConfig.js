// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA7BY_qkrsjMiNoVCPx2wB9UYz_dTKRYfA",
  authDomain: "personal-project-bab0c.firebaseapp.com",
  projectId: "personal-project-bab0c",
  storageBucket: "personal-project-bab0c.firebasestorage.app",
  messagingSenderId: "498235937455",
  appId: "1:498235937455:web:d31f9a4bec260cfe787a5a",
  measurementId: "G-Y9CZCC34GP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {auth};
