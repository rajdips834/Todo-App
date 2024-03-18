// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA0GAuK_NoaD75H6VA5vAkmBBFmanvxLpQ",
  authDomain: "todo-list-12b74.firebaseapp.com",
  projectId: "todo-list-12b74",
  storageBucket: "todo-list-12b74.appspot.com",
  messagingSenderId: "874030681535",
  appId: "1:874030681535:web:475991319a43483e47a50a",
  measurementId: "G-B9ETGMGQT8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default getFirestore();
