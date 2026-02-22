import type { Metadata } from "next";
import { Syne, Manrope } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import { getDbData } from "@/lib/db";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const db = await getDbData();
  return {
    title: `${db.profile.name} | Portfolio`,
    description: `${db.profile.role} Portfolio`,
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const db = await getDbData();

  return (
    <html lang="en">
      <body
        className={`${syne.variable} ${manrope.variable} antialiased bg-black text-white selection:bg-white selection:text-black scroll-smooth`}
      >
        <CustomCursor />
        <Navbar profile={db.profile} contact={db.contact} />
        {children}
      </body>
    </html>
  );
}
