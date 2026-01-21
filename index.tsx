import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';

// Simple Icon Components
const CheckIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

const ArrowRightIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
);

const CodeIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
  </svg>
);

const ChartIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2z" />
  </svg>
);

const UsersIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.13 1.25 4.74 1.25 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01C17.18 3.03 14.69 2 12.04 2zM12.05 20.21c-1.5 0-2.97-.4-4.26-1.16l-.3-.18-3.11.82.83-3.03-.19-.31c-.82-1.32-1.26-2.87-1.26-4.43 0-4.61 3.75-8.36 8.36-8.36 2.23 0 4.33.87 5.91 2.45 1.58 1.58 2.45 3.68 2.45 5.91 0 4.61-3.74 8.36-8.35 8.36zm4.59-6.26c-.25-.13-1.5-.74-1.73-.82-.23-.08-.4-.13-.56.13-.17.25-.65.82-.8.99-.15.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.24-.75-.67-1.26-1.5-1.41-1.75-.15-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.13-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.45 1.03 2.62.13.17 1.78 2.72 4.31 3.81.6.26 1.07.41 1.44.53.61.19 1.16.17 1.6.1.48-.07 1.5-.61 1.71-1.21.21-.6.21-1.11.15-1.21-.06-.1-.23-.17-.48-.3z" />
  </svg>
);

// Animation Component
const Reveal = ({ children, delay = 0, className = "" }: { children?: React.ReactNode; delay?: number; className?: string }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Animate only once
        }
      },
      { 
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px" // Trigger slightly before fully in view
      }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out transform will-change-transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      } ${className}`}
    >
      {children}
    </div>
  );
};

const Tooltip = ({ text, children }: { text: string; children?: React.ReactNode }) => {
  return (
    <div className="group relative inline-block">
      {children}
      <div className="pointer-events-none absolute bottom-full left-1/2 z-[60] mb-2 -translate-x-1/2 w-72 rounded-lg bg-slate-900 px-4 py-3 text-xs text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100 shadow-xl border border-slate-700 leading-relaxed">
        {text}
        <div className="absolute top-full left-1/2 -mt-[1px] -translate-x-1/2 border-4 border-transparent border-t-slate-900"></div>
      </div>
    </div>
  );
};

const ContactButton = ({ href, children, className }: { href: string; children?: React.ReactNode; className: string }) => {
  const [clicked, setClicked] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    setClicked(true);
    setTimeout(() => setClicked(false), 2500);
  };

  return (
    <a 
      href={href} 
      onClick={handleClick}
      target={href.startsWith('mailto') ? '_self' : '_blank'}
      rel="noopener noreferrer"
      className={`${className} relative overflow-hidden inline-block min-w-[200px] text-center group active:scale-95 transition-all duration-200`}
    >
      <div className={`transition-all duration-500 transform ease-in-out ${clicked ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'}`}>
        {children}
      </div>
      <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 transform ease-in-out ${clicked ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
        <span className="flex items-center gap-2 font-bold">
            <CheckIcon className="w-5 h-5" />
            Abriendo...
        </span>
      </div>
    </a>
  );
};

const ProductCard = ({ 
  title, 
  category,
  problem, 
  solution, 
  metrics, 
  stack, 
  ctaLink, 
  ctaText, 
  colorClass 
}: {
  title: string;
  category: string;
  problem: string;
  solution: string;
  metrics: { label: string; tooltip: string }[];
  stack: string[];
  ctaLink: string;
  ctaText: string;
  colorClass: string;
}) => (
  <div className="bg-white rounded-