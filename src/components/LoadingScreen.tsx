'use client';

import { useState, useEffect, useRef } from 'react';
import { Droplets, ShieldCheck } from 'lucide-react';

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'loading' | 'fading' | 'done'>('loading');
  const hasRunRef = useRef(false);

  useEffect(() => {
    // Prevent double execution in React Strict Mode
    if (hasRunRef.current) return;
    hasRunRef.current = true;

    const hasLoaded = sessionStorage.getItem('savi-loaded');
    
    if (hasLoaded) {
      // Skip loading but still show a brief fade
      setProgress(100);
      setPhase('fading');
      const timer = setTimeout(() => {
        setPhase('done');
        onComplete();
      }, 300);
      return () => clearTimeout(timer);
    }

    const duration = 3500;
    const interval = 35;
    const increment = 100 / (duration / interval);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          sessionStorage.setItem('savi-loaded', 'true');
          setPhase('fading');
          setTimeout(() => {
            setPhase('done');
            onComplete();
          }, 600);
          return 100;
        }
        return next;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  // Don't render anything once done
  if (phase === 'done') {
    return null;
  }

  return (
    <div 
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden transition-opacity duration-500 ease-out ${
        phase === 'fading' ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      style={{ backgroundColor: '#030303' }}
    >
      {/* Dark gradient background */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: 'radial-gradient(ellipse at 50% 30%, rgba(30,30,30,0.8) 0%, transparent 60%)',
          }}
        />
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            background: 'radial-gradient(ellipse at 30% 70%, rgba(20,20,20,0.6) 0%, transparent 50%)',
          }}
        />
      </div>

      {/* Subtle noise texture overlay */}
      <div 
        className="absolute inset-0 z-[1] opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-2xl px-6">
        {/* Logo section with subtle rings */}
        <div className="relative mb-16 flex items-center justify-center">
          <div 
            className="absolute h-64 w-64 rounded-full border border-white/[0.03]"
            style={{ transform: `scale(${1 + progress * 0.002})` }}
          />
          <div 
            className="absolute h-80 w-80 rounded-full border border-white/[0.02]"
            style={{ transform: `scale(${1.05 + progress * 0.001})` }}
          />
          
          {/* Central icon container */}
          <div className="relative h-40 w-40 flex items-center justify-center rounded-full bg-gradient-to-b from-white/[0.04] to-transparent border border-white/[0.06] shadow-2xl shadow-black/50">
            <Droplets 
              className="text-white/80 drop-shadow-lg"
              style={{ 
                width: `${60 + progress * 0.2}px`, 
                height: `${60 + progress * 0.2}px`,
                transition: 'all 0.3s ease-out'
              }}
            />
          </div>
        </div>

        {/* Brand name */}
        <div className="flex flex-col items-center gap-4 text-center">
          <h1 
            className="text-white tracking-[0.35em] text-3xl md:text-4xl font-semibold uppercase"
            style={{ 
              letterSpacing: `${0.35 + progress * 0.001}em`,
              textShadow: '0 0 40px rgba(255,255,255,0.1)'
            }}
          >
            SAVI
          </h1>
          <div className="flex items-center justify-center gap-4 opacity-60">
            <span 
              className="h-px bg-gradient-to-r from-transparent to-white/30 transition-all duration-500"
              style={{ width: `${20 + progress * 0.3}px` }}
            />
            <p className="text-neutral-500 text-[10px] font-medium uppercase tracking-[0.25em]">
              Pure • Untouched
            </p>
            <span 
              className="h-px bg-gradient-to-l from-transparent to-white/30 transition-all duration-500"
              style={{ width: `${20 + progress * 0.3}px` }}
            />
          </div>
        </div>

        {/* Progress section */}
        <div className="mt-20 flex w-full max-w-xs flex-col gap-4">
          <div className="flex items-center justify-between px-1">
            <p className="text-neutral-600 text-[9px] font-medium uppercase tracking-widest">
              Loading
            </p>
            <p className="text-neutral-400 text-[9px] font-semibold tracking-wider font-mono">
              {Math.round(progress)}%
            </p>
          </div>
          
          {/* Progress bar - subtle white/gray */}
          <div className="relative h-[1px] w-full overflow-hidden bg-white/[0.08] rounded-full">
            <div 
              className="absolute left-0 top-0 h-full bg-gradient-to-r from-white/40 to-white/60 rounded-full transition-all duration-75 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
          
          <div className="text-center">
            <p className="text-neutral-600 text-[9px] font-medium tracking-wide">
              {progress < 25 ? 'Initializing...' : progress < 50 ? 'Loading resources...' : progress < 80 ? 'Preparing experience...' : 'Almost ready...'}
            </p>
          </div>
        </div>
      </div>

      {/* Secure badge */}
      <div className="absolute bottom-8 left-0 w-full text-center z-20">
        <div className="inline-flex items-center gap-2.5 rounded-full border border-white/[0.06] bg-white/[0.02] px-4 py-1.5 backdrop-blur-sm">
          <ShieldCheck className="size-3.5 text-white/40" />
          <span className="text-[9px] font-medium uppercase tracking-widest text-neutral-500">
            Secure Connection
          </span>
        </div>
      </div>
    </div>
  );
}
