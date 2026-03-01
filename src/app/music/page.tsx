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
    language: 'Hindi' | 'Kannada';
    era: '1980s' | '1990s' | '2000s' | '2010s' | 'Latest';
}

const tracks: Track[] = [
    // ── 1980s Hindi ──
    { id: 1, title: 'Ek Do Teen', artist: 'Tezaab', duration: '4:30', cover: '/gallery/promo-serenity.jpg', audioSrc: '/music/ek-do-teen.mp3', language: 'Hindi', era: '1980s' },
    { id: 2, title: 'Papa Kehte Hain', artist: 'Qayamat Se Qayamat Tak', duration: '5:02', cover: '/gallery/promo-elegance.jpg', audioSrc: '/music/papa-kehte-hain.mp3', language: 'Hindi', era: '1980s' },
    { id: 3, title: 'Hawa Hawai', artist: 'Mr. India', duration: '4:45', cover: '/bottle2.jpeg', audioSrc: '/music/hawa-hawai.mp3', language: 'Hindi', era: '1980s' },
    { id: 4, title: 'Tirchi Topiwale', artist: 'Tridev', duration: '5:15', cover: '/bottle3.jpeg', audioSrc: '/music/tirchi-topiwale.mp3', language: 'Hindi', era: '1980s' },
    { id: 5, title: 'Neele Neele Ambar Par', artist: 'Kalaakaar', duration: '5:38', cover: '/bottle4.jpeg', audioSrc: '/music/neele-neele-ambar.mp3', language: 'Hindi', era: '1980s' },
    { id: 6, title: 'Jumma Chumma De De', artist: 'Hum', duration: '6:10', cover: '/gallery/promo-serenity.jpg', audioSrc: '/music/jumma-chumma.mp3', language: 'Hindi', era: '1980s' },
    { id: 7, title: 'Gazab Ka Hai Din', artist: 'Qayamat Se Qayamat Tak', duration: '4:55', cover: '/gallery/promo-elegance.jpg', audioSrc: '/music/gazab-ka-hai-din.mp3', language: 'Hindi', era: '1980s' },

    // ── 1980s Kannada ──
    { id: 8, title: 'Jotheyali Jothe Jotheyali', artist: 'Geetha', duration: '4:20', cover: '/bottle2.jpeg', audioSrc: '/music/jotheyali-jothe.mp3', language: 'Kannada', era: '1980s' },
    { id: 9, title: 'Baalu Belakayithu', artist: 'Haalu Jenu', duration: '4:35', cover: '/bottle3.jpeg', audioSrc: '/music/baalu-belakayithu.mp3', language: 'Kannada', era: '1980s' },
    { id: 10, title: 'Ganga Yamuna Sangama', artist: 'Anuraga Aralithu', duration: '3:58', cover: '/bottle4.jpeg', audioSrc: '/music/ganga-yamuna-sangama.mp3', language: 'Kannada', era: '1980s' },
    { id: 11, title: 'Kelade Nimageega', artist: 'Geetha', duration: '4:42', cover: '/gallery/promo-serenity.jpg', audioSrc: '/music/kelade-nimageega.mp3', language: 'Kannada', era: '1980s' },
    { id: 12, title: 'Nammoora Mandara Hoove', artist: 'Aalemane', duration: '5:10', cover: '/gallery/promo-elegance.jpg', audioSrc: '/music/nammoora-mandara-hoove.mp3', language: 'Kannada', era: '1980s' },
    { id: 13, title: 'Olume Siriya', artist: 'Bangarada Jinke', duration: '4:48', cover: '/bottle2.jpeg', audioSrc: '/music/olume-siriya.mp3', language: 'Kannada', era: '1980s' },
    { id: 14, title: 'Anupama Cheluvu', artist: 'Anupama', duration: '4:15', cover: '/bottle3.jpeg', audioSrc: '/music/anupama-cheluvu.mp3', language: 'Kannada', era: '1980s' },

    // ── 1990s Hindi ──
    { id: 15, title: 'Chaiyya Chaiyya', artist: 'Dil Se', duration: '6:23', cover: '/bottle4.jpeg', audioSrc: '/music/chaiyya-chaiyya.mp3', language: 'Hindi', era: '1990s' },
    { id: 16, title: 'Pehla Nasha', artist: 'Jo Jeeta Wohi Sikandar', duration: '5:12', cover: '/gallery/promo-serenity.jpg', audioSrc: '/music/pehla-nasha.mp3', language: 'Hindi', era: '1990s' },
    { id: 17, title: 'Tujhe Dekha To', artist: 'DDLJ', duration: '5:45', cover: '/gallery/promo-elegance.jpg', audioSrc: '/music/tujhe-dekha-to.mp3', language: 'Hindi', era: '1990s' },
    { id: 18, title: 'Chunnari Chunnari', artist: 'Biwi No. 1', duration: '5:30', cover: '/bottle2.jpeg', audioSrc: '/music/chunnari-chunnari.mp3', language: 'Hindi', era: '1990s' },
    { id: 19, title: 'O O Jaane Jaana', artist: 'Pyar Kiya Toh Darna Kya', duration: '5:08', cover: '/bottle3.jpeg', audioSrc: '/music/o-jaane-jaana.mp3', language: 'Hindi', era: '1990s' },
    { id: 20, title: 'Didi Tera Devar Deewana', artist: 'Hum Aapke Hain Koun', duration: '4:55', cover: '/bottle4.jpeg', audioSrc: '/music/didi-tera-devar.mp3', language: 'Hindi', era: '1990s' },
    { id: 21, title: 'Bole Chudiyan', artist: 'Kabhi Khushi Kabhie Gham', duration: '5:18', cover: '/gallery/promo-serenity.jpg', audioSrc: '/music/bole-chudiyan.mp3', language: 'Hindi', era: '1990s' },

    // ── 1990s Kannada ──
    { id: 22, title: 'Haayaada Ee Sanje', artist: 'Vasantha Geetha', duration: '5:10', cover: '/gallery/promo-elegance.jpg', audioSrc: '/music/haayaada-ee-sanje.mp3', language: 'Kannada', era: '1990s' },
    { id: 23, title: 'Huttidare Kannada', artist: 'Akasmika', duration: '4:48', cover: '/bottle2.jpeg', audioSrc: '/music/huttidare-kannada.mp3', language: 'Kannada', era: '1990s' },
    { id: 24, title: 'Janumada Jodi', artist: 'Janumada Jodi', duration: '4:22', cover: '/bottle3.jpeg', audioSrc: '/music/janumada-jodi.mp3', language: 'Kannada', era: '1990s' },
    { id: 25, title: 'Nooru Janmaku', artist: 'America America', duration: '4:05', cover: '/bottle4.jpeg', audioSrc: '/music/nooru-janmaku.mp3', language: 'Kannada', era: '1990s' },
    { id: 26, title: 'Ninna Nodalentho', artist: 'Mussanje Maathu', duration: '4:38', cover: '/gallery/promo-serenity.jpg', audioSrc: '/music/ninna-nodalentho.mp3', language: 'Kannada', era: '1990s' },
    { id: 27, title: 'Nalivaa Gulaabi Hoove', artist: 'Auto Raja', duration: '3:55', cover: '/gallery/promo-elegance.jpg', audioSrc: '/music/nalivaa-gulaabi-hoove.mp3', language: 'Kannada', era: '1990s' },
    { id: 28, title: 'Prema Chandrama', artist: 'Yajamana', duration: '4:30', cover: '/bottle2.jpeg', audioSrc: '/music/prema-chandrama.mp3', language: 'Kannada', era: '1990s' },

    // ── 2000s Hindi ──
    { id: 29, title: 'Kal Ho Naa Ho', artist: 'Kal Ho Naa Ho', duration: '5:19', cover: '/bottle3.jpeg', audioSrc: '/music/kal-ho-naa-ho.mp3', language: 'Hindi', era: '2000s' },
    { id: 30, title: 'Kajra Re', artist: 'Bunty Aur Babli', duration: '5:42', cover: '/bottle4.jpeg', audioSrc: '/music/kajra-re.mp3', language: 'Hindi', era: '2000s' },
    { id: 31, title: 'Tum Ko Dekha To', artist: 'Jagjit Singh', duration: '5:55', cover: '/gallery/promo-serenity.jpg', audioSrc: '/music/tum-ko-dekha-to.mp3', language: 'Hindi', era: '2000s' },
    { id: 32, title: 'Mauja Hi Mauja', artist: 'Jab We Met', duration: '5:28', cover: '/gallery/promo-elegance.jpg', audioSrc: '/music/mauja-hi-mauja.mp3', language: 'Hindi', era: '2000s' },
    { id: 33, title: 'Desi Girl', artist: 'Dostana', duration: '4:15', cover: '/bottle2.jpeg', audioSrc: '/music/desi-girl.mp3', language: 'Hindi', era: '2000s' },
    { id: 34, title: 'Pehli Nazar Mein', artist: 'Race', duration: '5:05', cover: '/bottle3.jpeg', audioSrc: '/music/pehli-nazar-mein.mp3', language: 'Hindi', era: '2000s' },
    { id: 35, title: 'Teri Ore', artist: 'Singh Is Kinng', duration: '5:32', cover: '/bottle4.jpeg', audioSrc: '/music/teri-ore.mp3', language: 'Hindi', era: '2000s' },

    // ── 2000s Kannada ──
    { id: 36, title: 'Yaare Nee Devatheya', artist: 'Ambari', duration: '4:35', cover: '/gallery/promo-serenity.jpg', audioSrc: '/music/yaare-nee-devatheya.mp3', language: 'Kannada', era: '2000s' },
    { id: 37, title: 'Minchagi Neenu Baralu', artist: 'Gaalipata', duration: '4:12', cover: '/gallery/promo-elegance.jpg', audioSrc: '/music/minchagi-neenu.mp3', language: 'Kannada', era: '2000s' },
    { id: 38, title: 'Anisuthide', artist: 'Mungaru Male', duration: '4:48', cover: '/bottle2.jpeg', audioSrc: '/music/anisuthide.mp3', language: 'Kannada', era: '2000s' },
    { id: 39, title: 'Mungaru Maleye', artist: 'Mungaru Male', duration: '3:58', cover: '/bottle3.jpeg', audioSrc: '/music/mungaru-maleye.mp3', language: 'Kannada', era: '2000s' },
    { id: 40, title: 'Onde Ondu Saari', artist: 'Mungaru Male', duration: '4:22', cover: '/bottle4.jpeg', audioSrc: '/music/onde-ondu-saari.mp3', language: 'Kannada', era: '2000s' },
    { id: 41, title: 'Open Hairu Bitkondu', artist: 'Adhyaksha', duration: '4:10', cover: '/gallery/promo-serenity.jpg', audioSrc: '/music/open-hairu.mp3', language: 'Kannada', era: '2000s' },
    { id: 42, title: 'Paravashanadenu', artist: 'Paramathma', duration: '4:28', cover: '/gallery/promo-elegance.jpg', audioSrc: '/music/paravashanadenu.mp3', language: 'Kannada', era: '2000s' },

    // ── 2010s Hindi ──
    { id: 43, title: 'Tum Hi Ho', artist: 'Aashiqui 2', duration: '4:22', cover: '/bottle2.jpeg', audioSrc: '/music/tum-hi-ho.mp3', language: 'Hindi', era: '2010s' },
    { id: 44, title: 'Kabira', artist: 'Yeh Jawaani Hai Deewani', duration: '4:50', cover: '/bottle3.jpeg', audioSrc: '/music/kabira.mp3', language: 'Hindi', era: '2010s' },
    { id: 45, title: 'Zaalima', artist: 'Raees', duration: '4:32', cover: '/bottle4.jpeg', audioSrc: '/music/zaalima.mp3', language: 'Hindi', era: '2010s' },
    { id: 46, title: 'Nashe Si Chadh Gayi', artist: 'Befikre', duration: '3:55', cover: '/gallery/promo-serenity.jpg', audioSrc: '/music/nashe-si-chadh-gayi.mp3', language: 'Hindi', era: '2010s' },
    { id: 47, title: 'Dil Diyan Gallan', artist: 'Tiger Zinda Hai', duration: '4:48', cover: '/gallery/promo-elegance.jpg', audioSrc: '/music/dil-diyan-gallan.mp3', language: 'Hindi', era: '2010s' },
    { id: 48, title: 'Humsafar', artist: 'Badrinath Ki Dulhania', duration: '5:12', cover: '/bottle2.jpeg', audioSrc: '/music/humsafar.mp3', language: 'Hindi', era: '2010s' },
    { id: 49, title: 'Swag Se Swagat', artist: 'Tiger Zinda Hai', duration: '3:28', cover: '/bottle3.jpeg', audioSrc: '/music/swag-se-swagat.mp3', language: 'Hindi', era: '2010s' },

    // ── 2010s Kannada ──
    { id: 50, title: 'Belageddu', artist: 'Kirik Party', duration: '4:12', cover: '/bottle4.jpeg', audioSrc: '/music/belageddu.mp3', language: 'Kannada', era: '2010s' },
    { id: 51, title: 'Chuttu Chuttu', artist: 'Raambo 2', duration: '3:45', cover: '/gallery/promo-serenity.jpg', audioSrc: '/music/chuttu-chuttu.mp3', language: 'Kannada', era: '2010s' },
    { id: 52, title: 'Bombe Helutaithe', artist: 'Raajakumara', duration: '4:30', cover: '/gallery/promo-elegance.jpg', audioSrc: '/music/bombe-helutaithe.mp3', language: 'Kannada', era: '2010s' },
    { id: 53, title: 'Mungaru Maleyalli', artist: 'Andondittu Kaala', duration: '3:58', cover: '/bottle2.jpeg', audioSrc: '/music/mungaru-maleyalli.mp3', language: 'Kannada', era: '2010s' },
    { id: 54, title: 'Geleya Ennale', artist: 'Mass Leader', duration: '4:15', cover: '/bottle3.jpeg', audioSrc: '/music/geleya-ennale.mp3', language: 'Kannada', era: '2010s' },
    { id: 55, title: 'Sanju Mathu Geetha', artist: 'Sanju Weds Geetha', duration: '4:42', cover: '/bottle4.jpeg', audioSrc: '/music/sanju-mathu-geetha.mp3', language: 'Kannada', era: '2010s' },
    { id: 56, title: 'Naane Neenanthe', artist: 'BRAT', duration: '5:10', cover: '/gallery/promo-serenity.jpg', audioSrc: '/music/naane-neenanthe.mp3', language: 'Kannada', era: '2010s' },

    // ── Latest (2020s) Hindi ──
    { id: 57, title: 'Akhiyaan Gulaab', artist: 'Teri Baaton Mein Aisa Uljha Jiya', duration: '4:28', cover: '/gallery/promo-elegance.jpg', audioSrc: '/music/akhiyaan-gulaab.mp3', language: 'Hindi', era: 'Latest' },
    { id: 58, title: 'Satyanaas', artist: 'Chandu Champion', duration: '3:55', cover: '/bottle2.jpeg', audioSrc: '/music/satyanaas.mp3', language: 'Hindi', era: 'Latest' },
    { id: 59, title: 'Tauba Tauba', artist: 'Bad Newz', duration: '3:42', cover: '/bottle3.jpeg', audioSrc: '/music/tauba-tauba.mp3', language: 'Hindi', era: 'Latest' },
    { id: 60, title: 'Vaada Hai', artist: "O'Romeo", duration: '4:15', cover: '/bottle4.jpeg', audioSrc: '/music/vaada-hai.mp3', language: 'Hindi', era: 'Latest' },
    { id: 61, title: 'Zinda Banda', artist: 'Jawan', duration: '3:18', cover: '/gallery/promo-serenity.jpg', audioSrc: '/music/zinda-banda.mp3', language: 'Hindi', era: 'Latest' },
    { id: 62, title: 'Main Hoon', artist: 'Battle Of Galwan', duration: '4:05', cover: '/gallery/promo-elegance.jpg', audioSrc: '/music/main-hoon.mp3', language: 'Hindi', era: 'Latest' },
    { id: 63, title: 'Gali Gali', artist: 'KGF', duration: '3:32', cover: '/bottle2.jpeg', audioSrc: '/music/gali-gali.mp3', language: 'Hindi', era: 'Latest' },

    // ── Latest (2020s) Kannada ──
    { id: 64, title: 'Salaam Rocky Bhai', artist: 'KGF Chapter 1', duration: '3:48', cover: '/bottle3.jpeg', audioSrc: '/music/salaam-rocky-bhai.mp3', language: 'Kannada', era: 'Latest' },
    { id: 65, title: 'Dheera Dheera', artist: 'KGF', duration: '4:22', cover: '/bottle4.jpeg', audioSrc: '/music/dheera-dheera.mp3', language: 'Kannada', era: 'Latest' },
    { id: 66, title: 'Idre Nemdiyaag Irbek', artist: 'The Devil', duration: '4:55', cover: '/gallery/promo-serenity.jpg', audioSrc: '/music/idre-nemdiyaag.mp3', language: 'Kannada', era: 'Latest' },
    { id: 67, title: 'Bangle Bangari', artist: 'EKKA', duration: '5:08', cover: '/gallery/promo-elegance.jpg', audioSrc: '/music/bangle-bangari.mp3', language: 'Kannada', era: 'Latest' },
    { id: 68, title: 'Ayyo Sivane', artist: 'Cult', duration: '4:15', cover: '/bottle2.jpeg', audioSrc: '/music/ayyo-sivane.mp3', language: 'Kannada', era: 'Latest' },
    { id: 69, title: 'Shiva Shiva', artist: 'KD', duration: '3:42', cover: '/bottle3.jpeg', audioSrc: '/music/shiva-shiva.mp3', language: 'Kannada', era: 'Latest' },
    { id: 70, title: 'Bole Chudiyan', artist: 'K3G', duration: '4:30', cover: '/bottle4.jpeg', audioSrc: '/music/bole-chudiyan-full.mp3', language: 'Hindi', era: '2000s' },
];

