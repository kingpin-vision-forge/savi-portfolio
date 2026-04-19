'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// YouTube IFrame API type declarations
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

interface Track {
    id: number;
    title: string;
    artist: string;
    duration: string;
    cover: string;
    youtubeId: string; // 11-char YouTube video ID (from youtube.com/watch?v=XXXXXXXXXXX)
    language: 'Hindi' | 'Kannada';
    era: '1980s' | '1990s' | '2000s' | '2010s' | 'Latest';
}

// YouTube IDs sourced from official label uploads.
// To verify or replace: search the song on YouTube → copy the 11-char ID from the URL.
const tracks: Track[] = [
    // ── 1980s Hindi ──
    { id: 1,   title: 'Ek Do Teen',                     artist: 'Tezaab',                         duration: '4:30', cover: '/gallery/promo-serenity.jpg', youtubeId: 'A7x-ZzozsMg', language: 'Hindi',   era: '1980s' },
    { id: 2,   title: 'Papa Kehte Hain',                artist: 'Qayamat Se Qayamat Tak',         duration: '5:02', cover: '/gallery/promo-elegance.jpg', youtubeId: 'E8ytXrzkTNs', language: 'Hindi',   era: '1980s' },
    { id: 3,   title: 'Hawa Hawai',                     artist: 'Mr. India',                      duration: '4:45', cover: '/bottle2.jpeg',               youtubeId: '-8QTG6c6GLk', language: 'Hindi',   era: '1980s' },
    { id: 4,   title: 'Tirchi Topiwale',                artist: 'Tridev',                         duration: '5:15', cover: '/bottle3.jpeg',               youtubeId: 'eYl9i8mH1lI', language: 'Hindi',   era: '1980s' },
    { id: 5,   title: 'Neele Neele Ambar Par',          artist: 'Kalaakaar',                      duration: '5:38', cover: '/bottle4.jpeg',               youtubeId: 'eVnG_Rqfgg4', language: 'Hindi',   era: '1980s' },
    { id: 6,   title: 'Gazab Ka Hai Din',               artist: 'Qayamat Se Qayamat Tak',         duration: '4:55', cover: '/gallery/promo-elegance.jpg', youtubeId: 'DNZAtorsGZM', language: 'Hindi',   era: '1980s' },
    { id: 70,  title: 'Aaj Kal Tere Mere Pyaar Ke Charche', artist: 'Brahmachari',               duration: '4:32', cover: '/bottle3.jpeg',               youtubeId: 'ulEiyaxHx4s', language: 'Hindi',   era: '1980s' },
    { id: 71,  title: 'Dekha Ek Khwab',                 artist: 'Silsila',                        duration: '5:10', cover: '/bottle4.jpeg',               youtubeId: 'qJy5GFoQSPg', language: 'Hindi',   era: '1980s' },
    { id: 72,  title: 'Saiyaara',                       artist: 'Ek Duuje Ke Liye',               duration: '4:48', cover: '/gallery/promo-serenity.jpg', youtubeId: 'ndrOODw8cmg', language: 'Hindi',   era: '1980s' },
    { id: 73,  title: 'Tu Tu Hai Wahi',                 artist: 'Yeh Vaada Raha',                 duration: '4:20', cover: '/gallery/promo-elegance.jpg', youtubeId: 'XFYBij-Vwvo', language: 'Hindi',   era: '1980s' },
    { id: 74,  title: 'Zindagi Pyar Ka Geet Hai',       artist: 'Souten',                         duration: '4:55', cover: '/bottle2.jpeg',               youtubeId: 'Ws82XjyTXE0', language: 'Hindi',   era: '1980s' },
    { id: 75,  title: 'Pal Pal Dil Ke Paas',            artist: 'Blackmail',                      duration: '4:38', cover: '/bottle3.jpeg',               youtubeId: 'Vabo2KVaEwA', language: 'Hindi',   era: '1980s' },

    // ── 1980s Kannada ──
    { id: 7,   title: 'Jotheyali Jothe Jotheyali',      artist: 'Geetha',                         duration: '4:20', cover: '/bottle2.jpeg',               youtubeId: '5ABB10YBeSE', language: 'Kannada', era: '1980s' },
    { id: 8,   title: 'Baalu Belakayithu',              artist: 'Haalu Jenu',                     duration: '4:35', cover: '/bottle3.jpeg',               youtubeId: 'NQBDlUbHCNs', language: 'Kannada', era: '1980s' },
    { id: 9,   title: 'Ganga Yamuna Sangama',           artist: 'Anuraga Aralithu',               duration: '3:58', cover: '/bottle4.jpeg',               youtubeId: 'GLJ4pjJldp0', language: 'Kannada', era: '1980s' },
    { id: 10,  title: 'Kelade Nimageega',               artist: 'Geetha',                         duration: '4:42', cover: '/gallery/promo-serenity.jpg', youtubeId: 'Hbu5vMjqXLs', language: 'Kannada', era: '1980s' },
    { id: 11,  title: 'Nammoora Mandara Hoove',         artist: 'Aalemane',                       duration: '5:10', cover: '/gallery/promo-elegance.jpg', youtubeId: 'tEAvA9SNJ4Y', language: 'Kannada', era: '1980s' },
    { id: 12,  title: 'Olume Siriya',                   artist: 'Bangarada Jinke',                duration: '4:48', cover: '/bottle2.jpeg',               youtubeId: 'ckTZmTvXm8o', language: 'Kannada', era: '1980s' },
    { id: 13,  title: 'Anupama Cheluvu',                artist: 'Anupama',                        duration: '4:15', cover: '/bottle3.jpeg',               youtubeId: 'JER4prFqxSg', language: 'Kannada', era: '1980s' },
    { id: 14,  title: 'Haayaada Ee Sanje',              artist: 'Vasantha Geetha',                duration: '5:10', cover: '/gallery/promo-elegance.jpg', youtubeId: 'cMwrjbUhK5s', language: 'Kannada', era: '1980s' },
    { id: 15,  title: 'Huttidare Kannada',              artist: 'Akasmika',                       duration: '4:48', cover: '/bottle2.jpeg',               youtubeId: 'jNoaf88ecok', language: 'Kannada', era: '1980s' },
    { id: 100, title: 'Baanigondu Elle Ellide',         artist: 'Premada Kanike',                 duration: '4:25', cover: '/bottle4.jpeg',               youtubeId: 'eDNu8x8su48', language: 'Kannada', era: '1980s' },
    { id: 101, title: 'Endendu Ninnanu Marethu',        artist: 'Eradu Kanasu',                   duration: '4:42', cover: '/gallery/promo-serenity.jpg', youtubeId: '-knlhwCL9zY', language: 'Kannada', era: '1980s' },
    { id: 102, title: 'Hoovu Cheluvella',               artist: 'Kalpana',                        duration: '4:15', cover: '/gallery/promo-elegance.jpg', youtubeId: 'zCFGMTSVf8I', language: 'Kannada', era: '1980s' },
    { id: 103, title: 'Hrudaya Rangoli',                artist: 'Pallavi Anupallavi',             duration: '4:50', cover: '/bottle3.jpeg',               youtubeId: 'qy6Sa3S9lMo', language: 'Kannada', era: '1980s' },
    { id: 104, title: 'Kanasalu Neene Manasalu Neene',  artist: 'Bayalu Dari',                    duration: '4:30', cover: '/bottle4.jpeg',               youtubeId: '8j_KyfTRA1A', language: 'Kannada', era: '1980s' },
    { id: 105, title: 'Kannalli Yeno Minchondu',        artist: 'Vasantha Geetha',                duration: '4:18', cover: '/gallery/promo-serenity.jpg', youtubeId: 'hqKDzfVwrGY', language: 'Kannada', era: '1980s' },
    { id: 106, title: 'Kasturi Nivasa',                 artist: 'Kasturi Nivasa',                 duration: '4:55', cover: '/gallery/promo-elegance.jpg', youtubeId: 'nDf1nX9xJ1Y', language: 'Kannada', era: '1980s' },
    { id: 107, title: 'Nagu Endide',                    artist: 'Pallavi Anupallavi',             duration: '4:10', cover: '/bottle2.jpeg',               youtubeId: '5RuMpVFPMHQ', language: 'Kannada', era: '1980s' },
    { id: 108, title: 'Naguva Nayana',                  artist: 'Pallavi Anupallavi',             duration: '4:38', cover: '/bottle3.jpeg',               youtubeId: '7nv55Kl5ldA', language: 'Kannada', era: '1980s' },
    { id: 109, title: 'O Priyathama',                   artist: 'Kaviratna Kalidasa',             duration: '4:45', cover: '/bottle4.jpeg',               youtubeId: 'TbMq3T5ji2w', language: 'Kannada', era: '1980s' },
    { id: 110, title: 'Premadalli Snehadalli',          artist: 'Ranganayaki',                    duration: '4:22', cover: '/gallery/promo-serenity.jpg', youtubeId: 'SMkoYwFeP_0', language: 'Kannada', era: '1980s' },

    // ── 1990s Hindi ──
    { id: 16,  title: 'Chaiyya Chaiyya',                artist: 'Dil Se',                         duration: '6:23', cover: '/bottle4.jpeg',               youtubeId: 'i9A9NuTHUag', language: 'Hindi',   era: '1990s' },
    { id: 17,  title: 'Pehla Nasha',                    artist: 'Jo Jeeta Wohi Sikandar',         duration: '5:12', cover: '/gallery/promo-serenity.jpg', youtubeId: 'Ki41AKu0iHc', language: 'Hindi',   era: '1990s' },
    { id: 18,  title: 'Tujhe Dekha To',                 artist: 'DDLJ',                           duration: '5:45', cover: '/gallery/promo-elegance.jpg', youtubeId: 'A-TsKDZPnJs', language: 'Hindi',   era: '1990s' },
    { id: 19,  title: 'Chunnari Chunnari',              artist: 'Biwi No. 1',                     duration: '5:30', cover: '/bottle2.jpeg',               youtubeId: 'dRLwMAGMJnQ', language: 'Hindi',   era: '1990s' },
    { id: 20,  title: 'O O Jaane Jaana',                artist: 'Pyar Kiya Toh Darna Kya',        duration: '5:08', cover: '/bottle3.jpeg',               youtubeId: '9SE6B0h-4-Q', language: 'Hindi',   era: '1990s' },
    { id: 21,  title: 'Didi Tera Devar Deewana',        artist: 'Hum Aapke Hain Koun',            duration: '4:55', cover: '/bottle4.jpeg',               youtubeId: 'hTnJzM7BSR0', language: 'Hindi',   era: '1990s' },
    { id: 22,  title: 'Jumma Chumma De De',             artist: 'Hum',                            duration: '6:10', cover: '/gallery/promo-serenity.jpg', youtubeId: 'ijGumwamEQU', language: 'Hindi',   era: '1990s' },
    { id: 76,  title: 'Aye Ajnabi',                     artist: 'Dil Se',                         duration: '4:55', cover: '/gallery/promo-elegance.jpg', youtubeId: 'TdUu05Svkl8', language: 'Hindi',   era: '1990s' },
    { id: 77,  title: 'Dil To Pagal Hai',               artist: 'Dil To Pagal Hai',               duration: '5:18', cover: '/bottle2.jpeg',               youtubeId: 'QPXRP61ZgxA', language: 'Hindi',   era: '1990s' },
    { id: 78,  title: 'Main Duniya Bhula Doonga',       artist: 'Aashiqui',                       duration: '5:02', cover: '/bottle3.jpeg',               youtubeId: 'otQmzlm-s7Q', language: 'Hindi',   era: '1990s' },
    { id: 79,  title: 'Mera Dil Bhi Kitna Pagal Hai',   artist: 'Saajan',                         duration: '4:45', cover: '/bottle4.jpeg',               youtubeId: 'FsNc7I33w60', language: 'Hindi',   era: '1990s' },
    { id: 80,  title: 'Tip Tip Barsa Paani',            artist: 'Mohra',                          duration: '4:28', cover: '/gallery/promo-serenity.jpg', youtubeId: 'BtlnpBb4O8E', language: 'Hindi',   era: '1990s' },
    { id: 81,  title: 'Tu Cheez Badi Hai Mast Mast',    artist: 'Mohra',                          duration: '4:35', cover: '/gallery/promo-elegance.jpg', youtubeId: 'ZrQS-ZtDy-o', language: 'Hindi',   era: '1990s' },

    // ── 1990s Kannada ──
    { id: 23,  title: 'Janumada Jodi',                  artist: 'Janumada Jodi',                  duration: '4:22', cover: '/bottle3.jpeg',               youtubeId: 'XDj4HYCCh3g', language: 'Kannada', era: '1990s' },
    { id: 24,  title: 'Nooru Janmaku',                  artist: 'America America',                duration: '4:05', cover: '/bottle4.jpeg',               youtubeId: 'm5mdnknNDyw', language: 'Kannada', era: '1990s' },
    { id: 25,  title: 'Ninna Nodalentho',               artist: 'Mussanje Maathu',                duration: '4:38', cover: '/gallery/promo-serenity.jpg', youtubeId: 'gTUqkF616yI', language: 'Kannada', era: '1990s' },
    { id: 26,  title: 'Nalivaa Gulaabi Hoove',          artist: 'Auto Raja',                      duration: '3:55', cover: '/gallery/promo-elegance.jpg', youtubeId: 'd8pMgz-w9x8', language: 'Kannada', era: '1990s' },
    { id: 27,  title: 'Prema Chandrama',                artist: 'Yajamana',                       duration: '4:30', cover: '/bottle2.jpeg',               youtubeId: '4Mgw_Qn2064', language: 'Kannada', era: '1990s' },
    { id: 111, title: 'Ee Bhoomi Bannada Buguri',       artist: 'Mahakshatriya',                  duration: '4:35', cover: '/bottle3.jpeg',               youtubeId: 'MmwuWX_Fv3E', language: 'Kannada', era: '1990s' },
    { id: 112, title: 'Manase Baduku',                  artist: 'Amruthavarshini',                duration: '4:18', cover: '/bottle4.jpeg',               youtubeId: 'ocFVVzcMIfc', language: 'Kannada', era: '1990s' },
    { id: 113, title: 'O Mallige Ninnondige',           artist: 'Anuraga Sangama',                duration: '4:42', cover: '/gallery/promo-serenity.jpg', youtubeId: 'gnaXl1zJr0c', language: 'Kannada', era: '1990s' },
    { id: 114, title: 'Yaarige Beku',                   artist: 'Sipayi',                         duration: '4:50', cover: '/gallery/promo-elegance.jpg', youtubeId: 'LpLn6K7IBvg', language: 'Kannada', era: '1990s' },
    { id: 115, title: 'Yaava Mohana Murali',            artist: 'America America',                duration: '4:22', cover: '/bottle2.jpeg',               youtubeId: 'g3Nbx1u_70o', language: 'Kannada', era: '1990s' },

    // ── 2000s Hindi ──
    { id: 28,  title: 'Bole Chudiyan',                  artist: 'Kabhi Khushi Kabhie Gham',       duration: '5:18', cover: '/gallery/promo-serenity.jpg', youtubeId: 'cfi2Trletjw', language: 'Hindi',   era: '2000s' },
    { id: 29,  title: 'Kal Ho Naa Ho',                  artist: 'Kal Ho Naa Ho',                  duration: '5:19', cover: '/bottle3.jpeg',               youtubeId: 'fyJvsb2cQy8', language: 'Hindi',   era: '2000s' },
    { id: 30,  title: 'Kajra Re',                       artist: 'Bunty Aur Babli',                duration: '5:42', cover: '/bottle4.jpeg',               youtubeId: 'nmy5A7fo0g4', language: 'Hindi',   era: '2000s' },
    { id: 31,  title: 'Tum Ko Dekha To',                artist: 'Jagjit Singh',                   duration: '5:55', cover: '/gallery/promo-serenity.jpg', youtubeId: 'WtPbNKk9XpU', language: 'Hindi',   era: '2000s' },
    { id: 32,  title: 'Mauja Hi Mauja',                 artist: 'Jab We Met',                     duration: '5:28', cover: '/gallery/promo-elegance.jpg', youtubeId: 'aPHsp9X2mBE', language: 'Hindi',   era: '2000s' },
    { id: 33,  title: 'Desi Girl',                      artist: 'Dostana',                        duration: '4:15', cover: '/bottle2.jpeg',               youtubeId: '28Zsch1QjPI', language: 'Hindi',   era: '2000s' },
    { id: 34,  title: 'Pehli Nazar Mein',               artist: 'Race',                           duration: '5:05', cover: '/bottle3.jpeg',               youtubeId: 'lQD5iaGmzX0', language: 'Hindi',   era: '2000s' },
    { id: 35,  title: 'Teri Ore',                       artist: 'Singh Is Kinng',                 duration: '5:32', cover: '/bottle4.jpeg',               youtubeId: '5ldRVSQ3JmE', language: 'Hindi',   era: '2000s' },
    { id: 82,  title: 'Agar Tum Mil Jao',               artist: 'Zeher',                          duration: '4:28', cover: '/gallery/promo-serenity.jpg', youtubeId: 'olTVf-fKfKw', language: 'Hindi',   era: '2000s' },
    { id: 83,  title: 'Dus Bahane',                     artist: 'Dus',                            duration: '4:45', cover: '/gallery/promo-elegance.jpg', youtubeId: 'mIWpsOjQNDw', language: 'Hindi',   era: '2000s' },
    { id: 84,  title: 'Jadu Hai Nasha Hai',             artist: 'Jism',                           duration: '5:05', cover: '/bottle2.jpeg',               youtubeId: 'T_MPeEX-aIs', language: 'Hindi',   era: '2000s' },
    { id: 85,  title: 'Mitwa',                          artist: 'Kabhi Alvida Naa Kehna',         duration: '5:22', cover: '/bottle3.jpeg',               youtubeId: 'XllMnMHdiLE', language: 'Hindi',   era: '2000s' },
    { id: 86,  title: 'Suraj Hua Maddham',              artist: 'Kabhi Khushi Kabhie Gham',       duration: '5:38', cover: '/bottle4.jpeg',               youtubeId: '4LqqQfMweuk', language: 'Hindi',   era: '2000s' },
    { id: 87,  title: 'Tere Naam',                      artist: 'Tere Naam',                      duration: '4:52', cover: '/gallery/promo-serenity.jpg', youtubeId: 'kN0_SKPjFVA', language: 'Hindi',   era: '2000s' },
    { id: 88,  title: 'Tum Se Hi',                      artist: 'Jab We Met',                     duration: '4:35', cover: '/gallery/promo-elegance.jpg', youtubeId: 'xo3ex0xDYVA', language: 'Hindi',   era: '2000s' },

    // ── 2000s Kannada ──
    { id: 36,  title: 'Yaare Nee Devatheya',            artist: 'Ambari',                         duration: '4:35', cover: '/gallery/promo-serenity.jpg', youtubeId: 'bF6wcqMxmOM', language: 'Kannada', era: '2000s' },
    { id: 37,  title: 'Minchagi Neenu Baralu',          artist: 'Gaalipata',                      duration: '4:12', cover: '/gallery/promo-elegance.jpg', youtubeId: 'cTYyAEvsOZs', language: 'Kannada', era: '2000s' },
    { id: 38,  title: 'Anisuthide',                     artist: 'Mungaru Male',                   duration: '4:48', cover: '/bottle2.jpeg',               youtubeId: 'V6XLCmxDoCE', language: 'Kannada', era: '2000s' },
    { id: 39,  title: 'Mungaru Maleye',                 artist: 'Mungaru Male',                   duration: '3:58', cover: '/bottle3.jpeg',               youtubeId: 'b04OqmvxFB8', language: 'Kannada', era: '2000s' },
    { id: 40,  title: 'Onde Ondu Saari',                artist: 'Mungaru Male',                   duration: '4:22', cover: '/bottle4.jpeg',               youtubeId: 'yshEznPQS54', language: 'Kannada', era: '2000s' },
    { id: 41,  title: 'Open Hairu Bitkondu',            artist: 'Adhyaksha',                      duration: '4:10', cover: '/gallery/promo-serenity.jpg', youtubeId: 'Elas5AL4nto', language: 'Kannada', era: '2000s' },
    { id: 42,  title: 'Paravashanadenu',                artist: 'Paramathma',                     duration: '4:28', cover: '/gallery/promo-elegance.jpg', youtubeId: 'n9oi-wlQD9Y', language: 'Kannada', era: '2000s' },
    { id: 116, title: 'Araluthiru',                     artist: 'Mungaru Male',                   duration: '4:15', cover: '/bottle2.jpeg',               youtubeId: 'CPR36NsEn2Q', language: 'Kannada', era: '2000s' },
    { id: 117, title: 'Banna Banna Elu Banna',          artist: 'Ee Bandhana',                    duration: '4:30', cover: '/bottle3.jpeg',               youtubeId: 'O8nsJOG7J9A', language: 'Kannada', era: '2000s' },
    { id: 118, title: 'Car Car Car',                    artist: 'Nanna Preethiya Hudugi',         duration: '3:58', cover: '/bottle4.jpeg',               youtubeId: 'lKxbApBiT_g', language: 'Kannada', era: '2000s' },
    { id: 119, title: 'Jothe Jotheyali',                artist: 'Vamshi',                         duration: '4:40', cover: '/gallery/promo-serenity.jpg', youtubeId: 'Mj8WDgtI_XE', language: 'Kannada', era: '2000s' },
    { id: 120, title: 'Kariya I Love You',              artist: 'Kariya',                         duration: '4:12', cover: '/gallery/promo-elegance.jpg', youtubeId: 'o4s5rDgmUo4', language: 'Kannada', era: '2000s' },
    { id: 121, title: 'Male Ninthu Hoda Mele',          artist: 'Milana',                         duration: '4:48', cover: '/bottle2.jpeg',               youtubeId: '3AwG5aM64uA', language: 'Kannada', era: '2000s' },
    { id: 122, title: 'Marali Mareyagi',                artist: 'Savari',                         duration: '4:22', cover: '/bottle3.jpeg',               youtubeId: 'uTOwN3UQzXs', language: 'Kannada', era: '2000s' },
    { id: 123, title: 'Innoo Anisutide',                artist: 'Neene Bari Neene',               duration: '4:35', cover: '/bottle4.jpeg',               youtubeId: 'dUwCF73n8rc', language: 'Kannada', era: '2000s' },
    { id: 124, title: 'Yenagali',                       artist: 'Mussanje Maathu',                duration: '4:18', cover: '/gallery/promo-serenity.jpg', youtubeId: 'ZFxTICyR1EE', language: 'Kannada', era: '2000s' },

    // ── 2010s Hindi ──
    { id: 43,  title: 'Tum Hi Ho',                      artist: 'Aashiqui 2',                     duration: '4:22', cover: '/bottle2.jpeg',               youtubeId: 'Umqb9KENgmk', language: 'Hindi',   era: '2010s' },
    { id: 44,  title: 'Kabira',                         artist: 'Yeh Jawaani Hai Deewani',        duration: '4:50', cover: '/bottle3.jpeg',               youtubeId: '7jZwAl0ArQw', language: 'Hindi',   era: '2010s' },
    { id: 45,  title: 'Zaalima',                        artist: 'Raees',                          duration: '4:32', cover: '/bottle4.jpeg',               youtubeId: 'YJZYLQhGQLg', language: 'Hindi',   era: '2010s' },
    { id: 46,  title: 'Nashe Si Chadh Gayi',            artist: 'Befikre',                        duration: '3:55', cover: '/gallery/promo-serenity.jpg', youtubeId: '_tEjIYtGBwc', language: 'Hindi',   era: '2010s' },
    { id: 47,  title: 'Dil Diyan Gallan',               artist: 'Tiger Zinda Hai',                duration: '4:48', cover: '/gallery/promo-elegance.jpg', youtubeId: 'POvFEQaK634', language: 'Hindi',   era: '2010s' },
    { id: 48,  title: 'Humsafar',                       artist: 'Badrinath Ki Dulhania',          duration: '5:12', cover: '/bottle2.jpeg',               youtubeId: 'tYgy4fF9iJA', language: 'Hindi',   era: '2010s' },
    { id: 49,  title: 'Swag Se Swagat',                 artist: 'Tiger Zinda Hai',                duration: '3:28', cover: '/bottle3.jpeg',               youtubeId: 'm7xDE8MMKcQ', language: 'Hindi',   era: '2010s' },
    { id: 50,  title: 'Gali Gali',                      artist: 'KGF',                            duration: '3:32', cover: '/bottle2.jpeg',               youtubeId: 'e9QFfGATfB8', language: 'Hindi',   era: '2010s' },
    { id: 89,  title: 'Agar Tum Saath Ho',              artist: 'Tamasha',                        duration: '5:30', cover: '/bottle3.jpeg',               youtubeId: 'dhY8jRNELUc', language: 'Hindi',   era: '2010s' },
    { id: 90,  title: 'Channa Mereya',                  artist: 'Ae Dil Hai Mushkil',             duration: '4:50', cover: '/bottle4.jpeg',               youtubeId: 'bzSTpdcs-EI', language: 'Hindi',   era: '2010s' },
    { id: 91,  title: 'Galliyan',                       artist: 'Ek Villain',                     duration: '4:22', cover: '/gallery/promo-serenity.jpg', youtubeId: 'PL8X5gq9ZlQ', language: 'Hindi',   era: '2010s' },
    { id: 92,  title: 'Raabta',                         artist: 'Agent Vinod',                    duration: '4:15', cover: '/gallery/promo-elegance.jpg', youtubeId: 'zlt38OOqwDc', language: 'Hindi',   era: '2010s' },

    // ── 2010s Kannada ──
    { id: 51,  title: 'Belageddu',                      artist: 'Kirik Party',                    duration: '4:12', cover: '/bottle4.jpeg',               youtubeId: 'McjQCtnQyZY', language: 'Kannada', era: '2010s' },
    { id: 52,  title: 'Chuttu Chuttu',                  artist: 'Raambo 2',                       duration: '3:45', cover: '/gallery/promo-serenity.jpg', youtubeId: 'IV8hEhZDT0s', language: 'Kannada', era: '2010s' },
    { id: 53,  title: 'Bombe Helutaithe',               artist: 'Raajakumara',                    duration: '4:30', cover: '/gallery/promo-elegance.jpg', youtubeId: 'vPSN5SIPKg0', language: 'Kannada', era: '2010s' },
    { id: 54,  title: 'Mungaru Maleyalli',              artist: 'Andondittu Kaala',               duration: '3:58', cover: '/bottle2.jpeg',               youtubeId: 'PMzTLWTWLZU', language: 'Kannada', era: '2010s' },
    { id: 55,  title: 'Geleya Ennale',                  artist: 'Mass Leader',                    duration: '4:15', cover: '/bottle3.jpeg',               youtubeId: 'aNHHZiqZrfc', language: 'Kannada', era: '2010s' },
    { id: 56,  title: 'Sanju Mathu Geetha',             artist: 'Sanju Weds Geetha',              duration: '4:42', cover: '/bottle4.jpeg',               youtubeId: 'RYi6nS8FOK4', language: 'Kannada', era: '2010s' },
    { id: 57,  title: 'Naane Neenanthe',                artist: 'BRAT',                           duration: '5:10', cover: '/gallery/promo-serenity.jpg', youtubeId: 'Ov0WLxomDs4', language: 'Kannada', era: '2010s' },
    { id: 58,  title: 'Salaam Rocky Bhai',              artist: 'KGF Chapter 1',                  duration: '3:48', cover: '/bottle3.jpeg',               youtubeId: 'L5eVKe4qOpg', language: 'Kannada', era: '2010s' },
    { id: 59,  title: 'Dheera Dheera',                  artist: 'KGF',                            duration: '4:22', cover: '/bottle4.jpeg',               youtubeId: 'G_9IJlbCEs4', language: 'Kannada', era: '2010s' },
    { id: 125, title: 'Karagida Baaninalli',            artist: 'Simple Agi Ondh Love Story',     duration: '4:28', cover: '/gallery/promo-serenity.jpg', youtubeId: 'rS5It5CO6c0', language: 'Kannada', era: '2010s' },
    { id: 126, title: 'Ninna Snehadinda',               artist: 'Mugulu Nage',                    duration: '4:15', cover: '/gallery/promo-elegance.jpg', youtubeId: '8nQpoTlqUcw', language: 'Kannada', era: '2010s' },
    { id: 127, title: 'Annthamma',                      artist: 'Mr & Mrs Ramachari',             duration: '4:05', cover: '/bottle2.jpeg',               youtubeId: 'pIYRm41WLBs', language: 'Kannada', era: '2010s' },
    { id: 128, title: 'Usire Usire',                    artist: 'Hebbuli',                        duration: '4:38', cover: '/bottle3.jpeg',               youtubeId: 'Ukk2pr5inBA', language: 'Kannada', era: '2010s' },

    // ── Latest (2020s) Hindi ──
    { id: 60,  title: 'Akhiyaan Gulaab',                artist: 'Teri Baaton Mein Aisa Uljha Jiya', duration: '4:28', cover: '/gallery/promo-elegance.jpg', youtubeId: 'f1h6NZYem0o', language: 'Hindi',   era: 'Latest' },
    { id: 61,  title: 'Satyanaas',                      artist: 'Chandu Champion',                duration: '3:55', cover: '/bottle2.jpeg',               youtubeId: 'sdXGPTpeba4', language: 'Hindi',   era: 'Latest' },
    { id: 62,  title: 'Tauba Tauba',                    artist: 'Bad Newz',                       duration: '3:42', cover: '/bottle3.jpeg',               youtubeId: 'hZrJxT9mGU4', language: 'Hindi',   era: 'Latest' },
    { id: 63,  title: 'Vaada Hai',                      artist: "O'Romeo",                        duration: '4:15', cover: '/bottle4.jpeg',               youtubeId: 'Z_nTMLG2fvk', language: 'Hindi',   era: 'Latest' },
    { id: 64,  title: 'Zinda Banda',                    artist: 'Jawan',                          duration: '3:18', cover: '/gallery/promo-serenity.jpg', youtubeId: 'NjRYVod2ijw', language: 'Hindi',   era: 'Latest' },
    { id: 65,  title: 'Main Hoon',                      artist: 'Battle Of Galwan',               duration: '4:05', cover: '/gallery/promo-elegance.jpg', youtubeId: 'Wy4TYfeoR8I', language: 'Hindi',   era: 'Latest' },
    { id: 93,  title: 'Chaleya',                        artist: 'Jawan',                          duration: '3:45', cover: '/bottle2.jpeg',               youtubeId: 'Bi7sSC046dk', language: 'Hindi',   era: 'Latest' },
    { id: 94,  title: 'Gehra Hua',                      artist: 'Dhurandhar',                     duration: '4:12', cover: '/bottle3.jpeg',               youtubeId: 'FG6FruLw18k', language: 'Hindi',   era: 'Latest' },
    { id: 95,  title: 'Heeriye',                        artist: 'Jasleen Royal ft. Arijit Singh', duration: '4:28', cover: '/bottle4.jpeg',               youtubeId: 'ObiCEWmYH5Y', language: 'Hindi',   era: 'Latest' },
    { id: 96,  title: 'Kesariya',                       artist: 'Brahmastra',                     duration: '4:28', cover: '/gallery/promo-serenity.jpg', youtubeId: 'W1S9AbHpWFY', language: 'Hindi',   era: 'Latest' },
    { id: 97,  title: 'Lutt Le Gaya',                   artist: 'Dhurandhar',                     duration: '3:55', cover: '/gallery/promo-elegance.jpg', youtubeId: 'etFaSIU9HaM', language: 'Hindi',   era: 'Latest' },
    { id: 98,  title: 'Param Sundari',                  artist: 'Mimi',                           duration: '4:08', cover: '/bottle2.jpeg',               youtubeId: '_o1SG0iN0Kc', language: 'Hindi',   era: 'Latest' },
    { id: 99,  title: 'Tere Pyaar Mein',                artist: 'Tu Jhoothi Main Makkaar',        duration: '4:42', cover: '/bottle3.jpeg',               youtubeId: 'YLq3YdskZHE', language: 'Hindi',   era: 'Latest' },

    // ── Latest (2020s) Kannada ──
    { id: 66,  title: 'Idre Nemdiyaag Irbek',           artist: 'The Devil',                      duration: '4:55', cover: '/gallery/promo-serenity.jpg', youtubeId: 'LHC3zEeGsts', language: 'Kannada', era: 'Latest' },
    { id: 67,  title: 'Bangle Bangari',                 artist: 'EKKA',                           duration: '5:08', cover: '/gallery/promo-elegance.jpg', youtubeId: 'ckbWXG97W10', language: 'Kannada', era: 'Latest' },
    { id: 68,  title: 'Ayyo Sivane',                    artist: 'Cult',                           duration: '4:15', cover: '/bottle2.jpeg',               youtubeId: 'sE_BatftN9c', language: 'Kannada', era: 'Latest' },
    { id: 69,  title: 'Shiva Shiva',                    artist: 'KD',                             duration: '3:42', cover: '/bottle3.jpeg',               youtubeId: 'Kf1ffhQejBY', language: 'Kannada', era: 'Latest' },
    { id: 129, title: 'Nee Sigoovaregu',                artist: 'Bhajarangi 2',                   duration: '4:22', cover: '/bottle4.jpeg',               youtubeId: 'qO67tDlrpeU', language: 'Kannada', era: 'Latest' },
    { id: 130, title: 'Brahmakalasha',                  artist: 'Kantara',                        duration: '3:58', cover: '/gallery/promo-serenity.jpg', youtubeId: '3ocX9df0krI', language: 'Kannada', era: 'Latest' },
    { id: 131, title: 'Dhamaka',                        artist: 'Siddu Moolimani',                duration: '4:10', cover: '/gallery/promo-elegance.jpg', youtubeId: 'JIjJbB0w1EU', language: 'Kannada', era: 'Latest' },
    { id: 132, title: 'Naavaduva Nudiye',               artist: 'Gandhada Gudi 2',                duration: '4:35', cover: '/bottle2.jpeg',               youtubeId: 'tny0_Hjq2bs', language: 'Kannada', era: 'Latest' },
    { id: 133, title: 'Sapta Sagaradaache Ello',        artist: 'Sapta Sagaradaache Ello',        duration: '4:48', cover: '/bottle3.jpeg',               youtubeId: 'Vcl-GZTGo6A', language: 'Kannada', era: 'Latest' },
    { id: 134, title: 'Singara Siriye',                 artist: 'Kantara',                        duration: '4:05', cover: '/bottle4.jpeg',               youtubeId: 'Q-yJcnX0Qzg', language: 'Kannada', era: 'Latest' },
    { id: 135, title: 'Sojugada Soojumallige',          artist: 'GGVV',                           duration: '4:18', cover: '/gallery/promo-serenity.jpg', youtubeId: 'Vdu4-rsQruo', language: 'Kannada', era: 'Latest' },
    { id: 136, title: 'Sulthana',                       artist: 'KGF Chapter 2',                  duration: '3:52', cover: '/gallery/promo-elegance.jpg', youtubeId: 'uXrxcCvPaFU', language: 'Kannada', era: 'Latest' },
    { id: 137, title: 'Thoogire Rangana',               artist: 'Dr. Vidyabhushana',              duration: '4:25', cover: '/bottle2.jpeg',               youtubeId: 'lN9KNDZhSvw', language: 'Kannada', era: 'Latest' },
    { id: 138, title: 'Toofan',                         artist: 'KGF Chapter 2',                  duration: '4:12', cover: '/bottle3.jpeg',               youtubeId: 'iZjGX6UKpV4', language: 'Kannada', era: 'Latest' },
    { id: 139, title: 'Varaha Roopam',                  artist: 'Kantara',                        duration: '4:42', cover: '/bottle4.jpeg',               youtubeId: 'gH_RYRwVrVM', language: 'Kannada', era: 'Latest' },
];

