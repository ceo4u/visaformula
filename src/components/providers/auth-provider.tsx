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
    signIn: (email: string, password: string, turnstileToken?: string) => Promise<void>;
    signUp: (email: string, password: string, name: string) => Promise<void>;
    signInWithGoogle: (role?: 'seeker' | 'expert', mode?: 'login' | 'signup', turnstileToken?: string) => Promise<any>;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const init = async () => {
            if (typeof window === "undefined") { setLoading(false); return; }

            // ---- Check for pending Google Redirect result (from signInWithRedirect flow) ----
            try {
                const { getGoogleRedirectResult } = await import("../../lib/firebase");
                const redirectResult = await getGoogleRedirectResult();
                if (redirectResult && redirectResult.user) {
                    const fbUser = redirectResult.user;
                    const idToken = await fbUser.getIdToken();
                    const googleEmail = (fbUser.email || '').toLowerCase().trim();
                    const googleName = fbUser.displayName || '';
                    const googlePhoto = fbUser.photoURL || '';
                    const googleUid = fbUser.uid || '';
                    const role = (sessionStorage.getItem("google_auth_role") || 'seeker') as 'seeker' | 'expert';
                    const rawReturn = sessionStorage.getItem("google_auth_return");
                    const returnPath = (rawReturn && rawReturn.startsWith("/") && rawReturn !== "/" && rawReturn !== "/login" && !rawReturn.startsWith("/login?")) ? rawReturn : "/dashboard";
                    sessionStorage.removeItem("google_auth_return");
                    sessionStorage.removeItem("google_auth_role");

                    const nameParts = (googleName || '').trim().split(' ');
                    const gFirstName = nameParts[0] || googleEmail.split('@')[0] || 'User';
                    const gLastName = nameParts.slice(1).join(' ') || '';

                    // Build local user object as fallback
                    const localUser: User = {
                        uid: googleUid,
                        email: googleEmail,
                        displayName: googleName || gFirstName,
                        photoURL: googlePhoto,
                        type: role,
                    };

                    // Try backend sync (optional — don't block on failure)
                    try {
                        const response = await fetch('/api/auth/google', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ idToken, googleProfile: { email: googleEmail, name: googleName, picture: googlePhoto, uid: googleUid }, role }),
                        });
                        if (response.ok) {
                            const data = await response.json();
                            if (data.user) {
                                const resolvedUser = { ...localUser, ...data.user };
                                setUser(resolvedUser);
                                localStorage.setItem("travltik_user", JSON.stringify(resolvedUser));
                                localStorage.setItem("seeker_email", googleEmail);
                                localStorage.setItem("seeker_firstName", gFirstName);
                                localStorage.setItem("seeker_lastName", gLastName);
                                window.location.href = resolvedUser.type === "expert" ? "/consultant/dashboard" : returnPath;
                                return;
                            }
                        }
                    } catch (_) {
                        console.warn("[GoogleAuth] Backend sync failed, using Firebase user directly");
                    }

                    // FALLBACK: Use Firebase user data directly — don't block login on backend
                    setUser(localUser);
                    localStorage.setItem("travltik_user", JSON.stringify(localUser));
                    localStorage.setItem("seeker_email", googleEmail);
                    localStorage.setItem("seeker_firstName", gFirstName);
                    localStorage.setItem("seeker_lastName", gLastName);
                    window.location.href = role === "expert" ? "/consultant/dashboard" : returnPath;
                    return;
                }
            } catch (err) {
                // No redirect result or Firebase not ready — normal page load
                console.debug("[Auth] No redirect result:", err);
            }

            // ---- Restore session from localStorage ----
            const stored = localStorage.getItem("travltik_user");
            if (stored && stored !== "null") {
                try {
                    const parsed = JSON.parse(stored);
                    if (parsed && parsed.email) setUser(parsed);
                } catch (e) {
                    localStorage.removeItem("travltik_user");
                }
            }
            setLoading(false);

            // Pre-warm Firebase in the background so "Continue with Google" popup opens with 0ms latency
            setTimeout(() => {
                import("../../lib/firebase").then(m => m.preloadFirebase?.()).catch(() => {});
            }, 300);
        };
        init();
    }, []);

    const signIn = async (email: string, password: string, turnstileToken?: string) => {
        try {
            const response = await fetch(`${import.meta.env.PUBLIC_BACKEND_URL || ''}/api/login`, {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    ...(turnstileToken ? { "x-turnstile-token": turnstileToken } : {})
                },
                body: JSON.stringify({ email, password, turnstileToken })
            });
            if (response.ok) {
                const data = await response.json();
                setUser(data.user);
                if (typeof window !== "undefined") {
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
                        msg = data.message || data.error || msg;
                    }
                } catch(e) {}
                throw new Error(msg);
            }
        } catch (error: any) {
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

    const signInWithGoogle = async (role: 'seeker' | 'expert' = 'seeker', mode: 'login' | 'signup' = 'login', turnstileToken?: string) => {
        let fbUser: any = null;
        let idToken: string | null = null;
        let googleEmail = '';
        let googleName = '';
        let googlePhoto = '';
        let googleUid = '';

        try {
            const { loginWithGooglePopup } = await import("../../lib/firebase");
            const result = await loginWithGooglePopup();
            fbUser = result.user;
            if (fbUser) {
                idToken = await fbUser.getIdToken();
                googleEmail = (fbUser.email || '').toLowerCase().trim();
                googleName = fbUser.displayName || '';
                googlePhoto = fbUser.photoURL || '';
                googleUid = fbUser.uid || '';
            }
        } catch (fbErr: any) {
            const code = fbErr?.code || '';
            const msg = fbErr?.message || '';
            if (code === 'auth/popup-closed-by-user' || msg.includes('popup-closed') || msg.includes('closed-by-user')) {
                throw new Error('Google sign-in was cancelled.');
            }
            if (code === 'auth/popup-blocked') {
                throw new Error('Popup blocked. Please allow popups and try again.');
            }
            throw new Error(msg || 'Google sign-in failed. Please try again.');
        }

        if (!googleEmail) throw new Error('Could not get Google account details.');

        // STRICT DATABASE-BACKED AUTHENTICATION — NO DUMMY LOCALSTORAGE
        const resp = await fetch('/api/auth/google', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                ...(turnstileToken ? { 'x-turnstile-token': turnstileToken } : {})
            },
            body: JSON.stringify({
                idToken,
                turnstileToken,
                googleProfile: {
                    email: googleEmail,
                    name: googleName,
                    picture: googlePhoto,
                    uid: googleUid
                },
                role,
                mode
            }),
        });

        const data = await resp.json();

        if (!resp.ok || data.status === 'error') {
            throw new Error(data.message || 'Authentication failed.');
        }

        const realUser: User = data.user;
        setUser(realUser);

        if (typeof window !== "undefined") {
            localStorage.setItem('travltik_user', JSON.stringify(realUser));
            if (realUser.type === 'expert') {
                localStorage.setItem('expert_isLoggedIn', 'true');
                localStorage.setItem('expert_email', realUser.email);
                localStorage.setItem('expert_businessName', realUser.displayName || realUser.rawUser?.business_name || '');
                if (googlePhoto) localStorage.setItem('expert_profilePhoto', googlePhoto);
            } else {
                const names = (realUser.displayName || googleName || '').trim().split(' ');
                localStorage.setItem('seeker_email', realUser.email);
                localStorage.setItem('seeker_firstName', names[0] || 'User');
                localStorage.setItem('seeker_lastName', names.slice(1).join(' ') || '');
            }
        }

        return {
            status: 'success',
            ...data,
            redirect: data.redirect || (realUser.type === 'expert' ? '/consultant/dashboard' : '/dashboard')
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
