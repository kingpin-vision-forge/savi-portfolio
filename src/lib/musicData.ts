export interface Track {
    id: number;
    title: string;
    artist: string;
    duration: string;
    cover: string;
    youtubeId: string;
    language: 'Hindi' | 'Kannada';
    era: '1980s' | '1990s' | '2000s' | '2010s' | 'Latest';
}

export const eras = ['1980s', '1990s', '2000s', '2010s', 'Latest'] as const;

export const tracks: Track[] = [
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
    { id: 92,  title: 'Raabta',                         artist: 'Agent Vinod',                    duration: '4:15', cover: '/gallery/promo-elegance.jpg', youtubeId: 'nzDcwJCn6cs', language: 'Hindi',   era: '2010s' },

    // ── 2010s Kannada ──
    { id: 51,  title: 'Belageddu',                      artist: 'Kirik Party',                    duration: '4:12', cover: '/bottle4.jpeg',               youtubeId: 'g5JfqN4L26Q', language: 'Kannada', era: '2010s' },
    { id: 52,  title: 'Chuttu Chuttu',                  artist: 'Raambo 2',                       duration: '3:45', cover: '/gallery/promo-serenity.jpg', youtubeId: 'WMGEr6Yd3T8', language: 'Kannada', era: '2010s' },
    { id: 53,  title: 'Bombe Helutaithe',               artist: 'Raajakumara',                    duration: '4:30', cover: '/gallery/promo-elegance.jpg', youtubeId: 'oWEfDKxq_hE', language: 'Kannada', era: '2010s' },
    { id: 54,  title: 'Mungaru Maleyalli',              artist: 'Andondittu Kaala',               duration: '3:58', cover: '/bottle2.jpeg',               youtubeId: 'PMzTLWTWLZU', language: 'Kannada', era: '2010s' },
    { id: 55,  title: 'Geleya Ennale',                  artist: 'Mass Leader',                    duration: '4:15', cover: '/bottle3.jpeg',               youtubeId: 'HvWLRLFCXFs', language: 'Kannada', era: '2010s' },
    { id: 56,  title: 'Sanju Mathu Geetha',             artist: 'Sanju Weds Geetha',              duration: '4:42', cover: '/bottle4.jpeg',               youtubeId: 'w1T17HmS22A', language: 'Kannada', era: '2010s' },
    { id: 57,  title: 'Naane Neenanthe',                artist: 'BRAT',                           duration: '5:10', cover: '/gallery/promo-serenity.jpg', youtubeId: 'uiI8z-vOmPE', language: 'Kannada', era: '2010s' },
    { id: 58,  title: 'Salaam Rocky Bhai',              artist: 'KGF Chapter 1',                  duration: '3:48', cover: '/bottle3.jpeg',               youtubeId: '6Hvc-xpNTME', language: 'Kannada', era: '2010s' },
    { id: 59,  title: 'Dheera Dheera',                  artist: 'KGF',                            duration: '4:22', cover: '/bottle4.jpeg',               youtubeId: 'V3w3N4UMbdk', language: 'Kannada', era: '2010s' },
    { id: 125, title: 'Karagida Baaninalli',            artist: 'Simple Agi Ondh Love Story',     duration: '4:28', cover: '/gallery/promo-serenity.jpg', youtubeId: 'OjJxz88iKKY', language: 'Kannada', era: '2010s' },
    { id: 126, title: 'Ninna Snehadinda',               artist: 'Mugulu Nage',                    duration: '4:15', cover: '/gallery/promo-elegance.jpg', youtubeId: 'cM3LF6fNnk0', language: 'Kannada', era: '2010s' },
    { id: 127, title: 'Annthamma',                      artist: 'Mr & Mrs Ramachari',             duration: '4:05', cover: '/bottle2.jpeg',               youtubeId: 'dCxZrNtgFxc', language: 'Kannada', era: '2010s' },
    { id: 128, title: 'Usire Usire',                    artist: 'Hebbuli',                        duration: '4:38', cover: '/bottle3.jpeg',               youtubeId: 'M0o8VGY0MCA', language: 'Kannada', era: '2010s' },

    // ── Latest (2020s) Hindi ──
    { id: 60,  title: 'Akhiyaan Gulaab',                artist: 'Teri Baaton Mein Aisa Uljha Jiya', duration: '4:28', cover: '/gallery/promo-elegance.jpg', youtubeId: '0XJVTg3gMCw', language: 'Hindi',   era: 'Latest' },
    { id: 61,  title: 'Satyanaas',                      artist: 'Chandu Champion',                duration: '3:55', cover: '/bottle2.jpeg',               youtubeId: 'TQ-Zi4rHXoI', language: 'Hindi',   era: 'Latest' },
    { id: 62,  title: 'Tauba Tauba',                    artist: 'Bad Newz',                       duration: '3:42', cover: '/bottle3.jpeg',               youtubeId: 'c5AbMnDz8p4', language: 'Hindi',   era: 'Latest' },
    { id: 63,  title: 'Vaada Hai',                      artist: "O'Romeo",                        duration: '4:15', cover: '/bottle4.jpeg',               youtubeId: 'FLbbf4-eeI4', language: 'Hindi',   era: 'Latest' },
    { id: 64,  title: 'Zinda Banda',                    artist: 'Jawan',                          duration: '3:18', cover: '/gallery/promo-serenity.jpg', youtubeId: 'CaJ22UtBj18', language: 'Hindi',   era: 'Latest' },
    { id: 65,  title: 'Main Hoon',                      artist: 'Battle Of Galwan',               duration: '4:05', cover: '/gallery/promo-elegance.jpg', youtubeId: 'SakKiuHy5Q4', language: 'Hindi',   era: 'Latest' },
    { id: 93,  title: 'Chaleya',                        artist: 'Jawan',                          duration: '3:45', cover: '/bottle2.jpeg',               youtubeId: 'c_zhNAqogiA', language: 'Hindi',   era: 'Latest' },
    { id: 94,  title: 'Gehra Hua',                      artist: 'Dhurandhar',                     duration: '4:12', cover: '/bottle3.jpeg',               youtubeId: 'kBvkTSV_SQE', language: 'Hindi',   era: 'Latest' },
    { id: 95,  title: 'Heeriye',                        artist: 'Jasleen Royal ft. Arijit Singh', duration: '4:28', cover: '/bottle4.jpeg',               youtubeId: '6_Uq8YnH2ME', language: 'Hindi',   era: 'Latest' },
    { id: 96,  title: 'Kesariya',                       artist: 'Brahmastra',                     duration: '4:28', cover: '/gallery/promo-serenity.jpg', youtubeId: 'BddP6PYo2gs', language: 'Hindi',   era: 'Latest' },
    { id: 97,  title: 'Lutt Le Gaya',                   artist: 'Dhurandhar',                     duration: '3:55', cover: '/gallery/promo-elegance.jpg', youtubeId: '5lGFBWflE04', language: 'Hindi',   era: 'Latest' },
    { id: 98,  title: 'Param Sundari',                  artist: 'Mimi',                           duration: '4:08', cover: '/bottle2.jpeg',               youtubeId: 'oBFf6PBHhCY', language: 'Hindi',   era: 'Latest' },
    { id: 99,  title: 'Tere Pyaar Mein',                artist: 'Tu Jhoothi Main Makkaar',        duration: '4:42', cover: '/bottle3.jpeg',               youtubeId: 'E9a3JHHF0Yw', language: 'Hindi',   era: 'Latest' },

    // ── Latest (2020s) Kannada ──
    { id: 66,  title: 'Idre Nemdiyaag Irbek',           artist: 'The Devil',                      duration: '4:55', cover: '/gallery/promo-serenity.jpg', youtubeId: 'eOVP6Qaz3xg', language: 'Kannada', era: 'Latest' },
    { id: 67,  title: 'Bangle Bangari',                 artist: 'EKKA',                           duration: '5:08', cover: '/gallery/promo-elegance.jpg', youtubeId: 'Zyf7DXm7HJI', language: 'Kannada', era: 'Latest' },
    { id: 68,  title: 'Ayyo Sivane',                    artist: 'Cult',                           duration: '4:15', cover: '/bottle2.jpeg',               youtubeId: 'mHOuQpBULIA', language: 'Kannada', era: 'Latest' },
    { id: 69,  title: 'Shiva Shiva',                    artist: 'KD',                             duration: '3:42', cover: '/bottle3.jpeg',               youtubeId: '5J5v8zB4kP4', language: 'Kannada', era: 'Latest' },
    { id: 129, title: 'Nee Sigoovaregu',                artist: 'Bhajarangi 2',                   duration: '4:22', cover: '/bottle4.jpeg',               youtubeId: 'i9E_MjNlm_A', language: 'Kannada', era: 'Latest' },
    { id: 130, title: 'Brahmakalasha',                  artist: 'Kantara',                        duration: '3:58', cover: '/gallery/promo-serenity.jpg', youtubeId: '3sD3FDZzQIo', language: 'Kannada', era: 'Latest' },
    { id: 131, title: 'Dhamaka',                        artist: 'Siddu Moolimani',                duration: '4:10', cover: '/gallery/promo-elegance.jpg', youtubeId: 'Yq2sJpSS4DM', language: 'Kannada', era: 'Latest' },
    { id: 132, title: 'Naavaduva Nudiye',               artist: 'Gandhada Gudi 2',                duration: '4:35', cover: '/bottle2.jpeg',               youtubeId: 'V-G3MYN5Gm0', language: 'Kannada', era: 'Latest' },
    { id: 133, title: 'Sapta Sagaradaache Ello',        artist: 'Sapta Sagaradaache Ello',        duration: '4:48', cover: '/bottle3.jpeg',               youtubeId: 'z9bRCXWG2LA', language: 'Kannada', era: 'Latest' },
    { id: 134, title: 'Singara Siriye',                 artist: 'Kantara',                        duration: '4:05', cover: '/bottle4.jpeg',               youtubeId: 'dAVTPTYdaVQ', language: 'Kannada', era: 'Latest' },
    { id: 135, title: 'Sojugada Soojumallige',          artist: 'GGVV',                           duration: '4:18', cover: '/gallery/promo-serenity.jpg', youtubeId: '4LFWC85XQZM', language: 'Kannada', era: 'Latest' },
    { id: 136, title: 'Sulthana',                       artist: 'KGF Chapter 2',                  duration: '3:52', cover: '/gallery/promo-elegance.jpg', youtubeId: '1HMCS6KPBIM', language: 'Kannada', era: 'Latest' },
    { id: 137, title: 'Thoogire Rangana',               artist: 'Dr. Vidyabhushana',              duration: '4:25', cover: '/bottle2.jpeg',               youtubeId: 'p1UBQNVRsGM', language: 'Kannada', era: 'Latest' },
    { id: 138, title: 'Toofan',                         artist: 'KGF Chapter 2',                  duration: '4:12', cover: '/bottle3.jpeg',               youtubeId: '7q4h2RFBF5E', language: 'Kannada', era: 'Latest' },
    { id: 139, title: 'Varaha Roopam',                  artist: 'Kantara',                        duration: '4:42', cover: '/bottle4.jpeg',               youtubeId: 'xt7i1LTQvPs', language: 'Kannada', era: 'Latest' },
];

export const getYouTubeTrackUrl = (track: Track) => `https://www.youtube.com/watch?v=${track.youtubeId}`;

export const getYouTubeErrorMessage = (code: number) => {
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
