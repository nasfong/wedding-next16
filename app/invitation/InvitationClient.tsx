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

  // Intersection Observer for slide animations (left and right)
  useEffect(() => {
    const options = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const animateOnScroll = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          requestAnimationFrame(() => {
            entry.target.classList.add('slide-in');
          });
        }
      });
    };

    const observer = new IntersectionObserver(animateOnScroll, options);
    const sections = document.querySelectorAll('.slide-animate');

    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      observer.disconnect();
    };
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
      className="min-h-screen overflow-x-hidden bg-cover bg-center bg-fixed"
      style={{ 
        backgroundImage: 'url(/bg.avif)',
        transform: 'translateZ(0)',
        WebkitTransform: 'translateZ(0)',
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden'
      }}
    >
      {/* Heart Animation Background */}
      <HeartAnimation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 py-12 text-center sm:px-6 sm:py-16 md:py-20">
        <div className="absolute inset-0"></div>

        <div className="relative z-10 mx-auto max-w-4xl">


          <h1 className="khmer-title mb-6 text-2xl text-rose-900 sm:mb-8 sm:text-5xl md:text-6xl">
            សិរីមង្គលអាពាហ៍ពិពាហ៍
          </h1>

          {/* Animated Logo */}
          <div className="mb-8 flex justify-center sm:mb-12">
            <div className="animate-gentle-rotate" style={{ willChange: 'transform' }}>
              <Image
                src="/fongxren.png"
                alt="Fongxren"
                width={224}
                height={224}
                priority
                className="h-auto w-32 sm:w-40 md:w-48 lg:w-56"
              />
            </div>
          </div>

          {/* Bride & Groom */}
          <div className="mb-8 flex flex-col items-center gap-6 sm:mb-12 sm:gap-8 md:flex-row md:justify-center md:gap-16">
            <div className="text-center">
              <p className="khmer-body mb-2 text-lg text-gray-600">កូនប្រុសនាម</p>
              <h2 className="khmer-elegant text-3xl text-rose-900 md:text-4xl">សំណាង តាំងហ្វុង</h2>
            </div>
            <div className="text-4xl text-rose-400">&</div>
            <div className="text-center">
              <p className="khmer-body mb-2 text-lg text-gray-600">កូនស្រីនាម</p>
              <h2 className="khmer-elegant text-3xl text-rose-900 md:text-4xl">ង៉ិន ស្រីរ៉េន</h2>
            </div>
          </div>

          {/* Date & Venue */}
          <div className="rounded-2xl bg-white/80 p-8 shadow-xl backdrop-blur-sm">
            <p className="khmer-elegant mb-4 text-xl text-gray-600">ដែលនឹងប្រព្រឹត្តទៅនៅ</p>
            <p className="khmer-body mb-6 text-2xl font-bold text-amber-600">ថ្ងៃអាទិត្យ ទី១៦ ខែវិច្ឆិកា ឆ្នាំ២០២៥</p>
            <p className="khmer-body text-lg text-gray-600">នៅភោជនីយដ្ឋាន សមភាពថ្មី (អគារ A) ក្រុងសៀមរាប</p>
          </div>
        </div>
      </section>

      {/* Parents Section */}
      <section className="slide-animate slide-from-left px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-8 sm:gap-12 md:grid-cols-2">
            <div className="text-center">
              <h3 className="khmer-elegant mb-4 text-2xl text-rose-900">គ្រួសារកូនប្រុស</h3>
              <div className="khmer-body space-y-2 text-gray-600">
                <p className="text-lg">លោក សុខ សំណាង</p>
                <p className="text-lg">លោកស្រី ទៀវ ស្រីណាត</p>
              </div>
            </div>
            <div className="text-center">
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
      <section className="slide-animate slide-from-right px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="khmer-elegant mb-8 text-3xl text-rose-900 sm:mb-12 sm:text-4xl">
            រាប់ថ្ងៃរង់ចាំ
          </h2>
          <div className="flex justify-center gap-3 sm:gap-4 md:gap-8">
            <div className="flex flex-col items-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-white/90 shadow-lg backdrop-blur-sm transition-all hover:scale-110 hover:shadow-xl sm:h-20 sm:w-20 md:h-24 md:w-24">
                <span className="text-2xl font-bold text-amber-600 sm:text-3xl md:text-4xl">
                  {String(timeLeft.days).padStart(2, '0')}
                </span>
              </div>
              <span className="khmer-body mt-1 text-xs font-medium text-gray-600 sm:mt-2 sm:text-sm md:text-base">ថ្ងៃ</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-white/90 shadow-lg backdrop-blur-sm transition-all hover:scale-110 hover:shadow-xl sm:h-20 sm:w-20 md:h-24 md:w-24">
                <span className="text-2xl font-bold text-amber-600 sm:text-3xl md:text-4xl">
                  {String(timeLeft.hours).padStart(2, '0')}
                </span>
              </div>
              <span className="khmer-body mt-1 text-xs font-medium text-gray-600 sm:mt-2 sm:text-sm md:text-base">ម៉ោង</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-white/90 shadow-lg backdrop-blur-sm transition-all hover:scale-110 hover:shadow-xl sm:h-20 sm:w-20 md:h-24 md:w-24">
                <span className="text-2xl font-bold text-amber-600 sm:text-3xl md:text-4xl">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </span>
              </div>
              <span className="khmer-body mt-1 text-xs font-medium text-gray-600 sm:mt-2 sm:text-sm md:text-base">នាទី</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-white/90 shadow-lg backdrop-blur-sm transition-all hover:scale-110 hover:shadow-xl sm:h-20 sm:w-20 md:h-24 md:w-24">
                <span className="text-2xl font-bold text-amber-600 sm:text-3xl md:text-4xl">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </span>
              </div>
              <span className="khmer-body mt-1 text-xs font-medium text-gray-600 sm:mt-2 sm:text-sm md:text-base">វិនាទី</span>
            </div>
          </div>
        </div>
      </section>

      {/* Invitation Message */}
      <section className="slide-animate slide-from-right bg-gradient-to-br from-rose-50 to-pink-50 px-6 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <p className="khmer-body mb-6 text-xl leading-relaxed text-rose-900">
            យើងខ្ញុំមានកិតិ្តយសសូមគោរពអញ្ជើញ<br />
            ឯកឧត្តម លោកជំទាវ អ្នកឧកញ៉ា លោក លោកស្រី អ្នកនាងកញ្ញាអញ្ញើញចូលរួមជាអធិបតី<br />
            និងជាភ្ញៀវកិត្តិយស ដើម្បីប្រសិទ្ធពរជ័យ សិរីជ័យមង្គល ក្នុងសិរីមង្គលអាពាហ៍ពិពាហ៍ កូនប្រុស កូនស្រី របស់យើងខ្ញុំ។
          </p>
        </div>
      </section>

      {/* Ceremony Schedule */}
      <section className="slide-animate slide-from-left px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="khmer-title mb-12 text-center  text-xl text-rose-900 sm:mb-8 sm:text-5xl">
            កម្មវិធីសិរីមង្គលអាពាហ៍ពិពាហ៍
          </h2>

          {/* Day 1 */}
          <div className="mb-12 rounded-2xl bg-white p-8 shadow-lg">
            <h3 className="khmer-body mb-6 text-2xl text-rose-900">
              កម្មវិធីថ្ងៃទី១ ថ្ងៃសៅរ៍ ១០រោច ខែកត្តិក ឆ្នាំម្សាញ់ ឆស័ក ព.ស ២៥៦៩<br />
              <span className="text-rose-800">ត្រូវនឹងថ្ងៃទី១៥ ខែវិច្ឆិកា ឆ្នាំ ២០២៥</span>
            </h3>
            <div className="khmer-body space-y-4 text-rose-800">
              <div className="flex items-center justify-between border-b border-rose-100 pb-3">
                <span className="font-semibold text-rose-900">ម៉ោង ១:៣០នាទីរសៀល</span>
                <span>ក្រុងពាលី</span>
              </div>
              <div className="flex items-center justify-between border-b border-rose-100 pb-3">
                <span className="font-semibold text-rose-900">ម៉ោង ៣:០០នាទីរសៀល</span>
                <span>ពិធីកាត់សក់បង្កក់សិរី</span>
              </div>
              <div className="flex items-center justify-between border-b border-rose-100 pb-3">
                <span className="font-semibold text-rose-900">ម៉ោង ៥:០០នាទីរសៀល</span>
                <span>សូត្រមន្តចំរើនព្រះបរិត្ត</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-rose-900">ម៉ោង ៦:០០នាទីរសៀល</span>
                <span>ពិសាអាហារពេលល្ងាច</span>
              </div>
            </div>
          </div>

          {/* Day 2 */}
          <div className="rounded-2xl bg-white p-8 shadow-lg">
            <h3 className="khmer-body mb-6 text-2xl text-rose-900">
              កម្មវិធីថ្ងៃទី២ ថ្ងៃអាទិត្យ ១១រោច ខែកត្តិក ឆ្នាំម្សាញ់ ឆស័ក ព.ស ២៥៦៩<br />
              <span className="text-rose-800">ត្រូវនឹងថ្ងៃទី១៦ ខែវិច្ឆិកា ឆ្នាំ ២០២៥</span>
            </h3>
            <div className="khmer-body space-y-4 text-rose-800">
              <div className="flex items-center justify-between border-b border-rose-100 pb-3">
                <span className="font-semibold text-rose-900">ម៉ោង ៥:០០នាទីព្រឹក</span>
                <span>ពិធីសំពះព្រះអាទិត្យ</span>
              </div>
              <div className="flex items-center justify-between border-b border-rose-100 pb-3">
                <span className="font-semibold text-rose-900">ម៉ោង ៧:០០នាទីព្រឹក</span>
                <span>ពិធីហែកំណត់(ជំនួន)</span>
              </div>
              <div className="flex items-center justify-between border-b border-rose-100 pb-3">
                <span className="font-semibold text-rose-900">ម៉ោង ៨:០០នាទីព្រឹក</span>
                <span>ពិធីបំពាក់ចិញ្ចៀន</span>
              </div>
              <div className="flex items-center justify-between border-b border-rose-100 pb-3">
                <span className="font-semibold text-rose-900">ម៉ោង ១០:០០នាទីព្រឹក</span>
                <span>ពិធីសំពះផ្ទឹម</span>
              </div>
              <div className="flex items-center justify-between border-b border-rose-100 pb-3">
                <span className="font-semibold text-rose-900">ម៉ោង ១១:៣០នាទីព្រឹក</span>
                <span>ពិសាអាហារថ្ងៃត្រង់</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-rose-900">ម៉ោង ០៥:០០នាទីល្ងាច</span>
                <span>ពិធីបដិសណ្ឋារកិច្ចភ្ញៀវ - ពិសាភោជនាហារ នៅភោជនីយដ្ឋាន សមភាពថ្មី (អគារ A)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location Map */}
      <section className="slide-animate slide-from-right bg-gradient-to-br from-pink-50 to-rose-50 px-6 py-16">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="khmer-elegant mb-8 text-3xl text-rose-900">ទីតាំង</h2>
          <div className="mb-6 overflow-hidden rounded-2xl bg-white p-4 shadow-lg">
            <div className="relative" style={{ paddingBottom: '56.25%', height: 0 }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3908.2697889234614!2d103.8550638!3d13.3565772!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3110168e8cf5e77f%3A0x6c3d33d7c5dd5e5e!2sSamphea%20Thmey%20Restaurant!5e0!3m2!1sen!2skh!4v1234567890123!5m2!1sen!2skh"
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
            className="khmer-body inline-block rounded-full bg-rose-500 px-8 py-4 text-lg font-medium text-white shadow-lg transition-all hover:bg-rose-600 hover:shadow-xl"
          >
            ចុចបើកផែនទីពិសាភោជនាហារ
          </a>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="slide-animate slide-from-left bg-gradient-to-b from-rose-50 to-pink-50 px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="khmer-title mb-12 text-center text-4xl text-rose-900">
            វិចិត្រសាល
          </h2>
          {/* Masonry Grid - Material Tailwind Style */}
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {/* Column 1 */}
            <div className="grid gap-4">
              {[0, 3, 6].map((idx) => 
                galleries[idx] && (
                  <button
                    key={galleries[idx].id}
                    onClick={() => setSelectedImage(galleries[idx].image)}
                    className="group relative overflow-hidden rounded-lg transform-gpu"
                    style={{ contain: 'layout style paint' }}
                  >
                    <Image
                      src={galleries[idx].image}
                      alt={galleries[idx].name}
                      width={400}
                      height={idx === 0 ? 500 : idx === 3 ? 400 : 450}
                      loading={idx < 4 ? 'eager' : 'lazy'}
                      quality={75}
                      className="w-full h-full rounded-lg object-cover will-change-transform"
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwAA8A/9k="
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

            {/* Column 2 */}
            <div className="grid gap-4">
              {[1, 4].map((idx) => 
                galleries[idx] && (
                  <button
                    key={galleries[idx].id}
                    onClick={() => setSelectedImage(galleries[idx].image)}
                    className="group relative overflow-hidden rounded-lg transform-gpu"
                    style={{ contain: 'layout style paint' }}
                  >
                    <Image
                      src={galleries[idx].image}
                      alt={galleries[idx].name}
                      width={400}
                      height={idx === 1 ? 350 : 550}
                      loading={idx < 4 ? 'eager' : 'lazy'}
                      quality={75}
                      className="w-full h-full rounded-lg object-cover will-change-transform"
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwAA8A/9k="
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

            {/* Column 3 - Hidden on mobile, shown on md */}
            <div className="hidden md:grid gap-4">
              {[2, 5, 7].map((idx) => 
                galleries[idx] && (
                  <button
                    key={galleries[idx].id}
                    onClick={() => setSelectedImage(galleries[idx].image)}
                    className="group relative overflow-hidden rounded-lg transform-gpu"
                    style={{ contain: 'layout style paint' }}
                  >
                    <Image
                      src={galleries[idx].image}
                      alt={galleries[idx].name}
                      width={400}
                      height={idx === 2 ? 400 : idx === 5 ? 450 : 350}
                      loading="lazy"
                      quality={75}
                      className="w-full h-full rounded-lg object-cover will-change-transform"
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwAA8A/9k="
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

            {/* Column 4 - Hidden on mobile, shown on md */}
            <div className="hidden md:grid gap-4">
              {[6, 2].map((idx) => 
                galleries[idx] && (
                  <button
                    key={galleries[idx].id}
                    onClick={() => setSelectedImage(galleries[idx].image)}
                    className="group relative overflow-hidden rounded-lg transform-gpu"
                    style={{ contain: 'layout style paint' }}
                  >
                    <Image
                      src={galleries[idx].image}
                      alt={galleries[idx].name}
                      width={400}
                      height={idx === 6 ? 500 : 400}
                      loading="lazy"
                      quality={75}
                      className="w-full h-full rounded-lg object-cover will-change-transform"
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwAA8A/9k="
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
      <section className="slide-animate slide-from-right px-6 py-16">
        <div className="mx-auto max-w-2xl">
          <div className="rounded-2xl bg-white p-8 text-center shadow-lg">
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
      <section className="slide-animate slide-from-left px-6 py-16">
        <div className="flex justify-center">
          <div className="w-full max-w-md">
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-2xl text-white backdrop-blur-sm transition-all hover:bg-white/20 sm:right-8 sm:top-8"
            aria-label="Close modal"
          >
            ✕
          </button>
          <div
            className="relative max-h-[90vh] max-w-[90vw] overflow-hidden rounded-2xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={selectedImage}
              alt="Gallery image"
              width={1200}
              height={1200}
              className="h-auto w-full object-contain"
              quality={90}
            />
          </div>
        </div>
      )}

      {/* Animation Styles */}
      <style jsx>{`
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

        /* Slide animations - Left and Right */
        .slide-animate {
          opacity: 0;
          transition: opacity 0.8s ease-out, transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
          will-change: opacity, transform;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          transform: translateZ(0);
          -webkit-transform: translateZ(0);
        }
        
        .slide-from-left {
          transform: translateX(-50px) translateZ(0);
        }
        
        .slide-from-right {
          transform: translateX(50px) translateZ(0);
        }
        
        .slide-animate.slide-in {
          opacity: 1;
          transform: translateX(0) translateZ(0);
          will-change: auto;
        }

        /* Mobile optimizations */
        @media (max-width: 640px) {
          .slide-from-left {
            transform: translateX(-30px) translateZ(0);
          }
          
          .slide-from-right {
            transform: translateX(30px) translateZ(0);
          }
        }

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
      `}</style>
    </div>
  );
}
