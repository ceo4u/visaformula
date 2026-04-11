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
                /* Legacy compat */
                "surface-container-low": "hsl(var(--surface-container-low))",
                "surface-container-lowest": "hsl(var(--surface-container-lowest))",
                "surface-container-highest": "hsl(var(--surface-container-highest))",
                "on-surface-variant": "hsl(var(--on-surface-variant))",
                "secondary-fixed": "hsl(45 100% 90%)",
                "on-secondary-fixed": "hsl(45 80% 20%)",
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
                "editorial": "0 1px 4px rgba(0,0,0,0.1)",
                "editorial-lg": "0 4px 16px rgba(0,0,0,0.08)",
                "editorial-xl": "0 8px 30px rgba(0,0,0,0.12)",
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
