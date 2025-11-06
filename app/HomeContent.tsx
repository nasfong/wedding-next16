'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useTransition } from '@/app/components/TransitionProvider';
import HeartAnimation from '@/app/components/HeartAnimation';

type HomeContentProps = {
  nameFromPath?: string;
};

export default function HomeContent({ nameFromPath }: HomeContentProps = {}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  // Use nameFromPath (from dynamic route) or fallback to query parameter
  const clientName = nameFromPath || searchParams.get('name');
  const { startTransition } = useTransition();
  const [isNavigating, setIsNavigating] = useState(false);
  
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Set dynamic Open Graph URL with query parameters for social media sharing
  useEffect(() => {
    // Get current URL with all query parameters
    const currentUrl = window.location.href;
    
    // Update og:url meta tag dynamically
    let ogUrlMeta = document.querySelector('meta[property="og:url"]');
    if (!ogUrlMeta) {
      ogUrlMeta = document.createElement('meta');
      ogUrlMeta.setAttribute('property', 'og:url');
      document.head.appendChild(ogUrlMeta);
    }
    ogUrlMeta.setAttribute('content', currentUrl);

    // Also set canonical URL to preserve query parameters
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', currentUrl);
  }, [searchParams]);

  useEffect(() => {
    // Set your wedding date in Phnom Penh timezone (UTC+7)
    // Wedding date: November 16, 2025 at midnight in Phnom Penh
    const weddingDate = new Date('2025-11-16T00:00:00+07:00');

    const calculateTimeLeft = () => {
      // Get current time in Phnom Penh timezone
      const now = new Date();
      const phnomPenhTime = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Phnom_Penh' }));
      
      const difference = +weddingDate - +phnomPenhTime;
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  // Prefetch invitation page for instant loading
  useEffect(() => {
    router.prefetch('/invitation');
  }, [router]);

  // Handle button click with loading state and haptic feedback
  const handleNavigateToInvitation = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    
    // Haptic feedback for mobile devices
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate(50); // Short vibration for tactile feedback
    }
    
    setIsNavigating(true);
    
    const targetUrl = clientName ? `/invitation?name=${encodeURIComponent(clientName)}` : '/invitation';
    
    // Smooth transition with slight delay for visual feedback
    setTimeout(() => {
      startTransition(() => router.push(targetUrl));
    }, 150);
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/bg.jpg"
          alt="Background"
          fill
          className="object-cover"
          priority
          quality={100}
        />
      </div>

      {/* Heart Animation Background */}
      <HeartAnimation />

      <main className="relative z-10 flex w-full max-w-screen-sm flex-col items-center justify-center gap-6 px-4 py-12 text-center sm:gap-8 sm:px-6 sm:py-16 md:gap-12 md:py-20">
        {/* Hero Image - Full Width Style */}
        <div className="animate-fade-scale w-full max-w-[205px] overflow-hidden sm:max-w-[240px]">
          <div className="relative aspect-square w-full">
            <Image
              src="/home.png"
              alt="Wedding Couple"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Main Title */}
        <div className="animate-slide-up flex flex-col items-center " style={{ animationDelay: '0.2s' }}>
          <h1 className="khmer-title text-2xl tracking-wide text-rose-900 sm:text-5xl md:text-6xl lg:text-7xl">
            សិរីមង្គលអាពាហ៍ពិពាហ៍
          </h1>
          <p className="khmer-elegant text-xl text-rose-800 sm:text-2xl md:text-3xl">
            សូមគោរពអញ្ជើញ
          </p>
          
          {/* Client Name - Prominent and Beautiful Display */}
          {clientName && (
            <div className="relative w-full">
              {/* Name Border Background Image */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <Image
                  src="/name-border.png"
                  alt="Name Border"
                  width={400}
                  height={200}
                  className="w-full h-auto max-w-md opacity-90"
                  priority
                />
              </div>
              
              {/* Name Content */}
              <div className="relative rounded-2xl py-0 sm:px-6 sm:py-4 md:px-8 md:py-5">
                <div className="mb-1.5 flex items-center justify-center gap-1.5">
                  <div className="h-px w-4 bg-gradient-to-r from-transparent via-rose-400 to-transparent sm:w-6"></div>
                  <span className="text-sm sm:text-base md:text-lg">✨</span>
                  <div className="h-px w-4 bg-gradient-to-r from-transparent via-rose-400 to-transparent sm:w-6"></div>
                </div>
                <p className="khmer-elegant text-lg font-bold text-rose-900 sm:text-xl md:text-2xl lg:text-3xl">
                  {clientName}
                </p>
                <div className="mt-1.5 flex items-center justify-center gap-1.5">
                  <div className="h-px w-4 bg-gradient-to-r from-transparent via-rose-400 to-transparent sm:w-6"></div>
                  <span className="text-sm sm:text-base md:text-lg">✨</span>
                  <div className="h-px w-4 bg-gradient-to-r from-transparent via-rose-400 to-transparent sm:w-6"></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Countdown Timer */}
        <div className="animate-slide-up w-full" style={{ animationDelay: '0.4s' }}>
          <div className="mb-3 flex items-center justify-center gap-2 sm:mb-4">
            <div className="h-px w-8 bg-gradient-to-r from-transparent via-rose-300 to-rose-300 sm:w-12 md:w-16"></div>
            <p className="khmer-elegant text-base text-rose-800 sm:text-lg md:text-xl">រាប់ថ្ងៃរហូតដល់ថ្ងៃពិសេស</p>
            <div className="h-px w-8 bg-gradient-to-r from-rose-300 via-rose-300 to-transparent sm:w-12 md:w-16"></div>
          </div>
          <div className="grid grid-cols-4 gap-2 sm:gap-3 md:gap-4">
            {[
              { value: timeLeft.days, label: 'ថ្ងៃ' },
              { value: timeLeft.hours, label: 'ម៉ោង' },
              { value: timeLeft.minutes, label: 'នាទី' },
              { value: timeLeft.seconds, label: 'វិនាទី' },
            ].map((item, index) => (
              <div
                key={item.label}
                className="animate-pop-in rounded-2xl bg-white/80 p-3 shadow-xl backdrop-blur-sm sm:rounded-3xl sm:p-4 md:p-6"
                style={{ animationDelay: `${0.6 + index * 0.1}s` }}
              >
                <div className="text-2xl font-bold text-rose-900 sm:text-3xl md:text-4xl lg:text-5xl">
                  {item.value}
                </div>
                <div className="khmer-elegant mt-1 text-xs text-rose-700 sm:mt-2 sm:text-sm md:text-base">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <Link
          href={clientName ? `/invitation?name=${encodeURIComponent(clientName)}` : '/invitation'}
          onClick={handleNavigateToInvitation}
          className={`animate-bounce-in group relative mt-2 overflow-hidden rounded-full bg-gradient-to-r from-rose-500 to-pink-500 px-6 py-3 text-base font-medium text-white shadow-xl transition-all duration-300 sm:mt-4 sm:px-8 sm:py-4 sm:text-lg md:px-10 md:text-xl ${
            isNavigating 
              ? 'scale-95 opacity-80' 
              : 'hover:scale-105 hover:shadow-2xl active:scale-95'
          }`}
          style={{ animationDelay: '1s' }}
        >
          {/* Gradient overlay on hover */}
          <div className="absolute inset-0 -translate-x-full transform bg-gradient-to-r from-pink-600 to-rose-600 transition-transform duration-300 group-hover:translate-x-0"></div>
          
          {/* Ripple effect on click */}
          <div className="absolute inset-0 bg-white opacity-0 group-active:opacity-20 transition-opacity duration-150"></div>
          
          <span className="relative flex items-center justify-center gap-2">
            {isNavigating ? (
              <>
                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span className="khmer-elegant">សូមរង់ចាំ...</span>
              </>
            ) : (
              <>
                <span className="khmer-elegant">មើលសំបុត្រអញ្ជើញ</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </>
            )}
          </span>
        </Link>

        {/* Date and Time Info */}
        <div className="animate-fade-in mt-4 space-y-2 text-rose-800 sm:mt-6 sm:space-y-3" style={{ animationDelay: '1.2s' }}>
          <p className="khmer-elegant text-base sm:text-lg md:text-xl">
            ថ្ងៃអាទិត្យ ទី១៦ ខែវិច្ឆិកា ឆ្នាំ២០២៥
          </p>
          <p className="text-sm text-rose-700 sm:text-base md:text-lg">
            Sunday, November 16, 2025
          </p>
        </div>
      </main>
    </div>
  );
}
