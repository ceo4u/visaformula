import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { MobileNav } from "@/components/layout/mobile-nav";
import { EmergencyFab } from "@/components/shared/emergency-fab";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { AuthProvider } from "@/components/providers/auth-provider";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta" });

export const metadata: Metadata = {
  title: "VisaHub | The Digital Diplomat for Global Migration",
  description: "Apply visa smarter, faster, safer. Connect experts, and track your visa in one place.",
  keywords: "visa, immigration, lawyer, consultant, migration, work visa, student visa",
  authors: [{ name: "VisaHub Team" }],
  openGraph: {
    title: "VisaHub - Digital Diplomat for Global Migration",
    description: "Streamline your visa journey with AI-powered tools and expert legal guidance.",
    type: "website",
    locale: "en_US",
    url: "https://visahub.com",
    siteName: "VisaHub",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${jakarta.variable} ${outfit.variable} font-sans antialiased text-on-surface bg-background selection:bg-primary/20 selection:text-primary`}>
        <AuthProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
            <Header />
            <main className="min-h-screen pt-16 md:pt-20">{children}</main>
            <Footer />
            <MobileNav />
            <EmergencyFab />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
