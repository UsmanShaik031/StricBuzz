import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC0EDpIyf-M3eEwCPYqMvyNB2wV-0V8NgE",
  authDomain: "stricbuzz-f7834.firebaseapp.com",
  projectId: "stricbuzz-f7834",
  storageBucket: "stricbuzz-f7834.appspot.com",
  messagingSenderId: "970599622217",
  appId: "1:970599622217:web:2a8db984cb637250bb4198",
  measurementId: "G-GJXYKBD34E",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

function getCurrentUser() {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        unsubscribe();
        resolve(user);
      },
      (error) => {
        unsubscribe();
        reject(error);
      }
    );
  });
}

/**
 * Write data to pointsTable collection if user is authenticated and email ends with @gmail.com
 * @param {Object} data - Data to write to Firestore
 * @param {string} docId - Document ID to write
 * @returns {Promise<void>}
 */
async function writePointsTable(data, docId) {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("User not authenticated");
  }
  if (!user.email || !user.email.match(/.*@gmail\.com$/)) {
    throw new Error("User email is not a gmail address");
  }

  const docRef = doc(db, "pointsTable", docId);
  await setDoc(docRef, data);
}

async function exampleWrite() {
  try {
    const user = await getCurrentUser();
    if (user && user.email.match(/.*@gmail\.com$/)) {
      await writePointsTable({ points: 100 }, "user_points");
      console.log("Write successful");
    } else {
      console.error("User not authenticated or invalid email");
    }
  } catch (error) {
    console.error("Error during write operation:", error);
  }
}

export { db, app, auth, getCurrentUser, writePointsTable, exampleWrite };
