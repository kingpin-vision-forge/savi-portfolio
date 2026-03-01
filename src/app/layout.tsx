import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import CartDrawer from "@/components/CartDrawer";
import GlobalBackground from "@/components/GlobalBackground";
import AppLoadingWrapper from "@/components/AppLoadingWrapper";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "SAVI - Premium Packaged Water",
  description: "SAVI delivers pristine molecular hydration with unmatched logistical precision. A darker, deeper commitment to purity.",
  keywords: ["packaged water", "premium water", "SAVI", "hydration", "pure water"],
  icons: {
    icon: "/images/logo-black.jpeg",
    apple: "/images/logo-black.jpeg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${manrope.variable} font-sans antialiased bg-[#0a0a0a] text-[#f5f5f5] overflow-x-hidden`}>
        <GlobalBackground />
        <CartProvider>
          <AppLoadingWrapper>
            <div className="relative z-10">
              {children}
            </div>
          </AppLoadingWrapper>
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}

