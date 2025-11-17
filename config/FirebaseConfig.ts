// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAfk-dpjuZbYjbCn7xYhYZpG4e0yzgiOhg",
  authDomain: "ai-pocket-agent-f1f3e.firebaseapp.com",
  projectId: "ai-pocket-agent-f1f3e",
  storageBucket: "ai-pocket-agent-f1f3e.firebasestorage.app",
  messagingSenderId: "577649112213",
  appId: "1:577649112213:web:00f35c5911d60a44a1579c",
  measurementId: "G-46HY9CKLMR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export 
const fireStoreDB = getFirestore(app);
const analytics = getAnalytics(app);