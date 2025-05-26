import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import { CartProvider } from "./context/cartContext";
import Header from "./ui/Header";
import Footer from "./ui/Footer";
import { nunitoSans } from "@/app/ui/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Create Shopify App",
  description: "Created by Shehu Abdulkadir",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${nunitoSans.className} antialiased`}>
        <Toaster position="top-right"/>
        <CartProvider>
          <div className="max-w-7xl mx-auto">
            <Header />
            {children}
            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
