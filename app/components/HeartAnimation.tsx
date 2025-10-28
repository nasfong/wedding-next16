'use client';

export default function HeartAnimation() {
  // Static heart positions for consistency
  const hearts = [
    { id: 1, left: 5, delay: 0, duration: 10 },
    { id: 2, left: 15, delay: 2, duration: 12 },
    { id: 3, left: 25, delay: 4, duration: 9 },
    { id: 4, left: 35, delay: 1, duration: 11 },
    { id: 5, left: 45, delay: 3, duration: 10 },
    { id: 6, left: 55, delay: 5, duration: 13 },
    { id: 7, left: 65, delay: 2, duration: 9 },
    { id: 8, left: 75, delay: 4, duration: 11 },
    { id: 9, left: 85, delay: 1, duration: 12 },
    { id: 10, left: 95, delay: 3, duration: 10 },
    { id: 11, left: 10, delay: 6, duration: 14 },
    { id: 12, left: 30, delay: 7, duration: 8 },
    { id: 13, left: 50, delay: 8, duration: 11 },
    { id: 14, left: 70, delay: 9, duration: 13 },
    { id: 15, left: 90, delay: 5, duration: 9 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="heart-float absolute bottom-0 text-4xl opacity-20"
          style={{
            left: `${heart.left}%`,
            animationDelay: `${heart.delay}s`,
            animationDuration: `${heart.duration}s`,
          }}
        >
          ❤️
        </div>
      ))}
      
      <style jsx>{`
        @keyframes floatUp {
          0% {
            transform: translateY(0) rotate(0deg) scale(0.5);
            opacity: 0;
          }
          10% {
            opacity: 0.2;
          }
          50% {
            opacity: 0.15;
          }
          90% {
            opacity: 0.05;
          }
          100% {
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
