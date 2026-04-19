'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { useMusicPlayer } from '@/context/MusicPlayerContext';
import Link from 'next/link';
import Image from 'next/image';

export default function GlobalMusicPlayer() {
    const pathname = usePathname();
    const { 
        currentTrack, 
        isPlaying, 
        togglePlayPause,
        progress,
        ytReady,
        playNext,
        playPrevious
    } = useMusicPlayer();

    // Hide if we're on the full music page, or if there's no track playing/selected
    if (pathname === '/music' || !currentTrack) {
        return null;
    }

    return (
        <div className="fixed bottom-6 right-6 z-50 animate-fade-in-up">
            <div className="glass-panel p-3 rounded-2xl flex items-center gap-4 shadow-2xl border border-white/10 hover:border-[#00C853]/50 transition-all bg-[#0a0a0a]/80 backdrop-blur-md w-[280px] sm:w-[320px]">
                {/* Album Art with Vinyl spin */}
                <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0 group cursor-pointer border border-white/10">
                    <Link href="/music" className="block relative w-full h-full">
                        <img 
                            src={currentTrack.cover} 
                            alt={currentTrack.title}
                            className={`w-full h-full object-cover transition-all duration-700 ${isPlaying ? 'animate-spin' : ''}`}
                            style={{ animationDuration: '4s' }}
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                        </div>
                    </Link>
                </div>

                {/* Track Info */}
                <div className="flex-1 min-w-0">
                    <Link href="/music" className="block w-fit">
                        <h4 className="text-white text-sm font-medium truncate hover:text-[#00C853] transition-colors">{currentTrack.title}</h4>
                    </Link>
                    <p className="text-gray-400 text-xs truncate">{currentTrack.artist}</p>
                    {/* Tiny Progress Bar */}
                    <div className="h-0.5 bg-white/10 rounded-full mt-1.5 w-full overflow-hidden">
                        <div 
                            className="h-full bg-gradient-to-r from-[#00C853] to-[#69f0ae] transition-all duration-300"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>

                {/* Controls */}
                <div className="flex items-center gap-2 flex-shrink-0 pr-1">
                    <button 
                        onClick={playPrevious}
                        className="text-gray-400 hover:text-white transition-colors"
                        aria-label="Previous Track"
                    >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
                        </svg>
                    </button>

                    <button 
                        onClick={togglePlayPause}
                        disabled={!ytReady}
                        className={`w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-br from-[#00C853] to-[#009624] text-white hover:scale-105 transition-transform shadow-[0_0_10px_rgba(0,200,83,0.3)] ${!ytReady ? 'opacity-50 cursor-not-allowed' : ''}`}
                        aria-label={isPlaying ? 'Pause' : 'Play'}
                    >
                        {isPlaying ? (
                            <svg className="w-4 h-4 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                            </svg>
                        ) : (
                            <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z" />
                            </svg>
                        )}
                    </button>

                    <button 
                        onClick={playNext}
                        className="text-gray-400 hover:text-white transition-colors"
                        aria-label="Next Track"
                    >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}
