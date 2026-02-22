import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function QualityPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col">
      {/* Background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-[#2d2d2d] opacity-30 blur-[150px] rounded-full" />
        <div className="absolute top-[40%] right-[-5%] w-[40%] h-[40%] bg-white opacity-5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[10%] left-[20%] w-[30%] h-[30%] bg-[#00C853] opacity-5 blur-[180px] rounded-full" />
      </div>

      <Header />

      <main className="flex min-h-screen flex-col pt-32 pb-20">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-20 w-full">
          {/* Header */}
          <div className="flex flex-col items-center text-center mb-24">
            <div className="inline-flex items-center gap-2 rounded-3xl bg-[#2d2d2d] border border-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white/90 backdrop-blur-sm shadow-md mb-8">
              <span className="size-1.5 rounded-full bg-[#00C853] animate-pulse shadow-[0_0_8px_rgba(0,200,83,0.8)]" />
              Verification & Compliance
            </div>
            <h1 className="text-white text-3xl sm:text-5xl md:text-7xl font-extrabold tracking-tight mb-6 sm:mb-8 text-glow leading-none">
              Uncompromising<br /><span className="text-gray-500">Purity Standards.</span>
            </h1>
            <p className="text-gray-400 text-base sm:text-lg md:text-xl font-medium leading-relaxed max-w-2xl mx-auto">
              SAVI exceeds industry benchmarks through rigorous independent testing. Our 12-stage filtration and mineralization process is validated by world-class certification bodies.
            </p>
          </div>

          {/* Live Analysis Panel */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-32">
            <div className="lg:col-span-8 bg-[#2d2d2d] rounded-3xl p-5 sm:p-8 md:p-12 border border-white/5 relative overflow-hidden group">
              <div className="absolute -top-10 -right-10 p-8 opacity-[0.03] group-hover:opacity-10 transition-opacity duration-500">
                <span className="text-[300px] leading-none text-white">⚗️</span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#1a1a1a]/50 to-transparent" />
              <div className="relative z-10">
                <h3 className="text-white text-2xl font-bold mb-10 flex items-center gap-3">
                  <span className="size-2 bg-[#00C853] rounded-full animate-pulse" />
                  Live Water Analysis
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-10 md:gap-8">
                  <div className="flex flex-col gap-3">
                    <div className="flex justify-between items-baseline">
                      <span className="text-gray-500 text-xs font-bold uppercase tracking-wider">Alkalinity (pH)</span>
                      <span className="text-[#00C853] text-sm">✓</span>
                    </div>
                    <div className="flex items-end gap-1">
                      <span className="text-4xl sm:text-6xl font-extrabold text-white tracking-tighter">7.4</span>
                      <span className="text-[#00C853] font-bold text-lg mb-2">+</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/10 rounded-full mt-2 overflow-hidden">
                      <div className="h-full w-[85%] bg-[#00C853] shadow-[0_0_10px_rgba(0,200,83,0.5)] rounded-full" />
                    </div>
                    <p className="text-gray-400 text-xs mt-1">Optimal Balance</p>
                  </div>
                  <div className="flex flex-col gap-3">
                    <div className="flex justify-between items-baseline">
                      <span className="text-gray-500 text-xs font-bold uppercase tracking-wider">TDS Level</span>
                      <span className="text-[#00C853] text-sm">✓</span>
                    </div>
                    <div className="flex items-end gap-1">
                      <span className="text-4xl sm:text-6xl font-extrabold text-white tracking-tighter">280</span>
                      <span className="text-gray-500 text-sm font-bold mb-2 ml-1">ppm</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/10 rounded-full mt-2 overflow-hidden">
                      <div className="h-full w-[40%] bg-[#00C853] rounded-full" />
                    </div>
                    <p className="text-gray-400 text-xs mt-1">Electrolyte Rich</p>
                  </div>
                  <div className="flex flex-col gap-3">
                    <div className="flex justify-between items-baseline">
                      <span className="text-gray-500 text-xs font-bold uppercase tracking-wider">Contaminants</span>
                      <span className="text-[#00C853] text-sm">✓</span>
                    </div>
                    <div className="flex items-end gap-1">
                      <span className="text-4xl sm:text-6xl font-extrabold text-white tracking-tighter">0</span>
                      <span className="text-[#00C853] font-bold text-lg mb-2">.00</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/10 rounded-full mt-2">
                      <div className="h-full w-0 bg-[#00C853]" />
                    </div>
                    <p className="text-gray-400 text-xs mt-1">Micro-Plastics Free</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Lab Report */}
            <div className="lg:col-span-4 bg-[#121212] rounded-3xl p-8 md:p-10 border border-white/10 flex flex-col justify-between relative overflow-hidden group">
              <div className="absolute inset-0 bg-[#00C853]/5 group-hover:bg-[#00C853]/10 transition-colors duration-500" />
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                  <div className="size-12 rounded-2xl bg-[#2d2d2d] border border-white/10 flex items-center justify-center">
                    <span className="text-[#00C853] text-2xl">📄</span>
                  </div>
                  <span className="text-white/30 text-[10px] font-bold tracking-widest border border-white/10 px-2 py-1 rounded-lg">UPDATED: OCT 2023</span>
                </div>
                <h3 className="text-white text-xl font-bold mb-3">Detailed Lab Report</h3>
                <p className="text-gray-400 text-sm leading-relaxed">View the full spectrum analysis from our ISO 17025 accredited laboratory detailing mineral composition and purity tests.</p>
              </div>
              <button className="relative z-10 mt-8 w-full py-4 rounded-2xl bg-white text-[#1a1a1a] font-bold hover:bg-[#00C853] hover:text-white hover:shadow-[0_0_20px_rgba(0,200,83,0.4)] transition-all duration-300 flex items-center justify-center gap-2 group/btn">
                View PDF
                <span className="text-lg group-hover/btn:translate-y-0.5 transition-transform">⬇️</span>
              </button>
            </div>
          </div>

          {/* Certifications */}
          <div className="mb-24">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-white text-3xl font-bold border-l-4 border-[#00C853] pl-6">Global Certifications</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {[
                { icon: '🏛️', title: 'BIS License (ISI)', desc: 'ISI Certification from Central Government Authority ensuring highest quality standards for packaged drinking water.' },
                { icon: '🍽️', title: 'FSSAI', desc: 'Food Safety and Standards Authority of India certification from State Government Authority.' },
                { icon: '🛡️', title: 'ISO Certified', desc: 'International Organization for Standardization certification confirming our rigorous quality management systems.' },
                { icon: '🏭', title: 'MSME Registered', desc: 'Registered under Micro, Small and Medium Enterprises promoting quality manufacturing standards.' },
                { icon: '🥇', title: 'ZED Certified', desc: 'Zero Defect Zero Effect certification with Bronze & Silver achieved, Gold certification under process.' },
                { icon: '🏆', title: 'First ZED Gold', desc: 'Proud to be the First ZED Gold Company of the District, setting benchmarks in quality excellence.' },
                { icon: '🔬', title: 'In-House Labs', desc: 'State-of-the-art Physical/Chemical Lab and Microbiological Lab for continuous quality testing and assurance.' },
              ].map((cert, i) => (
                <div key={i} className="bg-[#2d2d2d] p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-white/5 card-hover-effect group h-full flex flex-col">
                  <div className="size-14 rounded-2xl bg-[#222] border border-white/10 flex items-center justify-center mb-6 shadow-lg shadow-black/50 group-hover:border-[#00C853]/30 transition-colors">
                    <span className="text-[#00C853] text-2xl">{cert.icon}</span>
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
                <h2 className="text-white text-4xl font-bold mb-6 leading-tight">The Purity<br />Protocol.</h2>
                <p className="text-gray-400 text-lg mb-10 leading-relaxed">A meticulous journey from source to seal, ensuring the distinctive SAVI taste profile remains untouched by the outside world.</p>
              </div>

              <div className="lg:w-2/3 flex flex-col gap-6 w-full">
                {[
                  { num: '01', title: 'Molecular Reverse Osmosis', desc: 'Water is forced through semi-permeable membranes to remove 99.9% of dissolved solids, bacteria, and impurities, stripping the water down to its essential H2O molecules.' },
                  { num: '02', title: 'Mineral Infusion', desc: 'A proprietary blend of calcium, magnesium, and potassium is reintroduced to create our signature smooth alkalinity and optimize hydration efficiency.' },
                  { num: '03', title: 'Ozone Sanitization', desc: 'Final purification using activated oxygen ensures the bottle and water remain sterile until the moment you open the cap, preserving freshness for 24 months.' },
                ].map((step, i) => (
                  <div key={i} className="flex flex-col sm:flex-row gap-4 sm:gap-6 p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-[#2d2d2d]/30 border border-white/5 hover:bg-[#2d2d2d] transition-all duration-300 group">
                    <span className="text-white/10 text-6xl font-black group-hover:text-[#00C853]/20 transition-colors">{step.num}</span>
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
      </main>

      <Footer />
    </div>
  );
}
