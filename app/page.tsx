'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useTransition } from '@/app/components/TransitionProvider';

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const clientName = searchParams.get('name');
  const { startTransition } = useTransition();
  
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Set your wedding date here
    const weddingDate = new Date('2025-11-16T00:00:00');

    const calculateTimeLeft = () => {
      const difference = +weddingDate - +new Date();
      
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

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/bg.avif"
          alt="Background"
          fill
          className="object-cover"
          priority
          quality={100}
        />
      </div>

      <main className="relative z-10 flex w-full max-w-screen-sm flex-col items-center justify-center gap-6 px-4 py-12 text-center sm:gap-8 sm:px-6 sm:py-16 md:gap-12 md:py-20">
        {/* Hero Image - Full Width Style */}
        <div className="w-full max-w-[205px] overflow-hidden sm:max-w-[240px]">
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
        <div className="flex flex-col items-center gap-4 sm:gap-6 md:gap-8">
          <h1 className="khmer-title text-4xl tracking-wide text-rose-900 sm:text-5xl md:text-6xl lg:text-7xl">
            សិរីមង្គលអាពាហ៍ពិពាហ៍
          </h1>
          <p className="khmer-elegant text-xl text-rose-800 sm:text-2xl md:text-3xl">
            សូមគោរពអញ្ជើញ
          </p>
          
          {/* Client Name - Prominent and Beautiful Display */}
          {clientName && (
            <div className="animate-fade-in-up mt-2 rounded-3xl bg-gradient-to-br from-white/90 via-rose-50/80 to-pink-50/90 px-8 py-6 shadow-2xl backdrop-blur-md sm:mt-4 sm:px-12 sm:py-8 md:px-16 md:py-10">
              <div className="mb-2 flex items-center justify-center gap-2">
                <div className="h-px w-6 bg-gradient-to-r from-transparent via-rose-400 to-transparent sm:w-8 md:w-12"></div>
                <span className="text-lg sm:text-xl md:text-2xl">✨</span>
                <div className="h-px w-6 bg-gradient-to-r from-transparent via-rose-400 to-transparent sm:w-8 md:w-12"></div>
              </div>
              <p className="khmer-elegant text-2xl font-medium text-rose-900 sm:text-3xl md:text-4xl lg:text-5xl">
                {clientName}
              </p>
              <div className="mt-2 flex items-center justify-center gap-2">
                <div className="h-px w-6 bg-gradient-to-r from-transparent via-rose-400 to-transparent sm:w-8 md:w-12"></div>
                <span className="text-lg sm:text-xl md:text-2xl">✨</span>
                <div className="h-px w-6 bg-gradient-to-r from-transparent via-rose-400 to-transparent sm:w-8 md:w-12"></div>
              </div>
            </div>
          )}
        </div>

        {/* Countdown Timer */}
        <div className="flex gap-3 sm:gap-4 md:gap-8">
          <div className="flex flex-col items-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-white/80 shadow-lg backdrop-blur-sm sm:h-20 sm:w-20 md:h-24 md:w-24">
              <span className="text-2xl font-bold text-rose-900 sm:text-3xl md:text-4xl">
                {String(timeLeft.days).padStart(2, '0')}
              </span>
            </div>
            <span className="mt-1 text-xs font-medium text-rose-800 sm:mt-2 sm:text-sm md:text-base">Days</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-white/80 shadow-lg backdrop-blur-sm sm:h-20 sm:w-20 md:h-24 md:w-24">
              <span className="text-2xl font-bold text-rose-900 sm:text-3xl md:text-4xl">
                {String(timeLeft.hours).padStart(2, '0')}
              </span>
            </div>
            <span className="mt-1 text-xs font-medium text-rose-800 sm:mt-2 sm:text-sm md:text-base">Hours</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-white/80 shadow-lg backdrop-blur-sm sm:h-20 sm:w-20 md:h-24 md:w-24">
              <span className="text-2xl font-bold text-rose-900 sm:text-3xl md:text-4xl">
                {String(timeLeft.minutes).padStart(2, '0')}
              </span>
            </div>
            <span className="mt-1 text-xs font-medium text-rose-800 sm:mt-2 sm:text-sm md:text-base">Min</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-white/80 shadow-lg backdrop-blur-sm sm:h-20 sm:w-20 md:h-24 md:w-24">
              <span className="text-2xl font-bold text-rose-900 sm:text-3xl md:text-4xl">
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
            </div>
            <span className="mt-1 text-xs font-medium text-rose-800 sm:mt-2 sm:text-sm md:text-base">Sec</span>
          </div>
        </div>

        {/* CTA Button */}
        <button
          onClick={() => startTransition(() => router.push(clientName ? `/invitation?name=${clientName}` : '/invitation'))}
          className="group relative mt-2 overflow-hidden rounded-full bg-gradient-to-r from-rose-500 to-pink-500 px-6 py-3 text-base font-medium text-white shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl sm:mt-4 sm:px-8 sm:py-4 sm:text-lg md:px-10 md:py-5 md:text-xl"
        >
          <span className="khmer-body relative z-10">ចុចបើកធៀប</span>
          <div className="absolute inset-0 -translate-x-full transform bg-gradient-to-r from-pink-600 to-rose-600 transition-transform duration-300 group-hover:translate-x-0"></div>
        </button>
        
        {/* Hidden Link for prefetching */}
        <Link href="/invitation" className="hidden" prefetch={true} aria-hidden="true">Prefetch</Link>
      </main>

      {/* Generate Link Button - Fixed Position */}
      <div className="fixed bottom-6 left-4 sm:bottom-8 sm:left-8 z-50">
        <Link
          href="/generate"
          className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-rose-600 shadow-2xl transition-all hover:scale-105 hover:bg-rose-50 sm:px-6 sm:py-3"
          title="Generate personalized link"
        >
          <span className="text-lg sm:text-xl">🔗</span>
          <span className="khmer-body hidden text-sm font-medium sm:inline sm:text-base">បង្កើតតំណ</span>
        </Link>
      </div>
    </div>
  );
}