const eras = ['1980s', '1990s', '2000s', '2010s', 'Latest'] as const;

const getYouTubeTrackUrl = (track: Track) => `https://www.youtube.com/watch?v=${track.youtubeId}`;

const getYouTubeErrorMessage = (code: number) => {
    switch (code) {
        case 2:
            return 'This song has an invalid YouTube link.';
        case 5:
            return 'This song could not be played in the browser.';
        case 100:
            return 'This song is no longer available on YouTube.';
        case 101:
        case 150:
            return 'This song cannot be embedded here. Open it on YouTube instead.';
        default:
            return 'This song could not be loaded from YouTube.';
    }
};

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
    const [ytReady, setYtReady] = useState(false);
    const [playerError, setPlayerError] = useState<string | null>(null);

    const ytPlayerRef = useRef<YTPlayer | null>(null);
    const progressBarRef = useRef<HTMLDivElement>(null);
    const currentTrackRef = useRef<Track | null>(null);
    const isRepeatingRef = useRef(isRepeating);
    const filteredTracksRef = useRef<Track[]>([]);
    const isShuffledRef = useRef(isShuffled);
    const pendingTrackRef = useRef<Track | null>(null);
    const playerTimeoutRef = useRef<number | null>(null);

    // Keep refs in sync with state (needed inside YT callbacks)
    useEffect(() => { isRepeatingRef.current = isRepeating; }, [isRepeating]);
    useEffect(() => { isShuffledRef.current = isShuffled; }, [isShuffled]);

    const filteredTracks = tracks.filter(t => {
        const langMatch = selectedLanguage === 'All' || t.language === selectedLanguage;
        const eraMatch = selectedEra === 'All' || t.era === selectedEra;
        return langMatch && eraMatch;
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
            ytPlayerRef.current = new window.YT.Player('yt-player', {
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

    const playTrack = (track: Track) => {
        if (currentTrack?.id === track.id && ytReady) {
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
    };

    const togglePlayPause = () => {
        if (!currentTrack) return;
        if (!ytPlayerRef.current || !ytReady) {
            pendingTrackRef.current = currentTrack;
            return;
        }
        if (isPlaying) {
            ytPlayerRef.current.pauseVideo();
            setIsPlaying(false);
            return;
        }
        setPlayerError(null);
        ytPlayerRef.current.playVideo();
    };

    const playNext = () => {
        if (!currentTrack) return;
        const list = filteredTracks.length > 0 ? filteredTracks : tracks;
        const currentIndex = list.findIndex(t => t.id === currentTrack.id);
        let nextIndex: number;
        if (isShuffled) {
            do { nextIndex = Math.floor(Math.random() * list.length); }
            while (nextIndex === currentIndex && list.length > 1);
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
        if (!progressBarRef.current || !ytPlayerRef.current) return;
        const rect = progressBarRef.current.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        const dur = ytPlayerRef.current.getDuration() ?? 0;
        if (dur > 0) ytPlayerRef.current.seekTo(percent * dur, true);
    };

    return (
        <div className="relative flex min-h-screen w-full flex-col">
            <Header />

            {/* Hidden YouTube player div — YouTube IFrame API mounts here */}
            <div id="yt-player" style={{ position: 'absolute', width: 1, height: 1, opacity: 0, pointerEvents: 'none' }} />

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
            </main>

            <Footer />
        </div>
    );
}
