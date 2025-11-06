'use client';

export default function HeartAnimation() {
  // More hearts with staggered delays to create continuous rain effect
  const hearts = [
    { id: 1, left: 5, delay: 0, duration: 10 },
    { id: 2, left: 15, delay: 1, duration: 12 },
    { id: 3, left: 25, delay: 2, duration: 9 },
    { id: 4, left: 35, delay: 3, duration: 11 },
    { id: 5, left: 45, delay: 4, duration: 10 },
    { id: 6, left: 55, delay: 5, duration: 13 },
    { id: 7, left: 65, delay: 6, duration: 9 },
    { id: 8, left: 75, delay: 7, duration: 11 },
    { id: 9, left: 85, delay: 8, duration: 12 },
    { id: 10, left: 95, delay: 9, duration: 10 },
    { id: 11, left: 10, delay: 0.5, duration: 14 },
    { id: 12, left: 30, delay: 1.5, duration: 8 },
    { id: 13, left: 50, delay: 2.5, duration: 11 },
    { id: 14, left: 70, delay: 3.5, duration: 13 },
    { id: 15, left: 90, delay: 4.5, duration: 9 },
    { id: 16, left: 8, delay: 5.5, duration: 11 },
    { id: 17, left: 18, delay: 6.5, duration: 10 },
    { id: 18, left: 28, delay: 7.5, duration: 12 },
    { id: 19, left: 38, delay: 8.5, duration: 9 },
    { id: 20, left: 48, delay: 0.2, duration: 13 },
    { id: 21, left: 58, delay: 1.2, duration: 11 },
    { id: 22, left: 68, delay: 2.2, duration: 10 },
    { id: 23, left: 78, delay: 3.2, duration: 14 },
    { id: 24, left: 88, delay: 4.2, duration: 9 },
    { id: 25, left: 98, delay: 5.2, duration: 12 },
    { id: 26, left: 12, delay: 6.2, duration: 11 },
    { id: 27, left: 22, delay: 7.2, duration: 10 },
    { id: 28, left: 42, delay: 8.2, duration: 13 },
    { id: 29, left: 62, delay: 0.8, duration: 9 },
    { id: 30, left: 82, delay: 1.8, duration: 12 },
    { id: 31, left: 3, delay: 2.8, duration: 11 },
    { id: 32, left: 13, delay: 3.8, duration: 10 },
    { id: 33, left: 23, delay: 4.8, duration: 13 },
    { id: 34, left: 33, delay: 5.8, duration: 9 },
    { id: 35, left: 43, delay: 6.8, duration: 12 },
    { id: 36, left: 53, delay: 7.8, duration: 11 },
    { id: 37, left: 63, delay: 8.8, duration: 10 },
    { id: 38, left: 73, delay: 0.3, duration: 14 },
    { id: 39, left: 83, delay: 1.3, duration: 9 },
    { id: 40, left: 93, delay: 2.3, duration: 12 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50" aria-hidden="true">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="heart-float absolute text-4xl opacity-20"
          style={{
            left: `${heart.left}%`,
            bottom: `${(heart.delay / 10) * 100}%`, // Distribute based on delay
            animationDelay: `-${heart.delay}s`, // Negative delay to start mid-animation
            animationDuration: `${heart.duration}s`,
          }}
        >
          ❤️
        </div>
      ))}
      
      <style jsx>{`
        @keyframes floatUp {
          from {
            transform: translateY(0) rotate(0deg) scale(0.8);
            opacity: 0.2;
          }
          to {
            transform: translateY(-100vh) rotate(360deg) scale(1);
            opacity: 0;
          }
        }

        .heart-float {
          animation: floatUp linear infinite;
          will-change: transform, opacity;
        }
      `}</style>
    </div>
  );
}
