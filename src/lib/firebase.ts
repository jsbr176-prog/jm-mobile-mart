import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
apiKey: "AIzaSyAH3q9-sjfUPjZfD4iI9mNNd4hvmZtvzXI",
  authDomain: "jm-mobile-mart.firebaseapp.com",
  projectId: "jm-mobile-mart",
  storageBucket: "jm-mobile-mart.firebasestorage.app",
  messagingSenderId: "778198561920",
  appId: "1:778198561920:web:2f8f173b3b21b42b1ae265",
  measurementId: "G-SJRXTVCNP5"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);