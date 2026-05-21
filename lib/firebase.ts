// lib/firebase.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebase config with fallback dummy values for development
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "dev-api-key",
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "localhost",
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "visara-dev",
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "visara-dev.appspot.com",
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "123456789",
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "dev-app-id",
};

// Safely initialize Firebase (only on client side)
let app: any = null;
let auth: any = null;
let db: any = null;
let storage: any = null;
let googleProvider: any = null;

// Check if we're in browser environment
const isBrowser = typeof window !== 'undefined';

if (isBrowser) {
    try {
        // Initialize or get existing app
        app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
        auth = getAuth(app);
        db = getFirestore(app);
        storage = getStorage(app);
        googleProvider = new GoogleAuthProvider();
    } catch (error: any) {
        console.warn("Firebase initialization warning:", error.message);
        app = null;
        auth = null;
        db = null;
        storage = null;
        googleProvider = null;
    }
}

// Mock auth functions for development (prevents errors)
const mockSignIn = async () => {
    console.log("🔐 Mock login - Firebase not configured");
    return { user: { uid: "mock-user-123", email: "dev@visara.com" } };
};

const mockSignOut = async () => {
    console.log("🔓 Mock logout");
    return true;
};

// Export with fallbacks
export { 
    app, 
    auth, 
    db, 
    storage, 
    googleProvider,
    mockSignIn,
    mockSignOut,
};
