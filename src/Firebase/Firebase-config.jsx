// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
//
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAeC0Jjl--mOAFX_azxmmRLGwz1wu-DiuM",
  authDomain: "client-demo-firebase.firebaseapp.com",
  projectId: "client-demo-firebase",
  storageBucket: "client-demo-firebase.appspot.com",
  messagingSenderId: "558699151314",
  appId: "1:558699151314:web:3a98e07effac9d3b3ad20b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Create database calling getFirestore with the initialized app
// export this database
export const db = getFirestore(app);
//
//
// Setting up Auth
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
