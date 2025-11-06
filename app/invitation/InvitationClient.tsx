'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useTransition } from '../components/TransitionProvider';
import { useAudio } from '../components/AudioProvider';
import { useEffect, useState } from 'react';
import HeartAnimation from '../components/HeartAnimation';

export default function InvitationClient() {
  const router = useRouter();
  const { startTransition } = useTransition();
  const { isPlaying, toggleAudio, currentTime, duration, progressPercent } = useAudio();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedImage) {
      // Save current scroll position
      const scrollY = window.scrollY;
      // Lock body and prevent all scrolling
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.overflow = 'hidden';
      document.body.style.width = '100%';
    } else {
      // Restore scroll position
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.overflow = '';
      document.body.style.width = '';
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }

    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.overflow = '';
      document.body.style.width = '';
    };
  }, [selectedImage]);

  // Preload critical gallery images from NGINX server
  useEffect(() => {
    // Preload first 4 images for faster display
    const criticalImages = ['/images/1.jpg', '/images/2.jpg', '/images/3.jpg', '/images/4.jpg'];
    criticalImages.forEach((src) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
    });
  }, []);

  // Intersection Observer for scroll animations (both directions)
  useEffect(() => {
    const observerOptions = {
      threshold: 0.15,
      rootMargin: '0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in-view');
        } else {
          // Remove class when out of view to re-trigger animation
          entry.target.classList.remove('animate-in-view');
        }
      });
    }, observerOptions);

    // Observe all sections with scroll-animate class
    const animatedElements = document.querySelectorAll('.scroll-animate');
    animatedElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Countdown Timer Effect
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

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const galleries = [
    { id: 1, name: 'វិចិត្រសាល ១', theme: 'bird', image: '/1.jpg' },
    { id: 2, name: 'វិចិត្រសាល ២', theme: 'urban', image: '/2.jpg' },
    { id: 3, name: 'វិចិត្រសាល ៣', theme: 'building', image: '/3.jpg' },
    { id: 4, name: 'វិចិត្រសាល ៤', theme: 'urban', image: '/4.jpg' },
    { id: 5, name: 'វិចិត្រសាល ៥', theme: 'neon lighting', image: '/5.jpg' },
    { id: 6, name: 'វិចិត្រសាល ៦', theme: 'chair', image: '/6.jpg' },
    { id: 7, name: 'វិចិត្រសាល ៧', theme: 'supermarket', image: '/7.jpg' },
    { id: 8, name: 'វិចិត្រសាល ៨', theme: 'classic', image: '/8.jpg' },
  ];

  return (
    <div
      style={{
        // backgroundImage: "url(/download.jpg)",
        // backgroundRepeat: "no-repeat",
        // backgroundSize: "cover",
        // backgroundImage: "url(/bg2.jpg)",
        // objectFit: "cover",
        // backgroundRepeat: "no-repeat",
        // backgroundSize: "cover",
        // width: "100%",
        // height: "100vh",
      }}
    >
      {/* Heart Animation Background */}
      <HeartAnimation />

      {/* Hero Section */}
      <section className="scroll-animate relative overflow-x-hidden px-4 py-12 text-center sm:px-6 sm:py-16 md:py-20">
        <div className="absolute inset-0"></div>

        <div className="relative z-10 mx-auto max-w-4xl">


          <div className="relative inline-block w-full">
            <h1 className="khmer-title mb-6 text-2xl text-rose-900 sm:mb-8 sm:text-5xl md:text-6xl animate-fade-in-up mt-12">
              សិរីមង្គលអាពាហ៍ពិពាហ៍
            </h1>
            <div className="absolute left-1/2 -translate-x-1/2 -bottom-3 sm:-bottom-4">
              <Image
                src="/title_line_below2.png"
                alt="Title decoration"
                width={256}
                height={20}
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* Animated Logo */}
          <div className="mb-8 flex justify-center sm:mb-12">
            <div className="animate-gentle-rotate" style={{ willChange: 'transform' }}>
              <img
                src="/fongxren.svg"
                alt="Fongxren"
                className="h-60 w-60 sm:h-100 sm:w-100"
                style={{ filter: 'invert(13%) sepia(87%) saturate(3208%) hue-rotate(330deg) brightness(91%) contrast(98%)' }}
              />
            </div>
          </div>

          {/* Bride & Groom */}
          <div className="mb-8 flex flex-row justify-between gap-1 sm:mb-12 sm:gap-8 md:flex-row md:justify-center md:gap-16">
            <div className="text-center animate-slide-in-left">
              <p className="khmer-body mb-2 text-lg text-gray-600 animate-slide-in-left">កូនប្រុសនាម</p>
              <h2 className="khmer-elegant text-3xl text-rose-900 md:text-4xl animate-slide-in-left" style={{ animationDelay: '0.1s' }}>សំណាង តាំងហ្វុង</h2>
            </div>
            <div className="text-center animate-slide-in-right">
              <p className="khmer-body mb-2 text-lg text-gray-600 animate-slide-in-right">កូនស្រីនាម</p>
              <h2 className="khmer-elegant text-3xl text-rose-900 md:text-4xl animate-slide-in-right" style={{ animationDelay: '0.1s' }}>ង៉ិន ស្រីរ៉េន</h2>
            </div>
          </div>

          {/* Date & Venue */}
          <div className="rounded-2xl bg-white/80 p-8 shadow-xl backdrop-blur-sm animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <p className="khmer-elegant mb-4 text-xl text-gray-600">ដែលនឹងប្រព្រឹត្តទៅនៅ</p>
            <p className="khmer-body mb-6 text-2xl font-bold text-amber-600">ថ្ងៃអាទិត្យ ទី១៦ ខែវិច្ឆិកា ឆ្នាំ២០២៥</p>
            <p className="khmer-body text-lg text-gray-600">នៅភោជនីយដ្ឋាន សមភាពថ្មី (អគារ A) ក្រុងសៀមរាប</p>
          </div>
        </div>
      </section>

      {/* Parents Section */}
      <section className="scroll-animate overflow-x-hidden px-4 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <div className="grid grid-cols-2">
            <div className="text-center animate-slide-in-left">
              <h3 className="khmer-elegant mb-4 text-2xl text-rose-900">គ្រួសារកូនប្រុស</h3>
              <div className="khmer-body space-y-2 text-gray-600">
                <p className="text-lg">លោក សុខ សំណាង</p>
                <p className="text-lg">លោកស្រី ទៀវ ស្រីណាត</p>
              </div>
            </div>
            <div className="text-center animate-slide-in-right">
              <h3 className="khmer-elegant mb-4 text-2xl text-rose-900">គ្រួសារកូនស្រី</h3>
              <div className="khmer-body space-y-2 text-gray-600">
                <p className="text-lg">លោក ង៉ិន ថា</p>
                <p className="text-lg">លោកស្រី ស៊ង់ សារ៉ូន</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Countdown Section */}
      <section className="scroll-animate overflow-x-hidden px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-3 flex items-center justify-center gap-2 sm:mb-4">
            <div className="h-px w-8 bg-gradient-to-r from-transparent via-rose-300 to-rose-300 sm:w-12 md:w-16"></div>
            <h2 className="khmer-elegant text-base text-rose-800 sm:text-lg md:text-xl">
              រាប់ថ្ងៃរហូតដល់ថ្ងៃពិសេស
            </h2>
            <div className="h-px w-8 bg-gradient-to-r from-rose-300 via-rose-300 to-transparent sm:w-12 md:w-16"></div>
          </div>
          <div className="grid grid-cols-4 gap-2 sm:gap-3 md:gap-4">
            {[
              { value: timeLeft.days, label: 'ថ្ងៃ' },
              { value: timeLeft.hours, label: 'ម៉ោង' },
              { value: timeLeft.minutes, label: 'នាទី' },
              { value: timeLeft.seconds, label: 'វិនាទី' },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-2xl bg-white/80 p-3 shadow-xl backdrop-blur-sm sm:rounded-3xl sm:p-4 md:p-6"
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
      </section>

      {/* Invitation Message */}
      <section className="scroll-animate overflow-x-hidden bg-gradient-to-br from-rose-50 to-pink-50 px-6 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <p className="khmer-body mb-6 text-xl leading-relaxed text-rose-900 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            យើងខ្ញុំមានកិតិ្តយសសូមគោរពអញ្ជើញ<br />
            ឯកឧត្តម លោកជំទាវ អ្នកឧកញ៉ា លោក លោកស្រី អ្នកនាងកញ្ញាអញ្ញើញចូលរួមជាអធិបតី<br />
            និងជាភ្ញៀវកិត្តិយស ដើម្បីប្រសិទ្ធពរជ័យ សិរីជ័យមង្គល ក្នុងសិរីមង្គលអាពាហ៍ពិពាហ៍ កូនប្រុស កូនស្រី របស់យើងខ្ញុំ។
          </p>
        </div>
      </section>

      {/* Ceremony Schedule */}
      <section className="scroll-animate overflow-x-hidden px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <div className="relative inline-block w-full">
            <h2 className="khmer-title mb-12 text-center text-xl text-rose-900 sm:mb-8 sm:text-5xl animate-fade-in-up">
              កម្មវិធីសិរីមង្គលអាពាហ៍ពិពាហ៍
            </h2>
            <div className="absolute left-1/2 -translate-x-1/2 -bottom-16 ">
              <Image
                src="/title_line_below.png"
                alt="Title decoration"
                width={256}
                height={20}
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* Day 1 */}
          <div className="mb-12 rounded-2xl bg-white p-8 shadow-lg animate-slide-in-left" style={{ animationDelay: '0.2s' }}>
            <div className="mb-6 text-center">
              <div className="mb-4 flex items-center justify-center gap-3">
                <div className="h-px w-12 bg-gradient-to-r from-transparent via-rose-300 to-rose-300"></div>
                <span className="khmer-elegant text-3xl text-rose-600">✦</span>
                <div className="h-px w-12 bg-gradient-to-r from-rose-300 via-rose-300 to-transparent"></div>
              </div>
              <h3 className="khmer-elegant mb-3 text-2xl font-bold text-rose-900 sm:text-3xl">
                កម្មវិធីថ្ងៃទី១
              </h3>
              <p className="khmer-body text-lg text-rose-700 mb-2">
                ថ្ងៃសៅរ៍ ១០រោច ខែកត្តិក ឆ្នាំម្សាញ់ ឆស័ក ព.ស ២៥៦៩
              </p>
              <div className="inline-block rounded-full bg-gradient-to-r from-rose-100 to-pink-100 px-6 py-2">
                <p className="khmer-body text-base font-semibold text-rose-800 sm:text-lg">
                  ថ្ងៃទី១៥ ខែវិច្ឆិកា ឆ្នាំ ២០២៥
                </p>
              </div>
            </div>
            <div className="khmer-body space-y-3 text-rose-800">
              <div className="group relative pl-8 pb-4 border-l-2 border-rose-200 hover:border-rose-400 transition-colors">
                <div className="absolute -left-2 top-0 h-4 w-4 rounded-full bg-rose-400 ring-4 ring-rose-50 group-hover:bg-rose-500 transition-colors"></div>
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🏰</span>
                    <span className="font-semibold text-rose-900">ម៉ោង ១:៣០នាទីរសៀល</span>
                  </div>
                  <span className="text-rose-700 sm:text-right">ក្រុងពាលី</span>
                </div>
              </div>
              <div className="group relative pl-8 pb-4 border-l-2 border-rose-200 hover:border-rose-400 transition-colors">
                <div className="absolute -left-2 top-0 h-4 w-4 rounded-full bg-rose-400 ring-4 ring-rose-50 group-hover:bg-rose-500 transition-colors"></div>
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">✂️</span>
                    <span className="font-semibold text-rose-900">ម៉ោង ៣:០០នាទីរសៀល</span>
                  </div>
                  <span className="text-rose-700 sm:text-right">ពិធីកាត់សក់បង្កក់សិរី</span>
                </div>
              </div>
              <div className="group relative pl-8 pb-4 border-l-2 border-rose-200 hover:border-rose-400 transition-colors">
                <div className="absolute -left-2 top-0 h-4 w-4 rounded-full bg-rose-400 ring-4 ring-rose-50 group-hover:bg-rose-500 transition-colors"></div>
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🙏</span>
                    <span className="font-semibold text-rose-900">ម៉ោង ៥:០០នាទីរសៀល</span>
                  </div>
                  <span className="text-rose-700 sm:text-right">សូត្រមន្តចំរើនព្រះបរិត្ត</span>
                </div>
              </div>
              <div className="group relative pl-8">
                <div className="absolute -left-2 top-0 h-4 w-4 rounded-full bg-rose-500 ring-4 ring-rose-50 group-hover:bg-rose-600 transition-colors"></div>
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🍽️</span>
                    <span className="font-semibold text-rose-900">ម៉ោង ៦:០០នាទីរសៀល</span>
                  </div>
                  <span className="text-rose-700 sm:text-right">ពិសាអាហារពេលល្ងាច</span>
                </div>
              </div>
            </div>
          </div>

          {/* Day 2 */}
          <div className="rounded-2xl bg-white p-8 shadow-lg animate-slide-in-right" style={{ animationDelay: '0.4s' }}>
            <div className="mb-6 text-center">
              <div className="mb-4 flex items-center justify-center gap-3">
                <div className="h-px w-12 bg-gradient-to-r from-transparent via-rose-300 to-rose-300"></div>
                <span className="khmer-elegant text-3xl text-rose-600">✦</span>
                <div className="h-px w-12 bg-gradient-to-r from-rose-300 via-rose-300 to-transparent"></div>
              </div>
              <h3 className="khmer-elegant mb-3 text-2xl font-bold text-rose-900 sm:text-3xl">
                កម្មវិធីថ្ងៃទី២
              </h3>
              <p className="khmer-body text-lg text-rose-700 mb-2">
                ថ្ងៃអាទិត្យ ១១រោច ខែកត្តិក ឆ្នាំម្សាញ់ ឆស័ក ព.ស ២៥៦៩
              </p>
              <div className="inline-block rounded-full bg-gradient-to-r from-rose-100 to-pink-100 px-6 py-2">
                <p className="khmer-body text-base font-semibold text-rose-800 sm:text-lg">
                  ថ្ងៃទី១៦ ខែវិច្ឆិកា ឆ្នាំ ២០២៥
                </p>
              </div>
            </div>
            <div className="khmer-body space-y-3 text-rose-800">
              <div className="group relative pl-8 pb-4 border-l-2 border-rose-200 hover:border-rose-400 transition-colors">
                <div className="absolute -left-2 top-0 h-4 w-4 rounded-full bg-rose-400 ring-4 ring-rose-50 group-hover:bg-rose-500 transition-colors"></div>
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">☀️</span>
                    <span className="font-semibold text-rose-900">ម៉ោង ៥:០០នាទីព្រឹក</span>
                  </div>
                  <span className="text-rose-700 sm:text-right">ពិធីសំពះព្រះអាទិត្យ</span>
                </div>
              </div>
              <div className="group relative pl-8 pb-4 border-l-2 border-rose-200 hover:border-rose-400 transition-colors">
                <div className="absolute -left-2 top-0 h-4 w-4 rounded-full bg-rose-400 ring-4 ring-rose-50 group-hover:bg-rose-500 transition-colors"></div>
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🎋</span>
                    <span className="font-semibold text-rose-900">ម៉ោង ៧:០០នាទីព្រឹក</span>
                  </div>
                  <span className="text-rose-700 sm:text-right">ពិធីហែកំណត់(ជំនួន)</span>
                </div>
              </div>
              <div className="group relative pl-8 pb-4 border-l-2 border-rose-200 hover:border-rose-400 transition-colors">
                <div className="absolute -left-2 top-0 h-4 w-4 rounded-full bg-rose-400 ring-4 ring-rose-50 group-hover:bg-rose-500 transition-colors"></div>
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">💍</span>
                    <span className="font-semibold text-rose-900">ម៉ោង ៨:០០នាទីព្រឹក</span>
                  </div>
                  <span className="text-rose-700 sm:text-right">ពិធីបំពាក់ចិញ្ចៀន</span>
                </div>
              </div>
              <div className="group relative pl-8 pb-4 border-l-2 border-rose-200 hover:border-rose-400 transition-colors">
                <div className="absolute -left-2 top-0 h-4 w-4 rounded-full bg-rose-400 ring-4 ring-rose-50 group-hover:bg-rose-500 transition-colors"></div>
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🌸</span>
                    <span className="font-semibold text-rose-900">ម៉ោង ១០:០០នាទីព្រឹក</span>
                  </div>
                  <span className="text-rose-700 sm:text-right">ពិធីសំពះផ្ទឹម</span>
                </div>
              </div>
              <div className="group relative pl-8 pb-4 border-l-2 border-rose-200 hover:border-rose-400 transition-colors">
                <div className="absolute -left-2 top-0 h-4 w-4 rounded-full bg-rose-400 ring-4 ring-rose-50 group-hover:bg-rose-500 transition-colors"></div>
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🍚</span>
                    <span className="font-semibold text-rose-900">ម៉ោង ១១:៣០នាទីព្រឹក</span>
                  </div>
                  <span className="text-rose-700 sm:text-right">ពិសាអាហារថ្ងៃត្រង់</span>
                </div>
              </div>
              <div className="group relative pl-8">
                <div className="absolute -left-2 top-0 h-4 w-4 rounded-full bg-rose-500 ring-4 ring-rose-50 group-hover:bg-rose-600 transition-colors"></div>
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🎉</span>
                    <span className="font-semibold text-rose-900">ម៉ោង ០៥:០០នាទីល្ងាច</span>
                  </div>
                  <span className="text-rose-700 sm:text-right">ពិធីបដិសណ្ឋារកិច្ចភ្ញៀវ - ពិសាភោជនាហារ នៅភោជនីយដ្ឋាន សមភាពថ្មី (អគារ A)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location Map */}
      <section className="scroll-animate overflow-x-hidden bg-gradient-to-br from-pink-50 to-rose-50 px-6 py-16">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="khmer-elegant mb-8 text-3xl text-rose-900 animate-fade-in-up">ទីតាំង</h2>
          <div className="mb-6 overflow-hidden rounded-2xl bg-white p-4 shadow-lg animate-zoom-in" style={{ animationDelay: '0.2s' }}>
            <div className="relative" style={{ paddingBottom: '56.25%', height: 0 }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3882.0229098867203!2d103.84314409999999!3d13.348851000000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3110175e6a94bf95%3A0xff7a7aaf4d340053!2sSampheap%20thmei%20Restaurant!5e0!3m2!1sen!2skh!4v1761746914247!5m2!1sen!2skh"
                style={{ border: 0, position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-xl"
                title="Wedding Venue Map"
              ></iframe>
            </div>
          </div>
          <a
            href="https://maps.app.goo.gl/Twh22juc31riTtd76?g_st=ipc"
            target="_blank"
            rel="noopener noreferrer"
            className="khmer-body inline-block rounded-full bg-rose-500 px-8 py-4 text-lg font-medium text-white shadow-lg transition-all hover:bg-rose-600 hover:shadow-xl animate-bounce-in"
            style={{ animationDelay: '0.4s' }}
          >
            ចុចបើកផែនទីពិសាភោជនាហារ
          </a>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="scroll-animate overflow-x-hidden bg-gradient-to-b from-rose-50 to-pink-50 px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="khmer-title mb-12 text-center text-4xl text-rose-900 animate-fade-in-up">
            វិចិត្រសាល
          </h2>
          {/* Masonry Grid - Material Tailwind Style */}
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {/* Column 1 - Mobile: images 0,2,4,6 | Desktop: images 0,3,6 */}
            <div className="grid gap-4">
              {[0, 2, 4, 6].map((idx) =>
                galleries[idx] && (
                  <button
                    key={galleries[idx].id}
                    onClick={() => setSelectedImage(galleries[idx].image)}
                    className={`group relative overflow-hidden rounded-lg transform-gpu ${idx === 3 || idx === 6 ? 'hidden md:block' : ''} animate-slide-in-left`}
                    style={{ contain: 'layout style paint', animationDelay: `${idx * 0.1}s` }}
                  >
                    <Image
                      src={galleries[idx].image}
                      alt={galleries[idx].name}
                      width={400}
                      height={idx === 0 ? 500 : idx === 2 ? 400 : idx === 4 ? 350 : 450}
                      priority={idx < 4}
                      loading={idx < 4 ? 'eager' : 'lazy'}
                      quality={80}
                      className="w-full h-full rounded-lg object-cover will-change-transform"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                    {/* Overlay - Simplified */}
                    <div className="absolute inset-0 flex items-end bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <div className="p-4 w-full">
                        <h3 className="khmer-body text-lg font-bold text-white drop-shadow-lg">
                          {galleries[idx].name}
                        </h3>
                      </div>
                    </div>
                  </button>
                )
              )}
              {/* Desktop only: image 3 */}
              {galleries[3] && (
                <button
                  key={galleries[3].id}
                  onClick={() => setSelectedImage(galleries[3].image)}
                  className="group relative overflow-hidden rounded-lg transform-gpu hidden md:block animate-slide-in-left"
                  style={{ contain: 'layout style paint', animationDelay: '0.3s' }}
                >
                  <Image
                    src={galleries[3].image}
                    alt={galleries[3].name}
                    width={400}
                    height={400}
                    loading="lazy"
                    quality={80}
                    className="w-full h-full rounded-lg object-cover will-change-transform"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 flex items-end bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="p-4 w-full">
                      <h3 className="khmer-body text-lg font-bold text-white drop-shadow-lg">
                        {galleries[3].name}
                      </h3>
                    </div>
                  </div>
                </button>
              )}
            </div>

            {/* Column 2 - Mobile: images 1,3,5,7 | Desktop: images 1,4 */}
            <div className="grid gap-4">
              {[1, 3, 5, 7].map((idx) =>
                galleries[idx] && (
                  <button
                    key={galleries[idx].id}
                    onClick={() => setSelectedImage(galleries[idx].image)}
                    className={`group relative overflow-hidden rounded-lg transform-gpu ${idx === 3 || idx === 5 || idx === 7 ? 'md:hidden' : ''} animate-slide-in-right`}
                    style={{ contain: 'layout style paint', animationDelay: `${idx * 0.1}s` }}
                  >
                    <Image
                      src={galleries[idx].image}
                      alt={galleries[idx].name}
                      width={400}
                      height={idx === 1 ? 350 : idx === 3 ? 400 : idx === 5 ? 450 : 350}
                      priority={idx < 4}
                      loading={idx < 4 ? 'eager' : 'lazy'}
                      quality={80}
                      className="w-full h-full rounded-lg object-cover will-change-transform"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                    {/* Overlay - Simplified */}
                    <div className="absolute inset-0 flex items-end bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <div className="p-4 w-full">
                        <h3 className="khmer-body text-lg font-bold text-white drop-shadow-lg">
                          {galleries[idx].name}
                        </h3>
                      </div>
                    </div>
                  </button>
                )
              )}
              {/* Desktop only: image 4 */}
              {galleries[4] && (
                <button
                  key={galleries[4].id}
                  onClick={() => setSelectedImage(galleries[4].image)}
                  className="group relative overflow-hidden rounded-lg transform-gpu hidden md:block animate-slide-in-right"
                  style={{ contain: 'layout style paint', animationDelay: '0.4s' }}
                >
                  <Image
                    src={galleries[4].image}
                    alt={galleries[4].name}
                    width={400}
                    height={550}
                    loading="lazy"
                    quality={80}
                    className="w-full h-full rounded-lg object-cover will-change-transform"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 flex items-end bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="p-4 w-full">
                      <h3 className="khmer-body text-lg font-bold text-white drop-shadow-lg">
                        {galleries[4].name}
                      </h3>
                    </div>
                  </div>
                </button>
              )}
            </div>

            {/* Column 3 - Desktop only: images 2,5,7 */}
            <div className="hidden md:grid gap-4">
              {[2, 5, 7].map((idx) =>
                galleries[idx] && (
                  <button
                    key={galleries[idx].id}
                    onClick={() => setSelectedImage(galleries[idx].image)}
                    className="group relative overflow-hidden rounded-lg transform-gpu animate-slide-in-left"
                    style={{ contain: 'layout style paint', animationDelay: `${idx * 0.1}s` }}
                  >
                    <Image
                      src={galleries[idx].image}
                      alt={galleries[idx].name}
                      width={400}
                      height={idx === 2 ? 400 : idx === 5 ? 450 : 350}
                      loading="lazy"
                      quality={80}
                      className="w-full h-full rounded-lg object-cover will-change-transform"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                    {/* Overlay - Simplified */}
                    <div className="absolute inset-0 flex items-end bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <div className="p-4 w-full">
                        <h3 className="khmer-body text-lg font-bold text-white drop-shadow-lg">
                          {galleries[idx].name}
                        </h3>
                      </div>
                    </div>
                  </button>
                )
              )}
            </div>

            {/* Column 4 - Desktop only: images 6,2 */}
            <div className="hidden md:grid gap-4">
              {[6, 2].map((idx) =>
                galleries[idx] && (
                  <button
                    key={galleries[idx].id}
                    onClick={() => setSelectedImage(galleries[idx].image)}
                    className="group relative overflow-hidden rounded-lg transform-gpu animate-slide-in-right"
                    style={{ contain: 'layout style paint', animationDelay: `${idx * 0.1}s` }}
                  >
                    <Image
                      src={galleries[idx].image}
                      alt={galleries[idx].name}
                      width={400}
                      height={idx === 6 ? 500 : 400}
                      loading="lazy"
                      quality={80}
                      className="w-full h-full rounded-lg object-cover will-change-transform"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                    {/* Overlay - Simplified */}
                    <div className="absolute inset-0 flex items-end bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <div className="p-4 w-full">
                        <h3 className="khmer-body text-lg font-bold text-white drop-shadow-lg">
                          {galleries[idx].name}
                        </h3>
                      </div>
                    </div>
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Music Player Section */}
      <section className="scroll-animate overflow-x-hidden px-6 py-16">
        <div className="mx-auto max-w-2xl">
          <div className="rounded-2xl bg-white p-8 text-center shadow-lg animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <p className="khmer-body mb-6 text-xl text-gray-800">
              OLICA - ភ្ជាប់និស្ស័យ - NISAI (ft. KZ)
            </p>
            <div className="mb-4 flex items-center justify-center gap-4">
              <button
                onClick={toggleAudio}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-500 text-white shadow-lg transition-all hover:bg-rose-600"
              >
                {isPlaying ? '⏸' : '▶'}
              </button>
              <div className="flex-1 rounded-full bg-gray-200 h-2">
                <div
                  className="h-2 rounded-full bg-rose-500 transition-all duration-100"
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
            </div>
            <p className="text-sm text-slate-600">
              {formatTime(currentTime)} / {formatTime(duration)}
            </p>
          </div>
        </div>
      </section>

      {/* Gift Section */}
      <section className="scroll-animate overflow-x-hidden px-6 py-16">
        <div className="flex justify-center">
          <div className="w-full max-w-md animate-zoom-in" style={{ animationDelay: '0.2s' }}>
            <Image
              src="/qr.png"
              alt="QR Code for Payment"
              width={800}
              height={800}
              className="mx-auto w-full rounded-xl bg-white p-4 shadow-lg sm:p-6 md:p-8"
              quality={100}
            />
          </div>
        </div>
      </section>

      {/* Back to Home */}
      <div className="fixed bottom-6 right-4 sm:bottom-8 sm:right-8">
        <button
          onClick={() => startTransition(() => router.push('/'))}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-500 text-white shadow-2xl transition-all hover:scale-110 hover:bg-rose-600 sm:h-14 sm:w-14"
        >
          ←
        </button>
      </div>

      {/* Generate Link Button */}
      <div className="fixed bottom-6 left-4 sm:bottom-8 sm:left-8">
        <button
          onClick={() => startTransition(() => router.push('/'))}
          className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-rose-600 shadow-2xl transition-all hover:scale-105 hover:bg-rose-50 sm:px-6 sm:py-3"
          title="Go to home"
        >
          <span className="text-lg sm:text-xl">🏠</span>
          <span className="khmer-body hidden text-sm font-medium sm:inline sm:text-base">ទំព័រដើម</span>
        </button>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 overflow-hidden"
          style={{ height: '100vh', width: '100vw', position: 'fixed', top: 0, left: 0 }}
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-rose-500 text-white text-xl font-bold shadow-lg transition-all hover:bg-rose-600 sm:h-12 sm:w-12 sm:right-8 sm:top-8"
            aria-label="Close modal"
          >
            ✕
          </button>
          <div className="flex items-center justify-center p-4" style={{ maxHeight: '100vh', maxWidth: '100vw' }}>
            <Image
              src={selectedImage}
              alt="Gallery image"
              width={1200}
              height={1200}
              className="max-h-[85vh] max-w-[90vw] w-auto h-auto object-contain rounded-lg"
              quality={95}
            />
          </div>
        </div>
      )}

      {/* Animation Styles */}
      <style jsx>{`
        /* Scroll Animation - Slide up from bottom (both directions) */
        .scroll-animate {
          opacity: 0;
          transform: translateY(60px);
          transition: opacity 2s ease-out, transform 2s ease-out;
        }

        .scroll-animate.animate-in-view {
          opacity: 1;
          transform: translateY(0);
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        @keyframes gentle-rotate {
          0% {
            transform: rotate(-5deg) translateZ(0);
          }
          50% {
            transform: rotate(5deg) translateZ(0);
          }
          100% {
            transform: rotate(-5deg) translateZ(0);
          }
        }
        .animate-gentle-rotate {
          animation: gentle-rotate 2s ease-in-out infinite;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          transform: translateZ(0);
          -webkit-transform: translateZ(0);
        }

        /* Slide animations - REMOVED */

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fadeInScale {
          0% {
            opacity: 0;
            transform: scale(0.95);
          }
          60% {
            transform: scale(1.02);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        /* Name slide animations - Mobile Safe */
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(clamp(-25px, -6vw, -12px));
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(clamp(12px, 6vw, 25px));
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-slide-in-left {
          animation: slideInLeft 0.8s ease-out;
        }

        .animate-slide-in-right {
          animation: slideInRight 0.8s ease-out;
        }
        
        /* Extra safety for ultra-narrow screens */
        @media (max-width: 375px) {
          @keyframes slideInLeft {
            from {
              opacity: 0;
              transform: translateX(-8px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @keyframes slideInRight {
            from {
              opacity: 0;
              transform: translateX(8px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
        }

        /* Animate.css inspired animations */
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-fade-in {
          animation: fadeIn 1s ease-in;
        }

        @keyframes zoomIn {
          from {
            opacity: 0;
            transform: scale3d(0.8, 0.8, 0.8);
          }
          50% {
            opacity: 1;
          }
        }

        .animate-zoom-in {
          animation: zoomIn 0.8s ease-out;
        }

        @keyframes bounceIn {
          from,
          20%,
          40%,
          60%,
          80%,
          to {
            animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
          }
          0% {
            opacity: 0;
            transform: scale3d(0.3, 0.3, 0.3);
          }
          20% {
            transform: scale3d(1.1, 1.1, 1.1);
          }
          40% {
            transform: scale3d(0.9, 0.9, 0.9);
          }
          60% {
            opacity: 1;
            transform: scale3d(1.03, 1.03, 1.03);
          }
          80% {
            transform: scale3d(0.97, 0.97, 0.97);
          }
          to {
            opacity: 1;
            transform: scale3d(1, 1, 1);
          }
        }

        .animate-bounce-in {
          animation: bounceIn 1s ease-out;
        }
      `}</style>
    </div>
  );
}
