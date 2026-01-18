// src/firebase/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA4Q6074At_QjQUhT_mdZR7fkPDGyytQ7M",
  authDomain: "eam1-a59b1.firebaseapp.com",
  projectId: "eam1-a59b1",
  storageBucket: "eam1-a59b1.firebasestorage.app",
  messagingSenderId: "593745158866",
  appId: "1:593745158866:web:67deab710186c0be7e030b"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);