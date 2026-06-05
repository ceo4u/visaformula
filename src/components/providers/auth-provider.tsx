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
    email: "demo@visara.com",
    displayName: "Demo User",
    photoURL: "https://lh3.googleusercontent.com/aida-public/AB6AXuCPX5DdMioKPF507Mg3uao_AKD7Y3D0cr4Oxpjz4j9Zhvn61dy6OJs_n9QaPUnw16htoJMGcQD5P48-Iiv7vxYN7ldHTnhRhVZcJD6vIDKa8nDLb457YmRDk8yMBA54syMEntEGlBvXj7AArUmykZR1L8yeGJ80eTIHcxGbTpw179ybHlUG-c9pydM6kYBqpeeOuXkS7JQZYR50642AqYN6oq9VYLrzRuhFithlymj6S07GbapH1EGotT-47tHyl3bgeiYhNPV4xWaW",
};

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(DEMO_USER);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(false);
    }, []);

    const signIn = async (email: string, password: string) => {
        await delay(1200); // simulate auth delay
        if (password.length < 6) throw new Error("Invalid email or password.");
        setUser({ ...DEMO_USER, email, displayName: email.split("@")[0] });
    };

    const signUp = async (email: string, password: string, name: string) => {
        await delay(1500);
        if (password.length < 6) throw new Error("Password must be at least 6 characters.");
        setUser({ ...DEMO_USER, email, displayName: name });
    };

    const signInWithGoogle = async () => {
        await delay(1000);
        setUser(DEMO_USER);
    };

    const signOut = async () => {
        await delay(500);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, signIn, signUp, signInWithGoogle, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
