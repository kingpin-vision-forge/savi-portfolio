'use client';

import { useEffect, useRef, useState } from 'react';

export default function CursorEffect() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const cursorTrailRef = useRef<HTMLDivElement>(null);
    const posRef = useRef({ x: -100, y: -100 });
    const trailPosRef = useRef({ x: -100, y: -100 });
    const [isVisible, setIsVisible] = useState(false);
    const [isTouch, setIsTouch] = useState(false);

    useEffect(() => {
        // Detect touch device
        const isTouchDevice =
            'ontouchstart' in window || navigator.maxTouchPoints > 0;
        if (isTouchDevice) {
            setIsTouch(true);
            return;
        }

        let animationFrameId: number;

        const handleMouseMove = (e: MouseEvent) => {
            posRef.current = { x: e.clientX, y: e.clientY };
            if (!isVisible) setIsVisible(true);
        };

        const handleMouseLeave = () => {
            setIsVisible(false);
        };

        const handleMouseEnter = () => {
            setIsVisible(true);
        };

        const animate = () => {
            // Smooth lerp for the trail
            const lerp = 0.15;
            trailPosRef.current.x +=
                (posRef.current.x - trailPosRef.current.x) * lerp;
            trailPosRef.current.y +=
                (posRef.current.y - trailPosRef.current.y) * lerp;

            if (cursorRef.current) {
                cursorRef.current.style.transform = `translate3d(${posRef.current.x}px, ${posRef.current.y}px, 0) translate(-50%, -50%)`;
            }
            if (cursorTrailRef.current) {
                cursorTrailRef.current.style.transform = `translate3d(${trailPosRef.current.x}px, ${trailPosRef.current.y}px, 0) translate(-50%, -50%)`;
            }

            animationFrameId = requestAnimationFrame(animate);
        };

        window.addEventListener('mousemove', handleMouseMove);
        document.documentElement.addEventListener('mouseleave', handleMouseLeave);
        document.documentElement.addEventListener('mouseenter', handleMouseEnter);
        animationFrameId = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            document.documentElement.removeEventListener(
                'mouseleave',
                handleMouseLeave
            );
            document.documentElement.removeEventListener(
                'mouseenter',
                handleMouseEnter
            );
            cancelAnimationFrame(animationFrameId);
        };
    }, [isVisible]);

    if (isTouch) return null;

    return (
        <>
            {/* Inner dot */}
            <div
                ref={cursorRef}
                className="cursor-dot"
                style={{ opacity: isVisible ? 1 : 0 }}
            />
            {/* Outer glow trail */}
            <div
                ref={cursorTrailRef}
                className="cursor-trail"
                style={{ opacity: isVisible ? 1 : 0 }}
            />
        </>
    );
}
