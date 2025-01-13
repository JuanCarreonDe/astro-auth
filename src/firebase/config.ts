// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAuK3X7yb-3x2bWoP4ir6Dq738Tnfa3I9o",
  authDomain: "astro-auth-d7dc9.firebaseapp.com",
  projectId: "astro-auth-d7dc9",
  storageBucket: "astro-auth-d7dc9.firebasestorage.app",
  messagingSenderId: "398279225158",
  appId: "1:398279225158:web:1503d19b87ae0397027f47",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
auth.languageCode = "es";

export const firebase = {
  app,
  auth,
};
