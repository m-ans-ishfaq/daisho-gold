import type { Metadata } from "next";
import "../globals.css";
import { Header } from "../components/header";
import { Footer } from "../components/footer";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Daisho Gold | Bike Parts",
  description: "We sell the best bike parts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
        {children}
        <Toaster />
      <Footer />
    </>
  );
}
