import type { Metadata } from "next";
import { Noto_Sans_Display } from "next/font/google";
import {Toaster} from "@/components/ui/toaster"
import "./globals.css";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'




const noto = Noto_Sans_Display({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Proyecto universitario",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={noto.className}>
        {children}
        <Toaster/>
      </body>
    </html>
    </ClerkProvider>
  );
}
