import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCJUd1VXh7qc_omCeJe-3zcv4bRURljxrA",
  authDomain: "pantry-tracker-19a22.firebaseapp.com",
  projectId: "pantry-tracker-19a22",
  storageBucket: "pantry-tracker-19a22.appspot.com",
  messagingSenderId: "317593807260",
  appId: "1:317593807260:web:e0c45405752808fae0c059",
  measurementId: "G-BZG4BWMJ76"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);