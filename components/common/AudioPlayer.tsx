'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Sparkles } from 'lucide-react';
import { startSoothingHum, stopSoothingHum } from '@/lib/soundEffects';

interface AudioPlayerProps {
  audioUrl?: string;
  title?: string;
  allowSoothingHum?: boolean;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  audioUrl,
  allowSoothingHum = true,
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isHumPlaying, setIsHumPlaying] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      stopSoothingHum();
    };
  }, []);

  const togglePlayAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!audioRef.current && audioUrl) {
      audioRef.current = new Audio(audioUrl);
      audioRef.current.onended = () => setIsPlaying(false);
      audioRef.current.onerror = () => setIsPlaying(false);
    }

    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      // If soothing hum was playing, pause it
      if (isHumPlaying) {
        stopSoothingHum();
        setIsHumPlaying(false);
      }
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        setIsPlaying(false);
      });
    }
  };

  const toggleSoothingHum = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isHumPlaying) {
      stopSoothingHum();
      setIsHumPlaying(false);
    } else {
      if (isPlaying && audioRef.current) {
        audioRef.current.pause();
        setIsPlaying(false);
      }
      const started = startSoothingHum();
      if (started) {
        setIsHumPlaying(true);
      }
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      {audioUrl && (
        <button
          type="button"
          onClick={togglePlayAudio}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
            isPlaying
              ? 'bg-[#2F6A4F] text-white shadow-xs animate-pulse'
              : 'bg-[#EBF4EF] hover:bg-[#D1E5D9] text-[#2F6A4F]'
          }`}
          title={isPlaying ? 'বিরতি দিন' : 'তিলাওয়াত শুনুন'}
        >
          {isPlaying ? (
            <>
              <Pause className="w-3.5 h-3.5" />
              <span>চলছে...</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>তিলাওয়াত শুনুন</span>
            </>
          )}
        </button>
      )}

      {allowSoothingHum && (
        <button
          type="button"
          onClick={toggleSoothingHum}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
            isHumPlaying
              ? 'bg-[#D4A373] text-white shadow-xs animate-pulse'
              : 'bg-[#FBF6EF] hover:bg-[#F3E6D5] text-[#936639] border border-[#E8D5BF]/60'
          }`}
          title={isHumPlaying ? 'ঘুমের প্রশান্তি সাউন্ড বন্ধ করুন' : 'শিশুকে শান্ত করার রিল্যাক্সিং সাউন্ড'}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>{isHumPlaying ? 'ঘুমের সুর চলছে' : 'শান্তির সুর (ঘুম)'}</span>
        </button>
      )}
    </div>
  );
};
