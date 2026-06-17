// lib/firebase.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Safe helper to resolve environment variables in both Node and Browser
const getEnv = (key: string): string => {
    if (typeof import.meta !== "undefined" && import.meta.env && import.meta.env[key]) {
        return import.meta.env[key];
    }
    if (typeof process !== "undefined" && process.env && process.env[key]) {
        return process.env[key];
    }
    return "";
};

// Firebase config with fallback values
const firebaseConfig = {
    apiKey: getEnv("NEXT_PUBLIC_FIREBASE_API_KEY") || "dev-api-key",
    authDomain: getEnv("NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN") || "localhost",
    projectId: getEnv("NEXT_PUBLIC_FIREBASE_PROJECT_ID") || "visaformula-dev",
    storageBucket: getEnv("NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET") || "visaformula-dev.appspot.com",
    messagingSenderId: getEnv("NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID") || "123456789",
    appId: getEnv("NEXT_PUBLIC_FIREBASE_APP_ID") || "dev-app-id",
};

// Check if we have valid Firebase keys (i.e. not the default dummy fallbacks)
const isConfigured = 
    firebaseConfig.apiKey && 
    firebaseConfig.apiKey !== "dev-api-key" &&
    firebaseConfig.projectId && 
    firebaseConfig.projectId !== "visaformula-dev";

// Safely initialize Firebase (only on client side if configured)
let app: any = null;
let auth: any = null;
let db: any = null;
let storage: any = null;
let googleProvider: any = null;

const isBrowser = typeof window !== 'undefined';

if (isBrowser) {
    if (isConfigured) {
        try {
            // Initialize or get existing app
            app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
            auth = getAuth(app);
            db = getFirestore(app);
            storage = getStorage(app);
            googleProvider = new GoogleAuthProvider();
            console.log("🔥 Firebase initialized successfully with configuration keys.");
        } catch (error: any) {
            console.warn("Firebase initialization warning:", error.message);
        }
    } else {
        console.log("ℹ️ Firebase is running in mock/development mode (keys are not configured in environment).");
    }
}

// Mock auth functions for development (prevents errors)
const mockSignIn = async () => {
    console.log("🔐 Mock login - Firebase not configured");
    return { user: { uid: "mock-user-123", email: "dev@visaformula.com" } };
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
