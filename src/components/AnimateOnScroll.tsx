'use client';

import React, { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

interface AnimateOnScrollProps {
  children: React.ReactNode;
  className?: string;
  animation?: 'fadeUp' | 'fadeDown' | 'fadeLeft' | 'fadeRight' | 'fadeIn' | 'scaleUp' | 'slideUp';
  delay?: number;
  duration?: number;
  threshold?: number;
  once?: boolean;
}

export default function AnimateOnScroll({
  children,
  className = '',
  animation = 'fadeUp',
  delay = 0,
  duration = 0.7,
  threshold = 0.2,
  once = true,
}: AnimateOnScrollProps) {
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(!isHomePage);

  useEffect(() => {
    if (!isHomePage) {
      setIsVisible(true);
      return;
    }

    // Delay observer setup to prevent animations on initial load
    const timer = setTimeout(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (once && ref.current) {
              observer.unobserve(ref.current);
            }
          } else if (!once) {
            setIsVisible(false);
          }
        },
        { 
          threshold: threshold,
          rootMargin: '-80px 0px -80px 0px' // Trigger when element is well within viewport
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
    }, 100);

    return () => clearTimeout(timer);
  }, [threshold, once, isHomePage]);

  const getAnimationStyles = (): React.CSSProperties => {
    if (!isHomePage) {
      return {};
    }

    const baseStyles: React.CSSProperties = {
      transition: `opacity ${duration}s cubic-bezier(0.25, 0.1, 0.25, 1) ${delay}s, transform ${duration}s cubic-bezier(0.25, 0.1, 0.25, 1) ${delay}s`,
      willChange: 'opacity, transform',
    };

    const animations: Record<string, { initial: React.CSSProperties; visible: React.CSSProperties }> = {
      fadeUp: {
        initial: { opacity: 0, transform: 'translateY(30px)' },
        visible: { opacity: 1, transform: 'translateY(0)' },
      },
      fadeDown: {
        initial: { opacity: 0, transform: 'translateY(-30px)' },
        visible: { opacity: 1, transform: 'translateY(0)' },
      },
      fadeLeft: {
        initial: { opacity: 0, transform: 'translateX(-30px)' },
        visible: { opacity: 1, transform: 'translateX(0)' },
      },
      fadeRight: {
        initial: { opacity: 0, transform: 'translateX(30px)' },
        visible: { opacity: 1, transform: 'translateX(0)' },
      },
      fadeIn: {
        initial: { opacity: 0 },
        visible: { opacity: 1 },
      },
      scaleUp: {
        initial: { opacity: 0, transform: 'scale(0.95)' },
        visible: { opacity: 1, transform: 'scale(1)' },
      },
      slideUp: {
        initial: { opacity: 0, transform: 'translateY(40px)' },
        visible: { opacity: 1, transform: 'translateY(0)' },
      },
    };

    const anim = animations[animation] || animations.fadeUp;
    return {
      ...baseStyles,
      ...(isVisible ? anim.visible : anim.initial),
    };
  };

  return (
    <div ref={ref} className={className} style={getAnimationStyles()}>
      {children}
    </div>
  );
}

// Animated counter for statistics
interface AnimatedCounterProps {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

export function AnimatedCounter({
  end,
  suffix = '',
  prefix = '',
  duration = 2,
  className = '',
}: AnimatedCounterProps) {
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  
  const ref = useRef<HTMLSpanElement>(null);
  const [count, setCount] = useState(isHomePage ? 0 : end);
  const [hasAnimated, setHasAnimated] = useState(!isHomePage);

  useEffect(() => {
    if (!isHomePage) {
      setCount(end);
      setHasAnimated(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const startTime = Date.now();
          const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / (duration * 1000), 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * end));
            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCount(end);
            }
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5, rootMargin: '-50px 0px -50px 0px' }
    );

    if (ref.current) observer.observe(ref.current);
    return () => { if (ref.current) observer.unobserve(ref.current); };
  }, [end, duration, hasAnimated, isHomePage]);

  return (
    <span ref={ref} className={className}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}

// Stagger container for multiple animated children
interface StaggerContainerProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  animation?: 'fadeUp' | 'fadeDown' | 'fadeLeft' | 'fadeRight' | 'fadeIn' | 'scaleUp';
}

export function StaggerContainer({
  children,
  className = '',
  staggerDelay = 0.1,
  animation = 'fadeUp',
}: StaggerContainerProps) {
  return (
    <div className={className}>
      {React.Children.map(children, (child, index) => (
        <AnimateOnScroll animation={animation} delay={index * staggerDelay} once>
          {child}
        </AnimateOnScroll>
      ))}
    </div>
  );
}
