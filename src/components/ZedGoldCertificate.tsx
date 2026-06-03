'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function ZedGoldCertificate() {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger entrance animation
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (isLightboxOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isLightboxOpen]);

  return (
    <>
      {/* ═══ ZED Gold Showcase Section ═══ */}
      <section
        className={`relative mb-32 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
      >
        {/* Ambient gold glow behind the section */}
        <div className="absolute -inset-4 bg-gradient-to-r from-[#FFD700]/5 via-[#B8860B]/8 to-[#FFD700]/5 rounded-[3rem] blur-3xl pointer-events-none" />

        <div className="relative bg-gradient-to-br from-[#1a1a1a] via-[#1f1b13] to-[#1a1a1a] rounded-3xl border border-[#FFD700]/20 overflow-hidden">
          {/* Decorative gold accent line at top */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FFD700] to-transparent opacity-60" />

          {/* Floating gold particles (decorative) */}
          <div className="absolute top-8 right-12 w-2 h-2 bg-[#FFD700]/30 rounded-full animate-pulse" />
          <div className="absolute top-20 right-24 w-1.5 h-1.5 bg-[#FFD700]/20 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
          <div className="absolute bottom-16 left-16 w-1 h-1 bg-[#FFD700]/25 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Left: Certificate Image */}
            <div className="relative p-6 sm:p-10 lg:p-12 flex items-center justify-center">
              {/* Subtle vignette */}
              <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/20 pointer-events-none" />

              <button
                onClick={() => setIsLightboxOpen(true)}
                className="relative group cursor-pointer rounded-2xl overflow-hidden shadow-2xl shadow-black/50 hover:shadow-[#FFD700]/10 transition-all duration-500 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[#FFD700]/50 focus:ring-offset-2 focus:ring-offset-[#1a1a1a]"
                aria-label="View full ZED Gold certificate"
              >
                {/* Gold border frame */}
                <div className="absolute inset-0 rounded-2xl border-2 border-[#FFD700]/30 group-hover:border-[#FFD700]/60 transition-colors duration-500 z-10 pointer-events-none" />

                {/* Shine sweep effect on hover */}
                <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden rounded-2xl">
                  <div className="absolute -inset-full top-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 group-hover:translate-x-[200%] transition-transform duration-1000 ease-out" />
                </div>

                <Image
                  src="/images/zed-gold-certificate.png"
                  alt="ZED Gold Certificate - Zero Defect Zero Effect - MSME Sustainable Certification awarded to Jevoor Empire"
                  width={500}
                  height={700}
                  className="w-full max-w-[420px] h-auto object-contain"
                  priority
                />

                {/* Click-to-view overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center z-10">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/10 backdrop-blur-sm px-5 py-3 rounded-xl border border-white/20 flex items-center gap-2">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                    <span className="text-white text-sm font-semibold">View Certificate</span>
                  </div>
                </div>
              </button>
            </div>

            {/* Right: Certificate Details */}
            <div className="relative p-6 sm:p-10 lg:p-12 flex flex-col justify-center">
              {/* Badge */}
              <div className="inline-flex items-center gap-2.5 rounded-full bg-[#FFD700]/10 border border-[#FFD700]/25 px-4 py-2 mb-8 w-fit">
                <span className="relative flex size-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FFD700] opacity-75" />
                  <span className="relative inline-flex rounded-full size-2 bg-[#FFD700]" />
                </span>
                <span className="text-[#FFD700] text-xs font-bold uppercase tracking-widest">Achievement Unlocked</span>
              </div>

              {/* Title */}
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4 leading-tight">
                ZED <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] via-[#FFA500] to-[#FFD700]">Gold</span> Certified
              </h2>

              {/* Subtitle */}
              <p className="text-gray-400 text-base sm:text-lg leading-relaxed mb-8 max-w-lg">
                Proud to be the <span className="text-white font-semibold">first company in the district</span> to achieve ZED Gold certification — the highest tier of the MSME Sustainable Zero Defect Zero Effect scheme.
              </p>

              {/* Key Details Grid */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                  <span className="text-gray-500 text-[10px] font-bold uppercase tracking-widest block mb-1">Certification</span>
                  <span className="text-white font-bold text-sm">ZED Gold</span>
                </div>
                <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                  <span className="text-gray-500 text-[10px] font-bold uppercase tracking-widest block mb-1">Issued By</span>
                  <span className="text-white font-bold text-sm">Govt. of India</span>
                </div>
                <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                  <span className="text-gray-500 text-[10px] font-bold uppercase tracking-widest block mb-1">Certificate No.</span>
                  <span className="text-white font-bold text-sm">23052026_301444</span>
                </div>
                <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                  <span className="text-gray-500 text-[10px] font-bold uppercase tracking-widest block mb-1">Valid Until</span>
                  <span className="text-white font-bold text-sm">May 2029</span>
                </div>
              </div>

              {/* ZED Meaning */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 mb-8">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-xl bg-[#FFD700]/10 border border-[#FFD700]/20 flex items-center justify-center shrink-0">
                    <span className="text-[#FFD700] text-lg">🎯</span>
                  </div>
                  <div>
                    <span className="text-white font-bold text-sm block">Zero Defect</span>
                    <span className="text-gray-500 text-xs">Highest quality standards</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-xl bg-[#00C853]/10 border border-[#00C853]/20 flex items-center justify-center shrink-0">
                    <span className="text-[#00C853] text-lg">🌿</span>
                  </div>
                  <div>
                    <span className="text-white font-bold text-sm block">Zero Effect</span>
                    <span className="text-gray-500 text-xs">Sustainable manufacturing</span>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <button
                onClick={() => setIsLightboxOpen(true)}
                className="w-fit px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-[#1a1a1a] font-bold text-sm hover:shadow-[0_0_30px_rgba(255,215,0,0.3)] transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                View Full Certificate
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ Lightbox Modal ═══ */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label="ZED Gold Certificate"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/90 backdrop-blur-md animate-[fadeIn_0.2s_ease-out]"
            onClick={() => setIsLightboxOpen(false)}
          />

          {/* Content */}
          <div className="relative z-10 max-w-2xl w-full max-h-[90vh] animate-[scaleIn_0.3s_ease-out]">
            {/* Close button */}
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="absolute -top-12 right-0 sm:top-4 sm:right-4 z-20 size-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              aria-label="Close certificate view"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Certificate Image */}
            <div className="rounded-2xl overflow-hidden shadow-2xl shadow-[#FFD700]/10 border border-[#FFD700]/20">
              <Image
                src="/images/zed-gold-certificate.png"
                alt="ZED Gold Certificate - Full View"
                width={800}
                height={1120}
                className="w-full h-auto object-contain bg-white"
                priority
              />
            </div>

            {/* Caption */}
            <p className="text-center text-gray-400 text-sm mt-4">
              ZED Gold Certificate • MSME Sustainable Certification • Jevoor Empire
            </p>
          </div>
        </div>
      )}

      {/* Lightbox animations injected as inline styles */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </>
  );
}
