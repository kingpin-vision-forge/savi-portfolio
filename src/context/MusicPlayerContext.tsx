'use client';

import React, { createContext, useContext, useState, useRef, useEffect, useCallback, ReactNode } from 'react';
import { Track, tracks, getYouTubeErrorMessage } from '@/lib/musicData';

declare global {
    interface Window {
        YT: {
            Player: new (elementId: string, options: YTPlayerOptions) => YTPlayer;
            PlayerState: { UNSTARTED: -1; ENDED: 0; PLAYING: 1; PAUSED: 2; BUFFERING: 3; CUED: 5 };
        };
        onYouTubeIframeAPIReady: () => void;
    }
}

interface YTPlayer {
    playVideo(): void;
    pauseVideo(): void;
    loadVideoById(videoId: string): void;
    seekTo(seconds: number, allowSeekAhead: boolean): void;
    setVolume(volume: number): void;
    getCurrentTime(): number;
    getDuration(): number;
    destroy(): void;
}

interface YTPlayerOptions {
    height?: string | number;
    width?: string | number;
    videoId?: string;
    playerVars?: { autoplay?: 0 | 1; controls?: 0 | 1; rel?: 0 | 1; playsinline?: 0 | 1; origin?: string };
    events?: {
        onReady?: () => void;
        onStateChange?: (event: { data: number }) => void;
        onError?: (event: { data: number }) => void;
    };
}

interface PersistedPlayerState {
    trackId: number | null;
    playbackPosition: number;
    isPlaying: boolean;
    volume: number;
    isShuffled: boolean;
    isRepeating: boolean;
    selectedLanguage: 'All' | 'Hindi' | 'Kannada';
    selectedEra: string;
    selectedGenre: 'All' | 'Janapada';
}

interface MusicPlayerContextType {
    currentTrack: Track | null;
    isPlaying: boolean;
    progress: number;
    currentTime: string;
    volume: number;
    isShuffled: boolean;
    isRepeating: boolean;
    selectedLanguage: 'All' | 'Hindi' | 'Kannada';
    selectedEra: string;
    selectedGenre: 'All' | 'Janapada';
    ytReady: boolean;
    playerError: string | null;
    filteredTracks: Track[];
    ytPlayerRef: React.MutableRefObject<YTPlayer | null>;
    isHydrated: boolean;

    setCurrentTrack: (track: Track | null) => void;
    setIsPlaying: (playing: boolean) => void;
    setVolume: (volume: number) => void;
    setIsShuffled: (shuffled: boolean) => void;
    setIsRepeating: (repeating: boolean) => void;
    setSelectedLanguage: (lang: 'All' | 'Hindi' | 'Kannada') => void;
    setSelectedEra: (era: string) => void;
    setSelectedGenre: (genre: 'All' | 'Janapada') => void;

    playTrack: (track: Track) => void;
    togglePlayPause: () => void;
    playNext: () => void;
    playPrevious: () => void;
    seekToPercent: (percent: number) => void;
}

const MusicPlayerContext = createContext<MusicPlayerContextType | undefined>(undefined);

const STORAGE_KEY = 'savi_music_player_state';

