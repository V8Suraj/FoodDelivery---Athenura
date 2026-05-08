// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBIuX0e_rlqjVazy8f__U9prwcHUE-dN1g",
  authDomain: "netflix-gpt-711ec.firebaseapp.com",
  projectId: "netflix-gpt-711ec",
  storageBucket: "netflix-gpt-711ec.firebasestorage.app",
  messagingSenderId: "176195015520",
  appId: "1:176195015520:web:ecb33a6851248995648405",
  measurementId: "G-XV5LYVHV60"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();

