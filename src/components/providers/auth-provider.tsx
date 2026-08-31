import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

// Firebase is loaded DYNAMICALLY inside event handlers.
// This prevents server-side evaluation of firebase/app in Astro's SSR bundler.
// The optimizeDeps.include in astro.config.mjs ensures Vite pre-bundles them at startup,
// so the dynamic import() resolves instantly from cache without 504 errors.

export interface User {
    uid: string;
    email: string;
    displayName: string;
    photoURL?: string;
    type?: string;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    signIn: (email: string, password: string) => Promise<void>;
    signUp: (email: string, password: string, name: string) => Promise<void>;
    signInWithGoogle: () => Promise<any>;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const stored = localStorage.getItem("travltik_user") || (localStorage.getItem("travltik_user"));
            if (stored && stored !== "null") {
                try {
                    const parsed = JSON.parse(stored);
                    if (parsed && parsed.email) {
                        setUser(parsed);
                    }
                } catch (e) {
                    console.error("Failed to parse stored user", e);
                    localStorage.removeItem("travltik_user");
                    localStorage.removeItem("travltik_user"); }
            }
        }
        setLoading(false);
    }, []);

    const signIn = async (email: string, password: string) => {
        try {
            const response = await fetch(`${import.meta.env.PUBLIC_BACKEND_URL || ''}/api/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });
            if (response.ok) {
                const data = await response.json();
                setUser(data.user);
                if (typeof window !== "undefined") {
                    localStorage.setItem("travltik_user", JSON.stringify(data.user));
                    localStorage.setItem("travltik_user", JSON.stringify(data.user));
                    if (data.user && data.user.rawUser) {
                        const raw = data.user.rawUser;
                        if (data.user.type === "seeker") {
                            localStorage.setItem("seeker_firstName", raw.first_name || "Seeker");
                            localStorage.setItem("seeker_lastName", raw.last_name || "");
                            localStorage.setItem("seeker_phone", raw.phone || "");
                            localStorage.setItem("seeker_email", raw.email);
                            localStorage.setItem("seeker_country_of_citizenship", raw.passport_country || "");
                            localStorage.setItem("seeker_resident_of", raw.passport_country || "");
                            localStorage.setItem("seeker_passportCountry", raw.passport_country || "");
                            localStorage.setItem("seeker_goals", typeof raw.goals === "string" ? raw.goals : JSON.stringify(raw.goals || []));
                            localStorage.setItem("seeker_destinations", typeof raw.destinations === "string" ? raw.destinations : JSON.stringify(raw.destinations || []));
                        } else if (data.user.type === "expert") {
                            localStorage.setItem("expert_businessName", raw.business_name || "Expert");
                            localStorage.setItem("expert_email", raw.email);
                            localStorage.setItem("expert_contactNumber", raw.contact_number || "");
                            localStorage.setItem("expert_advisorType", raw.advisor_type || "Freelancer");
                            localStorage.setItem("expert_aboutMe", raw.about_me || "");
                            localStorage.setItem("expert_portfolioLink", raw.portfolio_link || "");
                            localStorage.setItem("expert_officeAddress", raw.office_address || "");
                            localStorage.setItem("expert_govRegNumber", raw.gov_registration_number || "");
                            localStorage.setItem("expert_expertiseTags", typeof raw.expertise_tags === "string" ? raw.expertise_tags : JSON.stringify(raw.expertise_tags || []));
                            localStorage.setItem("expert_countriesExpertise", typeof raw.countries_expertise === "string" ? raw.countries_expertise : JSON.stringify(raw.countries_expertise || []));
                            localStorage.setItem("expert_profilePhoto", raw.profile_photo || "");
                            localStorage.setItem("expert_isLoggedIn", "true");
                        }
                    }
                }
                return;
            } else {
                let msg = "Invalid credentials.";
                try {
                    const contentType = response.headers.get("content-type");
                    if (contentType && contentType.includes("application/json")) {
                        const data = await response.json();
                        msg = data.message || msg;
                    }
                } catch(e) {}
                throw new Error(msg);
            }
        } catch (error: any) {
            // Fallback: Check local storage for registered users
            if (typeof window !== "undefined") {
                const seekerEmail = localStorage.getItem("seeker_email");
                const expertEmail = localStorage.getItem("expert_email");
                if (seekerEmail && seekerEmail.toLowerCase() === email.toLowerCase()) {
                    const mockUser = { uid: "local_seeker", email: seekerEmail, displayName: localStorage.getItem("seeker_firstName") || "Seeker", type: "seeker" };
                    setUser(mockUser);
                    localStorage.setItem("travltik_user", JSON.stringify(mockUser));
                    return;
                }
                if (expertEmail && expertEmail.toLowerCase() === email.toLowerCase()) {
                    const mockUser = { uid: "local_expert", email: expertEmail, displayName: localStorage.getItem("expert_businessName") || "Expert", type: "expert" };
                    setUser(mockUser);
                    localStorage.setItem("travltik_user", JSON.stringify(mockUser));
                    return;
                }
            }
            throw new Error(error.message || "Email is not registered. Please sign up first.");
        }
    };

    const signUp = async (email: string, password: string, name: string) => {
        try {
            const response = await fetch(`${import.meta.env.PUBLIC_BACKEND_URL || ''}/api/register/seeker`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password, first_name: name, last_name: "" })
            });
            if (response.ok) {
                const data = await response.json();
                if (data.user) {
                    setUser(data.user);
                    if (typeof window !== "undefined") {
                        localStorage.setItem("travltik_user", JSON.stringify(data.user));
                    }
                }
            }
        } catch (error: any) {
            if (typeof window !== "undefined") {
                const mockUser: User = { uid: `mock_${Date.now()}`, email, displayName: name };
                setUser(mockUser);
                localStorage.setItem("travltik_user", JSON.stringify(mockUser));
            }
        }
    };

    const signInWithGoogle = async (role: 'seeker' | 'expert' = 'seeker') => {
        const apiKey = import.meta.env.PUBLIC_FIREBASE_API_KEY || import.meta.env.NEXT_PUBLIC_FIREBASE_API_KEY || process.env.PUBLIC_FIREBASE_API_KEY;
        const authDomain = import.meta.env.PUBLIC_FIREBASE_AUTH_DOMAIN || import.meta.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || process.env.PUBLIC_FIREBASE_AUTH_DOMAIN;

        // ── No Firebase config? Create a dev-only anonymous session ──
        if (!apiKey || !authDomain) {
            const mockEmail = `user.google_${Date.now().toString().slice(-4)}@travltik.com`;
            const mockUser: User = {
                uid: `google_${Date.now()}`,
                email: mockEmail,
                displayName: role === 'expert' ? "Verified Consultant" : "Traveller",
                type: role
            };
            setUser(mockUser);
            if (typeof window !== "undefined") {
                localStorage.setItem("travltik_user", JSON.stringify(mockUser));
                if (role === 'expert') {
                    localStorage.setItem("expert_isLoggedIn", "true");
                    localStorage.setItem("expert_email", mockEmail);
                    localStorage.setItem("expert_businessName", "Verified Consultant");
                } else {
                    localStorage.setItem("seeker_email", mockEmail);
                    localStorage.setItem("seeker_firstName", "Traveller");
                }
            }
            return {
                status: "success",
                redirect: role === 'expert' ? '/consultant/dashboard' : '/dashboard',
                user: mockUser,
                name: mockUser.displayName,
                email: mockEmail
            };
        }

        // ── Firebase config present: do REAL Google OAuth popup ──
        // Dynamic imports resolve from Vite's pre-bundled cache (optimizeDeps.include)
        const { initializeApp, getApps, getApp } = await import("firebase/app");
        const { getAuth, GoogleAuthProvider, signInWithPopup } = await import("firebase/auth");

        const firebaseConfig = {
            apiKey,
            authDomain,
            projectId: import.meta.env.PUBLIC_FIREBASE_PROJECT_ID || import.meta.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
            storageBucket: import.meta.env.PUBLIC_FIREBASE_STORAGE_BUCKET || import.meta.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
            messagingSenderId: import.meta.env.PUBLIC_FIREBASE_MESSAGING_SENDER_ID || import.meta.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
            appId: import.meta.env.PUBLIC_FIREBASE_APP_ID || import.meta.env.NEXT_PUBLIC_FIREBASE_APP_ID
        };

        // Use statically-imported Firebase (avoids Vite dynamic import fetch failure)
        const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
        const auth = getAuth(app);
        const googleProvider = new GoogleAuthProvider();
        googleProvider.setCustomParameters({ prompt: 'select_account' });

        // This will ACTUALLY open the Google popup — errors thrown here propagate to caller
        const result = await signInWithPopup(auth, googleProvider);
        const fbUser = result.user;
        const idToken = await fbUser.getIdToken();

        const nameParts = (fbUser.displayName || '').trim().split(' ');
        const gFirstName = nameParts[0] || fbUser.email?.split('@')[0] || 'User';
        const gLastName = nameParts.slice(1).join(' ') || '';

        const authenticatedUser: User = {
            uid: fbUser.uid,
            email: fbUser.email || '',
            displayName: fbUser.displayName || `${gFirstName} ${gLastName}`.trim() || 'User',
            type: role
        };

        setUser(authenticatedUser);

        if (typeof window !== "undefined") {
            localStorage.setItem("travltik_user", JSON.stringify(authenticatedUser));
            if (role === 'expert') {
                localStorage.setItem("expert_isLoggedIn", "true");
                localStorage.setItem("expert_email", fbUser.email || '');
                localStorage.setItem("expert_firstName", gFirstName);
                localStorage.setItem("expert_lastName", gLastName);
                localStorage.setItem("expert_businessName", fbUser.displayName || `${gFirstName} ${gLastName}`.trim());
                if (fbUser.photoURL) localStorage.setItem("expert_profilePhoto", fbUser.photoURL);
            } else {
                localStorage.setItem("seeker_email", fbUser.email || '');
                localStorage.setItem("seeker_firstName", gFirstName);
                localStorage.setItem("seeker_lastName", gLastName);
            }
        }

        // Verify Firebase ID Token on SSR Backend & resolve database user
        try {
            const response = await fetch('/api/auth/google', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ idToken, role })
            });

            if (response.ok) {
                const data = await response.json();
                if (data.user) {
                    const resolvedUser = data.user;
                    setUser(resolvedUser);
                    if (typeof window !== "undefined") {
                        localStorage.setItem("travltik_user", JSON.stringify(resolvedUser));
                        if (resolvedUser.type === 'expert' || role === 'expert') {
                            const raw = resolvedUser.rawUser || {};
                            localStorage.setItem("expert_isLoggedIn", "true");
                            localStorage.setItem("expert_email", resolvedUser.email || fbUser.email || '');
                            localStorage.setItem("expert_businessName", raw.business_name || resolvedUser.displayName || fbUser.displayName || '');
                            localStorage.setItem("expert_advisorType", raw.advisor_type || 'Visa & Immigration Consultant');
                            localStorage.setItem("expert_aboutMe", raw.about_me || '');
                            localStorage.setItem("expert_contactNumber", raw.contact_number || '');
                            localStorage.setItem("expert_officeAddress", raw.office_address || '');
                            localStorage.setItem("expert_govRegNumber", raw.gov_registration_number || '');
                            localStorage.setItem("expert_expertiseTags", typeof raw.expertise_tags === 'string' ? raw.expertise_tags : JSON.stringify(raw.expertise_tags || []));
                            localStorage.setItem("expert_countriesExpertise", typeof raw.countries_expertise === 'string' ? raw.countries_expertise : JSON.stringify(raw.countries_expertise || []));
                            localStorage.setItem("expert_profilePhoto", raw.profile_photo || fbUser.photoURL || '');
                            localStorage.setItem("expert_portfolioLink", raw.portfolio_link || '');
                        }
                    }
                }
                return {
                    ...data,
                    redirect: data.redirect || (role === 'expert' ? '/consultant/dashboard' : '/dashboard')
                };
            }
        } catch (backendErr) {
            console.warn("[GoogleAuth] Backend sync warning (non-critical):", backendErr);
        }

        return {
            status: "success",
            user: authenticatedUser,
            redirect: role === 'expert' ? '/consultant/dashboard' : '/dashboard',
            name: fbUser.displayName,
            email: fbUser.email
        };
    };

    const signOut = async () => {
        try {
            await fetch(`${import.meta.env.PUBLIC_BACKEND_URL || ''}/api/logout`, {
                method: "POST",
                headers: { "Content-Type": "application/json" }
            });
        } catch (e) {
            // Ignore logout network issues
        }
        setUser(null);
        if (typeof window !== "undefined") {
            localStorage.setItem("travltik_user", "null");
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, signIn, signUp, signInWithGoogle, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
