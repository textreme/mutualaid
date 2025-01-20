import "dotenv/config";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  setPersistence,
  browserLocalPersistence,
  signOut,
} from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

console.log("API Key:", process.env.NEXT_PUBLIC_FIREBASE_API_KEY);

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export const saveUserData = async (userId, data) => {
  try {
    const docRef = doc(db, "users", userId);
    await setDoc(docRef, data);
    console.log(`User data saved successfully for userId: ${userId}`);
  } catch (error) {
    console.error("Error saving user data:", error);
  }
};

export const getUserData = async (userId) => {
  try {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data() : null;
  } catch (error) {
    console.error("Error retrieving user data:", error);
    return null;
  }
};

export const clearSessionAndSignOut = async () => {
  try {
    console.log("Signing out and clearing session...");
    await signOut(auth);
    console.log("Successfully signed out and cleared session.");
  } catch (error) {
    console.error("Error signing out and clearing session:", error);
  }
};

export { auth, db, googleProvider };
