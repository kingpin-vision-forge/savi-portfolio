'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PartnerMarquee, { partnerLogos } from '@/components/PartnerMarquee';

const testimonials = [
  { quote: "SAVI has redefined our in-office experience. The design is impeccable, and the purity is noticeable. It aligns perfectly with our sustainability goals.", name: 'Michael Chen', title: 'CEO, TechCore' },
  { quote: "In the luxury hospitality sector, details matter. SAVI delivers a premium hydration experience that our guests constantly compliment. Essential.", name: 'Sarah Jenkins', title: 'Director, GrandHotel' },
  { quote: "Scale was our biggest concern. SAVI rolled out to 45 locations seamlessly. Their service team is as reliable as their water quality.", name: 'David Ross', title: 'Manager, Equinoxx' },
];

export default function PartnersPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col bg-[#1a1a1a]">
      <Header />

      {/* Hero */}
      <header className="relative w-full min-h-[750px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full z-0 bg-[#1a1a1a]">
          <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a1a]/80 via-[#1a1a1a]/60 to-[#1a1a1a] z-10" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#2d2d2d]/30 via-[#1a1a1a] to-[#1a1a1a] z-0" />
        </div>

        <div className="relative z-20 max-w-[1000px] px-4 text-center flex flex-col items-center gap-8 mt-10">
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/10 border border-white/10 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-[0.25em] mb-2 shadow-lg">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00C853] animate-pulse shadow-[0_0_8px_rgba(0,200,83,0.8)]" />
            Global Trust Network
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-thin text-white leading-[1.1] tracking-tight">
            Purity <span className="font-normal italic text-gray-200 relative inline-block">Refined<span className="absolute -top-1 -right-2 w-2 h-2 bg-[#00C853] rounded-full opacity-80" /></span> by Trust
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl font-light leading-relaxed tracking-wide">
            SAVI delivers hydration excellence to the world&apos;s most demanding environments. Partnerships built on absolute transparency and uncompromised scale.
          </p>
        </div>
      </header>

      {/* Stats */}
      <section className="relative z-30 -mt-24 mb-32 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="glass-panel rounded-3xl p-0 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10 overflow-hidden">
            <div className="flex flex-col items-center justify-center p-10 hover:bg-white/[0.05] transition-colors duration-500 group">
              <span className="text-5xl font-extralight text-white mb-3 tracking-tighter group-hover:scale-105 transition-transform duration-500">500<span className="text-[#00C853] text-3xl align-top font-normal">+</span></span>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] group-hover:text-[#00C853] transition-colors">Enterprise Clients</span>
            </div>
            <div className="flex flex-col items-center justify-center p-10 hover:bg-white/[0.05] transition-colors duration-500 group">
              <span className="text-5xl font-extralight text-white mb-3 tracking-tighter group-hover:scale-105 transition-transform duration-500">50<span className="text-[#00C853] text-3xl align-top font-normal">+</span></span>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] group-hover:text-[#00C853] transition-colors">Countries Served</span>
            </div>
            <div className="flex flex-col items-center justify-center p-10 hover:bg-white/[0.05] transition-colors duration-500 group">
              <span className="text-5xl font-extralight text-white mb-3 tracking-tighter group-hover:scale-105 transition-transform duration-500">99.9<span className="text-[#00C853] text-3xl align-top font-normal">%</span></span>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] group-hover:text-[#00C853] transition-colors">Purity Rating</span>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Logos Marquee */}
      <section className="py-16 px-4 bg-[#1a1a1a] relative border-t border-white/5">
        <div className="max-w-[1280px] mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Trusted By</p>
            <h2 className="text-2xl md:text-3xl font-light text-white tracking-wide">Our Partners</h2>
          </div>
          <PartnerMarquee />
        </div>
      </section>

      {/* Partners Grid */}
      <section className="py-24 px-4 bg-[#1a1a1a] relative">
        <div className="max-w-[1280px] mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-2xl md:text-3xl font-light text-white mb-6 tracking-wide">Select Partners</h2>
            <div className="h-px w-24 bg-white mx-auto opacity-10" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-px bg-white/5 border border-white/5 overflow-hidden rounded-3xl">
            {partnerLogos.map((partner, i) => (
              <div key={i} className="group relative w-full aspect-[2/1] bg-[#1f1f1f] flex items-center justify-center p-6 transition-all duration-300 hover:bg-[#252525]">
                <img
                  src={partner.src}
                  alt={partner.name}
                  className="h-12 w-auto object-contain opacity-50 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 px-4 relative overflow-hidden bg-[#1a1a1a]">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white rounded-full blur-[150px] pointer-events-none opacity-[0.03]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#00C853] rounded-full blur-[180px] pointer-events-none opacity-[0.05]" />
        <div className="max-w-[1280px] mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div>
              <h2 className="text-3xl md:text-5xl font-extralight text-white mb-4 tracking-tight">Voices of <span className="text-[#00C853] italic font-normal">Purity</span></h2>
              <p className="text-gray-400 max-w-lg text-sm md:text-base font-light tracking-wide leading-relaxed">Industry leaders who trust SAVI for their hydration standards.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="glass-panel card-hover-effect p-10 rounded-3xl flex flex-col justify-between h-full group transition-all duration-500">
                <div>
                  <div className="mb-8 text-[#00C853]">
                    <span className="text-4xl">❝</span>
                  </div>
                  <p className="text-lg text-white font-light leading-relaxed mb-10 tracking-wide">
                    {t.quote}
                  </p>
                </div>
                <div className="flex items-center gap-4 pt-8 border-t border-white/10">
                  <div className="w-12 h-12 rounded-full bg-[#2d2d2d] overflow-hidden flex items-center justify-center text-2xl">👤</div>
                  <div>
                    <h4 className="text-white font-medium text-sm tracking-wider">{t.name}</h4>
                    <p className="text-gray-400 text-[10px] uppercase tracking-widest mt-1">{t.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-4 bg-[#1a1a1a] text-white relative overflow-hidden border-t border-white/10">
        <div className="max-w-[900px] mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-extralight mb-8 tracking-tight text-white">Ready to elevate your standards?</h2>
          <p className="text-gray-300 text-lg mb-12 font-light max-w-xl mx-auto tracking-wide">Join the network of brands committed to the purest hydration experience available today.</p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <button className="h-14 px-12 bg-white rounded-3xl text-black text-xs font-bold uppercase tracking-widest hover:bg-gray-100 transition-all shadow-[0_0_40px_rgba(255,255,255,0.15)]">
              Become a Partner
            </button>
            <button className="h-14 px-12 rounded-3xl border border-white/20 hover:border-white/40 hover:bg-white/5 text-white text-xs font-bold uppercase tracking-widest backdrop-blur-sm transition-all">
              Contact Sales
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