const eras = ['1980s', '1990s', '2000s', '2010s', 'Latest'] as const;

export default function MusicPage() {
    const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [currentTime, setCurrentTime] = useState('0:00');
    const [volume, setVolume] = useState(0.7);
    const [isShuffled, setIsShuffled] = useState(false);
    const [isRepeating, setIsRepeating] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState<'All' | 'Hindi' | 'Kannada'>('All');
    const [selectedEra, setSelectedEra] = useState<string>('All');
    const audioRef = useRef<HTMLAudioElement>(null);
    const progressBarRef = useRef<HTMLDivElement>(null);

    const filteredTracks = tracks.filter(t => {
        const langMatch = selectedLanguage === 'All' || t.language === selectedLanguage;
        const eraMatch = selectedEra === 'All' || t.era === selectedEra;
        return langMatch && eraMatch;
    });

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
        const list = filteredTracks.length > 0 ? filteredTracks : tracks;
        const currentIndex = list.findIndex(t => t.id === currentTrack.id);
        let nextIndex: number;

        if (isShuffled) {
            do {
                nextIndex = Math.floor(Math.random() * list.length);
            } while (nextIndex === currentIndex && list.length > 1);
        } else {
            nextIndex = (currentIndex + 1) % list.length;
        }

        playTrack(list[nextIndex]);
    };

    const playPrevious = () => {
        if (!currentTrack) return;
        const list = filteredTracks.length > 0 ? filteredTracks : tracks;
        const currentIndex = list.findIndex(t => t.id === currentTrack.id);
        const prevIndex = currentIndex <= 0 ? list.length - 1 : currentIndex - 1;
        playTrack(list[prevIndex]);
    };

    const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!progressBarRef.current || !audioRef.current) return;
        const rect = progressBarRef.current.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        audioRef.current.currentTime = percent * audioRef.current.duration;
    };

    return (
        <div className="relative flex min-h-screen w-full flex-col">
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

                {/* Filters */}
                <section className="w-full max-w-[1200px] px-4 md:px-8 pb-8">
                    <div className="glass-panel rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                        {/* Language Filter */}
                        <div className="flex items-center gap-2">
                            <span className="text-gray-500 text-xs font-bold uppercase tracking-wider mr-1">Language</span>
                            {(['All', 'Hindi', 'Kannada'] as const).map(lang => (
                                <button
                                    key={lang}
                                    onClick={() => { setSelectedLanguage(lang); setSelectedEra('All'); }}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${selectedLanguage === lang
                                        ? 'bg-[#00C853] text-white shadow-[0_0_15px_rgba(0,200,83,0.4)]'
                                        : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10'
                                        }`}
                                >
                                    {lang}
                                </button>
                            ))}
                        </div>

                        {/* Divider */}
                        <div className="hidden sm:block w-px h-8 bg-white/10" />

                        {/* Era Dropdown */}
                        <div className="flex items-center gap-2">
                            <span className="text-gray-500 text-xs font-bold uppercase tracking-wider mr-1">Era</span>
                            <select
                                value={selectedEra}
                                onChange={(e) => setSelectedEra(e.target.value)}
                                className="bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm text-white font-medium appearance-none cursor-pointer outline-none focus:ring-2 focus:ring-[#00C853] transition-all pr-8"
                                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='%23999' viewBox='0 0 16 16'%3E%3Cpath d='M8 11L3 6h10z'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center' }}
                            >
                                <option value="All" className="bg-[#2d2d2d]">All Decades</option>
                                {eras.map(era => (
                                    <option key={era} value={era} className="bg-[#2d2d2d]">{era}</option>
                                ))}
                            </select>
                        </div>

                        {/* Track Count */}
                        <div className="sm:ml-auto">
                            <span className="text-gray-500 text-xs font-mono">{filteredTracks.length} tracks</span>
                        </div>
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
                                                    <div className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center">
                                                        <svg className="w-6 h-6 text-white/80" fill="currentColor" viewBox="0 0 24 24">
                                                            <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Language Badge */}
                                            <div className="absolute top-3 left-3 px-2 py-1 rounded-full bg-black/60 backdrop-blur-sm text-[10px] font-bold text-[#00C853] uppercase tracking-wider">
                                                {currentTrack.language} · {currentTrack.era}
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
                                <span className="text-gray-500 text-sm">{filteredTracks.length} tracks</span>
                            </div>

                            <div className="space-y-3">
                                {filteredTracks.map((track, index) => (
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
                                        <div className="relative w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 bg-white/5 flex items-center justify-center">
                                            <svg className="w-6 h-6 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                                            </svg>
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <h3 className={`font-medium truncate ${currentTrack?.id === track.id ? 'text-[#00C853]' : 'text-white'
                                                }`}>
                                                {track.title}
                                            </h3>
                                            <p className="text-gray-500 text-sm truncate">{track.artist}</p>
                                        </div>

                                        {/* Language/Era Tag */}
                                        <span className="hidden sm:inline-block text-[10px] font-bold uppercase tracking-wider text-gray-500 bg-white/5 px-2 py-1 rounded-full">
                                            {track.language} · {track.era}
                                        </span>

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
