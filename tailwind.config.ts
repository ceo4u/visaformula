import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
        "./pages/**/*.{ts,tsx}",
        "./components/**/*.{ts,tsx}",
        "./app/**/*.{ts,tsx}",
        "./src/**/*.{ts,tsx}",
    ],
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px",
            },
        },
        extend: {
            colors: {
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },
                tertiary: {
                    DEFAULT: "hsl(var(--tertiary))",
                    foreground: "hsl(var(--tertiary-foreground))",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },
                "surface-container-low": "hsl(218 40% 96%)",
                "surface-container-lowest": "hsl(0 0% 100%)",
                "surface-container-highest": "hsl(218 35% 92%)",
                "on-surface": "hsl(220 30% 10%)",
                "on-surface-variant": "hsl(220 15% 35%)",
                "secondary-fixed": "hsl(25 100% 92%)",
                "on-secondary-fixed": "hsl(25 80% 20%)",
                "primary-fixed": "hsl(217 80% 93%)",
                "on-primary-fixed": "hsl(217 80% 15%)",
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            fontFamily: {
                sans: ["var(--font-jakarta)", "sans-serif"],
                heading: ["var(--font-outfit)", "sans-serif"],
            },
            boxShadow: {
                "premium-soft": "0 20px 40px -15px rgba(0,0,0,0.05)",
                "premium-hover": "0 25px 50px -12px rgba(0,0,0,0.1), 0 0 20px 0 rgba(var(--primary-rgb), 0.1)",
                "premium-dark": "0 20px 40px -15px rgba(0,0,0,0.3)",
                "premium-dark-hover": "0 25px 50px -12px rgba(0,0,0,0.5), 0 0 20px 0 rgba(var(--primary-rgb), 0.2)",
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
            },
            keyframes: {
                "accordion-down": {
                    from: { height: "0" },
                    to: { height: "var(--radix-accordion-content-height)" },
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: "0" },
                },
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
};

export default config;
