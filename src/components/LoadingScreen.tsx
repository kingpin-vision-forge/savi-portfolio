'use client';

import { useState, useEffect } from 'react';
import { ShieldCheck } from 'lucide-react';

interface LoadingScreenProps {
  onComplete: () => void;
  onTransitionStart?: () => void;
}

export default function LoadingScreen({ onComplete, onTransitionStart }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [shouldRender, setShouldRender] = useState(true);

  // Progress timer
  useEffect(() => {
    const duration = 5000;
    const interval = 50;
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

  if (!shouldRender) {
    return null;
  }

  if (!isVisible && progress >= 100) {
    return (
      <div className="fixed inset-0 z-50 bg-[#0a0a0a] opacity-0 animate-fade-out pointer-events-none" />
    );
  }

  return (
    <div className={`fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-[#0a0a0a] transition-opacity duration-500 ${progress >= 100 ? 'opacity-0' : 'opacity-100'}`}>
      
      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-5xl px-6">
        
        {/* Anniversary Image */}
        <div className="mb-8">
          <img 
            src="/22-years-anniversary.png"
            alt="SAVI 22 Years Anniversary"
            className="w-full max-w-4xl h-auto object-contain"
          />
        </div>

        {/* Slogan */}
        <div className="mb-10 text-center">
          <p 
            className="text-white/80 tracking-wide max-w-2xl mx-auto italic"
            style={{ fontSize: 'clamp(0.85rem, 2vw, 1.1rem)' }}
          >
            "Deeper commitment to purity & timely services since more than two decades"
          </p>
        </div>

        {/* Progress section */}
        <div className="w-full max-w-md flex flex-col gap-4">
          <div className="flex items-center justify-between px-1">
            <p className="text-neutral-500 text-[10px] font-semibold uppercase tracking-widest">
              Loading
            </p>
            <p 
              className="text-[10px] font-bold tracking-widest font-mono"
              style={{ color: '#DAA520' }}
            >
              {Math.round(progress)}%
            </p>
          </div>
          
          {/* Progress bar */}
          <div className="relative h-1 w-full overflow-hidden bg-neutral-800 rounded-full">
            <div 
              className="absolute left-0 top-0 h-full rounded-full transition-all duration-100 ease-out"
              style={{ 
                width: `${progress}%`,
                background: 'linear-gradient(90deg, #8B6914, #B8860B, #D4AF37, #F0D78C)',
                boxShadow: '0 0 20px rgba(218, 165, 32, 0.5)',
              }}
            >
              <div className="absolute inset-0 w-full animate-shimmer bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-60" />
            </div>
          </div>
        </div>
      </div>

      {/* Secure connection badge */}
      <div className="absolute bottom-6 md:bottom-8 left-0 w-full text-center z-20">
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
