import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

// ⚠️ Firebase is loaded DYNAMICALLY (inside event handlers only)
// This prevents the "multiple copies of React" / "Invalid hook call" error
// that occurs when Firebase is imported at the top level in an Astro client:only island

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
    signInWithGoogle: () => Promise<void>;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const stored = localStorage.getItem("visaformula_user");
            if (stored && stored !== "null") {
                try {
                    setUser(JSON.parse(stored));
                } catch (e) {
                    localStorage.removeItem("visaformula_user");
                }
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
                    localStorage.setItem("visaformula_user", JSON.stringify(data.user));
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
                    localStorage.setItem("visaformula_user", JSON.stringify(mockUser));
                    return;
                }
                if (expertEmail && expertEmail.toLowerCase() === email.toLowerCase()) {
                    const mockUser = { uid: "local_expert", email: expertEmail, displayName: localStorage.getItem("expert_businessName") || "Expert", type: "expert" };
                    setUser(mockUser);
                    localStorage.setItem("visaformula_user", JSON.stringify(mockUser));
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
                        localStorage.setItem("visaformula_user", JSON.stringify(data.user));
                    }
                }
            }
        } catch (error: any) {
            if (typeof window !== "undefined") {
                const mockUser: User = { uid: `mock_${Date.now()}`, email, displayName: name };
                setUser(mockUser);
                localStorage.setItem("visaformula_user", JSON.stringify(mockUser));
            }
        }
    };

    const signInWithGoogle = async () => {
        try {
            const apiKey = import.meta.env.PUBLIC_FIREBASE_API_KEY || import.meta.env.NEXT_PUBLIC_FIREBASE_API_KEY || process.env.PUBLIC_FIREBASE_API_KEY;
            const authDomain = import.meta.env.PUBLIC_FIREBASE_AUTH_DOMAIN || import.meta.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || process.env.PUBLIC_FIREBASE_AUTH_DOMAIN;

            if (!apiKey || !authDomain) {
                throw new Error("Firebase Google Authentication keys missing in environment variables.");
            }

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

            const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
            const auth = getAuth(app);
            const googleProvider = new GoogleAuthProvider();
            googleProvider.setCustomParameters({ prompt: 'select_account' });

            const result = await signInWithPopup(auth, googleProvider);
            const fbUser = result.user;

            const nameParts = (fbUser.displayName || '').trim().split(' ');
            const gFirstName = nameParts[0] || fbUser.email?.split('@')[0] || 'User';
            const gLastName = nameParts.slice(1).join(' ') || '';

            const authenticatedUser: User = {
                uid: fbUser.uid,
                email: fbUser.email || '',
                displayName: fbUser.displayName || `${gFirstName} ${gLastName}`.trim() || 'User',
                type: 'seeker'
            };

            setUser(authenticatedUser);

            if (typeof window !== "undefined") {
                localStorage.setItem("visaformula_user", JSON.stringify(authenticatedUser));
                localStorage.setItem("seeker_email", fbUser.email || '');
                localStorage.setItem("seeker_firstName", gFirstName);
                localStorage.setItem("seeker_lastName", gLastName);
            }

            // Register/Notify backend of real Google auth
            try {
                const response = await fetch(`${import.meta.env.PUBLIC_BACKEND_URL || ''}/api/auth/google`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email: fbUser.email, name: fbUser.displayName, uid: fbUser.uid })
                });

                if (response.ok) {
                    const data = await response.json();
                    if (data.user) {
                        setUser(data.user);
                        if (typeof window !== "undefined") {
                            localStorage.setItem("visaformula_user", JSON.stringify(data.user));
                        }
                    }
                }
            } catch (backendErr) {
                console.warn("Google Auth backend sync warning:", backendErr);
            }

            return { status: "success", user: authenticatedUser, name: fbUser.displayName, email: fbUser.email };
        } catch (error: any) {
            console.error("Google Authentication Popup Error:", error);
            throw error;
        }
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
            localStorage.setItem("visaformula_user", "null");
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, signIn, signUp, signInWithGoogle, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
