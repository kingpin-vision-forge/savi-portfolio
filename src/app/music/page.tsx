'use client';

import { useState, useRef, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface Track {
    id: number;
    title: string;
    artist: string;
    duration: string;
    cover: string;
    audioSrc?: string;
}

const tracks: Track[] = [
    {
        id: 1,
        title: 'Waves of Serenity',
        artist: 'SAVI Sounds',
        duration: '3:45',
        cover: '/gallery/promo-serenity.jpg',
        audioSrc: '/music/track1.mp3'
    },
    {
        id: 2,
        title: 'Pure Flow',
        artist: 'SAVI Sounds',
        duration: '4:12',
        cover: '/gallery/promo-elegance.jpg',
        audioSrc: '/music/track2.mp3'
    },
    {
        id: 3,
        title: 'Crystal Clear',
        artist: 'SAVI Sounds',
        duration: '3:28',
        cover: '/bottle2.jpeg',
        audioSrc: '/music/track3.mp3'
    },
    {
        id: 4,
        title: 'Hydration Vibes',
        artist: 'SAVI Sounds',
        duration: '5:01',
        cover: '/bottle3.jpeg',
        audioSrc: '/music/track4.mp3'
    },
    {
        id: 5,
        title: 'Aqua Dreams',
        artist: 'SAVI Sounds',
        duration: '3:55',
        cover: '/bottle4.jpeg',
        audioSrc: '/music/track5.mp3'
    },
];

export default function MusicPage() {
    const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [currentTime, setCurrentTime] = useState('0:00');
    const [volume, setVolume] = useState(0.7);
    const [isShuffled, setIsShuffled] = useState(false);
    const [isRepeating, setIsRepeating] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);
    const progressBarRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume]);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const updateProgress = () => {
            const progress = (audio.currentTime / audio.duration) * 100;
            setProgress(isNaN(progress) ? 0 : progress);

            const minutes = Math.floor(audio.currentTime / 60);
            const seconds = Math.floor(audio.currentTime % 60);
            setCurrentTime(`${minutes}:${seconds.toString().padStart(2, '0')}`);
        };

        const handleEnded = () => {
            if (isRepeating) {
                audio.currentTime = 0;
                audio.play();
            } else {
                playNext();
            }
        };

        audio.addEventListener('timeupdate', updateProgress);
        audio.addEventListener('ended', handleEnded);

        return () => {
            audio.removeEventListener('timeupdate', updateProgress);
            audio.removeEventListener('ended', handleEnded);
        };
    }, [isRepeating, currentTrack]);

    const playTrack = (track: Track) => {
        if (currentTrack?.id === track.id) {
            togglePlayPause();
            return;
        }
        setCurrentTrack(track);
        setIsPlaying(true);
        setTimeout(() => {
            audioRef.current?.play().catch(() => {
                // Handle autoplay restrictions
                setIsPlaying(false);
            });
        }, 100);
    };

    const togglePlayPause = () => {
        if (!audioRef.current || !currentTrack) return;

        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play().catch(() => setIsPlaying(false));
        }
        setIsPlaying(!isPlaying);
    };

    const playNext = () => {
        if (!currentTrack) return;
        const currentIndex = tracks.findIndex(t => t.id === currentTrack.id);
        let nextIndex: number;

        if (isShuffled) {
            do {
                nextIndex = Math.floor(Math.random() * tracks.length);
            } while (nextIndex === currentIndex && tracks.length > 1);
        } else {
            nextIndex = (currentIndex + 1) % tracks.length;
        }

        playTrack(tracks[nextIndex]);
    };

    const playPrevious = () => {
        if (!currentTrack) return;
        const currentIndex = tracks.findIndex(t => t.id === currentTrack.id);
        const prevIndex = currentIndex === 0 ? tracks.length - 1 : currentIndex - 1;
        playTrack(tracks[prevIndex]);
    };

    const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!progressBarRef.current || !audioRef.current) return;
        const rect = progressBarRef.current.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        audioRef.current.currentTime = percent * audioRef.current.duration;
    };

    return (
        <div className="relative flex min-h-screen w-full flex-col bg-[#1a1a1a]">
            <Header />

            <main className="flex-grow flex flex-col items-center w-full">
                {/* Hero Section */}
                <section className="w-full max-w-[1024px] px-6 pt-32 pb-12 text-center">
                    <div className="flex flex-col gap-6 items-center">
                        <span className="text-[#00C853] text-[10px] font-bold tracking-[0.3em] uppercase opacity-90">
                            SAVI Sounds
                        </span>
                        <h1 className="text-white text-5xl md:text-6xl lg:text-7xl font-light tracking-tighter leading-[1.1]">
                            Feel The <br />
                            <span className="font-medium bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-300 to-gray-500 italic">
                                Rhythm of Purity
                            </span>
                        </h1>
                        <div className="h-px w-20 bg-gradient-to-r from-transparent via-gray-600 to-transparent my-4" />
                        <p className="text-gray-400 text-lg md:text-xl font-light max-w-2xl leading-relaxed">
                            Immerse yourself in our curated collection of ambient sounds that capture the essence of pure, flowing water.
                        </p>
                    </div>
                </section>

                {/* Music Player Container */}
                <section className="w-full max-w-[1200px] px-4 md:px-8 pb-32">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                        {/* Now Playing Card */}
                        <div className="lg:col-span-1">
                            <div className="glass-panel rounded-3xl p-8 sticky top-28">
                                {currentTrack ? (
                                    <>
                                        {/* Album Art */}
                                        <div className="relative aspect-square rounded-2xl overflow-hidden mb-6 shadow-2xl">
                                            <div
                                                className={`absolute inset-0 bg-cover bg-center transition-transform duration-700 ${isPlaying ? 'scale-105' : 'scale-100'}`}
                                                style={{ backgroundImage: `url(${currentTrack.cover})` }}
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                                            {/* Vinyl Animation */}
                                            <div className={`absolute inset-4 rounded-full border-4 border-white/10 ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '3s' }}>
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <div className="w-4 h-4 rounded-full bg-white/20" />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Track Info */}
                                        <div className="text-center mb-6">
                                            <h2 className="text-white text-2xl font-medium mb-1">{currentTrack.title}</h2>
                                            <p className="text-gray-400 text-sm">{currentTrack.artist}</p>
                                        </div>

                                        {/* Progress Bar */}
                                        <div className="mb-4">
                                            <div
                                                ref={progressBarRef}
                                                onClick={handleProgressClick}
                                                className="h-1.5 bg-white/10 rounded-full cursor-pointer group overflow-hidden"
                                            >
                                                <div
                                                    className="h-full bg-gradient-to-r from-[#00C853] to-[#69f0ae] rounded-full relative transition-all duration-150"
                                                    style={{ width: `${progress}%` }}
                                                >
                                                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg" />
                                                </div>
                                            </div>
                                            <div className="flex justify-between mt-2 text-xs text-gray-500">
                                                <span>{currentTime}</span>
                                                <span>{currentTrack.duration}</span>
                                            </div>
                                        </div>

                                        {/* Controls */}
                                        <div className="flex items-center justify-center gap-4 mb-6">
                                            <button
                                                onClick={() => setIsShuffled(!isShuffled)}
                                                className={`p-3 rounded-full transition-all ${isShuffled ? 'text-[#00C853]' : 'text-gray-500 hover:text-white'}`}
                                                title="Shuffle"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                                </svg>
                                            </button>
                                            <button
                                                onClick={playPrevious}
                                                className="p-3 text-gray-400 hover:text-white transition-colors"
                                            >
                                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
                                                </svg>
                                            </button>
                                            <button
                                                onClick={togglePlayPause}
                                                className="p-5 bg-gradient-to-br from-[#00C853] to-[#009624] rounded-full text-white hover:shadow-[0_0_30px_rgba(0,200,83,0.5)] transition-all hover:scale-105"
                                            >
                                                {isPlaying ? (
                                                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                                                    </svg>
                                                ) : (
                                                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M8 5v14l11-7z" />
                                                    </svg>
                                                )}
                                            </button>
                                            <button
                                                onClick={playNext}
                                                className="p-3 text-gray-400 hover:text-white transition-colors"
                                            >
                                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
                                                </svg>
                                            </button>
                                            <button
                                                onClick={() => setIsRepeating(!isRepeating)}
                                                className={`p-3 rounded-full transition-all ${isRepeating ? 'text-[#00C853]' : 'text-gray-500 hover:text-white'}`}
                                                title="Repeat"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                                </svg>
                                            </button>
                                        </div>

                                        {/* Volume Control */}
                                        <div className="flex items-center gap-3 px-4">
                                            <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
                                            </svg>
                                            <input
                                                type="range"
                                                min="0"
                                                max="1"
                                                step="0.01"
                                                value={volume}
                                                onChange={(e) => setVolume(parseFloat(e.target.value))}
                                                className="flex-1 h-1 bg-white/10 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#00C853]"
                                            />
                                            <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                                            </svg>
                                        </div>
                                    </>
                                ) : (
                                    <div className="flex flex-col items-center justify-center py-20 text-center">
                                        <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center mb-6">
                                            <svg className="w-12 h-12 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                                            </svg>
                                        </div>
                                        <p className="text-gray-400 text-lg font-light">Select a track to play</p>
                                        <p className="text-gray-600 text-sm mt-2">Choose from our curated playlist</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Track List */}
                        <div className="lg:col-span-2">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-white text-2xl font-light">Playlist</h2>
                                <span className="text-gray-500 text-sm">{tracks.length} tracks</span>
                            </div>

                            <div className="space-y-3">
                                {tracks.map((track, index) => (
                                    <div
                                        key={track.id}
                                        onClick={() => playTrack(track)}
                                        className={`group flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all duration-300 ${currentTrack?.id === track.id
                                                ? 'bg-white/10 border border-[#00C853]/30'
                                                : 'glass-panel hover:bg-white/5'
                                            }`}
                                    >
                                        {/* Track Number / Playing Indicator */}
                                        <div className="w-10 flex justify-center">
                                            {currentTrack?.id === track.id && isPlaying ? (
                                                <div className="flex items-end gap-0.5 h-4">
                                                    <span className="w-1 bg-[#00C853] rounded-full animate-pulse" style={{ height: '60%', animationDelay: '0ms' }} />
                                                    <span className="w-1 bg-[#00C853] rounded-full animate-pulse" style={{ height: '100%', animationDelay: '150ms' }} />
                                                    <span className="w-1 bg-[#00C853] rounded-full animate-pulse" style={{ height: '40%', animationDelay: '300ms' }} />
                                                </div>
                                            ) : (
                                                <span className="text-gray-500 text-sm font-mono group-hover:hidden">
                                                    {(index + 1).toString().padStart(2, '0')}
                                                </span>
                                            )}
                                            <svg
                                                className="w-5 h-5 text-white hidden group-hover:block"
                                                fill="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M8 5v14l11-7z" />
                                            </svg>
                                        </div>

                                        {/* Cover Art */}
                                        <div className="relative w-14 h-14 rounded-xl overflow-hidden flex-shrink-0">
                                            <div
                                                className="absolute inset-0 bg-cover bg-center"
                                                style={{ backgroundImage: `url(${track.cover})` }}
                                            />
                                            <div className="absolute inset-0 bg-black/20" />
                                        </div>

                                        {/* Track Info */}
                                        <div className="flex-1 min-w-0">
                                            <h3 className={`font-medium truncate ${currentTrack?.id === track.id ? 'text-[#00C853]' : 'text-white'
                                                }`}>
                                                {track.title}
                                            </h3>
                                            <p className="text-gray-500 text-sm truncate">{track.artist}</p>
                                        </div>

                                        {/* Duration */}
                                        <span className="text-gray-500 text-sm font-mono">{track.duration}</span>

                                        {/* Like Button */}
                                        <button
                                            className="p-2 text-gray-600 hover:text-[#00C853] transition-colors opacity-0 group-hover:opacity-100"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                            </svg>
                                        </button>
                                    </div>
                                ))}
                            </div>

                            {/* Info Note */}
                            <div className="mt-8 p-6 glass-panel rounded-2xl">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-[#00C853]/10 flex items-center justify-center flex-shrink-0">
                                        <svg className="w-5 h-5 text-[#00C853]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="text-white font-medium mb-1">Add Your Music</h4>
                                        <p className="text-gray-400 text-sm leading-relaxed">
                                            To add your own music, place MP3 files in the <code className="text-[#00C853] bg-white/5 px-1.5 py-0.5 rounded">/public/music/</code> folder and update the track list in this page.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Hidden Audio Element */}
                <audio
                    ref={audioRef}
                    src={currentTrack?.audioSrc}
                    preload="metadata"
                />
            </main>

            <Footer />
        </div>
    );
}
