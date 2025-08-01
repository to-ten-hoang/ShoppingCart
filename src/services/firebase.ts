// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Thông tin config từ Firebase Console (thay bằng config của bạn)
const firebaseConfig = {
  apiKey: "AIzaSyC3fGlOd6FQcelK2zHUaB3wUm_JGSAQcMw",
  authDomain: "ecommerce-cart-9cb3f.firebaseapp.com",
  projectId: "ecommerce-cart-9cb3f",
  storageBucket: "ecommerce-cart-9cb3f.firebasestorage.app",
  messagingSenderId: "790613639650",
  appId: "1:790613639650:web:d4dd6b0da28deb92f439bb",
  measurementId: "G-CSV6Q6ZVYC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const db = getFirestore(app);  // Database
export const auth = getAuth(app);     // Authentication

export default app;