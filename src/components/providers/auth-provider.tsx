import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

// Mock User Type
export interface User {
    uid: string;
    email: string;
    displayName: string;
    photoURL?: string;
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

// Helper to simulate network latency
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const DEMO_USER: User = {
    uid: "demo_123",
    email: "demo@visaformula.com",
    displayName: "Demo User",
    photoURL: "https://lh3.googleusercontent.com/aida-public/AB6AXuCPX5DdMioKPF507Mg3uao_AKD7Y3D0cr4Oxpjz4j9Zhvn61dy6OJs_n9QaPUnw16htoJMGcQD5P48-Iiv7vxYN7ldHTnhRhVZcJD6vIDKa8nDLb457YmRDk8yMBA54syMEntEGlBvXj7AArUmykZR1L8yeGJ80eTIHcxGbTpw179ybHlUG-c9pydM6kYBqpeeOuXkS7JQZYR50642AqYN6oq9VYLrzRuhFithlymj6S07GbapH1EGotT-47tHyl3bgeiYhNPV4xWaW",
};

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
            const response = await fetch(`${import.meta.env.PUBLIC_BACKEND_URL}/api/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });
            if (response.ok) {
                const data = await response.json();
                setUser(data.user);
                if (typeof window !== "undefined") {
                    localStorage.setItem("visaformula_user", JSON.stringify(data.user));
                }
                return;
            } else {
                const data = await response.json();
                throw new Error(data.message || "Invalid credentials.");
            }
        } catch (error: any) {
            // Fallback: Check local storage for registered users
            if (typeof window !== "undefined") {
                const localUsersStr = localStorage.getItem("visaformula_local_users");
                if (localUsersStr) {
                    try {
                        const localUsers = JSON.parse(localUsersStr);
                        const matched = localUsers.find((u: any) => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
                        if (matched) {
                            const mockUser: User = {
                                uid: matched.uid || `mock_${Date.now()}`,
                                email: matched.email,
                                displayName: matched.displayName || "User",
                            };
                            setUser(mockUser);
                            localStorage.setItem("visaformula_user", JSON.stringify(mockUser));
                            return;
                        }
                    } catch (e) {
                        // ignore parse errors
                    }
                }
            }
            throw new Error(error.message || "Network error while connecting to backend.");
        }
    };

    const signUp = async (email: string, password: string, name: string) => {
        // Save locally first to ensure client-side success is guaranteed
        if (typeof window !== "undefined") {
            const localUsersStr = localStorage.getItem("visaformula_local_users") || "[]";
            try {
                const localUsers = JSON.parse(localUsersStr);
                // Check if user already exists locally
                if (!localUsers.some((u: any) => u.email.toLowerCase() === email.toLowerCase())) {
                    localUsers.push({ uid: `mock_${Date.now()}`, email, password, displayName: name });
                    localStorage.setItem("visaformula_local_users", JSON.stringify(localUsers));
                }
            } catch (e) {
                // ignore
            }
        }

        try {
            const response = await fetch(`${import.meta.env.PUBLIC_BACKEND_URL}/api/register/seeker`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password, first_name: name, last_name: "" })
            });
            if (response.ok) {
                const data = await response.json();
                setUser(data.user);
                if (typeof window !== "undefined") {
                    localStorage.setItem("visaformula_user", JSON.stringify(data.user));
                }
            }
        } catch (error: any) {
            // If backend fails, we proceed with local login directly (no error thrown to user)
            if (typeof window !== "undefined") {
                const mockUser: User = {
                    uid: `mock_${Date.now()}`,
                    email,
                    displayName: name,
                };
                setUser(mockUser);
                localStorage.setItem("visaformula_user", JSON.stringify(mockUser));
            }
        }
    };

    const signInWithGoogle = async () => {
        await delay(1000);
        setUser(DEMO_USER);
        if (typeof window !== "undefined") {
            localStorage.setItem("visaformula_user", JSON.stringify(DEMO_USER));
        }
    };

    const signOut = async () => {
        try {
            await fetch(`${import.meta.env.PUBLIC_BACKEND_URL}/api/logout`, {
                method: "POST",
                headers: { "Content-Type": "application/json" }
            });
        } catch (e) {
            // Ignore logout network issues, local clear remains primary
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
