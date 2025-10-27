'use client';

import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useTransition } from '../components/TransitionProvider';

export default function InvitationPage() {
  const searchParams = useSearchParams();
  const clientName = searchParams.get('name');
  const [isPlaying, setIsPlaying] = useState(false);
  const router = useRouter();
  const { startTransition } = useTransition();

  const galleries = [
    { id: 1, name: 'វិចិត្រសាល ១', theme: 'bird', image: '/gallery/1.jpg' },
    { id: 2, name: 'វិចិត្រសាល ២', theme: 'urban', image: '/gallery/2.jpg' },
    { id: 3, name: 'វិចិត្រសាល ៣', theme: 'building', image: '/gallery/3.jpg' },
    { id: 4, name: 'វិចិត្រសាល ៤', theme: 'urban', image: '/gallery/4.jpg' },
    { id: 5, name: 'វិចិត្រសាល ៥', theme: 'neon lighting', image: '/gallery/5.jpg' },
    { id: 6, name: 'វិចិត្រសាល ៦', theme: 'chair', image: '/gallery/6.jpg' },
    { id: 7, name: 'វិចិត្រសាល ៧', theme: 'supermarket', image: '/gallery/7.jpg' },
    { id: 8, name: 'វិចិត្រសាល ៨', theme: 'classic', image: '/gallery/8.jpg' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-white to-pink-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-rose-100 via-pink-50 to-rose-50 px-4 py-12 text-center sm:px-6 sm:py-16 md:py-20">
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-rose-300 blur-3xl"></div>
          <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-pink-300 blur-3xl"></div>
        </div>
        
        <div className="relative z-10 mx-auto max-w-4xl">
          <h1 className="khmer-title mb-6 text-4xl text-rose-900 sm:mb-8 sm:text-5xl md:text-6xl">
            សិរីមង្គលអាពាហ៍ពិពាហ៍
          </h1>
          
          {/* Client Name - Prominent and Beautiful Display */}
          {clientName && (
            <div className="animate-fade-in-up mb-6 rounded-3xl bg-gradient-to-br from-white/90 via-rose-50/80 to-pink-50/90 px-8 py-6 shadow-2xl backdrop-blur-md sm:mb-8 sm:px-12 sm:py-8 md:px-16 md:py-10">
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
          
          {/* Bride & Groom */}
          <div className="mb-8 flex flex-col items-center gap-6 sm:mb-12 sm:gap-8 md:flex-row md:justify-center md:gap-16">
            <div className="text-center">
              <p className="khmer-body mb-2 text-lg text-rose-700">កូនប្រុសនាម</p>
              <h2 className="khmer-elegant text-3xl text-rose-900 md:text-4xl">សំណាង តាំងហ្វុង</h2>
            </div>
            <div className="text-4xl text-rose-400">&</div>
            <div className="text-center">
              <p className="khmer-body mb-2 text-lg text-rose-700">កូនស្រីនាម</p>
              <h2 className="khmer-elegant text-3xl text-rose-900 md:text-4xl">ង៉ិន ស្រីរ៉េន</h2>
            </div>
          </div>

          {/* Date & Venue */}
          <div className="rounded-2xl bg-white/80 p-8 shadow-xl backdrop-blur-sm">
            <p className="khmer-elegant mb-4 text-xl text-rose-800">ដែលនឹងប្រព្រឹត្តទៅនៅ</p>
            <p className="khmer-body mb-6 text-2xl font-bold text-rose-900">ថ្ងៃអាទិត្យ ទី១៦ ខែវិច្ឆិកា ឆ្នាំ២០២៥</p>
            <p className="khmer-body text-lg text-rose-700">នៅភោជនីយដ្ឋាន សមភាពថ្មី (អគារ A) ក្រុងសៀមរាប</p>
          </div>
        </div>
      </section>

      {/* Parents Section */}
      <section className="px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-8 sm:gap-12 md:grid-cols-2">
            <div className="text-center">
              <h3 className="khmer-elegant mb-4 text-2xl text-rose-900">គ្រួសារកូនប្រុស</h3>
              <div className="khmer-body space-y-2 text-rose-800">
                <p className="text-lg">លោក សុខ សំណាង</p>
                <p className="text-lg">លោកស្រី ទៀវ ស្រីណាត</p>
              </div>
            </div>
            <div className="text-center">
              <h3 className="khmer-elegant mb-4 text-2xl text-rose-900">គ្រួសារកូនស្រី</h3>
              <div className="khmer-body space-y-2 text-rose-800">
                <p className="text-lg">លោក ង៉ិន ថា</p>
                <p className="text-lg">លោកស្រី ស៊ង់ សារ៉ូន</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Invitation Message */}
      <section className="bg-gradient-to-br from-rose-50 to-pink-50 px-6 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <p className="khmer-body mb-6 text-xl leading-relaxed text-rose-900">
            យើងខ្ញុំមានកិតិ្តយសសូមគោរពអញ្ជើញ<br />
            ឯកឧត្តម លោកជំទាវ អ្នកឧកញ៉ា លោក លោកស្រី អ្នកនាងកញ្ញាអញ្ញើញចូលរួមជាអធិបតី<br />
            និងជាភ្ញៀវកិត្តិយស ដើម្បីប្រសិទ្ធពរជ័យ សិរីជ័យមង្គល ក្នុងសិរីមង្គលអាពាហ៍ពិពាហ៍ កូនប្រុស កូនស្រី របស់យើងខ្ញុំ។
          </p>
        </div>
      </section>

      {/* Ceremony Schedule */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="khmer-title mb-12 text-center text-4xl text-rose-900">
            កម្មវិធីសិរីមង្គលអាពាហ៍ពិពាហ៍
          </h2>

          {/* Day 1 */}
          <div className="mb-12 rounded-2xl bg-white p-8 shadow-lg">
            <h3 className="khmer-body mb-6 text-2xl text-rose-900">
              កម្មវិធីថ្ងៃទី១ ថ្ងៃសៅរ៍ ១០រោច ខែកត្តិក ឆ្នាំម្សាញ់ ឆស័ក ព.ស ២៥៦៩<br />
              ត្រូវនឹងថ្ងៃទី១៥ ខែវិច្ឆិកា ឆ្នាំ ២០២៥
            </h3>
            <div className="khmer-body space-y-4 text-rose-800">
              <div className="flex items-center justify-between border-b border-rose-100 pb-3">
                <span className="font-semibold">ម៉ោង ១:៣០នាទីរសៀល</span>
                <span>ក្រុងពាលី</span>
              </div>
              <div className="flex items-center justify-between border-b border-rose-100 pb-3">
                <span className="font-semibold">ម៉ោង ៣:០០នាទីរសៀល</span>
                <span>ពិធីកាត់សក់បង្កក់សិរី</span>
              </div>
              <div className="flex items-center justify-between border-b border-rose-100 pb-3">
                <span className="font-semibold">ម៉ោង ៥:០០នាទីរសៀល</span>
                <span>សូត្រមន្តចំរើនព្រះបរិត្ត</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold">ម៉ោង ៦:០០នាទីរសៀល</span>
                <span>ពិសាអាហារពេលល្ងាច</span>
              </div>
            </div>
          </div>

          {/* Day 2 */}
          <div className="rounded-2xl bg-white p-8 shadow-lg">
            <h3 className="khmer-body mb-6 text-2xl text-rose-900">
              កម្មវិធីថ្ងៃទី២ ថ្ងៃអាទិត្យ ១១រោច ខែកត្តិក ឆ្នាំម្សាញ់ ឆស័ក ព.ស ២៥៦៩<br />
              ត្រូវនឹងថ្ងៃទី១៦ ខែវិច្ឆិកា ឆ្នាំ ២០២៥
            </h3>
            <div className="khmer-body space-y-4 text-rose-800">
              <div className="flex items-center justify-between border-b border-rose-100 pb-3">
                <span className="font-semibold">ម៉ោង ៥:០០នាទីព្រឹក</span>
                <span>ពិធីសំពះព្រះអាទិត្យ</span>
              </div>
              <div className="flex items-center justify-between border-b border-rose-100 pb-3">
                <span className="font-semibold">ម៉ោង ៧:០០នាទីព្រឹក</span>
                <span>ពិធីហែកំណត់(ជំនួន)</span>
              </div>
              <div className="flex items-center justify-between border-b border-rose-100 pb-3">
                <span className="font-semibold">ម៉ោង ៨:០០នាទីព្រឹក</span>
                <span>ពិធីបំពាក់ចិញ្ចៀន</span>
              </div>
              <div className="flex items-center justify-between border-b border-rose-100 pb-3">
                <span className="font-semibold">ម៉ោង ១០:០០នាទីព្រឹក</span>
                <span>ពិធីសំពះផ្ទឹម</span>
              </div>
              <div className="flex items-center justify-between border-b border-rose-100 pb-3">
                <span className="font-semibold">ម៉ោង ១១:៣០នាទីព្រឹក</span>
                <span>ពិសាអាហារថ្ងៃត្រង់</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold">ម៉ោង ០៥:០០នាទីល្ងាច</span>
                <span>ពិធីបដិសណ្ឋារកិច្ចភ្ញៀវ - ពិសាភោជនាហារ នៅភោជនីយដ្ឋាន សមភាពថ្មី (អគារ A)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location Map */}
      <section className="bg-gradient-to-br from-pink-50 to-rose-50 px-6 py-16">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="khmer-elegant mb-8 text-3xl text-rose-900">ទីតាំង</h2>
          <div className="mb-6 overflow-hidden rounded-2xl bg-white p-4 shadow-lg">
            <div className="aspect-video w-full bg-rose-100 flex items-center justify-center">
              <p className="khmer-body text-rose-600">ផែនទីទីតាំង</p>
            </div>
          </div>
          <a
            href="https://maps.app.goo.gl/oCKbz14YVdSkx8Cn8"
            target="_blank"
            rel="noopener noreferrer"
            className="khmer-body inline-block rounded-full bg-rose-500 px-8 py-4 text-lg font-medium text-white shadow-lg transition-all hover:bg-rose-600 hover:shadow-xl"
          >
            ចុចបើកផែនទីពិសាភោជនាហារ
          </a>
        </div>
      </section>

      {/* Gift Section */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="khmer-elegant mb-8 text-center text-3xl text-rose-900">ចំណងដៃ</h2>
          <div className="rounded-2xl bg-white p-8 text-center shadow-lg">
            <p className="khmer-body mb-6 text-lg text-rose-800">
              លោកអ្នកក៏អាចផ្ញើចំណងដៃតាមរយៈ ABA របស់ពួកយើងខាងក្រោម
            </p>
            <div className="khmer-body mb-4 text-rose-900">
              <p className="mb-2 font-semibold">ឈ្មោះគណនី :</p>
              <p className="text-xl">SAMNANG TANGFONG AND NGIN SREYREN</p>
            </div>
            <div className="khmer-body text-rose-900">
              <p className="mb-2 font-semibold">លេខគណនី :</p>
              <p className="text-2xl font-bold">007009998</p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="bg-gradient-to-b from-rose-50 to-pink-50 px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="khmer-title mb-12 text-center text-4xl text-rose-900">
            វិចិត្រសាល
          </h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {galleries.map((gallery) => (
              <a
                key={gallery.id}
                href={`/gallery/gallery-${gallery.id}`}
                className="group relative overflow-hidden rounded-xl bg-white shadow-lg transition-all hover:scale-105 hover:shadow-2xl"
              >
                <div className="aspect-square bg-gradient-to-br from-rose-200 to-pink-200 flex items-center justify-center">
                  <span className="text-rose-400">{gallery.theme}</span>
                </div>
                <div className="p-4">
                  <h3 className="khmer-body text-center font-semibold text-rose-900">{gallery.name}</h3>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Music Player Section */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-2xl">
          <div className="rounded-2xl bg-white p-8 text-center shadow-lg">
            <p className="khmer-body mb-6 text-xl text-rose-900">
              OLICA - ភ្ជាប់និស្ស័យ - NISAI (ft. KZ)
            </p>
            <div className="mb-4 flex items-center justify-center gap-4">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-500 text-white shadow-lg transition-all hover:bg-rose-600"
              >
                {isPlaying ? '⏸' : '▶'}
              </button>
              <div className="flex-1 rounded-full bg-rose-100 h-2">
                <div className="h-2 w-0 rounded-full bg-rose-500"></div>
              </div>
            </div>
            <p className="text-sm text-rose-600">0:00 / 1:34</p>
          </div>
        </div>
      </section>

      {/* Thank You */}
      <section className="bg-gradient-to-br from-rose-100 via-pink-50 to-rose-50 px-6 py-20 text-center">
        <h2 className="khmer-title text-4xl text-rose-900">
          សូមអរគុណ🙏
        </h2>
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
          onClick={() => startTransition(() => router.push('/generate'))}
          className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-rose-600 shadow-2xl transition-all hover:scale-105 hover:bg-rose-50 sm:px-6 sm:py-3"
          title="Generate personalized link"
        >
          <span className="text-lg sm:text-xl">🔗</span>
          <span className="khmer-body hidden text-sm font-medium sm:inline sm:text-base">បង្កើតតំណ</span>
        </button>
      </div>

      {/* Animation Styles */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out;
        }
      `}</style>
    </div>
  );
}