export function MusicPlayerProvider({ children }: { children: ReactNode }) {
    const [isHydrated, setIsHydrated] = useState(false);
    const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [currentTime, setCurrentTime] = useState('0:00');
    const [volume, setVolume] = useState(0.7);
    const [isShuffled, setIsShuffled] = useState(false);
    const [isRepeating, setIsRepeating] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState<'All' | 'Hindi' | 'Kannada'>('All');
    const [selectedEra, setSelectedEra] = useState<string>('All');
    const [selectedGenre, setSelectedGenre] = useState<'All' | 'Janapada'>('All');
    const [ytReady, setYtReady] = useState(false);
    const [playerError, setPlayerError] = useState<string | null>(null);

    const ytPlayerRef = useRef<YTPlayer | null>(null);
    const currentTrackRef = useRef<Track | null>(null);
    const isRepeatingRef = useRef(isRepeating);
    const filteredTracksRef = useRef<Track[]>([]);
    const isShuffledRef = useRef(isShuffled);
    const pendingTrackRef = useRef<Track | null>(null);
    const playerTimeoutRef = useRef<number | null>(null);
    const saveTimeoutRef = useRef<number | null>(null);
    const restoredStateRef = useRef<PersistedPlayerState | null>(null);

    const savePlayerState = useCallback((position?: number) => {
        if (typeof window === 'undefined' || !isHydrated) return;
        const state: PersistedPlayerState = {
            trackId: currentTrackRef.current?.id ?? null,
            playbackPosition: position ?? (ytPlayerRef.current?.getCurrentTime() ?? 0),
            isPlaying: isPlaying,
            volume: volume,
            isShuffled: isShuffled,
            isRepeating: isRepeating,
            selectedLanguage: selectedLanguage,
            selectedEra: selectedEra,
            selectedGenre: selectedGenre,
        };
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        } catch (e) {
            console.warn('Failed to save music player state:', e);
        }
    }, [isPlaying, volume, isShuffled, isRepeating, selectedLanguage, selectedEra, selectedGenre, isHydrated]);

    const loadPlayerState = useCallback((): PersistedPlayerState | null => {
        if (typeof window === 'undefined') return null;
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (!stored) return null;
            const parsed = JSON.parse(stored);
            if (typeof parsed.trackId !== 'number' && parsed.trackId !== null) return null;
            if (typeof parsed.playbackPosition !== 'number') return null;
            return parsed;
        } catch (e) {
            console.warn('Failed to load music player state:', e);
            return null;
        }
    }, []);

    useEffect(() => {
        const stored = loadPlayerState();
        if (stored) {
            restoredStateRef.current = stored;
            setVolume(stored.volume);
            setIsShuffled(stored.isShuffled);
            setIsRepeating(stored.isRepeating);
            setSelectedLanguage(stored.selectedLanguage);
            setSelectedEra(stored.selectedEra);
            setSelectedGenre(stored.selectedGenre);
        }
        setIsHydrated(true);
    }, [loadPlayerState]);

    useEffect(() => {
        if (!isHydrated) return;
        const stored = restoredStateRef.current ?? loadPlayerState();
        if (stored && stored.trackId !== null) {
            const track = tracks.find(t => t.id === stored.trackId);
            if (track) {
                currentTrackRef.current = track;
                setCurrentTrack(track);
                if (ytReady && ytPlayerRef.current) {
                    pendingTrackRef.current = track;
                    ytPlayerRef.current.loadVideoById(track.youtubeId);
                }
            }
        }
    }, [isHydrated, ytReady, loadPlayerState]);

    useEffect(() => {
        if (typeof window === 'undefined' || !isHydrated) return;
        const handleBeforeUnload = () => {
            savePlayerState();
        };
        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }, [savePlayerState, isHydrated]);

    useEffect(() => {
        if (!isPlaying || !isHydrated) return;
        if (saveTimeoutRef.current !== null) {
            window.clearTimeout(saveTimeoutRef.current);
        }
        saveTimeoutRef.current = window.setTimeout(() => {
            savePlayerState();
        }, 2000);
        return () => {
            if (saveTimeoutRef.current !== null) {
                window.clearTimeout(saveTimeoutRef.current);
            }
        };
    }, [isPlaying, isHydrated, savePlayerState]);

    useEffect(() => {
        currentTrackRef.current = currentTrack;
    }, [currentTrack]);

    useEffect(() => {
        if (!isHydrated) return;
        savePlayerState();
    }, [currentTrack, isPlaying, volume, isShuffled, isRepeating, selectedLanguage, selectedEra, selectedGenre, isHydrated, savePlayerState]);

    useEffect(() => { isRepeatingRef.current = isRepeating; }, [isRepeating]);
    useEffect(() => { isShuffledRef.current = isShuffled; }, [isShuffled]);

    const filteredTracks = tracks.filter(t => {
        const langMatch = selectedLanguage === 'All' || t.language === selectedLanguage;
        const eraMatch = selectedEra === 'All' || t.era === selectedEra;
        const genreMatch = selectedGenre === 'All' || t.genre === selectedGenre;
        return langMatch && eraMatch && genreMatch;
    });

    useEffect(() => { filteredTracksRef.current = filteredTracks; }, [filteredTracks]);

    const playNextCallback = useCallback(() => {
        const track = currentTrackRef.current;
        if (!track) return;
        const list = filteredTracksRef.current.length > 0 ? filteredTracksRef.current : tracks;
        const currentIndex = list.findIndex(t => t.id === track.id);
        let nextIndex: number;
        if (isShuffledRef.current) {
            do { nextIndex = Math.floor(Math.random() * list.length); }
            while (nextIndex === currentIndex && list.length > 1);
        } else {
            nextIndex = (currentIndex + 1) % list.length;
        }
        const next = list[nextIndex];
        currentTrackRef.current = next;
        pendingTrackRef.current = null;
        setCurrentTrack(next);
        setProgress(0);
        setCurrentTime('0:00');
        setIsPlaying(false);
        setPlayerError(null);
        ytPlayerRef.current?.loadVideoById(next.youtubeId);
    }, []);

    // Load YouTube IFrame API once on mount
    useEffect(() => {
        if (typeof window === 'undefined') return;

        playerTimeoutRef.current = window.setTimeout(() => {
            if (!ytPlayerRef.current) {
                setPlayerError('The YouTube player did not load. Check your connection or allow youtube.com in your browser blockers.');
            }
        }, 10000);

        const initPlayer = () => {
            ytPlayerRef.current = new window.YT.Player('global-yt-player', {
                height: '1',
                width: '1',
                playerVars: { autoplay: 0, controls: 0, rel: 0, playsinline: 1, origin: window.location.origin },
                events: {
                    onReady: () => {
                        if (playerTimeoutRef.current !== null) {
                            window.clearTimeout(playerTimeoutRef.current);
                            playerTimeoutRef.current = null;
                        }
                        setYtReady(true);
                        setPlayerError(null);
                        const pendingTrack = pendingTrackRef.current;
                        if (pendingTrack) {
                            pendingTrackRef.current = null;
                            ytPlayerRef.current?.loadVideoById(pendingTrack.youtubeId);
                        }
                    },
                    onStateChange: (event: { data: number }) => {
                        if (event.data === 1) { // PLAYING
                            const restoredState = restoredStateRef.current;
                            if (restoredState && restoredState.trackId === currentTrackRef.current?.id) {
                                if (restoredState.playbackPosition > 0) {
                                    ytPlayerRef.current?.seekTo(restoredState.playbackPosition, true);
                                }
                                if (!restoredState.isPlaying) {
                                    ytPlayerRef.current?.pauseVideo();
                                }
                                restoredStateRef.current = null;
                            }
                            setIsPlaying(true);
                            setPlayerError(null);
                        } else if (event.data === 2) { // PAUSED
                            setIsPlaying(false);
                        } else if (event.data === 0) { // ENDED
                            if (isRepeatingRef.current) {
                                ytPlayerRef.current?.loadVideoById(currentTrackRef.current?.youtubeId ?? '');
                            } else {
                                playNextCallback();
                            }
                        }
                    },
                    onError: (event: { data: number }) => {
                        setIsPlaying(false);
                        setPlayerError(getYouTubeErrorMessage(event.data));
                    },
                },
            });
        };

        if (window.YT && window.YT.Player) {
            initPlayer();
        } else {
            window.onYouTubeIframeAPIReady = initPlayer;
            if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
                const tag = document.createElement('script');
                tag.src = 'https://www.youtube.com/iframe_api';
                tag.onerror = () => {
                    if (playerTimeoutRef.current !== null) {
                        window.clearTimeout(playerTimeoutRef.current);
                        playerTimeoutRef.current = null;
                    }
                    setPlayerError('The YouTube player script could not be loaded.');
                };
                document.body.appendChild(tag);
            }
        }

        return () => {
            if (playerTimeoutRef.current !== null) {
                window.clearTimeout(playerTimeoutRef.current);
                playerTimeoutRef.current = null;
            }
            ytPlayerRef.current?.destroy();
        };
    }, [playNextCallback]);

    // Volume sync
    useEffect(() => {
        if (ytReady && ytPlayerRef.current) {
            ytPlayerRef.current.setVolume(Math.round(volume * 100));
        }
    }, [volume, ytReady]);

    // Progress polling while playing
    useEffect(() => {
        if (!isPlaying) return;
        const id = setInterval(() => {
            const player = ytPlayerRef.current;
            if (!player) return;
            const cur = player.getCurrentTime() ?? 0;
            const dur = player.getDuration() ?? 0;
            if (dur > 0) {
                setProgress((cur / dur) * 100);
                const mins = Math.floor(cur / 60);
                const secs = Math.floor(cur % 60);
                setCurrentTime(`${mins}:${secs.toString().padStart(2, '0')}`);
            }
        }, 500);
        return () => clearInterval(id);
    }, [isPlaying]);

    const playTrack = useCallback((track: Track) => {
        if (currentTrackRef.current?.id === track.id && ytReady) {
            togglePlayPause();
            return;
        }
        currentTrackRef.current = track;
        pendingTrackRef.current = track;
        setCurrentTrack(track);
        setProgress(0);
        setCurrentTime('0:00');
        setIsPlaying(false);
        setPlayerError(null);
        if (!ytReady || !ytPlayerRef.current) return;
        pendingTrackRef.current = null;
        ytPlayerRef.current?.loadVideoById(track.youtubeId);
    }, [ytReady]);

    const togglePlayPause = useCallback(() => {
        if (!currentTrackRef.current) return;
        if (!ytPlayerRef.current || !ytReady) {
            pendingTrackRef.current = currentTrackRef.current;
            return;
        }
        if (isPlaying) {
            ytPlayerRef.current.pauseVideo();
            setIsPlaying(false);
            return;
        }
        setPlayerError(null);
        ytPlayerRef.current.playVideo();
    }, [isPlaying, ytReady]);

    const playNext = useCallback(() => {
        if (!currentTrackRef.current) return;
        const list = filteredTracksRef.current.length > 0 ? filteredTracksRef.current : tracks;
        const currentIndex = list.findIndex(t => t.id === currentTrackRef.current!.id);
        let nextIndex: number;
        if (isShuffledRef.current) {
            do { nextIndex = Math.floor(Math.random() * list.length); }
            while (nextIndex === currentIndex && list.length > 1);
        } else {
            nextIndex = (currentIndex + 1) % list.length;
        }
        playTrack(list[nextIndex]);
    }, [playTrack]);

    const playPrevious = useCallback(() => {
        if (!currentTrackRef.current) return;
        const list = filteredTracksRef.current.length > 0 ? filteredTracksRef.current : tracks;
        const currentIndex = list.findIndex(t => t.id === currentTrackRef.current!.id);
        const prevIndex = currentIndex <= 0 ? list.length - 1 : currentIndex - 1;
        playTrack(list[prevIndex]);
    }, [playTrack]);

    const seekToPercent = useCallback((percent: number) => {
        if (!ytPlayerRef.current) return;
        const dur = ytPlayerRef.current.getDuration() ?? 0;
        if (dur > 0) ytPlayerRef.current.seekTo(percent * dur, true);
    }, []);

    const contextValue: MusicPlayerContextType = {
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
        ytPlayerRef,
        isHydrated,
        setCurrentTrack,
        setIsPlaying,
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
        seekToPercent
    };

    return (
        <MusicPlayerContext.Provider value={contextValue}>
            {/* Hidden YouTube player div */}
            <div id="global-yt-player" style={{ position: 'absolute', width: 1, height: 1, opacity: 0, pointerEvents: 'none' }} />
            {children}
        </MusicPlayerContext.Provider>
    );
}

export function useMusicPlayer() {
    const context = useContext(MusicPlayerContext);
    if (context === undefined) {
        throw new Error('useMusicPlayer must be used within a MusicPlayerProvider');
    }
    return context;
}
