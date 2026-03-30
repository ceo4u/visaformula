import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { MobileNav } from "@/components/layout/mobile-nav";
import { EmergencyFab } from "@/components/shared/emergency-fab";
import { ThemeProvider } from "@/components/providers/theme-provider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "VisaHub | The Digital Diplomat for Global Migration",
  description: "Apply visa smarter, faster, safer. Check eligibility, connect experts, and track your visa in one place.",
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
      <body className={`${inter.variable} font-sans antialiased bg-background text-on-surface`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <Header />
          <main className="min-h-screen pt-16 md:pt-20">{children}</main>
          <Footer />
          <MobileNav />
          <EmergencyFab />
        </ThemeProvider>
      </body>
    </html>
  );
}
