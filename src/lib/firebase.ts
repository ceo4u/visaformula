// firebase.ts — BROWSER-ONLY, dynamic imports only
// Static top-level firebase imports are FORBIDDEN here (Astro SSR will crash)

let _initialized = false;
let _auth: any = null;
let _googleProvider: any = null;

async function initFirebase() {
    if (_initialized) return { auth: _auth, googleProvider: _googleProvider };

    const { initializeApp, getApps, getApp } = await import("firebase/app");
    const { getAuth, GoogleAuthProvider } = await import("firebase/auth");

    const firebaseConfig = {
        apiKey: import.meta.env.PUBLIC_FIREBASE_API_KEY || import.meta.env.NEXT_PUBLIC_FIREBASE_API_KEY,
        authDomain: import.meta.env.PUBLIC_FIREBASE_AUTH_DOMAIN || import.meta.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
        projectId: import.meta.env.PUBLIC_FIREBASE_PROJECT_ID || import.meta.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        storageBucket: import.meta.env.PUBLIC_FIREBASE_STORAGE_BUCKET || import.meta.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: import.meta.env.PUBLIC_FIREBASE_MESSAGING_SENDER_ID || import.meta.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
        appId: import.meta.env.PUBLIC_FIREBASE_APP_ID || import.meta.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    };

    const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    _auth = getAuth(app);
    _googleProvider = new GoogleAuthProvider();
    _googleProvider.setCustomParameters({ prompt: "select_account" });
    _initialized = true;

    return { auth: _auth, googleProvider: _googleProvider };
}

export async function loginWithGooglePopup() {
    const { auth, googleProvider } = await initFirebase();
    const { signInWithPopup } = await import("firebase/auth");
    return await signInWithPopup(auth, googleProvider);
}
