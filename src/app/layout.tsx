import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import "./globals.css";
import RegisterModal from "@/modals/RegisterModal";
import LoginModal from "@/modals/LoginModal";
import { Toaster } from "react-hot-toast";
import CreateListingModal from "@/modals/CreateListingModal";
import FilterModal from "@/modals/FilterModal";

const nunito = Nunito_Sans({
  variable: "--font-listing",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Romantic Jacuzzi 1BHK Candolim | Mirashya UG10",
  description:
    "Entire serviced apartment in Candolim, Goa — Airbnb listing clone for Playpower assessment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${nunito.className} antialiased`}>
        {children}
        <RegisterModal />
        <LoginModal />
        <Toaster />
        <CreateListingModal />
        <FilterModal />
      </body>
    </html>
  );
}
