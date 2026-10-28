import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Notes",
  description: "A simple notes app built with Next.js",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background font-sans text-foreground">
        <header className="border-b border-stone-200 bg-white">
          <div className="mx-auto flex max-w-2xl items-center px-4 py-4">
            <Link href="/notes" className="text-lg font-semibold tracking-tight">
              Notes
            </Link>
          </div>
        </header>
        <div className="mx-auto w-full max-w-2xl flex-1 px-4 py-8">
          {children}
        </div>
      </body>
    </html>
  );
}