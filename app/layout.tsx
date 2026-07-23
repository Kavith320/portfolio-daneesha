import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/ThemeProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Daneesha Disanayake | Full Stack Developer",
  description: "Personal Portfolio of Daneesha Disanayake - Undergraduate MERN Stack Software Engineer specializing in scalable web systems.",
  keywords: ["MERN Stack", "React", "Node.js", "TypeScript", "Next.js", "Express", "Portfolio", "Software Engineer", "Colombo", "Sri Lanka"],
  authors: [{ name: "Daneesha Disanayake" }],
  openGraph: {
    title: "Daneesha Disanayake | Full Stack Developer",
    description: "Personal Portfolio of Daneesha Disanayake - Undergraduate MERN Stack Software Engineer specializing in scalable web systems.",
    type: "website",
    locale: "en_US",
    url: "https://daneesha-portfolio.vercel.app",
    siteName: "Daneesha Disanayake Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Daneesha Disanayake | Full Stack Developer",
    description: "Personal Portfolio of Daneesha Disanayake - Undergraduate MERN Stack Software Engineer specializing in scalable web systems.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full bg-zinc-50 text-zinc-900 dark:bg-[#09090B] dark:text-zinc-100 transition-colors duration-300 flex flex-col">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
