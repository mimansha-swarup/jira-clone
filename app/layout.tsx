import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
// import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/lib/authContext";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bug Tracker",
  description: "A comprehensive bug and task tracking application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} dark`}>
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
