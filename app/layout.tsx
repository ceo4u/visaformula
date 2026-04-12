import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { MobileNav } from "@/components/layout/mobile-nav";
import { EmergencyFab } from "@/components/shared/emergency-fab";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { AuthProvider } from "@/components/providers/auth-provider";

export const metadata: Metadata = {
  title: "Visara | Immigration Marketplace",
  description: "Apply visa smarter, faster, safer. Connect experts, and track your visa in one place.",
  keywords: "visa, immigration, experts, lawyer, consultant, migration, work visa, student visa",
  authors: [{ name: "Visara Team" }],
  openGraph: {
    title: "Visara - Immigration Marketplace",
    description: "Streamline your visa journey with expert guidance.",
    type: "website",
    locale: "en_US",
    url: "https://visara.com",
    siteName: "Visara",
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
      <body className="font-sans antialiased text-on-surface bg-background selection:bg-primary/20 selection:text-primary">
        <AuthProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
            <Header />
            <main className="min-h-screen">{children}</main>
            <Footer />
            <MobileNav />
            <EmergencyFab />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
