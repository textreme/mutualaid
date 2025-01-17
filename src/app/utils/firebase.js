import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, setPersistence, browserLocalPersistence, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDa2TdfLLAqeml98gdY0VH7yTmAQwRII4k",
  authDomain: "mutual-aid-live.firebaseapp.com",
  projectId: "mutual-aid-live",
  storageBucket: "mutual-aid-live.firebasestorage.app",
  messagingSenderId: "104879718817",
  appId: "1:104879718817:web:470bbe2c3ef1176ea80be0",
  measurementId: "G-3YSE0KFFQB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log("Firebase initialized:", app);

// Initialize Services
const db = getFirestore(app);
const auth = getAuth(app);
setPersistence(auth, browserLocalPersistence)
  .then(() => console.log("Firebase auth persistence set to local."))
  .catch((error) => console.error("Error setting persistence:", error));

// Google Auth Provider
const googleProvider = new GoogleAuthProvider();

// Emulator Configuration
if (typeof window !== "undefined" && window.location.hostname === "localhost") {
  console.log("Using Firebase Emulators");
  connectAuthEmulator(auth, "http://localhost:9099");
  connectFirestoreEmulator(db, "localhost", 8080);
}

export { auth, db, googleProvider };
