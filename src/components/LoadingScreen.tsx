'use client';

import { useState, useEffect } from 'react';
import { Construction, Wrench, AlertTriangle, Clock, ShieldCheck } from 'lucide-react';

interface LoadingScreenProps {
  onComplete: () => void;
  onTransitionStart?: () => void;
}

export default function LoadingScreen({ onComplete, onTransitionStart }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [shouldRender, setShouldRender] = useState(true);

  // Progress timer - slower to give users time to read the maintenance message
  useEffect(() => {
    const duration = 6000;
    const interval = 60;
    const increment = 100 / (duration / interval);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            onTransitionStart?.();
            setIsVisible(false);
            setTimeout(onComplete, 500);
          }, 300);
          return 100;
        }
        return next;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete, onTransitionStart]);

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
      {/* Background effects */}
      <div className="absolute inset-0 z-0">
        {/* Orange/amber gradient for maintenance theme */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(251, 146, 60, 0.3) 0%, rgba(251, 146, 60, 0.1) 30%, transparent 70%)',
          }}
        />
        {/* Animated grid pattern */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(rgba(251, 146, 60, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(251, 146, 60, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            animation: 'pulse 4s ease-in-out infinite',
          }}
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-3xl px-6">
        
        {/* Big Under Maintenance Visual */}
        <div className="relative mb-8">
          {/* Outer animated rings */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div 
              className="absolute h-80 w-80 md:h-96 md:w-96 rounded-full border-2 border-orange-400/20 animate-ping"
              style={{ animationDuration: '3s' }}
            />
            <div 
              className="absolute h-72 w-72 md:h-80 md:w-80 rounded-full border border-amber-400/30 animate-pulse"
            />
            <div 
              className="absolute h-64 w-64 md:h-72 md:w-72 rounded-full border border-yellow-400/20"
              style={{ animation: 'spin 20s linear infinite' }}
            />
          </div>
          
          {/* Main construction icon container */}
          <div className="relative h-56 w-56 md:h-72 md:w-72 flex items-center justify-center">
            {/* Glow effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-b from-orange-500/20 via-amber-500/10 to-transparent blur-3xl" />
            
            {/* Hexagon background */}
            <div className="absolute inset-4 md:inset-6 bg-gradient-to-br from-orange-500/10 via-amber-500/5 to-transparent rounded-3xl backdrop-blur-sm border border-orange-400/20" />
            
            {/* Main icon */}
            <div className="relative flex flex-col items-center gap-4">
              <div className="relative">
                <Construction 
                  className="h-24 w-24 md:h-32 md:w-32 text-orange-400 animate-bounce" 
                  style={{ animationDuration: '2s' }}
                  strokeWidth={1.5}
                />
                {/* Wrench overlay with rotation */}
                <Wrench 
                  className="absolute -top-2 -right-2 md:-top-4 md:-right-4 h-10 w-10 md:h-12 md:w-12 text-amber-400"
                  style={{ animation: 'spin 4s ease-in-out infinite', transformOrigin: 'center' }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Warning banner */}
        <div className="mb-8 flex items-center gap-3 rounded-full border border-orange-400/30 bg-orange-500/10 px-6 py-3 backdrop-blur-md animate-pulse">
          <AlertTriangle className="h-5 w-5 text-orange-400" />
          <span className="text-sm md:text-base font-bold uppercase tracking-widest text-orange-400">
            Under Maintenance
          </span>
          <AlertTriangle className="h-5 w-5 text-orange-400" />
        </div>

        {/* Brand logo */}
        <div className="flex flex-col items-center gap-4 text-center mb-8">
          <img 
            src="/logo-white.jpeg"
            alt="SAVI"
            className="h-14 md:h-18 w-auto object-contain opacity-80"
          />
          
          {/* Maintenance message */}
          <div className="max-w-md space-y-3">
            <h2 className="text-xl md:text-2xl font-bold text-white">
              We're Making Things Better
            </h2>
            <p className="text-neutral-400 text-sm md:text-base leading-relaxed">
              Our website is currently undergoing scheduled maintenance. 
              We'll be back shortly with an even better experience for you.
            </p>
          </div>
        </div>

        {/* Time estimate */}
        <div className="flex items-center gap-3 mb-10 text-neutral-400">
          <Clock className="h-4 w-4 text-amber-400 animate-pulse" />
          <span className="text-xs md:text-sm uppercase tracking-wider">
            Estimated downtime: Coming back soon
          </span>
        </div>

        {/* Progress section */}
        <div className="w-full max-w-sm flex flex-col gap-4">
          <div className="flex items-center justify-between px-1">
            <p className="text-neutral-500 text-[10px] font-semibold uppercase tracking-widest">
              Progress
            </p>
            <p className="text-orange-400 text-[10px] font-bold tracking-widest font-mono">
              {Math.round(progress)}%
            </p>
          </div>
          
          {/* Progress bar */}
          <div className="relative h-1 w-full overflow-hidden bg-neutral-800 rounded-full">
            <div 
              className="absolute left-0 top-0 h-full bg-gradient-to-r from-orange-600 via-amber-500 to-yellow-400 shadow-[0_0_20px_rgba(251,146,60,0.6)] rounded-full transition-all duration-100 ease-out"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 w-full animate-shimmer bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-60" />
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-neutral-600 text-[10px] font-medium tracking-wide uppercase">
              {progress < 25 ? 'Updating systems...' : progress < 50 ? 'Optimizing performance...' : progress < 75 ? 'Almost there...' : 'Finalizing updates...'}
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
