// src/firebase.js

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// ✅ Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyC0EDpIyf-M3eEwCPYqMvyNB2wV-0V8NgE",
  authDomain: "stricbuzz-f7834.firebaseapp.com",
  projectId: "stricbuzz-f7834",
  storageBucket: "stricbuzz-f7834.appspot.com",
  messagingSenderId: "970599622217",
  appId: "1:970599622217:web:2a8db984cb637250bb4198",
  measurementId: "G-GJXYKBD34E"
};

// ✅ Initialize Firebase app
const app = initializeApp(firebaseConfig);

// ✅ Initialize Firestore database
const db = getFirestore(app);

// ✅ Export for use in components
export { db, app };
