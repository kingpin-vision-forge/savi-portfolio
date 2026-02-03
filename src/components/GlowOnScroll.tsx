'use client';

import React, { useEffect, useRef, useState } from 'react';

interface GlowOnScrollProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  threshold?: number;
}

export default function GlowOnScroll({
  children,
  className = '',
  glowColor = 'rgba(0, 200, 83, 0.6)',
  threshold = 0.3,
}: GlowOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { 
        threshold: threshold,
        rootMargin: '-100px 0px -100px 0px'
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold]);

  // Extract RGB values for smoother gradients
  const getGlowStyles = () => {
    if (!isInView) {
      return {
        textShadow: 'none',
        filter: 'brightness(1)',
        animation: 'none',
      };
    }

    // Create softer, more diffused glow layers
    return {
      textShadow: `
        0 0 10px ${glowColor.replace(/[\d.]+\)$/, '0.2)')},
        0 0 20px ${glowColor.replace(/[\d.]+\)$/, '0.15)')},
        0 0 40px ${glowColor.replace(/[\d.]+\)$/, '0.12)')},
        0 0 60px ${glowColor.replace(/[\d.]+\)$/, '0.08)')},
        0 0 80px ${glowColor.replace(/[\d.]+\)$/, '0.05)')}
      `,
      filter: 'brightness(1.05)',
      animation: 'glowPulse 2.5s ease-in-out infinite',
    };
  };

  return (
    <>
      <style jsx global>{`
        @keyframes glowPulse {
          0%, 100% {
            opacity: 1;
            filter: brightness(1.05);
          }
          50% {
            opacity: 0.92;
            filter: brightness(1.12);
          }
        }
      `}</style>
      <div 
        ref={ref} 
        className={`transition-all duration-1000 ease-out ${className}`}
        style={{
          ...getGlowStyles(),
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
          backfaceVisibility: 'hidden',
          transform: 'translateZ(0)',
        }}
      >
        {children}
      </div>
    </>
  );
}

// Section heading wrapper with glow effect
interface GlowingSectionHeadingProps {
  children: React.ReactNode;
  className?: string;
  color?: 'green' | 'white' | 'gold';
}

export function GlowingSectionHeading({
  children,
  className = '',
  color = 'white',
}: GlowingSectionHeadingProps) {
  const glowColors = {
    green: 'rgba(0, 200, 83, 0.5)',
    white: 'rgba(255, 255, 255, 0.4)',
    gold: 'rgba(218, 165, 32, 0.5)',
  };

  return (
    <GlowOnScroll glowColor={glowColors[color]} className={className}>
      {children}
    </GlowOnScroll>
  );
}
