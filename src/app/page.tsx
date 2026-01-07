'use client';

import { useState, useEffect } from 'react';
import LoadingScreen from '@/components/LoadingScreen';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { 
  Shield, FlaskConical, ArrowRight, Users, CheckCircle2, 
  Droplets, Factory, Globe, Award, Phone, MessageCircle,
  MapPin, Beaker, Leaf, Star, Sparkles, Zap, Play,
  Download, Clock, Building, Truck
} from 'lucide-react';

function Section({ id, children, className = '' }: { id: string; children: React.ReactNode; className?: string }) {
  return (
    <section id={id} className={`scroll-mt-24 ${className}`}>
      {children}
    </section>
  );
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const hasLoaded = sessionStorage.getItem('savi-loaded');
    if (hasLoaded) {
      setIsLoading(false);
      setShowContent(true);
    }
  }, []);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    setTimeout(() => setShowContent(true), 100);
  };

  if (isLoading) {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  return (
    <div className={`relative flex flex-col min-h-screen w-full transition-opacity duration-700 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
      {/* Background effects */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-[#2d2d2d] opacity-30 blur-[150px] rounded-full" />
        <div className="absolute bottom-[10%] right-[-10%] w-[50%] h-[50%] bg-white opacity-5 blur-[120px] rounded-full" />
        <div className="absolute top-[30%] left-[20%] w-[30%] h-[30%] bg-[#00C853] opacity-10 blur-[180px] rounded-full" />
      </div>

      <Header />

      <main className="flex-1">
        {/* ==================== HOME SECTION ==================== */}
        <Section id="home" className="min-h-screen flex items-center pt-24 lg:pt-0">
          <div className="px-6 md:px-10 lg:px-20 py-10 flex flex-1 items-center justify-center w-full">
            <div className="w-full max-w-[1400px] grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
              {/* Left content */}
              <div className="flex flex-col gap-10 lg:pr-10 z-10 order-2 lg:order-1">
                <div className="flex flex-col gap-6 text-left">
                  <div className="inline-flex items-center gap-2 self-start rounded-3xl bg-[#2d2d2d] border border-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white/90 backdrop-blur-sm shadow-md">
                    <Sparkles className="size-3 text-[#00C853]" />
                    Clinical Grade Hydration
                  </div>
                  <h1 className="text-white text-6xl sm:text-7xl lg:text-[5.5rem] font-extrabold leading-[0.95] tracking-tight text-glow">
                    Hydration<br />Refined.
                  </h1>
                  <p className="text-gray-400 text-lg md:text-xl font-medium leading-relaxed max-w-lg mt-2">
                    SAVI delivers pristine molecular hydration with unmatched logistical precision. A darker, deeper commitment to purity.
                  </p>
                </div>
                <div className="flex flex-wrap gap-5 mt-2">
                  <Link 
                    href="/marketplace"
                    className="group relative flex h-14 min-w-[180px] items-center justify-center overflow-hidden rounded-3xl bg-[#2d2d2d] border border-white/10 hover:border-[#00C853] text-white text-base font-bold shadow-lg hover:shadow-[#00C853]/25 transition-all duration-300 hover:-translate-y-1"
                  >
                    <span className="relative z-10 flex items-center gap-2 text-white group-hover:text-[#00C853] transition-colors">
                      Order Water 
                      <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Link>
                  <Link 
                    href="/marketplace#bulk"
                    className="group flex h-14 min-w-[180px] items-center justify-center rounded-3xl border border-white/10 bg-transparent px-8 text-white/80 hover:text-[#00C853] backdrop-blur-md text-base font-bold hover:bg-[#2d2d2d] hover:border-[#00C853]/50 transition-all duration-300"
                  >
                    Bulk Supply
                  </Link>
                </div>
                <div className="flex items-center gap-6 mt-8 pt-8 border-t border-white/10">
                  <div className="flex -space-x-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="size-12 rounded-full border-2 border-[#1a1a1a] bg-[#2d2d2d] overflow-hidden flex items-center justify-center">
                        <Users className="size-5 text-white/30" />
                      </div>
                    ))}
                    <div className="size-12 flex items-center justify-center rounded-full border-2 border-[#1a1a1a] bg-[#2d2d2d] text-white text-xs font-bold">+2k</div>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1 mb-1">
                      <CheckCircle2 className="size-4 text-[#00C853]" />
                      <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Trust Score 99%</span>
                    </div>
                    <div className="text-sm font-semibold text-white">Trusted by global enterprises</div>
                  </div>
                </div>
              </div>
              {/* Right - Bottle */}
              <div className="relative h-[60vh] lg:h-[85vh] w-full flex items-center justify-center order-1 lg:order-2">
                <div className="absolute w-[60%] aspect-square rounded-full bg-gradient-to-b from-white/5 to-transparent opacity-20 blur-[100px] animate-pulse" />
                <div className="relative w-full h-full max-w-[500px] flex items-center justify-center animate-float">
                  <div className="relative w-[50%] h-[70%] rounded-[4rem] bg-gradient-to-br from-white/10 to-transparent backdrop-blur-2xl border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden z-20 group cursor-pointer transition-transform duration-700 hover:scale-[1.02]">
                    <div className="absolute bottom-0 left-0 right-0 h-[85%] bg-gradient-to-t from-[#121212] via-[#1a1a1a]/80 to-transparent opacity-90" />
                    <div className="absolute top-0 right-0 w-[45%] h-full bg-gradient-to-l from-white/10 to-transparent skew-x-12 opacity-40" />
                    <div className="absolute top-12 left-6 w-2 h-[60%] bg-gradient-to-b from-white/40 to-transparent rounded-full blur-[1px]" />
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[42%] h-12 bg-gradient-to-b from-[#2d2d2d] to-[#121212] rounded-b-2xl shadow-lg border-b border-white/10 z-30">
                      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[60%] h-[1px] bg-[#00C853] shadow-[0_0_8px_rgba(0,200,83,0.8)]" />
                    </div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex flex-col items-center justify-center text-center z-30">
                      <h3 className="text-white text-5xl font-black tracking-[0.2em] uppercase rotate-90 lg:rotate-0 drop-shadow-2xl">SAVI</h3>
                      <div className="hidden lg:block w-8 h-0.5 bg-[#00C853] mt-4 glow-effect" />
                    </div>
                  </div>
                  <div className="absolute top-[20%] right-[0%] lg:-right-[5%] p-5 bg-[#1a1a1a]/80 backdrop-blur-xl rounded-3xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.8)] border border-white/10 animate-float-delayed z-30 max-w-[180px]">
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className="size-5 text-[#00C853]" />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Certified</span>
                    </div>
                    <p className="text-sm font-bold text-white leading-tight">ISO 22000 Filtration Standard</p>
                  </div>
                  <div className="absolute bottom-[25%] left-[-5%] lg:-left-[10%] p-5 bg-[#1a1a1a]/80 backdrop-blur-xl rounded-3xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.8)] border border-white/10 animate-float z-30 min-w-[140px]" style={{ animationDelay: '2s' }}>
                    <div className="flex items-center gap-2 mb-1">
                      <FlaskConical className="size-5 text-[#00C853]" />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Alkaline</span>
                    </div>
                    <div className="flex items-baseline gap-1">
                      <p className="text-3xl font-black text-white leading-none">7.4</p>
                      <span className="text-sm font-bold text-[#00C853]">pH</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* ==================== ABOUT SECTION ==================== */}
        <Section id="about" className="py-24 lg:py-32 bg-[#1a1a1a] relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#121212]/50 to-transparent pointer-events-none" />
          
          {/* Hero part */}
          <div className="relative w-full min-h-[60vh] flex items-center justify-center mb-20">
            <div className="absolute inset-0 z-0">
              <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a1a] via-transparent to-[#1a1a1a] z-10" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#2d2d2d]/30 via-[#1a1a1a] to-[#1a1a1a]" />
            </div>
            <div className="relative z-10 w-full max-w-[1000px] px-6 md:px-10 flex flex-col items-center text-center">
              <div className="glass-panel p-10 md:p-16 rounded-3xl max-w-4xl backdrop-blur-xl border border-white/10 shadow-2xl">
                <span className="inline-flex items-center gap-2 py-1.5 px-4 border border-white/20 rounded-full text-white text-[10px] font-bold uppercase tracking-[0.3em] mb-8 bg-white/5 backdrop-blur-sm">
                  <Clock className="size-3" />
                  Established 2010
                </span>
                <h2 className="text-5xl md:text-7xl font-light tracking-tighter text-white mb-8 drop-shadow-2xl">
                  Purity in <span className="font-medium italic bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-300 to-gray-500">Slate</span>
                </h2>
                <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto mb-10 font-light tracking-wide">
                  Experience the essence of untouched nature, refined for your well-being. SAVI isn&apos;t just a resource, it&apos;s the foundation of a pure, quiet life.
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <button className="flex items-center justify-center gap-2 h-14 px-10 rounded-3xl bg-white text-[#1a1a1a] text-sm font-bold tracking-widest uppercase hover:bg-gray-200 transition-all hover:-translate-y-0.5 shadow-[0_0_20px_rgba(255,255,255,0.15)]">
                    <ArrowRight className="size-4" />
                    Our Journey
                  </button>
                  <button className="flex items-center justify-center gap-2 h-14 px-10 rounded-3xl bg-transparent border border-white/20 text-white text-sm font-bold tracking-widest uppercase hover:bg-white/5 transition-all group">
                    <Play className="size-4 text-[#00C853]" />
                    Watch Film
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="w-full max-w-[1280px] px-6 md:px-10 mx-auto -mt-8 mb-24">
            <div className="bg-[#222222] border border-white/10 rounded-3xl p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/5">
              {[
                { value: '99.9%', label: 'Purity Level', icon: Sparkles },
                { value: '50+', label: 'Natural Springs', icon: Droplets },
                { value: '0', label: 'Carbon Footprint', icon: Leaf },
                { value: '2M+', label: 'Happy Hydrators', icon: Users },
              ].map((stat, i) => (
                <div key={i} className="flex flex-col items-center text-center p-4 group">
                  <stat.icon className="size-6 text-[#00C853] mb-3 group-hover:scale-110 transition-transform" />
                  <span className="text-4xl font-light text-white mb-2 group-hover:text-[#00C853] transition-colors duration-500">{stat.value}</span>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline Section */}
          <div className="w-full max-w-[1024px] px-6 mx-auto mb-24">
            <div className="text-center mb-16">
              <span className="text-[#00C853] text-xs font-bold uppercase tracking-[0.2em] mb-3 block">History</span>
              <h3 className="text-4xl md:text-5xl font-light text-white tracking-tight">The Flow of Time</h3>
            </div>

            <div className="space-y-6 w-full">
              {[
                { year: '2010', title: 'Founding', icon: Droplets, desc: 'SAVI was born from a singular vision: to bottle the pristine essence of the untouched Alps. We started with a small spring and a big dream.' },
                { year: '2015', title: 'Refinement', icon: Factory, desc: 'Innovation meets nature. We opened our state-of-the-art facility, ensuring that our bottling process preserves 100% of the water\'s natural mineral content.' },
                { year: '2019', title: 'Expansion', icon: Globe, desc: 'From local springs to global tables. SAVI launched in 15 new countries, bringing luxury hydration to discerning customers worldwide.' },
                { year: '2023', title: 'Recognition', icon: Award, desc: 'Recognized globally for our "Zero-Waste" initiative. We achieved 100% recycled packaging across our entire product line.' },
              ].map((item, i) => (
                <div key={i} className="flex gap-6 items-start group">
                  <div className="size-14 rounded-full bg-[#222222] border border-white/10 shadow-lg flex items-center justify-center group-hover:border-[#00C853] group-hover:bg-[#00C853]/5 transition-all duration-300 shrink-0">
                    <item.icon className="size-6 text-white group-hover:text-[#00C853] transition-colors" />
                  </div>
                  <div className="flex flex-col flex-1">
                    <div className="bg-[#2a2a2a] p-8 rounded-3xl hover:shadow-2xl transition-all duration-500 border border-white/5 hover:border-white/20">
                      <div className="flex justify-between items-start mb-4 border-b border-white/10 pb-4">
                        <h4 className="text-2xl font-light text-white">{item.title}</h4>
                        <span className="text-white font-bold text-lg opacity-30">{item.year}</span>
                      </div>
                      <p className="text-gray-400 font-light leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications Row */}
          <div className="w-full py-16 border-t border-white/5">
            <div className="max-w-[1280px] mx-auto px-6 md:px-10">
              <div className="flex flex-wrap justify-center items-center gap-16 md:gap-28 opacity-60 hover:opacity-100 transition-opacity duration-500">
                {[
                  { icon: Shield, label: 'ISO 9001' },
                  { icon: Droplets, label: 'Pure Source' },
                  { icon: Leaf, label: '100% Recycled' },
                  { icon: Beaker, label: 'Lab Tested' },
                ].map((item, i) => (
                  <div key={i} className="flex flex-col items-center gap-3 group">
                    <item.icon className="size-10 text-white group-hover:text-[#00C853] transition-colors" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* ==================== QUALITY SECTION ==================== */}
        <Section id="quality" className="py-24 lg:py-32 bg-[#121212] relative">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-20">
            <div className="flex flex-col items-center text-center mb-20">
              <div className="inline-flex items-center gap-2 rounded-3xl bg-[#2d2d2d] border border-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white/90 backdrop-blur-sm shadow-md mb-8">
                <Shield className="size-3 text-[#00C853]" />
                Verification & Compliance
              </div>
              <h2 className="text-white text-5xl md:text-7xl font-extrabold tracking-tight mb-8 text-glow leading-none">
                Uncompromising<br /><span className="text-gray-500">Purity Standards.</span>
              </h2>
              <p className="text-gray-400 text-lg md:text-xl font-medium leading-relaxed max-w-2xl mx-auto">
                SAVI exceeds industry benchmarks through rigorous independent testing. Our 12-stage filtration and mineralization process is validated by world-class certification bodies.
              </p>
            </div>

            {/* Live Analysis Panel */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-24">
              <div className="lg:col-span-8 bg-[#2d2d2d] rounded-3xl p-8 md:p-12 border border-white/5 relative overflow-hidden group">
                <div className="absolute -top-10 -right-10 opacity-[0.03] group-hover:opacity-10 transition-opacity duration-500">
                  <FlaskConical className="size-72 text-white" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#1a1a1a]/50 to-transparent" />
                <div className="relative z-10">
                  <h3 className="text-white text-2xl font-bold mb-10 flex items-center gap-3">
                    <span className="size-2 bg-[#00C853] rounded-full animate-pulse" />
                    <Beaker className="size-5 text-[#00C853]" />
                    Live Water Analysis
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
                    {[
                      { label: 'Alkalinity (pH)', value: '7.4', suffix: '+', bar: 85, note: 'Optimal Balance' },
                      { label: 'TDS Level', value: '280', suffix: 'ppm', bar: 40, note: 'Electrolyte Rich' },
                      { label: 'Contaminants', value: '0', suffix: '.00', bar: 0, note: 'Micro-Plastics Free' },
                    ].map((item, i) => (
                      <div key={i} className="flex flex-col gap-3">
                        <div className="flex justify-between items-baseline">
                          <span className="text-gray-500 text-xs font-bold uppercase tracking-wider">{item.label}</span>
                          <CheckCircle2 className="size-4 text-[#00C853]" />
                        </div>
                        <div className="flex items-end gap-1">
                          <span className="text-6xl font-extrabold text-white tracking-tighter">{item.value}</span>
                          <span className="text-[#00C853] font-bold text-lg mb-2">{item.suffix}</span>
                        </div>
                        <div className="w-full h-1.5 bg-white/10 rounded-full mt-2 overflow-hidden">
                          <div className="h-full bg-[#00C853] shadow-[0_0_10px_rgba(0,200,83,0.5)] rounded-full transition-all duration-1000" style={{ width: `${item.bar}%` }} />
                        </div>
                        <p className="text-gray-400 text-xs mt-1">{item.note}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Lab Report Card */}
              <div className="lg:col-span-4 bg-[#121212] rounded-3xl p-8 md:p-10 border border-white/10 flex flex-col justify-between relative overflow-hidden group">
                <div className="absolute inset-0 bg-[#00C853]/5 group-hover:bg-[#00C853]/10 transition-colors duration-500" />
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-8">
                    <div className="size-12 rounded-2xl bg-[#2d2d2d] border border-white/10 flex items-center justify-center">
                      <Download className="size-6 text-[#00C853]" />
                    </div>
                    <span className="text-white/30 text-[10px] font-bold tracking-widest border border-white/10 px-2 py-1 rounded-lg">UPDATED: OCT 2023</span>
                  </div>
                  <h3 className="text-white text-xl font-bold mb-3">Detailed Lab Report</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">Download the full spectrum analysis from our ISO 17025 accredited laboratory detailing mineral composition and purity tests.</p>
                </div>
                <button className="relative z-10 mt-8 w-full py-4 rounded-2xl bg-white text-[#1a1a1a] font-bold hover:bg-[#00C853] hover:text-white hover:shadow-[0_0_20px_rgba(0,200,83,0.4)] transition-all duration-300 flex items-center justify-center gap-2 group/btn">
                  Download PDF
                  <Download className="size-4 group-hover/btn:translate-y-0.5 transition-transform" />
                </button>
              </div>
            </div>

            {/* Certifications */}
            <div className="mb-20">
              <div className="flex items-center justify-between mb-12">
                <h3 className="text-white text-3xl font-bold border-l-4 border-[#00C853] pl-6">Global Certifications</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { icon: Shield, title: 'ISO 22000', desc: 'International standard for food safety management confirming our rigorous control systems.' },
                  { icon: Droplets, title: 'NSF International', desc: 'Certified for health effects and filtration performance against NSF/ANSI standards.' },
                  { icon: Leaf, title: 'BPA Free', desc: 'Our bottles are crafted from premium grade, 100% recyclable, BPA-free materials.' },
                  { icon: Star, title: 'FDA Compliant', desc: 'Fully compliant with all FDA regulations for bottled water processing and quality.' },
                ].map((cert, i) => (
                  <div key={i} className="bg-[#2d2d2d] p-8 rounded-3xl border border-white/5 card-hover-effect group h-full flex flex-col">
                    <div className="size-14 rounded-2xl bg-[#222] border border-white/10 flex items-center justify-center mb-6 shadow-lg shadow-black/50 group-hover:border-[#00C853]/30 transition-colors">
                      <cert.icon className="size-7 text-[#00C853]" />
                    </div>
                    <h4 className="text-white font-bold text-lg mb-3">{cert.title}</h4>
                    <p className="text-gray-400 text-sm leading-relaxed">{cert.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Purity Protocol */}
            <div className="py-16 border-t border-white/5">
              <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
                <div className="lg:w-1/3 lg:sticky lg:top-32">
                  <span className="text-[#00C853] font-bold text-xs uppercase tracking-[0.2em] mb-4 block">The Method</span>
                  <h3 className="text-white text-4xl font-bold mb-6 leading-tight">The Purity<br />Protocol.</h3>
                  <p className="text-gray-400 text-lg mb-10 leading-relaxed">A meticulous journey from source to seal, ensuring the distinctive SAVI taste profile remains untouched by the outside world.</p>
                </div>

                <div className="lg:w-2/3 flex flex-col gap-6 w-full">
                  {[
                    { num: '01', title: 'Molecular Reverse Osmosis', icon: Beaker, desc: 'Water is forced through semi-permeable membranes to remove 99.9% of dissolved solids, bacteria, and impurities, stripping the water down to its essential H2O molecules.' },
                    { num: '02', title: 'Mineral Infusion', icon: Sparkles, desc: 'A proprietary blend of calcium, magnesium, and potassium is reintroduced to create our signature smooth alkalinity and optimize hydration efficiency.' },
                    { num: '03', title: 'Ozone Sanitization', icon: Zap, desc: 'Final purification using activated oxygen ensures the bottle and water remain sterile until the moment you open the cap, preserving freshness for 24 months.' },
                  ].map((step, i) => (
                    <div key={i} className="flex flex-col sm:flex-row gap-6 p-8 rounded-3xl bg-[#2d2d2d]/30 border border-white/5 hover:bg-[#2d2d2d] transition-all duration-300 group">
                      <div className="flex items-start gap-4">
                        <span className="text-white/10 text-6xl font-black group-hover:text-[#00C853]/20 transition-colors">{step.num}</span>
                        <div className="size-12 rounded-xl bg-[#00C853]/10 flex items-center justify-center shrink-0 mt-2">
                          <step.icon className="size-6 text-[#00C853]" />
                        </div>
                      </div>
                      <div className="pt-2">
                        <h4 className="text-white text-xl font-bold mb-3 group-hover:text-[#00C853] transition-colors">{step.title}</h4>
                        <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* ==================== GALLERY SECTION ==================== */}
        <Section id="gallery" className="py-24 lg:py-32 bg-[#1a1a1a] relative">
          <div className="w-full max-w-[1024px] px-6 mx-auto text-center mb-16">
            <div className="flex flex-col gap-6 items-center">
              <span className="text-[#00C853] text-[10px] font-bold tracking-[0.3em] uppercase opacity-90">Our Portfolio</span>
              <h2 className="text-white text-5xl md:text-6xl lg:text-7xl font-light tracking-tighter leading-[1.1]">
                Curating Excellence <br />
                <span className="font-medium bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-300 to-gray-500 italic">in Hydration</span>
              </h2>
              <div className="h-px w-20 bg-gradient-to-r from-transparent via-gray-600 to-transparent my-4" />
              <p className="text-gray-400 text-lg md:text-xl font-light max-w-2xl leading-relaxed">
                Moments of purity, trust, and scale captured from our journey around the globe. Witness the fluid elegance of SAVI in action.
              </p>
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="flex justify-center px-4 py-6 mb-8">
            <div className="flex gap-1 p-1.5 glass-panel rounded-full overflow-x-auto scroll-hide max-w-full">
              {['All', 'Corporate', 'Private', 'Logistics'].map((filter, i) => (
                <button 
                  key={filter}
                  className={`flex h-10 items-center px-6 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${i === 0 ? 'bg-white text-black shadow-lg' : 'hover:bg-white/5 text-gray-400 hover:text-white'}`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="max-w-[1440px] mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" style={{ gridAutoRows: '280px' }}>
              {[
                { title: 'Fashion Week Gala', loc: 'Paris', span: 'md:col-span-2', icon: Star },
                { title: 'Signature Glass', loc: 'Product', span: 'md:row-span-2', icon: Sparkles },
                { title: 'VIP Hosting', loc: 'Service', span: '', icon: Users },
                { title: 'Glacial Source', loc: 'Source', span: '', icon: Droplets },
                { title: 'Global Fleet', loc: 'Logistics', span: 'md:col-span-2', icon: Truck },
                { title: 'Corporate HQ', loc: 'Tokyo', span: '', icon: Building },
              ].map((item, i) => (
                <div key={i} className={`group relative bg-[#242424] overflow-hidden cursor-pointer border border-white/5 rounded-3xl shadow-xl ${item.span}`}>
                  <div className="absolute inset-0 bg-[#00C853]/5 opacity-0 group-hover:opacity-100 transition-opacity z-5" />
                  <div className="absolute flex items-center justify-center inset-0">
                    <item.icon className="size-20 text-white/5 group-hover:text-[#00C853]/20 group-hover:scale-110 transition-all duration-500" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-2 h-2 rounded-full bg-[#00C853] shadow-[0_0_10px_rgba(0,200,83,0.8)]" />
                      <span className="text-white/90 text-[10px] font-bold tracking-[0.2em] uppercase">{item.loc}</span>
                    </div>
                    <h3 className="text-white text-2xl font-light tracking-wide">{item.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* ==================== CONTACT SECTION ==================== */}
        <Section id="contact" className="py-24 lg:py-32 bg-[#121212] relative">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-20">
            {/* Header */}
            <div className="mb-16 max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-3xl bg-[#2d2d2d] border border-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white/90 backdrop-blur-sm shadow-md mb-6">
                <MessageCircle className="size-3 text-[#00C853]" />
                Concierge Support
              </div>
              <h2 className="text-white text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6">
                Refine Your <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Experience.</span>
              </h2>
              <p className="text-gray-400 text-lg md:text-xl font-medium leading-relaxed max-w-2xl">
                Whether you require bulk enterprise supply, partnership opportunities, or personal hydration refinement, our dedicated team is ready to assist with precision.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
              {/* Contact Form */}
              <div className="lg:col-span-7 bg-[#2d2d2d]/20 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 md:p-10 shadow-2xl">
                <h3 className="text-2xl font-bold text-white mb-8">Send a Message</h3>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-300 ml-2">First Name</label>
                      <input className="w-full bg-white border-0 rounded-3xl px-6 py-4 text-gray-900 font-medium focus:ring-2 focus:ring-[#00C853] placeholder:text-gray-400 transition-shadow outline-none" placeholder="Enter first name" type="text" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-300 ml-2">Last Name</label>
                      <input className="w-full bg-white border-0 rounded-3xl px-6 py-4 text-gray-900 font-medium focus:ring-2 focus:ring-[#00C853] placeholder:text-gray-400 transition-shadow outline-none" placeholder="Enter last name" type="text" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-300 ml-2">Email Address</label>
                    <input className="w-full bg-white border-0 rounded-3xl px-6 py-4 text-gray-900 font-medium focus:ring-2 focus:ring-[#00C853] placeholder:text-gray-400 transition-shadow outline-none" placeholder="name@company.com" type="email" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-300 ml-2">Inquiry Type</label>
                    <div className="relative">
                      <select className="w-full bg-white border-0 rounded-3xl px-6 py-4 text-gray-900 font-medium focus:ring-2 focus:ring-[#00C853] transition-shadow appearance-none cursor-pointer outline-none">
                        <option>Corporate Bulk Order</option>
                        <option>Private Event Hydration</option>
                        <option>Partnership Inquiry</option>
                        <option>General Support</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-300 ml-2">Message</label>
                    <textarea className="w-full bg-white border-0 rounded-3xl px-6 py-4 text-gray-900 font-medium focus:ring-2 focus:ring-[#00C853] placeholder:text-gray-400 transition-shadow resize-none outline-none" placeholder="How can we help refine your hydration?" rows={4} />
                  </div>
                  <button className="group w-full bg-[#00C853] hover:bg-[#00e676] text-white font-extrabold rounded-3xl py-4 mt-4 transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,200,83,0.3)] hover:shadow-[0_0_30px_rgba(0,200,83,0.5)]" type="button">
                    Submit Inquiry
                    <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </form>
              </div>

              {/* Contact Info */}
              <div className="lg:col-span-5 flex flex-col gap-6">
                {/* Quick actions */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button className="bg-white hover:bg-[#f5f5f5] text-[#222222] rounded-3xl p-6 flex flex-col items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group border border-transparent hover:border-[#00C853]">
                    <div className="size-12 rounded-full bg-[#00C853]/10 flex items-center justify-center mb-1 group-hover:bg-[#00C853] transition-colors duration-300">
                      <MessageCircle className="size-6 text-[#00C853] group-hover:text-white transition-colors" />
                    </div>
                    <span className="font-bold text-lg text-[#222222]">WhatsApp</span>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider group-hover:text-[#00C853] transition-colors">Instant Chat</span>
                  </button>
                  <button className="bg-white hover:bg-[#f5f5f5] text-[#222222] rounded-3xl p-6 flex flex-col items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group border border-transparent hover:border-[#00C853]">
                    <div className="size-12 rounded-full bg-[#00C853]/10 flex items-center justify-center mb-1 group-hover:bg-[#00C853] transition-colors duration-300">
                      <Phone className="size-6 text-[#00C853] group-hover:text-white transition-colors" />
                    </div>
                    <span className="font-bold text-lg text-[#222222]">Call Us</span>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider group-hover:text-[#00C853] transition-colors">24/7 Priority</span>
                  </button>
                </div>

                {/* Office info */}
                <div className="bg-[#2d2d2d]/20 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8">
                  <h4 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                    <MapPin className="size-5 text-[#00C853]" />
                    Global Headquarters
                  </h4>
                  <div className="space-y-4">
                    <p className="text-gray-300 leading-relaxed text-sm">
                      SAVI Water Group<br />
                      100 Platinum Drive, Suite 500<br />
                      Slate District, NY 10001
                    </p>
                    <div className="h-px w-full bg-white/10 my-4" />
                    <div className="flex items-center gap-3 text-gray-300">
                      <MessageCircle className="size-4 text-[#00C853]" />
                      <span className="font-medium hover:text-white transition-colors cursor-pointer text-sm">concierge@savi-water.com</span>
                    </div>
                  </div>
                </div>

                {/* Map placeholder */}
                <div className="w-full h-[250px] rounded-[2rem] overflow-hidden border border-white/10 relative group shadow-2xl bg-[#2d2d2d] flex items-center justify-center">
                  <Globe className="size-20 text-white/10 group-hover:text-[#00C853]/20 transition-colors" />
                  <div className="absolute bottom-4 left-4 bg-[#1a1a1a]/80 backdrop-blur-md border border-white/20 text-white px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest pointer-events-none flex items-center gap-2">
                    <span className="size-2 rounded-full bg-[#00C853] animate-pulse" />
                    Live Location
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Section>
      </main>

      <Footer />
    </div>
  );
}
