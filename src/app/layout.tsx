import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { Navigation } from "@/components/layout/navigation";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Piyush Zala — Frontend Software Engineer",
  description:
    "Portfolio of Piyush Zala — Frontend Software Engineer specializing in React, Next.js, and TypeScript. 3+ years of experience building modern web applications.",
  keywords: ["Piyush Zala", "Frontend Engineer", "React", "Next.js", "TypeScript", "Portfolio"],
  authors: [{ name: "Piyush Zala" }],
  openGraph: {
    title: "Piyush Zala — Frontend Software Engineer",
    description: "Frontend Software Engineer specializing in React, Next.js, and TypeScript.",
    url: "https://portfolio-latest-taupe.vercel.app",
    siteName: "Piyush Zala Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Piyush Zala — Frontend Software Engineer",
    description: "Frontend Software Engineer specializing in React, Next.js, and TypeScript.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased`}
      >
        <ThemeProvider>
          <AuroraBackground />
          <Navigation />
          <main className="relative z-10">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
