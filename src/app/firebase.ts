// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAmkLykmUR-TwFqxWCCm4dkQa9Y7xWLtnk",
  authDomain: "starlet-8c1b3.firebaseapp.com",
  projectId: "starlet-8c1b3",
  storageBucket: "starlet-8c1b3.appspot.com",
  messagingSenderId: "179054315122",
  appId: "1:179054315122:web:12d68033c32dea2f7864eb",
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = getAuth();

const user = auth.currentUser;

const userId = user ? user.uid : null;

export { app, auth, db, userId, user };