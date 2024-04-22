// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getFirestore} from"firebase/firestore"
import { getAuth ,GoogleAuthProvider } from "firebase/auth";
import 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDd9LEToL1C-LdLZOlCHwhQplj9_hzyOGQ",
  authDomain: "article-summarizer-tool.firebaseapp.com",
  projectId: "article-summarizer-tool",
  storageBucket: "article-summarizer-tool.appspot.com",
  messagingSenderId: "446281844570",
  appId: "1:446281844570:web:45433f3cc827fef9fd5563",
  measurementId: "G-W8EYFDD61Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider(); 

export {  db, app,googleProvider };