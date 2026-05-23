import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { MobileNav } from "@/components/layout/mobile-nav";
import { EmergencyFab } from "@/components/shared/emergency-fab";
import { TalkToUs } from "@/components/shared/talk-to-us";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { AuthProvider } from "@/components/providers/auth-provider";

export const metadata: Metadata = {
  title: "Visara | Immigration Marketplace",
  description: "Apply visa smarter, faster, safer. Connect with verified experts, top universities, and track your visa journey — all in one place.",
  keywords: "visa, immigration, experts, lawyer, consultant, migration, work visa, student visa, express entry, work permit, IELTS",
  authors: [{ name: "Visara Team" }],
  openGraph: {
    title: "Visara - Immigration Marketplace",
    description: "Your global marketplace for immigration experts, universities, jobs, and more.",
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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-dmsans antialiased text-navy bg-background selection:bg-primary/20 selection:text-primary">
        <AuthProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
            <Header />
            <main className="min-h-screen">{children}</main>
            <Footer />
            <MobileNav />
            <EmergencyFab />
            <TalkToUs />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
