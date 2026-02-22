'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function DealersPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col">
      <Header />

      {/* Hero Section with Split Design */}
      <section className="relative min-h-screen pt-24 lg:pt-0 flex items-center overflow-hidden bg-[#1a1a1a]">
        <div className="w-full max-w-[1440px] mx-auto z-10 grid lg:grid-cols-2 h-full min-h-[calc(100vh-80px)]">
          {/* Left - Dark side */}
          <div className="relative p-8 lg:p-20 flex flex-col justify-center h-full text-white">
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 mb-8 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00C853] animate-pulse" />
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white">Global Network</span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-6">
                Purity in <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00C853] to-white">Prestige.</span>
              </h1>
              <p className="text-lg text-gray-400 font-medium max-w-md leading-relaxed mb-10">
                Join an exclusive circle of partners delivering pharmaceutical-grade hydration. Secure your territory with SAVI.
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  className="h-14 px-8 bg-[#00C853] hover:bg-[#009624] text-white rounded-2xl text-base font-bold tracking-wide transition-all flex items-center gap-2 shadow-xl shadow-[#00C853]/20"
                  onClick={() => document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Become a Partner
                  <span>→</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right - Green side */}
          <div className="relative p-8 lg:p-20 flex flex-col justify-center h-full text-white lg:rounded-bl-[4rem]">
            <div className="relative z-10">
              <h2 className="text-4xl font-bold mb-10 tracking-tight text-white">Franchise Benefits</h2>
              <div className="grid gap-6">
                {[
                  { icon: '📈', title: 'Premium Margins', desc: 'Access tier-one pricing structures designed for high-volume partners.' },
                  { icon: '🛡️', title: 'Exclusive Territories', desc: 'Secure your region with full exclusivity rights and zero local competition.' },
                  { icon: '📢', title: 'Global Marketing', desc: 'Leverage world-class brand assets and digital campaigns.' },
                ].map((item, i) => (
                  <div key={i} className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-white/20 transform hover:scale-[1.02] transition-transform duration-300">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-white text-[#00C853] flex items-center justify-center shrink-0 text-xl">
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white mb-1">{item.title}</h3>
                        <p className="text-sm text-white/80 leading-snug">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Logos */}
      <section className="py-12 border-b border-white/5 bg-[#1a1a1a]">
        <div className="container mx-auto px-6 md:px-12">
          <p className="text-center text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-8">Trusted by Premium Hospitality Partners</p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            {['FOUR SEASONS', 'HYATT', 'Ritz-Carlton', 'NOBU', 'Waldorf Astoria'].map((name, i) => (
              <div key={i} className="text-xl font-bold text-white">{name}</div>
            ))}
          </div>
        </div>
      </section>

      {/* Onboarding Steps */}
      <section className="py-24 bg-[#2d2d2d] relative overflow-hidden">
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="text-xs font-bold text-[#00C853] tracking-widest uppercase mb-3">Onboarding</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">The Path to Partnership</h3>
            <p className="text-gray-400">A streamlined 4-step process designed to get your operations running efficiently.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
            {[
              { num: '1', title: 'Apply Online', desc: 'Complete the preliminary application form below.', active: true },
              { num: '2', title: 'Screening Call', desc: 'Connect with our regional director to discuss potential.' },
              { num: '3', title: 'Site Approval', desc: 'We verify your warehousing and logistics capabilities.' },
              { num: '4', title: 'Launch', desc: 'Receive stock, marketing assets, and start selling.' },
            ].map((step, i) => (
              <div key={i} className="flex flex-col items-center text-center group">
                <div className={`w-20 h-20 rounded-2xl ${step.active ? 'bg-[#1a1a1a] border-[#00C853]' : 'bg-[#1a1a1a]'} border border-white/10 shadow-xl flex items-center justify-center text-xl font-bold ${step.active ? 'text-[#00C853]' : 'text-gray-600'} mb-8 relative z-10 transition-transform group-hover:-translate-y-2 group-hover:shadow-xl group-hover:text-[#00C853] group-hover:border-[#00C853]/30`}>
                  {step.num}
                  {step.active && (
                    <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-[#00C853] rounded-full border-[3px] border-[#2d2d2d] flex items-center justify-center">
                      <span className="text-white text-[14px] font-bold">✓</span>
                    </div>
                  )}
                </div>
                <h4 className="text-lg font-bold text-white mb-2">{step.title}</h4>
                <p className="text-sm text-gray-500 leading-relaxed px-4">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="min-h-screen flex items-stretch bg-[#1a1a1a] overflow-hidden" id="application-form">
        <div className="w-full max-w-[1440px] mx-auto grid lg:grid-cols-12 h-full">
          {/* Left Info */}
          <div className="lg:col-span-5 bg-[#1a1a1a] p-10 lg:p-20 text-white flex flex-col justify-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#00C853]/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="relative z-10">
              <h3 className="text-3xl lg:text-4xl font-bold mb-6">Begin Your Journey</h3>
              <p className="text-gray-400 mb-12 leading-relaxed text-lg">
                Please provide accurate details to expedite the approval process. Our team reviews applications within 48 hours.
              </p>
              <div className="space-y-8">
                {[
                  { icon: '🛡️', title: 'Secure Application', desc: 'Your data is encrypted via 256-bit SSL protection.' },
                  { icon: '📞', title: 'Dealer Support', desc: 'Need help? Contact partners@savi.com' },
                  { icon: '📦', title: 'Immediate Access', desc: 'Qualified partners get inventory priority.' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-5 group">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-[#00C853] shrink-0 border border-white/10 group-hover:bg-[#00C853] group-hover:text-white transition-colors duration-300 text-2xl">
                      {item.icon}
                    </div>
                    <div>
                      <h5 className="font-bold text-white text-base mb-1">{item.title}</h5>
                      <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Form */}
          <div className="lg:col-span-7 bg-[#2d2d2d] p-6 lg:p-20 flex flex-col justify-center">
            <div className="bg-[#1a1a1a]/50 backdrop-blur-md rounded-3xl p-8 lg:p-12 shadow-[0_20px_40px_rgba(0,0,0,0.2)] border border-white/10">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-white">Application Form</h2>
                <span className="text-xs font-bold text-[#00C853] bg-[#00C853]/10 px-3 py-1 rounded-full uppercase tracking-wider">Step 1 of 3</span>
              </div>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-400 ml-1">First Name</label>
                    <input className="w-full h-14 px-4 rounded-2xl bg-white text-[#1a1a1a] text-sm font-medium border border-gray-200 focus:border-[#00C853] focus:ring-2 focus:ring-[#00C853]/20 outline-none transition-all placeholder:text-gray-400" placeholder="Jane" type="text" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-400 ml-1">Last Name</label>
                    <input className="w-full h-14 px-4 rounded-2xl bg-white text-[#1a1a1a] text-sm font-medium border border-gray-200 focus:border-[#00C853] focus:ring-2 focus:ring-[#00C853]/20 outline-none transition-all placeholder:text-gray-400" placeholder="Doe" type="text" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-400 ml-1">Email Address</label>
                    <input className="w-full h-14 px-4 rounded-2xl bg-white text-[#1a1a1a] text-sm font-medium border border-gray-200 focus:border-[#00C853] focus:ring-2 focus:ring-[#00C853]/20 outline-none transition-all placeholder:text-gray-400" placeholder="jane@company.com" type="email" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-400 ml-1">Phone Number</label>
                    <input className="w-full h-14 px-4 rounded-2xl bg-white text-[#1a1a1a] text-sm font-medium border border-gray-200 focus:border-[#00C853] focus:ring-2 focus:ring-[#00C853]/20 outline-none transition-all placeholder:text-gray-400" placeholder="+1 (555) 000-0000" type="tel" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-400 ml-1">Company Name</label>
                  <input className="w-full h-14 px-4 rounded-2xl bg-white text-[#1a1a1a] text-sm font-medium border border-gray-200 focus:border-[#00C853] focus:ring-2 focus:ring-[#00C853]/20 outline-none transition-all placeholder:text-gray-400" placeholder="Your Registered Business Name" type="text" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-400 ml-1">Why SAVI?</label>
                  <textarea className="w-full h-32 px-4 py-3 rounded-2xl bg-white text-[#1a1a1a] text-sm font-medium border border-gray-200 focus:border-[#00C853] focus:ring-2 focus:ring-[#00C853]/20 outline-none transition-all placeholder:text-gray-400 resize-none" placeholder="Tell us about your distribution experience and vision..." />
                </div>
                <div className="pt-4">
                  <button className="w-full h-14 bg-[#00C853] hover:bg-[#009624] text-white rounded-2xl font-bold text-lg shadow-lg hover:shadow-[#00C853]/30 transition-all flex items-center justify-center gap-2 group" type="button">
                    Submit Application
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </button>
                  <p className="text-center text-xs text-gray-500 mt-4">By submitting this form, you agree to our Privacy Policy and Terms of Partnership.</p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
