'use client';

import React, { useRef, useState } from 'react';

interface MagicBentoCardProps {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
  borderColor?: string;
}

export default function MagicBentoCard({
  children,
  className = '',
  spotlightColor = 'rgba(0, 200, 83, 0.15)',
  borderColor = 'rgba(0, 200, 83, 0.3)',
}: MagicBentoCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => {
    setOpacity(1);
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
    setIsHovered(false);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden transition-all duration-500 ${className}`}
      style={{
        transform: isHovered ? 'scale(1.02) translateY(-4px)' : 'scale(1) translateY(0)',
        boxShadow: isHovered 
          ? '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 30px rgba(0, 200, 83, 0.1)' 
          : '0 10px 30px -12px rgba(0, 0, 0, 0.3)',
      }}
    >
      {/* Animated border glow */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-500 rounded-[inherit]"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${borderColor}, transparent 40%)`,
        }}
      />
      
      {/* Spotlight effect */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-500 rounded-[inherit]"
        style={{
          opacity,
          background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 40%)`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 h-full">
        {children}
      </div>

      {/* Border overlay */}
      <div 
        className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-500"
        style={{
          opacity: isHovered ? 1 : 0,
          border: `1px solid ${borderColor}`,
        }}
      />
    </div>
  );
}
