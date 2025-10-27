'use client';

import { createContext, useContext, useRef, useEffect, useState } from 'react';

type AudioContextType = {
  isPlaying: boolean;
  toggleAudio: () => void;
  currentTime: number;
  duration: number;
  progressPercent: number;
};

const AudioContext = createContext<AudioContextType | null>(null);

export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within AudioProvider');
  }
  return context;
}

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [userInteracted, setUserInteracted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element
    const audio = new Audio('/OLICA - ភ្ជាប់និស្ស័យ - NISAI (ft. KZ) Long & Chan (Official Lyric Video).mp3');
    audio.loop = true; // Loop the audio
    audioRef.current = audio;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration);
    const handleEnded = () => setIsPlaying(false);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);

    // Attempt to auto-play
    const playAudio = async () => {
      try {
        await audio.play();
        setIsPlaying(true);
        setUserInteracted(true);
      } catch {
        // Auto-play was prevented by browser
        console.log('Auto-play prevented. Click anywhere to start music.');
      }
    };

    playAudio();

    // Also try to play on any user interaction
    const handleFirstInteraction = () => {
      if (!userInteracted && audioRef.current) {
        audioRef.current.play().then(() => {
          setUserInteracted(true);
        }).catch(() => {
          // Still blocked
        });
      }
    };

    document.addEventListener('click', handleFirstInteraction);
    document.addEventListener('keydown', handleFirstInteraction);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
      audio.pause();
      audio.src = '';
    };
  }, [userInteracted]);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    }
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <AudioContext.Provider
      value={{
        isPlaying,
        toggleAudio,
        currentTime,
        duration,
        progressPercent,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
}
