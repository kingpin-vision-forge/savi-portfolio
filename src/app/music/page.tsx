'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { eras, getYouTubeTrackUrl, tracks } from '@/lib/musicData';
import { useMusicPlayer } from '@/context/MusicPlayerContext';

export default function MusicPage() {
    const {
        currentTrack,
        isPlaying,
        progress,
        currentTime,
        volume,
        isShuffled,
        isRepeating,
        selectedLanguage,
        selectedEra,
        selectedGenre,
        ytReady,
        playerError,
        filteredTracks,
        setVolume,
        setIsShuffled,
        setIsRepeating,
        setSelectedLanguage,
        setSelectedEra,
        setSelectedGenre,
        playTrack,
        togglePlayPause,
        playNext,
        playPrevious,
        seekToPercent,
    } = useMusicPlayer();

    const progressBarRef = useRef<HTMLDivElement>(null);
    const [shuffledTrackList, setShuffledTrackList] = useState<typeof tracks>([]);

    const isUnfiltered = selectedLanguage === 'All' && selectedEra === 'All' && selectedGenre === 'All';

    useEffect(() => {
        if (isUnfiltered) {
            setShuffledTrackList([...tracks].sort(() => Math.random() - 0.5));
            return;
        }

        setShuffledTrackList([]);
    }, [isUnfiltered]);

    const displayTracks = useMemo(() => {
        return isUnfiltered ? shuffledTrackList : filteredTracks;
    }, [filteredTracks, isUnfiltered, shuffledTrackList]);

    const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!progressBarRef.current) return;
        const rect = progressBarRef.current.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        seekToPercent(percent);
    };

    return (
        <div className="relative flex min-h-screen w-full flex-col">
            <Header />

            <main className="flex-grow flex flex-col items-center w-full">
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

                <section className="w-full max-w-[1200px] px-4 md:px-8 pb-8">
                    <div className="glass-panel rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                        <div className="flex items-center gap-2">
                            <span className="text-gray-500 text-xs font-bold uppercase tracking-wider mr-1">Language</span>
                            {(['All', 'Hindi', 'Kannada'] as const).map((lang) => (
                                <button
                                    key={lang}
                                    onClick={() => {
                                        setSelectedLanguage(lang);
                                        setSelectedEra('All');
                                        setSelectedGenre('All');
                                    }}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${selectedLanguage === lang
                                        ? 'bg-[#00C853] text-white shadow-[0_0_15px_rgba(0,200,83,0.4)]'
                                        : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10'
                                        }`}
                                >
                                    {lang}
                                </button>
                            ))}
                        </div>

                        <div className="hidden sm:block w-px h-8 bg-white/10" />

                        <div className="flex items-center gap-2">
                            <span className="text-gray-500 text-xs font-bold uppercase tracking-wider mr-1">Era</span>
                            <select
                                value={selectedEra}
                                onChange={(e) => {
                                    setSelectedEra(e.target.value);
                                    setSelectedGenre('All');
                                }}
                                className="bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm text-white font-medium appearance-none cursor-pointer outline-none focus:ring-2 focus:ring-[#00C853] transition-all pr-8"
                                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='%23999' viewBox='0 0 16 16'%3E%3Cpath d='M8 11L3 6h10z'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center' }}
                            >
                                <option value="All" className="bg-[#2d2d2d]">All Decades</option>
                                {eras.map((era) => (
                                    <option key={era} value={era} className="bg-[#2d2d2d]">{era}</option>
                                ))}
                            </select>
                        </div>

                        <div className="hidden sm:block w-px h-8 bg-white/10" />

                        <div className="flex items-center gap-2">
                            <span className="text-gray-500 text-xs font-bold uppercase tracking-wider mr-1">Genre</span>
                            <select
                                value={selectedGenre}
                                onChange={(e) => setSelectedGenre(e.target.value as 'All' | 'Janapada')}
                                className="bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm text-white font-medium appearance-none cursor-pointer outline-none focus:ring-2 focus:ring-[#00C853] transition-all pr-8"
                                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='%23999' viewBox='0 0 16 16'%3E%3Cpath d='M8 11L3 6h10z'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center' }}
                            >
                                <option value="All" className="bg-[#2d2d2d]">All Genres</option>
                                <option value="Janapada" className="bg-[#2d2d2d]">Janapada</option>
                            </select>
                        </div>

                        <div className="sm:ml-auto">
                            <span className="text-gray-500 text-xs font-mono">{displayTracks.length} tracks</span>
                        </div>
                    </div>
                </section>

                <section className="w-full max-w-[1200px] px-4 md:px-8 pb-32">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-1">
                            <div className="glass-panel rounded-3xl p-8 sticky top-28">
                                {currentTrack ? (
                                    <>
                                        <div className="relative aspect-square rounded-2xl overflow-hidden mb-6 shadow-2xl">
                                            <div
                                                className={`absolute inset-0 bg-cover bg-center transition-transform duration-700 ${isPlaying ? 'scale-105' : 'scale-100'}`}
                                                style={{ backgroundImage: `url(${currentTrack.cover})` }}
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                                            <div className={`absolute inset-4 rounded-full border-4 border-white/10 ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '3s' }}>
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <div className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center">
                                                        <svg className="w-6 h-6 text-white/80" fill="currentColor" viewBox="0 0 24 24">
                                                            <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="absolute top-3 left-3 px-2 py-1 rounded-full bg-black/60 backdrop-blur-sm text-[10px] font-bold text-[#00C853] uppercase tracking-wider">
                                                {currentTrack.language}
                                                {currentTrack.era ? ` · ${currentTrack.era}` : ''}
                                                {currentTrack.genre ? ` · ${currentTrack.genre}` : ''}
                                            </div>
                                        </div>

                                        <div className="text-center mb-6">
                                            <h2 className="text-white text-2xl font-medium mb-1">{currentTrack.title}</h2>
                                            <p className="text-gray-400 text-sm">{currentTrack.artist}</p>
                                        </div>

                                        {playerError ? (
                                            <div className="mb-6 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 text-left">
                                                <p className="text-sm text-amber-100">{playerError}</p>
                                                <a
                                                    href={getYouTubeTrackUrl(currentTrack)}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-[#69f0ae] hover:text-white transition-colors"
                                                >
                                                    Open this song on YouTube
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5h5m0 0v5m0-5L10 14m-4 0h4v4" />
                                                    </svg>
                                                </a>
                                            </div>
                                        ) : !ytReady ? (
                                            <div className="mb-6 rounded-2xl border border-white/10 bg-white/5 p-4 text-left">
                                                <p className="text-sm text-gray-300">
                                                    Loading YouTube player. If you already picked a song, it will start as soon as the player is ready.
                                                </p>
                                            </div>
                                        ) : null}

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
                                            <button onClick={playPrevious} className="p-3 text-gray-400 hover:text-white transition-colors">
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
                                            <button onClick={playNext} className="p-3 text-gray-400 hover:text-white transition-colors">
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
                                        <p className="text-gray-400 text-lg font-light">
                                            {playerError ? 'Player unavailable right now' : 'Select a track to play'}
                                        </p>
                                        <p className="text-gray-600 text-sm mt-2">
                                            {playerError ?? (ytReady ? 'Choose from our curated playlist' : 'Loading YouTube player...')}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="lg:col-span-2">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-white text-2xl font-light">Playlist</h2>
                                <span className="text-gray-500 text-sm">{displayTracks.length} tracks</span>
                            </div>

                            <div className="space-y-3">
                                {displayTracks.map((track, index) => (
                                    <div
                                        key={track.id}
                                        onClick={() => playTrack(track)}
                                        className={`group flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all duration-300 ${currentTrack?.id === track.id
                                            ? 'bg-white/10 border border-[#00C853]/30'
                                            : 'glass-panel hover:bg-white/5'
                                            }`}
                                    >
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
                                            <svg className="w-5 h-5 text-white hidden group-hover:block" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M8 5v14l11-7z" />
                                            </svg>
                                        </div>

                                        <div className="relative w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 bg-white/5 flex items-center justify-center">
                                            <svg className="w-6 h-6 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                                            </svg>
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <h3 className={`font-medium truncate ${currentTrack?.id === track.id ? 'text-[#00C853]' : 'text-white'}`}>
                                                {track.title}
                                            </h3>
                                            <p className="text-gray-500 text-sm truncate">{track.artist}</p>
                                        </div>

                                        <span className="hidden sm:inline-block text-[10px] font-bold uppercase tracking-wider text-gray-500 bg-white/5 px-2 py-1 rounded-full">
                                            {track.language}
                                            {track.genre ? ` · ${track.genre}` : ''}
                                            {track.era ? ` · ${track.era}` : ''}
                                        </span>

                                        <span className="text-gray-500 text-sm font-mono">{track.duration}</span>

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

                            <div className="mt-8 p-6 glass-panel rounded-2xl">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-[#00C853]/10 flex items-center justify-center flex-shrink-0">
                                        <svg className="w-5 h-5 text-[#00C853]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="text-white font-medium mb-1">Want Us to Add Your Music?</h4>
                                        <p className="text-gray-400 text-sm leading-relaxed">
                                            Drop us your favourite song on our WhatsApp number and we&apos;ll add it to the playlist!
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
