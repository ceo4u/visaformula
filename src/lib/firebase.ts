// Firebase is loaded lazily (dynamic import) to avoid React duplicate instance issues
// This module is only loaded in the browser, never during SSR

let _auth: any = null;
let _googleProvider: any = null;
let _initialized = false;

export async function getFirebaseAuth() {
    if (_initialized) return { auth: _auth, googleProvider: _googleProvider };
    _initialized = true;

    try {
        const { initializeApp, getApps, getApp } = await import("firebase/app");
        const { getAuth, GoogleAuthProvider } = await import("firebase/auth");

        const firebaseConfig = {
            apiKey: import.meta.env.NEXT_PUBLIC_FIREBASE_API_KEY,
            authDomain: import.meta.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
            projectId: import.meta.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
            storageBucket: import.meta.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
            messagingSenderId: import.meta.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
            appId: import.meta.env.NEXT_PUBLIC_FIREBASE_APP_ID
        };

        const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
        _auth = getAuth(app);
        _googleProvider = new GoogleAuthProvider();
    } catch (e) {
        console.error("Firebase init error:", e);
    }

    return { auth: _auth, googleProvider: _googleProvider };
}
