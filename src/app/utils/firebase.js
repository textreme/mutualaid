// src/utils/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDa2TdfLLAqeml98gdY0VH7yTmAQwRII4k",
  authDomain: "mutual-aid-live.firebaseapp.com",
  projectId: "mutual-aid-live",
  storageBucket: "mutual-aid-live.firebasestorage.app",
  messagingSenderId: "104879718817",
  appId: "1:104879718817:web:470bbe2c3ef1176ea80be0",
  measurementId: "G-3YSE0KFFQB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };

