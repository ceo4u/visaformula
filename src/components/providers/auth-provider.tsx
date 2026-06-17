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
        await delay(1200); // simulate auth delay
        if (password.length < 6) throw new Error("Invalid email or password.");
        const loggedInUser = { ...DEMO_USER, email, displayName: email.split("@")[0] };
        setUser(loggedInUser);
        if (typeof window !== "undefined") {
            localStorage.setItem("visaformula_user", JSON.stringify(loggedInUser));
        }
    };

    const signUp = async (email: string, password: string, name: string) => {
        await delay(1500);
        if (password.length < 6) throw new Error("Password must be at least 6 characters.");
        const signedUpUser = { ...DEMO_USER, email, displayName: name };
        setUser(signedUpUser);
        if (typeof window !== "undefined") {
            localStorage.setItem("visaformula_user", JSON.stringify(signedUpUser));
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
        await delay(500);
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
