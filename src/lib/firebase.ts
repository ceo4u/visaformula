// firebase.ts — BROWSER-ONLY, dynamic imports only
// Static top-level firebase imports are FORBIDDEN here (Astro SSR will crash)

let _initialized = false;
let _auth: any = null;
let _googleProvider: any = null;
let _signInWithPopupFn: any = null;
let _signInWithRedirectFn: any = null;
let _getRedirectResultFn: any = null;
let _initPromise: Promise<{ auth: any; googleProvider: any }> | null = null;

export async function initFirebase() {
    if (_initialized && _auth && _googleProvider) {
        return { auth: _auth, googleProvider: _googleProvider };
    }
    if (_initPromise) return _initPromise;

    _initPromise = (async () => {
        const { initializeApp, getApps, getApp } = await import("firebase/app");
        const { getAuth, GoogleAuthProvider, signInWithPopup, signInWithRedirect, getRedirectResult } = await import("firebase/auth");

        _signInWithPopupFn = signInWithPopup;
        _signInWithRedirectFn = signInWithRedirect;
        _getRedirectResultFn = getRedirectResult;

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
        _googleProvider.addScope("email");
        _googleProvider.addScope("profile");
        _initialized = true;

        return { auth: _auth, googleProvider: _googleProvider };
    })();

    return _initPromise;
}

let _currentAuthPopup: Window | null = null;

// Function to bring the Google sign-in window to the front
export function focusAuthPopup(): boolean {
    if (_currentAuthPopup && !_currentAuthPopup.closed) {
        try {
            _currentAuthPopup.focus();
            return true;
        } catch (_) {
            return false;
        }
    }
    return false;
}

// Popup-based sign in (instant response, preserves user gesture & auto-refocuses if hidden)
export async function loginWithGooglePopup() {
    const { auth, googleProvider } = await initFirebase();
    const signInFn = _signInWithPopupFn || (await import("firebase/auth")).signInWithPopup;

    let cleanupRefocus: (() => void) | null = null;
    let origOpen: any = null;

    if (typeof window !== "undefined") {
        origOpen = window.open;
        window.open = function (...args: any[]) {
            const popup = origOpen.apply(window, args as any);
            if (popup) {
                _currentAuthPopup = popup;

                const bringToFront = () => {
                    if (_currentAuthPopup && !_currentAuthPopup.closed) {
                        try {
                            _currentAuthPopup.focus();
                        } catch (_) {}
                    }
                };

                const onWindowFocus = () => {
                    // When main window gets focus, re-focus popup immediately
                    setTimeout(bringToFront, 50);
                };

                const onWindowClick = () => {
                    bringToFront();
                };

                window.addEventListener("focus", onWindowFocus);
                window.addEventListener("click", onWindowClick, true);

                const intervalId = setInterval(() => {
                    if (!_currentAuthPopup || _currentAuthPopup.closed) {
                        cleanup();
                    } else if (document.hasFocus()) {
                        bringToFront();
                    }
                }, 800);

                const cleanup = () => {
                    window.removeEventListener("focus", onWindowFocus);
                    window.removeEventListener("click", onWindowClick, true);
                    clearInterval(intervalId);
                };

                cleanupRefocus = cleanup;
            }
            return popup;
        };
    }

    try {
        const result = await signInFn(auth, googleProvider);
        return result;
    } finally {
        if (origOpen && typeof window !== "undefined") {
            window.open = origOpen;
        }
        if (cleanupRefocus) cleanupRefocus();
    }
}

// Redirect-based sign in fallback
export async function loginWithGoogleRedirect(returnPath?: string) {
    const { auth, googleProvider } = await initFirebase();
    const redirectFn = _signInWithRedirectFn || (await import("firebase/auth")).signInWithRedirect;
    if (returnPath && typeof sessionStorage !== "undefined") {
        sessionStorage.setItem("google_auth_return", returnPath);
    }
    await redirectFn(auth, googleProvider);
}

// Call this on page load to get the result after a redirect sign-in
export async function getGoogleRedirectResult() {
    const { auth } = await initFirebase();
    const getResultFn = _getRedirectResultFn || (await import("firebase/auth")).getRedirectResult;
    return await getResultFn(auth);
}

// Pre-initialize Firebase in background so popup opens instantly with 0ms latency
export async function preloadFirebase() {
    try {
        await initFirebase();
    } catch (_) {}
}

// Automatically warm up Firebase on browser load
if (typeof window !== "undefined") {
    setTimeout(() => {
        preloadFirebase();
    }, 0);
}

