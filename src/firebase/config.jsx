import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDBFrZ06C5A6lm2FItlI_xDLyhwBmhRpwM",
  authDomain: "miniblog-246df.firebaseapp.com",
  projectId: "miniblog-246df",
  storageBucket: "miniblog-246df.firebasestorage.app",
  messagingSenderId: "557361640775",
  appId: "1:557361640775:web:d2705a20e6231632a8c862",
  measurementId: "G-DVFFKCWDZB",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { app, db };
