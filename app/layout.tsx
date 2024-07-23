import { Inter } from "next/font/google";
import "@/app/globals.css";
import { CurrencyProvider } from "./context/currencyContext";
import NextAuthProvider from "./context/nextAuthProvider";
import { WhatsappIcon } from "./components/whatsapp";

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
            <WhatsappIcon />
        </body>
      </html>
    </CurrencyProvider>
  );
}
