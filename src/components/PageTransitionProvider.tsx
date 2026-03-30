'use client';

import { useEffect, useRef, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function PageTransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Intercept internal page link clicks for fade-out before navigation
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const link = (e.target as Element).closest('a');
      if (!link) return;

      const href = link.getAttribute('href');
      if (!href) return;

      // Skip hash links, external links, and special protocol links
      if (
        href.startsWith('#') ||
        href.startsWith('http') ||
        href.startsWith('//') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:') ||
        link.target === '_blank'
      ) return;

      // Skip if modifier keys are held (open in new tab, etc.)
      if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;

      // Skip if navigating to the same page
      if (href === window.location.pathname) return;

      e.preventDefault();

      const el = wrapperRef.current;
      if (el) {
        el.style.transition = 'opacity 0.2s ease';
        el.style.opacity = '0';
      }

      setTimeout(() => router.push(href), 200);
    };

    // Use capture phase so this fires before Next.js Link handlers
    document.addEventListener('click', handleClick, true);
    return () => document.removeEventListener('click', handleClick, true);
  }, [router]);

  // Fade in after each navigation
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    el.style.transition = 'none';
    el.style.opacity = '0';
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        if (wrapperRef.current) {
          wrapperRef.current.style.transition = 'opacity 0.3s ease';
          wrapperRef.current.style.opacity = '1';
        }
      })
    );
  }, [pathname]);

  return <div ref={wrapperRef}>{children}</div>;
}
