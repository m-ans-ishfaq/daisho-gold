import { Inter } from "next/font/google";
import "./globals.css";
import { CurrencyProvider } from "./context/currencyContext";
import NextAuthProvider from "./context/nextAuthProvider";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <CurrencyProvider>
      <html lang="en">
        <body className={inter.className}>
            <NextAuthProvider>
                {children}
            </NextAuthProvider>
        </body>
      </html>
    </CurrencyProvider>
  );
}
