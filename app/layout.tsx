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
  title: "Traductor - LSE",
  description: "Aplicación web innovadora que facilita la comunicación entre personas oyentes y sordas, traduciendo en tiempo real el lenguaje de señas ecuatoriano a texto y voz.",
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
