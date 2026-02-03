import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function AboutPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col bg-[#1a1a1a]">
      <Header />

      <main className="relative pt-20 flex flex-col items-center">
        {/* Hero Section */}
        <section className="relative w-full min-h-[90vh] flex items-center justify-center p-4">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a1a]/40 via-transparent to-[#1a1a1a] z-10" />
            <div className="absolute inset-0 bg-[#1a1a1a]/50 z-[5]" />
            <img 
              alt="Water ripples" 
              className="w-full h-full object-cover grayscale brightness-[0.7] contrast-100"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCcIIPyFUDUk5owBbsWvXafdJFnt3LtAqoUY0POy0ELiKVsPnzDjm2xS9c1vc9GxaGAQVW3loEJ5frnq63Zz2CaPs2mlAycA-jCAx0icyiGKD7ZEBKe3hsQRsXi7YEhEY16Orvua6mdYV5zvsXPXiw-aWaw7uiaKsuc6sD5oczTkZQ-N3OOqI_divNV3OYNuKJOTmF6b6YK54DWsYR5qgkGuo-fgN7RLsKhwuhu4N1pHnjtsGjtvqUMQNFIJmDmuhDv1IQ8pHFEQbD1"
            />
          </div>

          <div className="relative z-10 w-full max-w-[1280px] px-4 md:px-10 flex flex-col items-center text-center">
            <div className="glass-panel p-10 md:p-16 rounded-3xl max-w-4xl backdrop-blur-xl border border-white/10 shadow-2xl">
              <span className="inline-block py-1.5 px-4 border border-white/20 rounded-full text-white text-[10px] font-bold uppercase tracking-[0.3em] mb-8 bg-white/5 backdrop-blur-sm">
                Since 2004
              </span>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tighter text-white mb-8 drop-shadow-2xl">
                Purity in <span className="font-medium italic bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-300 to-gray-500">Slate</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto mb-10 font-light tracking-wide">
                Experience the essence of untouched nature, refined for your well-being. SAVI isn&apos;t just a resource, it&apos;s the foundation of a pure, quiet life.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <button className="flex items-center justify-center h-14 px-10 rounded-3xl bg-white text-[#1a1a1a] text-sm font-bold tracking-widest uppercase hover:bg-gray-200 transition-all hover:-translate-y-0.5 shadow-[0_0_20px_rgba(255,255,255,0.15)]">
                  Our Journey
                </button>
                <button className="flex items-center justify-center h-14 px-10 rounded-3xl bg-transparent border border-white/20 text-white text-sm font-bold tracking-widest uppercase hover:bg-white/5 transition-all group">
                  <span className="text-[#00C853] mr-2">▶</span>
                  Watch Film
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Bar */}
        <div className="w-full max-w-[1280px] px-4 md:px-10 -mt-24 relative z-20 mb-32">
          <div className="bg-[#222222] border border-white/10 rounded-3xl p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/5">
            <div className="flex flex-col items-center text-center p-4 group">
              <span className="text-4xl font-light text-white mb-2 group-hover:text-[#00C853] transition-colors duration-500">99.9%</span>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Purity Level</span>
            </div>
            <div className="flex flex-col items-center text-center p-4 group">
              <span className="text-4xl font-light text-white mb-2 group-hover:text-[#00C853] transition-colors duration-500">50+</span>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Natural Springs</span>
            </div>
            <div className="flex flex-col items-center text-center p-4 group">
              <span className="text-4xl font-light text-white mb-2 group-hover:text-[#00C853] transition-colors duration-500">0</span>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Carbon Footprint</span>
            </div>
            <div className="flex flex-col items-center text-center p-4 group">
              <span className="text-4xl font-light text-white mb-2 group-hover:text-[#00C853] transition-colors duration-500">2M+</span>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Happy Hydrators</span>
            </div>
          </div>
        </div>

        {/* Timeline Section */}
        <section className="w-full max-w-[1024px] px-4 py-24 flex flex-col items-center">
          <div className="text-center mb-24">
            <span className="text-[#00C853] text-xs font-bold uppercase tracking-[0.2em] mb-3 block opacity-80">History</span>
            <h2 className="text-4xl md:text-5xl font-light text-white tracking-tight">The Flow of Time</h2>
          </div>

          <div className="space-y-8 w-full">
            {[
              { year: '2004', title: 'Founding', icon: '💧', desc: 'SAVI Packaged Drinking Water was established on 13th January 2004 by Somanath S Jevoor and Prashant S Jevoor as a Partnership Firm, starting with one sales outlet at Solapur Road, Vijayapura.' },
              { year: '2010', title: 'Growth', icon: '🏭', desc: 'Expanded operations with state-of-the-art manufacturing facility at Jevoor Empire, Athani Road. In-House Physical/Chemical Lab and Microbiological Lab established for quality assurance.' },
              { year: '2018', title: 'Expansion', icon: '🌍', desc: 'Grew to five outlets in Vijayapura City. Established distribution points across all talukas of Vijayapura, Gulburga, Bagalkote, Hubballi, Gadag, and expanded to Maharashtra (Solapur & Pune).' },
              { year: '2024', title: 'Recognition', icon: '🏆', desc: 'Achieved BIS License, FSSAI, ISO Certification, MSME Registration, and ZED Certification. Became the First ZED Gold Company of the District.' },
            ].map((item, i) => (
              <div key={i} className="flex gap-6 items-start group">
                <div className="size-14 rounded-full bg-[#222222] border border-white/10 shadow-lg flex items-center justify-center text-white group-hover:border-[#00C853] group-hover:text-[#00C853] group-hover:bg-[#00C853]/5 transition-all duration-300 shrink-0">
                  <span className="text-2xl">{item.icon}</span>
                </div>
                <div className="flex flex-col flex-1">
                  <div className="bg-[#2a2a2a] p-8 rounded-3xl hover:shadow-2xl transition-all duration-500 border border-white/5 hover:border-white/20">
                    <div className="flex justify-between items-start mb-4 border-b border-white/10 pb-4">
                      <h3 className="text-2xl font-light text-white">{item.title}</h3>
                      <span className="text-white font-bold text-lg opacity-30">{item.year}</span>
                    </div>
                    <p className="text-gray-400 font-light leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Certifications */}
        <section className="w-full py-20 border-t border-white/5 bg-[#1a1a1a]">
          <div className="max-w-[1280px] mx-auto px-4 md:px-10">
            <div className="flex flex-wrap justify-center items-center gap-16 md:gap-28 opacity-60 hover:opacity-100 transition-opacity duration-500">
              {['🏛️ BIS License', '🍽️ FSSAI', '🛡️ ISO Certified', '🏭 MSME', '🥇 ZED Gold', '🔬 In-House Labs'].map((item, i) => (
                <div key={i} className="flex flex-col items-center gap-3 group">
                  <span className="text-4xl text-white group-hover:text-[#00C853] transition-colors font-light">{item.split(' ')[0]}</span>
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">{item.split(' ').slice(1).join(' ')}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
