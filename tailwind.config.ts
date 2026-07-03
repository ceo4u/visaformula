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
                    container: "hsl(var(--primary-container))",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },
                tertiary: {
                    DEFAULT: "hsl(var(--tertiary))",
                    foreground: "hsl(var(--tertiary-foreground))",
                    container: "hsl(var(--tertiary-container))",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                error: {
                    DEFAULT: "hsl(var(--error))",
                    container: "hsl(var(--error-container))",
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
                surface: {
                    DEFAULT: "hsl(var(--surface))",
                    container: "hsl(var(--surface-container))",
                    "container-low": "hsl(var(--surface-container-low))",
                    "container-lowest": "hsl(var(--surface-container-lowest))",
                    "container-high": "hsl(var(--surface-container-high))",
                    "container-highest": "hsl(var(--surface-container-highest))",
                },
                "on-surface": {
                    DEFAULT: "hsl(var(--on-surface))",
                    variant: "hsl(var(--on-surface-variant))",
                },
                outline: {
                    DEFAULT: "hsl(var(--outline))",
                    variant: "hsl(var(--outline-variant))",
                },
                // New VisaFormula design system colors
                navy: "#000000",
                ink: "#111111",
                hint: "#8FAEC4",
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            fontFamily: {
                sans: ["Helvetica Neue", "Helvetica", "Arial", "sans-serif"],
                montserrat: ["Helvetica Neue", "Helvetica", "Arial", "sans-serif"],
                sora: ["Helvetica Neue", "Helvetica", "Arial", "sans-serif"],
                dmsans: ["Helvetica Neue", "Helvetica", "Arial", "sans-serif"],
                heading: ["Helvetica Neue", "Helvetica", "Arial", "sans-serif"],
                jakarta: ["Helvetica Neue", "Helvetica", "Arial", "sans-serif"],
                poppins: ["Helvetica Neue", "Helvetica", "Arial", "sans-serif"],
            },
            boxShadow: {
                "editorial": "0 1px 4px rgba(0,0,0,0.1)",
                "editorial-lg": "0 4px 12px rgba(0,0,0,0.15)",
                "editorial-xl": "0 8px 30px rgba(0,0,0,0.12)",
                "card": "0 2px 12px rgba(14,165,233,.10), 0 4px 20px rgba(12,26,52,.07)",
                "card-hover": "0 4px 24px rgba(14,165,233,.15), 0 8px 32px rgba(12,26,52,.09)",
                "premium-card": "0 4px 10px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.04)",
                "premium-card-hover": "0 20px 38px rgba(0,0,0,0.12), 0 8px 16px rgba(0,0,0,0.06)",
            },
            keyframes: {
                "fade-up": {
                    "0%": { opacity: "0", transform: "translateY(12px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
            },
            animation: {
                "fade-up": "fade-up 0.3s ease-out forwards",
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
};

export default config;
