import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import CartDrawer from "@/components/CartDrawer";
import GlobalBackground from "@/components/GlobalBackground";
import AppLoadingWrapper from "@/components/AppLoadingWrapper";
import PageTransitionProvider from "@/components/PageTransitionProvider";
import { MusicPlayerProvider } from "@/context/MusicPlayerContext";
import GlobalMusicPlayer from "@/components/GlobalMusicPlayer";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.saviwaters.com"),
  title: "SAVI - Premium Packaged Water",
  description: "SAVI delivers pristine molecular hydration with unmatched logistical precision. A darker, deeper commitment to purity.",
  keywords: ["packaged water", "premium water", "SAVI", "hydration", "pure water"],
  icons: {
    icon: [{ url: "/images/favicon.jpeg?v=2", type: "image/jpeg" }],
    shortcut: "/images/favicon.jpeg?v=2",
    apple: [{ url: "/images/favicon.jpeg?v=2", type: "image/jpeg" }],
  },
  openGraph: {
    title: "SAVI - Premium Packaged Water",
    description: "SAVI delivers pristine molecular hydration with unmatched logistical precision.",
    url: "/",
    siteName: "SAVI",
    type: "website",
    images: [
      {
        url: "/images/logo.jpeg?v=2",
        width: 1051,
        height: 601,
        alt: "SAVI Packaged Drinking Water",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SAVI - Premium Packaged Water",
    description: "SAVI delivers pristine molecular hydration with unmatched logistical precision.",
    images: ["/images/logo.jpeg?v=2"],
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
        <MusicPlayerProvider>
          <CartProvider>
            <AppLoadingWrapper>
              <PageTransitionProvider>
                <div className="relative z-10">
                  {children}
                </div>
              </PageTransitionProvider>
            </AppLoadingWrapper>
            <CartDrawer />
          </CartProvider>
          <GlobalMusicPlayer />
        </MusicPlayerProvider>
      </body>
    </html>
  );
}
