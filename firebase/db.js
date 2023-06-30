// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc, getDoc, getDocs, doc, querySnapshot, deleteDoc, updateDoc } from "firebase/firestore"; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCt7tcMADUaEhyygpAwMmy_K1wQ6V2rE8s",
  authDomain: "todolistapp-443f7.firebaseapp.com",
  projectId: "todolistapp-443f7",
  storageBucket: "todolistapp-443f7.appspot.com",
  messagingSenderId: "366122446796",
  appId: "1:366122446796:web:3ac4b453ce592581c97769",
  measurementId: "G-GRK640YG0N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export {app, db, collection, addDoc, getFirestore, getDoc, getDocs, doc, querySnapshot, deleteDoc, updateDoc};