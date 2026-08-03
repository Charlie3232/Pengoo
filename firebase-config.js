import { initializeApp } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-app.js";
import { getAuth, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-firestore.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-database.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyBE3TBpedUJoDu5r9pJqC4yTzSscbGRqZ0",
  authDomain: "pengoo-3c14a.firebaseapp.com",
  databaseURL: "https://pengoo-3c14a-default-rtdb.firebaseio.com",
  projectId: "pengoo-3c14a",
  storageBucket: "pengoo-3c14a.firebasestorage.app",
  messagingSenderId: "76943284602",
  appId: "1:76943284602:web:612cd5a7e802e42da25ec3",
  measurementId: "G-Q2YZCTVNTN"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const rtdb = getDatabase(app);
export const storage = getStorage(app);