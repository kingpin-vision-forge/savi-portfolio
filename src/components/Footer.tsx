'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Droplets, Facebook, Instagram, Twitter, Linkedin, MapPin, ArrowRight, ShoppingBag, Shield, FileText, Cookie } from 'lucide-react';

export default function Footer() {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // If on home page, scroll to section
    if (isHomePage) {
      e.preventDefault();
      const sectionId = href.slice(1);
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    // If on another page, let Link handle navigation to home page with hash
  };

  return (
    <footer className="w-full border-t border-white/5 bg-[#121212] pt-16 pb-8">
      <div className="px-6 md:px-20 mx-auto max-w-[1400px]">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 mb-16">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1 lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Droplets className="size-8 text-[#00C853]" />
              <span className="text-white font-bold text-2xl tracking-tight">SAVI</span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed mb-6 max-w-xs">
              Premium packaged water delivering pristine molecular hydration with unmatched logistical precision.
            </p>
            <div className="flex gap-3">
              <a href="#" className="size-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#00C853]/10 hover:border-[#00C853]/30 transition-all duration-300">
                <Facebook className="size-4 text-gray-400 hover:text-white" />
              </a>
              <a href="#" className="size-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#00C853]/10 hover:border-[#00C853]/30 transition-all duration-300">
                <Instagram className="size-4 text-gray-400 hover:text-white" />
              </a>
              <a href="#" className="size-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#00C853]/10 hover:border-[#00C853]/30 transition-all duration-300">
                <Twitter className="size-4 text-gray-400 hover:text-white" />
              </a>
              <a href="#" className="size-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#00C853]/10 hover:border-[#00C853]/30 transition-all duration-300">
                <Linkedin className="size-4 text-gray-400 hover:text-white" />
              </a>
            </div>
          </div>

          {/* Menu Column */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-5">Menu</h4>
            <ul className="space-y-3">
              {['Home', 'About', 'Quality', 'Gallery', 'Contact'].map((item) => (
                <li key={item}>
                  <Link 
                    href={isHomePage ? `#${item.toLowerCase()}` : `/#${item.toLowerCase()}`}
                    onClick={(e) => handleNavClick(e, `#${item.toLowerCase()}`)}
                    className="text-gray-400 hover:text-white text-sm transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-2 h-px bg-[#00C853] transition-all duration-300" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Marketplace Column */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-5 flex items-center gap-2">
              <ShoppingBag className="size-4 text-[#00C853]" />
              Marketplace
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/marketplace" className="text-gray-400 hover:text-white text-sm transition-colors duration-300 flex items-center gap-2 group">
                  <span className="w-0 group-hover:w-2 h-px bg-[#00C853] transition-all duration-300" />
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/marketplace#bulk" className="text-gray-400 hover:text-white text-sm transition-colors duration-300 flex items-center gap-2 group">
                  <span className="w-0 group-hover:w-2 h-px bg-[#00C853] transition-all duration-300" />
                  Bulk Orders
                </Link>
              </li>
              <li>
                <Link href="/marketplace#corporate" className="text-gray-400 hover:text-white text-sm transition-colors duration-300 flex items-center gap-2 group">
                  <span className="w-0 group-hover:w-2 h-px bg-[#00C853] transition-all duration-300" />
                  Corporate Supply
                </Link>
              </li>
              <li>
                <Link href="/checkout" className="text-gray-400 hover:text-white text-sm transition-colors duration-300 flex items-center gap-2 group">
                  <span className="w-0 group-hover:w-2 h-px bg-[#00C853] transition-all duration-300" />
                  Checkout
                </Link>
              </li>
            </ul>
          </div>

          {/* Partners & Legal Column */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-5">Company</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/partners" className="text-gray-400 hover:text-white text-sm transition-colors duration-300 flex items-center gap-2 group">
                  <Shield className="size-3 text-gray-500 group-hover:text-[#00C853] transition-colors" />
                  Partners
                </Link>
              </li>
              <li>
                <Link href="/dealers" className="text-gray-400 hover:text-white text-sm transition-colors duration-300 flex items-center gap-2 group">
                  <MapPin className="size-3 text-gray-500 group-hover:text-[#00C853] transition-colors" />
                  Dealers & Franchise
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-300 flex items-center gap-2 group">
                  <FileText className="size-3 text-gray-500 group-hover:text-[#00C853] transition-colors" />
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-300 flex items-center gap-2 group">
                  <Cookie className="size-3 text-gray-500 group-hover:text-[#00C853] transition-colors" />
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Marketplace CTA */}
        <div className="mb-12 p-6 md:p-8 rounded-3xl bg-gradient-to-r from-[#00C853]/10 to-transparent border border-[#00C853]/20 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-white font-bold text-lg mb-1">Ready to order?</h3>
            <p className="text-gray-400 text-sm">Browse our premium water collection in the marketplace.</p>
          </div>
          <Link 
            href="/marketplace"
            className="flex h-12 items-center justify-center rounded-3xl bg-[#00C853] text-white px-8 font-bold hover:bg-[#00e676] hover:shadow-[0_0_20px_rgba(0,200,83,0.4)] transition-all duration-300 gap-2 group"
          >
            Visit Marketplace
            <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Partner Logos */}
        <div className="mb-12 py-8 border-t border-b border-white/5">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-600 text-center mb-6">
            Partnering with Industry Leaders
          </p>
          <div className="flex flex-wrap justify-center gap-10 md:gap-16 opacity-40 hover:opacity-70 transition-all duration-700">
            {['Hyatt', 'Marriott', 'Hilton', 'ITC', 'Taj'].map((name) => (
              <div key={name} className="text-gray-400 font-bold text-sm tracking-wider uppercase">
                {name}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-4">
          <div className="text-gray-600 text-xs order-2 md:order-1">
            © 2024 SAVI Water Co. All rights reserved.
          </div>
          
          <div className="flex items-center gap-2 order-1 md:order-2">
            <span className="text-gray-600 text-xs">Made by</span>
            <span className="text-white font-bold text-sm tracking-wide bg-gradient-to-r from-[#00C853] to-white bg-clip-text text-transparent">
              Kingpin Vision Forge
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
