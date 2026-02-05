'use client';

import { useState } from 'react';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const galleryItems = [
  // Latest Promotional Content
  { title: 'Pure Elegance', category: 'Latest', date: 'February 2026', span: 'md:col-span-2', image: '/gallery/promo-elegance.jpg' },
  { title: "Nature's Serenity", category: 'Latest', date: 'February 2026', span: 'md:row-span-2', image: '/gallery/promo-serenity.jpg' },
  { title: 'Vrukshathon Partnership', category: 'Latest', date: 'Official Hydration Partner', span: '', image: '/gallery/promo-athlete.png' },
  // Events & Corporate
  { title: 'Corporate Event', category: 'Corporate', date: 'December 2025', span: '', image: '/event1.jpeg' },
  { title: 'Community Gathering', category: 'Corporate', date: 'December 2025', span: 'md:row-span-2', image: '/event2.jpeg' },
  { title: 'Team Celebration', category: 'Corporate', date: '', span: '', image: '/event3.jpeg' },
  // Products
  { title: 'Premium 500ml', category: 'Product', date: 'Signature Series', span: '', image: '/500ml.png' },
  { title: 'Compact 250ml', category: 'Product', date: 'On-the-go', span: '', image: '/250ml.png' },
  { title: '20L Premium', category: 'Product', date: 'Home & Office', span: 'md:col-span-2', image: '/20ltrbottle.jpeg' },
  // Factory & Production
  { title: 'Production Facility', category: 'Logistics', date: 'State-of-the-art', span: 'md:row-span-2', image: '/bottle4.jpeg' },
  { title: 'Quality Assurance', category: 'Logistics', date: 'ISO Certified', span: '', image: '/bottle5.jpeg' },
  // Private Events
  { title: 'VIP Hospitality', category: 'Private', date: 'Premium Service', span: '', image: '/bottle2.jpeg' },
  { title: 'Exclusive Collection', category: 'Private', date: 'Limited Edition', span: '', image: '/bottle3.jpeg' },
];

const categories = ['All', 'Latest', 'Corporate', 'Private', 'Logistics', 'Product'];

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredItems = activeFilter === 'All'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeFilter);

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-[#1a1a1a]">
      <Header />

      <main className="flex-grow flex flex-col items-center w-full">
        {/* Hero */}
        <section className="w-full max-w-[1024px] px-6 pt-32 pb-12 text-center">
          <div className="flex flex-col gap-6 items-center">
            <span className="text-[#00C853] text-[10px] font-bold tracking-[0.3em] uppercase opacity-90">Our Portfolio</span>
            <h1 className="text-white text-5xl md:text-6xl lg:text-7xl font-light tracking-tighter leading-[1.1]">
              Curating Excellence <br />
              <span className="font-medium bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-300 to-gray-500 italic">in Hydration</span>
            </h1>
            <div className="h-px w-20 bg-gradient-to-r from-transparent via-gray-600 to-transparent my-4" />
            <p className="text-gray-400 text-lg md:text-xl font-light max-w-2xl leading-relaxed">
              Moments of purity, trust, and scale captured from our journey around the globe. Witness the fluid elegance of SAVI in action.
            </p>
          </div>
        </section>

        {/* Filter */}
        <section className="sticky top-24 z-40 w-full flex justify-center px-4 py-6 pointer-events-none">
          <div className="pointer-events-auto flex gap-1 p-1.5 glass-panel rounded-full overflow-x-auto scroll-hide max-w-full">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`flex h-10 items-center px-6 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${activeFilter === cat
                    ? 'bg-white text-black shadow-lg'
                    : 'hover:bg-white/5 text-gray-400 hover:text-white font-medium'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="w-full max-w-[1440px] px-4 md:px-8 pb-32 mt-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" style={{ gridAutoRows: '300px' }}>
            {filteredItems.map((item, i) => (
              <div key={`${item.title}-${i}`} className={`group relative bg-[#242424] overflow-hidden cursor-pointer border border-white/5 rounded-3xl shadow-xl ${item.span}`}>
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105 grayscale-[30%] group-hover:grayscale-0 brightness-75 group-hover:brightness-100"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-white/5 transition-colors duration-700 mix-blend-overlay" />
                <div className="absolute inset-0 flex flex-col justify-end p-8 opacity-90 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-black via-black/50 to-transparent">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-2 h-2 rounded-full bg-[#00C853] shadow-[0_0_10px_rgba(0,200,83,0.8)]" />
                    <span className="text-white/90 text-[10px] font-bold tracking-[0.2em] uppercase">{item.category}</span>
                  </div>
                  <h3 className="text-white text-2xl font-light tracking-wide">{item.title}</h3>
                  {item.date && <p className="text-gray-400 text-xs mt-2 font-mono tracking-wide uppercase opacity-70">{item.date}</p>}
                </div>
              </div>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">No items found in this category.</p>
            </div>
          )}

          <div className="flex justify-center mt-20">
            <button className="group flex items-center gap-3 text-white border border-white/20 px-8 py-3 rounded-full text-xs font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-black hover:border-white hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all duration-300">
              Load More Memories
              <span className="text-gray-500 group-hover:text-[#00C853] transition-colors">🔄</span>
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
