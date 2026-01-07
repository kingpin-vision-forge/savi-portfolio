'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Droplets, ShoppingCart, Menu, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Quality', href: '#quality' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const { totalItems, setIsCartOpen } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = navItems.map(item => item.href.slice(1));
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const sectionId = href.slice(1);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 px-6 py-5 transition-all duration-500 ${isScrolled ? 'glass-nav shadow-lg' : 'bg-transparent'}`}>
      <div className="mx-auto flex max-w-[1400px] items-center justify-between">
        {/* Logo */}
        <a 
          href="#home" 
          onClick={(e) => scrollToSection(e, '#home')}
          className="flex items-center gap-3 group"
        >
          <div className="flex size-10 items-center justify-center rounded-3xl bg-white/10 border border-white/20 text-white shadow-[0_0_15px_-3px_rgba(255,255,255,0.1)] group-hover:border-[#00C853] transition-colors duration-300">
            <Droplets className="size-5 text-[#00C853]" />
          </div>
          <h2 className="text-white text-xl font-bold tracking-tight group-hover:text-[#00C853] transition-colors duration-300">SAVI</h2>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex flex-1 justify-center">
          <div className="flex items-center gap-8 rounded-3xl bg-white/5 px-8 py-3 backdrop-blur-md border border-white/10 shadow-lg">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => scrollToSection(e, item.href)}
                className={`relative text-sm font-medium transition-all duration-300 ${
                  activeSection === item.href.slice(1)
                    ? 'text-white font-semibold'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                {item.label}
                {activeSection === item.href.slice(1) && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#00C853] shadow-[0_0_8px_rgba(0,200,83,0.8)]" />
                )}
              </a>
            ))}
          </div>
        </nav>

        {/* Right section */}
        <div className="flex items-center gap-4">
          {/* Cart Button */}
          <button 
            onClick={() => setIsCartOpen(true)}
            className="flex size-10 items-center justify-center rounded-full hover:bg-white/10 text-white transition-all duration-300 relative border border-transparent hover:border-white/10"
          >
            <ShoppingCart className="size-5" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 size-5 rounded-full bg-[#00C853] text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-[#1a1a1a]">
                {totalItems > 9 ? '9+' : totalItems}
              </span>
            )}
          </button>

          {/* Marketplace Button - Desktop */}
          <Link 
            href="/marketplace"
            className="hidden sm:flex h-11 items-center justify-center rounded-3xl bg-[#2d2d2d] border border-white/10 text-white hover:text-[#00C853] hover:border-[#00C853]/50 px-6 shadow-lg hover:shadow-[#00C853]/20 hover:-translate-y-0.5 transition-all duration-300 text-sm font-bold tracking-wide"
          >
            Marketplace
          </Link>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden flex size-10 items-center justify-center rounded-full hover:bg-white/10 text-white transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden absolute top-full left-0 right-0 bg-[#1a1a1a]/95 backdrop-blur-xl border-t border-white/10 overflow-hidden transition-all duration-500 ${isMenuOpen ? 'max-h-[400px] py-6' : 'max-h-0 py-0'}`}>
        <nav className="flex flex-col gap-2 px-6">
          {navItems.map((item, index) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => scrollToSection(e, item.href)}
              className={`text-lg font-medium py-3 px-4 rounded-xl transition-all duration-300 ${
                activeSection === item.href.slice(1)
                  ? 'text-white bg-white/5 font-semibold'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              {item.label}
            </a>
          ))}
          <div className="h-px bg-white/10 my-2" />
          <Link 
            href="/marketplace" 
            className="text-[#00C853] text-lg font-bold py-3 px-4 rounded-xl hover:bg-[#00C853]/10 transition-colors flex items-center gap-2"
            onClick={() => setIsMenuOpen(false)}
          >
            <ShoppingCart className="size-5" />
            Marketplace
          </Link>
        </nav>
      </div>
    </header>
  );
}
