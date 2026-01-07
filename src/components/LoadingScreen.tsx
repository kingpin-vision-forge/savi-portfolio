'use client';

import { useState, useEffect } from 'react';
import { Droplets, ShieldCheck } from 'lucide-react';

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    const hasLoaded = sessionStorage.getItem('savi-loaded');
    
    if (hasLoaded) {
      // Already loaded before - skip loading screen entirely
      setShouldRender(false);
      onComplete();
      return;
    }

    const duration = 4000;
    const interval = 40;
    const increment = 100 / (duration / interval);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          sessionStorage.setItem('savi-loaded', 'true');
          setTimeout(() => {
            setIsVisible(false);
            setTimeout(onComplete, 500);
          }, 300);
          return 100;
        }
        return next;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  // Don't render if already loaded
  if (!shouldRender) {
    return null;
  }

  if (!isVisible && progress >= 100) {
    return (
      <div className="fixed inset-0 z-50 bg-[#030303] opacity-0 animate-fade-out pointer-events-none" />
    );
  }

  return (
    <div className={`fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-[#030303] refraction-bg transition-opacity duration-500 ${progress >= 100 ? 'opacity-0' : 'opacity-100'}`}>
      {/* Background blur effect */}
      <div className="absolute inset-0 z-0">
        <div 
          className="w-full h-full bg-cover bg-center opacity-20 mix-blend-color-dodge pointer-events-none grayscale contrast-125 animate-pulse-slow" 
          style={{
            backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDigz1DezpsP3YUlb4M-iuUULTdIQEYx2C-6ekHELG-nRTkMZMlN6r9AjLPRpsWfxtj-sdMgGD9Nw2Wjt9hejPWToTrMRMqVxV7Pm60lkRX-R9LV05823PztT-PqR8FR1hdOh2LGjb-SxYXcRqM-F5-qwXXD6xL_HCKuNSf0nfrDL5UWwSVUBwMaKoUFEuJn_sEvGMTlTGud5EAbRkRh_JXlVI387ZnSkes9sGBeRayTbr_tIfdt-LFHY92eYx3HGcslWBZIyF_duXc')",
            filter: 'blur(80px)',
            transform: `scale(${1 + progress * 0.003})`
          }}
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-2xl px-6">
        {/* Logo section with rings */}
        <div className="group relative mb-16 flex items-center justify-center">
          <div 
            className="absolute h-72 w-72 rounded-full border border-white/5 opacity-30 animate-pulse-slow"
            style={{ transform: `scale(${1.1 + progress * 0.002})` }}
          />
          <div 
            className="absolute h-96 w-96 rounded-full border border-white/5 opacity-20"
            style={{ transform: `scale(${1.05 + progress * 0.001})`, animationDelay: '1s' }}
          />
          
          {/* Water ripple image with icon overlay */}
          <div className="relative h-56 w-56 overflow-hidden rounded-full shadow-2xl shadow-black/50 ring-1 ring-white/10">
            <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/10 to-black/60 mix-blend-overlay" />
            <img 
              alt="Macro close-up of a pure water ripple" 
              className="h-full w-full object-cover opacity-80 transition-transform duration-[4s] ease-in-out grayscale brightness-110 contrast-125"
              style={{ transform: `scale(${1.1 - progress * 0.001})` }}
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCcQeX0EFkUkCzM3LwTAMOAIQgSPYkZ8o1-v93QaMW6rzdcwHdg9adjGWHlxOT-teI_7wlszgA23EMlzyn6QJQTJ0H_5fdRF5IbuItPdqBX_s58rbJ4XSYvQtIvOYiD_SMaR_2IW6BV3pQuAcotX3sFK5S26dgqTw0pA7VdG31FpkT1QwSzzCj54oQ17Ry_xvmH2-Hf5KB58KHvV2bAVq7XnDxfeHZxj7Ly-JX8RMjo61BoqZ2FBYUGikeGPv_8NSYuHzF4Jul7AEkn"
            />
            <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/10 backdrop-blur-[1px]">
              <Droplets 
                className="text-white drop-shadow-lg opacity-90 transition-transform duration-300"
                style={{ width: `${80 + progress * 0.3}px`, height: `${80 + progress * 0.3}px` }}
              />
            </div>
          </div>
        </div>

        {/* Brand name */}
        <div className="flex flex-col items-center gap-3 text-center">
          <h1 
            className="text-white tracking-[0.4em] text-4xl md:text-5xl font-bold uppercase leading-tight text-glow transition-all duration-300"
            style={{ letterSpacing: `${0.4 + progress * 0.002}em` }}
          >
            SAVI
          </h1>
          <div className="mt-2 flex items-center justify-center gap-4 opacity-80">
            <span 
              className="h-px bg-gradient-to-r from-transparent to-[#00C853]/50 transition-all duration-300"
              style={{ width: `${8 + progress * 0.2}px` }}
            />
            <p className="text-neutral-400 text-xs font-medium uppercase tracking-[0.3em]">
              Pure • Untouched
            </p>
            <span 
              className="h-px bg-gradient-to-l from-transparent to-[#00C853]/50 transition-all duration-300"
              style={{ width: `${8 + progress * 0.2}px` }}
            />
          </div>
        </div>

        {/* Progress section */}
        <div className="mt-20 flex w-full max-w-xs flex-col gap-5">
          <div className="flex items-center justify-between px-1">
            <p className="text-neutral-500 text-[10px] font-semibold uppercase tracking-widest">
              Hydrating
            </p>
            <p className="text-white text-[10px] font-bold tracking-widest font-mono">
              {Math.round(progress)}%
            </p>
          </div>
          
          {/* Progress bar */}
          <div className="relative h-[2px] w-full overflow-hidden bg-neutral-800 rounded-full">
            <div 
              className="absolute left-0 top-0 h-full bg-gradient-to-r from-green-600 to-green-400 shadow-[0_0_20px_rgba(0,200,83,0.6)] rounded-full transition-all duration-100 ease-out"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 w-full animate-shimmer bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-50" />
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-neutral-600 text-[10px] font-medium tracking-wide uppercase">
              {progress < 30 ? 'Initializing...' : progress < 60 ? 'Loading Assets...' : progress < 90 ? 'Preparing Experience...' : 'Almost Ready...'}
            </p>
          </div>
        </div>
      </div>

      {/* Secure connection badge */}
      <div className="absolute bottom-8 left-0 w-full text-center z-20">
        <div className="inline-flex items-center gap-3 rounded-full border border-white/5 bg-white/5 px-4 py-1.5 backdrop-blur-md">
          <ShieldCheck className="size-4 text-[#00C853]" />
          <span className="text-[10px] font-semibold uppercase tracking-widest text-neutral-400">
            Secure Connection
          </span>
        </div>
      </div>
    </div>
  );
}
