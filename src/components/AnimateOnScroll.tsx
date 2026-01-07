'use client';

import React, { useEffect, useRef, useState } from 'react';

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
  duration = 0.6,
  threshold = 0.1,
  once = true,
}: AnimateOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
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
      { threshold, rootMargin: '0px 0px -50px 0px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold, once]);

  const getAnimationStyles = () => {
    const baseStyles = {
      transition: `all ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
    };

    const animations: Record<string, { initial: React.CSSProperties; visible: React.CSSProperties }> = {
      fadeUp: {
        initial: { opacity: 0, transform: 'translateY(40px)' },
        visible: { opacity: 1, transform: 'translateY(0)' },
      },
      fadeDown: {
        initial: { opacity: 0, transform: 'translateY(-40px)' },
        visible: { opacity: 1, transform: 'translateY(0)' },
      },
      fadeLeft: {
        initial: { opacity: 0, transform: 'translateX(-40px)' },
        visible: { opacity: 1, transform: 'translateX(0)' },
      },
      fadeRight: {
        initial: { opacity: 0, transform: 'translateX(40px)' },
        visible: { opacity: 1, transform: 'translateX(0)' },
      },
      fadeIn: {
        initial: { opacity: 0 },
        visible: { opacity: 1 },
      },
      scaleUp: {
        initial: { opacity: 0, transform: 'scale(0.9)' },
        visible: { opacity: 1, transform: 'scale(1)' },
      },
      slideUp: {
        initial: { opacity: 0, transform: 'translateY(60px)' },
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
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (ref.current) observer.unobserve(ref.current);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    if (ref.current) observer.observe(ref.current);
    return () => { if (ref.current) observer.unobserve(ref.current); };
  }, []);

  return (
    <div ref={ref} className={className}>
      {React.Children.map(children, (child, index) => (
        <AnimateOnScroll animation={animation} delay={index * staggerDelay} once>
          {child}
        </AnimateOnScroll>
      ))}
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
  const ref = useRef<HTMLSpanElement>(null);
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const startTime = Date.now();
          const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / (duration * 1000), 1);
            // Ease out cubic
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
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => { if (ref.current) observer.unobserve(ref.current); };
  }, [end, duration, hasAnimated]);

  return (
    <span ref={ref} className={className}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}

// Text reveal animation
interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
}

export function TextReveal({ text, className = '', delay = 0 }: TextRevealProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (ref.current) observer.unobserve(ref.current);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => { if (ref.current) observer.unobserve(ref.current); };
  }, []);

  return (
    <span ref={ref} className={`inline-block overflow-hidden ${className}`}>
      <span
        className="inline-block"
        style={{
          transform: isVisible ? 'translateY(0)' : 'translateY(100%)',
          opacity: isVisible ? 1 : 0,
          transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
        }}
      >
        {text}
      </span>
    </span>
  );
}

// Parallax wrapper
interface ParallaxProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}

export function Parallax({ children, speed = 0.5, className = '' }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const scrolled = window.innerHeight - rect.top;
      setOffset(scrolled * speed * 0.1);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return (
    <div ref={ref} className={className} style={{ transform: `translateY(${offset}px)` }}>
      {children}
    </div>
  );
}
