import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { Header } from "../components/header";
import { Footer } from "../components/footer";
import { CurrencyProvider } from "../context/currencyContext";

const inter = Inter({ subsets: ["latin"] });

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
    <CurrencyProvider>
      <html lang="en">
        <body className={inter.className}>
          <Header />
          {children}
          <Footer />
        </body>
      </html>
    </CurrencyProvider>
  );
}