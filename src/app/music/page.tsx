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
    { id: 6, title: 'Gazab Ka Hai Din', artist: 'Qayamat Se Qayamat Tak', duration: '4:55', cover: '/gallery/promo-elegance.jpg', audioSrc: '/music/gazab-ka-hai-din.mp3', language: 'Hindi', era: '1980s' },
    { id: 70, title: 'Aaj Kal Tere Mere Pyaar Ke Charche', artist: 'Brahmachari', duration: '4:32', cover: '/bottle3.jpeg', audioSrc: '/music/Aaj%20Kal%20Tere%20Mere%20Pyar%20Ke%20Charche%20Brahmachari%201988%20Shammi%20Kapoor%20Mumtaz%20Pran%20Hindi%20Song.mp3', language: 'Hindi', era: '1980s' },
    { id: 71, title: 'Dekha Ek Khwab', artist: 'Silsila', duration: '5:10', cover: '/bottle4.jpeg', audioSrc: '/music/Dekha%20Ek%20Khwab%20Song%20Silsila%20Amitabh%20Bachchan%20Rekha%20Kishore%20Kumar%20Lata%20Mangeshkar%20Shiv%20Hari.mp3', language: 'Hindi', era: '1980s' },
    { id: 72, title: 'Saiyaara', artist: 'Ek Duuje Ke Liye', duration: '4:48', cover: '/gallery/promo-serenity.jpg', audioSrc: '/music/Saiyaara%201980%20Ft.Kishore%20Kumar%20full%20song%20Old%20version%20Old%20is%20Gold%20with%20a%20New%20Voice.mp3', language: 'Hindi', era: '1980s' },
    { id: 73, title: 'Tu Tu Hai Wahi', artist: 'Yeh Vaada Raha', duration: '4:20', cover: '/gallery/promo-elegance.jpg', audioSrc: '/music/Tu%20Tu%20Hai%20Wahi%20Yeh%20Vaada%20Raha%201982%20Asha%20Bhosle%20Hit%20Song%20Rishi%20Kapoor%20Poonam%2080s%20Love%20Songs.mp3', language: 'Hindi', era: '1980s' },
    { id: 74, title: 'Zindagi Pyar Ka Geet Hai', artist: 'Souten', duration: '4:55', cover: '/bottle2.jpeg', audioSrc: '/music/Zindagi%20Pyar%20Ka%20Geet%20Hai%20Lata%20M%20Rajesh%20Khanna%20Souten%20HD.mp3', language: 'Hindi', era: '1980s' },
    { id: 75, title: 'Pal Pal Dil Ke Paas', artist: 'Blackmail', duration: '4:38', cover: '/bottle3.jpeg', audioSrc: '/music/Pal%20Pal%20Dil%20Ke%20Paas%20Dharmendra%20Rakhee%20Black%20Mail%201973%20Kishore%20Kumar%20Hit%20Songs.mp3', language: 'Hindi', era: '1980s' },

    // ── 1980s Kannada ──
    { id: 7, title: 'Jotheyali Jothe Jotheyali', artist: 'Geetha', duration: '4:20', cover: '/bottle2.jpeg', audioSrc: '/music/jotheyali-jothe.mp3', language: 'Kannada', era: '1980s' },
    { id: 8, title: 'Baalu Belakayithu', artist: 'Haalu Jenu', duration: '4:35', cover: '/bottle3.jpeg', audioSrc: '/music/baalu-belakayithu.mp3', language: 'Kannada', era: '1980s' },
    { id: 9, title: 'Ganga Yamuna Sangama', artist: 'Anuraga Aralithu', duration: '3:58', cover: '/bottle4.jpeg', audioSrc: '/music/ganga-yamuna-sangama.mp3', language: 'Kannada', era: '1980s' },
    { id: 10, title: 'Kelade Nimageega', artist: 'Geetha', duration: '4:42', cover: '/gallery/promo-serenity.jpg', audioSrc: '/music/kelade-nimageega.mp3', language: 'Kannada', era: '1980s' },
    { id: 11, title: 'Nammoora Mandara Hoove', artist: 'Aalemane', duration: '5:10', cover: '/gallery/promo-elegance.jpg', audioSrc: '/music/nammoora-mandara-hoove.mp3', language: 'Kannada', era: '1980s' },
    { id: 12, title: 'Olume Siriya', artist: 'Bangarada Jinke', duration: '4:48', cover: '/bottle2.jpeg', audioSrc: '/music/olume-siriya.mp3', language: 'Kannada', era: '1980s' },
    { id: 13, title: 'Anupama Cheluvu', artist: 'Anupama', duration: '4:15', cover: '/bottle3.jpeg', audioSrc: '/music/anupama-cheluvu.mp3', language: 'Kannada', era: '1980s' },
    { id: 14, title: 'Haayaada Ee Sanje', artist: 'Vasantha Geetha', duration: '5:10', cover: '/gallery/promo-elegance.jpg', audioSrc: '/music/haayaada-ee-sanje.mp3', language: 'Kannada', era: '1980s' },
    { id: 15, title: 'Huttidare Kannada', artist: 'Akasmika', duration: '4:48', cover: '/bottle2.jpeg', audioSrc: '/music/huttidare-kannada.mp3', language: 'Kannada', era: '1980s' },
    { id: 100, title: 'Baanigondu Elle Ellide', artist: 'Premada Kanike', duration: '4:25', cover: '/bottle4.jpeg', audioSrc: '/music/Baanigondu%20Elle%20Ellide%20Video%20Song%20Premada%20Kanike%20Dr.Rajkumar%20Chi%20Udayashankar.mp3', language: 'Kannada', era: '1980s' },
    { id: 101, title: 'Endendu Ninnanu Marethu', artist: 'Eradu Kanasu', duration: '4:42', cover: '/gallery/promo-serenity.jpg', audioSrc: '/music/Endendu%20Ninnanu%20Marethu%20Eradu%20Kanasu%20%E0%B2%8E%E0%B2%B0%E0%B2%A1%E0%B3%81%E0%B2%95%E0%B2%A8%E0%B2%B8%E0%B3%81%20Rajkumar%20Manjula%20Kannada%20Video%20Song.mp3', language: 'Kannada', era: '1980s' },
    { id: 102, title: 'Hoovu Cheluvella', artist: 'Kalpana', duration: '4:15', cover: '/gallery/promo-elegance.jpg', audioSrc: '/music/Hoovu%20Cheluvella%20Minugu%20Thare%20Kalpana%20s%20hit%20song%20by%20Susheelamma%20Kalpana%20P.Susheela%20MRangarao.mp3', language: 'Kannada', era: '1980s' },
    { id: 103, title: 'Hrudaya Rangoli', artist: 'Pallavi Anupallavi', duration: '4:50', cover: '/bottle3.jpeg', audioSrc: '/music/Hrudaya%20Rangoli%20Alisuthide%20Indu%20Pallavi%20Anupallavi%20HD%20Video%20Song%20Anil%20Kapoor%20Kiran%20Vairale.mp3', language: 'Kannada', era: '1980s' },
    { id: 104, title: 'Kanasalu Neene Manasalu Neene', artist: 'Bayalu Dari', duration: '4:30', cover: '/bottle4.jpeg', audioSrc: '/music/Kanasalu%20Neene%20Manasalu%20Neene%20HD%20Video%20Song%20Bayalu%20Dari%20Kannada%20Movie%20Songs%20Ananthnag%20Kalpana.mp3', language: 'Kannada', era: '1980s' },
    { id: 105, title: 'Kannalli Yeno Minchondu', artist: 'Vasantha Geetha', duration: '4:18', cover: '/gallery/promo-serenity.jpg', audioSrc: '/music/Kannlli%20Yeno%20Minchondu%20Kandithalla%20Vasantha%20Geetha%20HD%20Video%20Song%20Dr%20Rajkumar%20Gayathri.mp3', language: 'Kannada', era: '1980s' },
    { id: 106, title: 'Kasturi Nivasa', artist: 'Kasturi Nivasa', duration: '4:55', cover: '/gallery/promo-elegance.jpg', audioSrc: '/music/Kasturi%20Nivasa%20Colour%20Nee%20Bandu%20Ninthaga%20Video%20Song%20l%20Dr.Rajkumar%20Hit%20Song%20Aarathi%20PBS.mp3', language: 'Kannada', era: '1980s' },
    { id: 107, title: 'Nagu Endide', artist: 'Pallavi Anupallavi', duration: '4:10', cover: '/bottle2.jpeg', audioSrc: '/music/Nagu%20Endide%20Manjina%20Bindu%20Pallavi%20Anupallavi%20Lakshmi%20Rohith%20Kannada%20Video%20Song.mp3', language: 'Kannada', era: '1980s' },
    { id: 108, title: 'Naguva Nayana', artist: 'Pallavi Anupallavi', duration: '4:38', cover: '/bottle3.jpeg', audioSrc: '/music/Naguva%20Nayana%20Madhura%20Mouna%20Pallavi%20Anupallavi%20Anil%20Kapoor%20Kiran%20Kannada%20Video%20Song.mp3', language: 'Kannada', era: '1980s' },
    { id: 109, title: 'O Priyathama', artist: 'Kaviratna Kalidasa', duration: '4:45', cover: '/bottle4.jpeg', audioSrc: '/music/O%20Priyathama%20Kaviratna%20Kalidasa%20HD%20Video%20Song%20Dr%20Rajkumar%20Jayaprada%20M%20Ranga%20Rao.mp3', language: 'Kannada', era: '1980s' },
    { id: 110, title: 'Premadalli Snehadalli', artist: 'Ranganayaki', duration: '4:22', cover: '/gallery/promo-serenity.jpg', audioSrc: '/music/Premadalli%20Snehadalli%20HD%20Video%20Song%20Ranganayaki%20Aarathi%20Ambarish%20Ramakrishna%20Kannada%20Old%20Hit%20Song.mp3', language: 'Kannada', era: '1980s' },

    // ── 1990s Hindi ──
    { id: 16, title: 'Chaiyya Chaiyya', artist: 'Dil Se', duration: '6:23', cover: '/bottle4.jpeg', audioSrc: '/music/chaiyya-chaiyya.mp3', language: 'Hindi', era: '1990s' },
    { id: 17, title: 'Pehla Nasha', artist: 'Jo Jeeta Wohi Sikandar', duration: '5:12', cover: '/gallery/promo-serenity.jpg', audioSrc: '/music/pehla-nasha.mp3', language: 'Hindi', era: '1990s' },
    { id: 18, title: 'Tujhe Dekha To', artist: 'DDLJ', duration: '5:45', cover: '/gallery/promo-elegance.jpg', audioSrc: '/music/tujhe-dekha-to.mp3', language: 'Hindi', era: '1990s' },
    { id: 19, title: 'Chunnari Chunnari', artist: 'Biwi No. 1', duration: '5:30', cover: '/bottle2.jpeg', audioSrc: '/music/chunnari-chunnari.mp3', language: 'Hindi', era: '1990s' },
    { id: 20, title: 'O O Jaane Jaana', artist: 'Pyar Kiya Toh Darna Kya', duration: '5:08', cover: '/bottle3.jpeg', audioSrc: '/music/o-jaane-jaana.mp3', language: 'Hindi', era: '1990s' },
    { id: 21, title: 'Didi Tera Devar Deewana', artist: 'Hum Aapke Hain Koun', duration: '4:55', cover: '/bottle4.jpeg', audioSrc: '/music/didi-tera-devar.mp3', language: 'Hindi', era: '1990s' },
    { id: 22, title: 'Jumma Chumma De De', artist: 'Hum', duration: '6:10', cover: '/gallery/promo-serenity.jpg', audioSrc: '/music/jumma-chumma.mp3', language: 'Hindi', era: '1990s' },
    { id: 76, title: 'Aye Ajnabi', artist: 'Dil Se', duration: '4:55', cover: '/gallery/promo-elegance.jpg', audioSrc: '/music/Aye%20Ajnabi%20Tu%20bhi%20kabhi%20HD%20Full%20Video%20song.mp3', language: 'Hindi', era: '1990s' },
    { id: 77, title: 'Dil To Pagal Hai', artist: 'Dil To Pagal Hai', duration: '5:18', cover: '/bottle2.jpeg', audioSrc: '/music/Dil%20To%20Pagal%20Hai%20Song%20Shah%20Rukh%20Khan%20Madhuri%20Karisma%20Akshay%20Lata%20Mangeshkar%20Udit%20Narayan.mp3', language: 'Hindi', era: '1990s' },
    { id: 78, title: 'Main Duniya Bhula Doonga', artist: 'Aashiqui', duration: '5:02', cover: '/bottle3.jpeg', audioSrc: '/music/Main%20Duniya%20Bhula%20Doonga%20Lyrical%20Video%20Song%20Aashiqui%20Kumar%20Sanu%20Rahul%20Roy%20Anu%20Agarwal.mp3', language: 'Hindi', era: '1990s' },
    { id: 79, title: 'Mera Dil Bhi Kitna Pagal Hai', artist: 'Saajan', duration: '4:45', cover: '/bottle4.jpeg', audioSrc: '/music/Mera%20Dil%20Bhi%20Kitna%20Pagal%20Hai%20Kumar%20Sanu%20Alka%20Yagnik%2090%20s%20Superhit%20Song%20Saajan.mp3', language: 'Hindi', era: '1990s' },
    { id: 80, title: 'Tip Tip Barsa Paani', artist: 'Mohra', duration: '4:28', cover: '/gallery/promo-serenity.jpg', audioSrc: '/music/Tip%20Tip%20Barsa%20Paani%20LYRICAL%20AkshayKumar%20RaveenaTandon%20Mohra%20Alka%20Udit%2090%20s%20Love%20Song.mp3', language: 'Hindi', era: '1990s' },
    { id: 81, title: 'Tu Cheez Badi Hai Mast Mast', artist: 'Mohra', duration: '4:35', cover: '/gallery/promo-elegance.jpg', audioSrc: '/music/Tu%20Cheez%20Badi%20Hai%20Mast%20Mast%20Jhankar%20Song%20Mohra%20Udit%20Narayan%20Akshay%20Kumar%20Raveena.mp3', language: 'Hindi', era: '1990s' },

    // ── 1990s Kannada ──
    { id: 23, title: 'Janumada Jodi', artist: 'Janumada Jodi', duration: '4:22', cover: '/bottle3.jpeg', audioSrc: '/music/janumada-jodi.mp3', language: 'Kannada', era: '1990s' },
    { id: 24, title: 'Nooru Janmaku', artist: 'America America', duration: '4:05', cover: '/bottle4.jpeg', audioSrc: '/music/nooru-janmaku.mp3', language: 'Kannada', era: '1990s' },
    { id: 25, title: 'Ninna Nodalentho', artist: 'Mussanje Maathu', duration: '4:38', cover: '/gallery/promo-serenity.jpg', audioSrc: '/music/ninna-nodalentho.mp3', language: 'Kannada', era: '1990s' },
    { id: 26, title: 'Nalivaa Gulaabi Hoove', artist: 'Auto Raja', duration: '3:55', cover: '/gallery/promo-elegance.jpg', audioSrc: '/music/nalivaa-gulaabi-hoove.mp3', language: 'Kannada', era: '1990s' },
    { id: 27, title: 'Prema Chandrama', artist: 'Yajamana', duration: '4:30', cover: '/bottle2.jpeg', audioSrc: '/music/prema-chandrama.mp3', language: 'Kannada', era: '1990s' },
    { id: 111, title: 'Ee Bhoomi Bannada Buguri', artist: 'Mahakshatriya', duration: '4:35', cover: '/bottle3.jpeg', audioSrc: '/music/Ee%20Bhoomi%20Bannada%20Buguri%20Video%20Song%20HD%20Mahakshatriya%20Vishnuvardhan%20Sonu%20Walia%20Hamsalekha.mp3', language: 'Kannada', era: '1990s' },
    { id: 112, title: 'Manase Baduku', artist: 'Amruthavarshini', duration: '4:18', cover: '/bottle4.jpeg', audioSrc: '/music/Manase%20Baduku%20Video%20Song%20HD%20Amruthavarshini%20Ramesh%20Suhasini%20Sharath%20Babu%20K.Kalyan%20Deva.mp3', language: 'Kannada', era: '1990s' },
    { id: 113, title: 'O Mallige Ninnondige', artist: 'Anuraga Sangama', duration: '4:42', cover: '/gallery/promo-serenity.jpg', audioSrc: '/music/O%20Mallige%20Ninnondige%20%E0%B2%93%20%E0%B2%AE%E0%B2%B2%E0%B3%8D%E0%B2%B2%E0%B2%BF%E0%B2%97%E0%B3%86%20%E0%B2%A8%E0%B2%BF%E0%B2%A8%E0%B3%8D%E0%B2%A8%E0%B3%8A%E0%B2%82%E0%B2%A6%E0%B2%BF%E0%B2%97%E0%B3%86%20HD%20Video%20Song%20Anuraga%20Sangama%20Kumar%20Govind%20Sudharani.mp3', language: 'Kannada', era: '1990s' },
    { id: 114, title: 'Yaarige Beku', artist: 'Sipayi', duration: '4:50', cover: '/gallery/promo-elegance.jpg', audioSrc: '/music/Yaarige%20Beku%20Ee%20Loka%20Sipayi%20HD%20Video%20Song%20Ravichandran%20Soundarya%20KJ%20Yesudas%20Hamsalekha.mp3', language: 'Kannada', era: '1990s' },
    { id: 115, title: 'Yaava Mohana Murali', artist: 'America America', duration: '4:22', cover: '/bottle2.jpeg', audioSrc: '/music/Yaava%20Mohana%20Murali%20America%20America%20Akshay%20Anand%20Hema%20Panchamukhi%20Kannada%20Video%20Song.mp3', language: 'Kannada', era: '1990s' },

    // ── 2000s Hindi ──
    { id: 28, title: 'Bole Chudiyan', artist: 'Kabhi Khushi Kabhie Gham', duration: '5:18', cover: '/gallery/promo-serenity.jpg', audioSrc: '/music/bole-chudiyan.mp3', language: 'Hindi', era: '2000s' },
    { id: 29, title: 'Kal Ho Naa Ho', artist: 'Kal Ho Naa Ho', duration: '5:19', cover: '/bottle3.jpeg', audioSrc: '/music/kal-ho-naa-ho.mp3', language: 'Hindi', era: '2000s' },
    { id: 30, title: 'Kajra Re', artist: 'Bunty Aur Babli', duration: '5:42', cover: '/bottle4.jpeg', audioSrc: '/music/kajra-re.mp3', language: 'Hindi', era: '2000s' },
    { id: 31, title: 'Tum Ko Dekha To', artist: 'Jagjit Singh', duration: '5:55', cover: '/gallery/promo-serenity.jpg', audioSrc: '/music/tum-ko-dekha-to.mp3', language: 'Hindi', era: '2000s' },
    { id: 32, title: 'Mauja Hi Mauja', artist: 'Jab We Met', duration: '5:28', cover: '/gallery/promo-elegance.jpg', audioSrc: '/music/mauja-hi-mauja.mp3', language: 'Hindi', era: '2000s' },
    { id: 33, title: 'Desi Girl', artist: 'Dostana', duration: '4:15', cover: '/bottle2.jpeg', audioSrc: '/music/desi-girl.mp3', language: 'Hindi', era: '2000s' },
    { id: 34, title: 'Pehli Nazar Mein', artist: 'Race', duration: '5:05', cover: '/bottle3.jpeg', audioSrc: '/music/pehli-nazar-mein.mp3', language: 'Hindi', era: '2000s' },
    { id: 35, title: 'Teri Ore', artist: 'Singh Is Kinng', duration: '5:32', cover: '/bottle4.jpeg', audioSrc: '/music/teri-ore.mp3', language: 'Hindi', era: '2000s' },
    { id: 82, title: 'Agar Tum Mil Jao', artist: 'Zeher', duration: '4:28', cover: '/gallery/promo-serenity.jpg', audioSrc: '/music/Agar%20Tum%20Mil%20Jao%20LYRICS%20Shreya%20Goshal%20Emraan%20Hashmi%20Zamana%20Chhod%20Denge%20Hum%20ZEHER.mp3', language: 'Hindi', era: '2000s' },
    { id: 83, title: 'Dus Bahane', artist: 'Dus', duration: '4:45', cover: '/gallery/promo-elegance.jpg', audioSrc: '/music/Dus%20Bahane%20Karke%20Le%20Gaye%20Dil%20Dus%20Zayed%20K%20Abhishek%20B%20K%20K%20Shaan%20Vishal%20Dadlani%20Shekhar.mp3', language: 'Hindi', era: '2000s' },
    { id: 84, title: 'Jadu Hai Nasha Hai', artist: 'Jism', duration: '5:05', cover: '/bottle2.jpeg', audioSrc: '/music/Jadu%20Hai%20Nasha%20Hai%20Shreya%20Ghoshal%20Shaan%20M.M.Kreem%20Jism%20Audio%20Song.mp3', language: 'Hindi', era: '2000s' },
    { id: 85, title: 'Mitwa', artist: 'Kabhi Alvida Naa Kehna', duration: '5:22', cover: '/bottle3.jpeg', audioSrc: '/music/Mitwa%20Full%20Video%20KANK%20Shahrukh%20Khan%20Rani%20Mukherjee%20Shafqat%20Amanat%20Ali%20Shankar%20Mahadevan.mp3', language: 'Hindi', era: '2000s' },
    { id: 86, title: 'Suraj Hua Maddham', artist: 'Kabhi Khushi Kabhie Gham', duration: '5:38', cover: '/bottle4.jpeg', audioSrc: '/music/Suraj%20Hua%20Maddham%20Full%20Video%20K3G%20Shah%20Rukh%20Khan%20Kajol%20Sonu%20Nigam%20Alka%20Yagnik.mp3', language: 'Hindi', era: '2000s' },
    { id: 87, title: 'Tere Naam', artist: 'Tere Naam', duration: '4:52', cover: '/gallery/promo-serenity.jpg', audioSrc: '/music/Tere%20Naam%20Humne%20Kiya%20Hai%20Full%20Song%20Tere%20Naam%20Salman%20Khan%20Udit%20Narayan%20Himesh%20Reshammiya.mp3', language: 'Hindi', era: '2000s' },
    { id: 88, title: 'Tum Se Hi', artist: 'Jab We Met', duration: '4:35', cover: '/gallery/promo-elegance.jpg', audioSrc: '/music/Tum%20Se%20Hi%20Lyrcial%20Jab%20We%20Met%20Kareena%20Kapoor%20Shahid%20Kapoor%20Mohit%20Chauhan%20Pritam.mp3', language: 'Hindi', era: '2000s' },

    // ── 2000s Kannada ──
    { id: 36, title: 'Yaare Nee Devatheya', artist: 'Ambari', duration: '4:35', cover: '/gallery/promo-serenity.jpg', audioSrc: '/music/yaare-nee-devatheya.mp3', language: 'Kannada', era: '2000s' },
    { id: 37, title: 'Minchagi Neenu Baralu', artist: 'Gaalipata', duration: '4:12', cover: '/gallery/promo-elegance.jpg', audioSrc: '/music/minchagi-neenu.mp3', language: 'Kannada', era: '2000s' },
    { id: 38, title: 'Anisuthide', artist: 'Mungaru Male', duration: '4:48', cover: '/bottle2.jpeg', audioSrc: '/music/anisuthide.mp3', language: 'Kannada', era: '2000s' },
    { id: 39, title: 'Mungaru Maleye', artist: 'Mungaru Male', duration: '3:58', cover: '/bottle3.jpeg', audioSrc: '/music/mungaru-maleye.mp3', language: 'Kannada', era: '2000s' },
    { id: 40, title: 'Onde Ondu Saari', artist: 'Mungaru Male', duration: '4:22', cover: '/bottle4.jpeg', audioSrc: '/music/onde-ondu-saari.mp3', language: 'Kannada', era: '2000s' },
    { id: 41, title: 'Open Hairu Bitkondu', artist: 'Adhyaksha', duration: '4:10', cover: '/gallery/promo-serenity.jpg', audioSrc: '/music/open-hairu.mp3', language: 'Kannada', era: '2000s' },
    { id: 42, title: 'Paravashanadenu', artist: 'Paramathma', duration: '4:28', cover: '/gallery/promo-elegance.jpg', audioSrc: '/music/paravashanadenu.mp3', language: 'Kannada', era: '2000s' },
    { id: 116, title: 'Araluthiru', artist: 'Mungaru Male', duration: '4:15', cover: '/bottle2.jpeg', audioSrc: '/music/Araluthiru%20Audio%20Song%20Mungaru%20Male%20Golden%20%E2%AD%90%20Ganesh%20Pooja%20Gandhi%20Manomurthy%20Yogaraj%20Bhat.mp3', language: 'Kannada', era: '2000s' },
    { id: 117, title: 'Banna Banna Elu Banna', artist: 'Ee Bandhana', duration: '4:30', cover: '/bottle3.jpeg', audioSrc: '/music/Banna%20Banna%20Elu%20Banna%20Video%20Song%20Ee%20Bandhana%20Darshan%20Jennifer%20Kothwal%20Mano%20Murthy.mp3', language: 'Kannada', era: '2000s' },
    { id: 118, title: 'Car Car Car', artist: 'Nanna Preethiya Hudugi', duration: '3:58', cover: '/bottle4.jpeg', audioSrc: '/music/Car%20Car%20Car%20Elnodi%20Car%20Video%20Song%20Nanna%20Preethiya%20Hudugi%20Movie%20Dhyan%20Deepali%20B%20Jayashree.mp3', language: 'Kannada', era: '2000s' },
    { id: 119, title: 'Jothe Jotheyali', artist: 'Vamshi', duration: '4:40', cover: '/gallery/promo-serenity.jpg', audioSrc: '/music/Jothe%20Jotheyali%20Video%20Song%20Vamshi%20Puneeth%20Rajkumar%20Nikitha%20Thukral%20Puneeth%20Hit%20Song.mp3', language: 'Kannada', era: '2000s' },
    { id: 120, title: 'Kariya I Love You', artist: 'Kariya', duration: '4:12', cover: '/gallery/promo-elegance.jpg', audioSrc: '/music/Kariya%20I%20Love%20You%20Duniya%20Duniya%20Vijay%20Rashmi%20Rangayana%20Raghu.mp3', language: 'Kannada', era: '2000s' },
    { id: 121, title: 'Male Ninthu Hoda Mele', artist: 'Milana', duration: '4:48', cover: '/bottle2.jpeg', audioSrc: '/music/Milana%20%20Male%20Ninthu%20Hoda%20Mele%20%20Power%20Star%20Puneeth%20Rajkumar%20%20Parvathi%20Menon%20%20Manomurthy%20%20Prakash%20-%20Anand%20Audio%20%28youtube%29.mp3', language: 'Kannada', era: '2000s' },
    { id: 122, title: 'Marali Mareyagi', artist: 'Savari', duration: '4:22', cover: '/bottle3.jpeg', audioSrc: '/music/Marali%20Mareyagi%20song%20from%20Kannada%20movie%20Savari%20in%20HD.mp3', language: 'Kannada', era: '2000s' },
    { id: 123, title: 'Innoo Anisutide', artist: 'Neene Bari Neene', duration: '4:35', cover: '/bottle4.jpeg', audioSrc: '/music/Innoo%20Anisutide%20Neene%20Bari%20Neene.mp3', language: 'Kannada', era: '2000s' },
    { id: 124, title: 'Yenagali', artist: 'Mussanje Maathu', duration: '4:18', cover: '/gallery/promo-serenity.jpg', audioSrc: '/music/V%20Sridhar%20Yenagali%20From%20Mussanje%20Maatu%20ft.Kiccha%20Sudeep%20Ramya.mp3', language: 'Kannada', era: '2000s' },

    // ── 2010s Hindi ──
    { id: 43, title: 'Tum Hi Ho', artist: 'Aashiqui 2', duration: '4:22', cover: '/bottle2.jpeg', audioSrc: '/music/tum-hi-ho.mp3', language: 'Hindi', era: '2010s' },
    { id: 44, title: 'Kabira', artist: 'Yeh Jawaani Hai Deewani', duration: '4:50', cover: '/bottle3.jpeg', audioSrc: '/music/kabira.mp3', language: 'Hindi', era: '2010s' },
    { id: 45, title: 'Zaalima', artist: 'Raees', duration: '4:32', cover: '/bottle4.jpeg', audioSrc: '/music/zaalima.mp3', language: 'Hindi', era: '2010s' },
    { id: 46, title: 'Nashe Si Chadh Gayi', artist: 'Befikre', duration: '3:55', cover: '/gallery/promo-serenity.jpg', audioSrc: '/music/nashe-si-chadh-gayi.mp3', language: 'Hindi', era: '2010s' },
    { id: 47, title: 'Dil Diyan Gallan', artist: 'Tiger Zinda Hai', duration: '4:48', cover: '/gallery/promo-elegance.jpg', audioSrc: '/music/dil-diyan-gallan.mp3', language: 'Hindi', era: '2010s' },
    { id: 48, title: 'Humsafar', artist: 'Badrinath Ki Dulhania', duration: '5:12', cover: '/bottle2.jpeg', audioSrc: '/music/humsafar.mp3', language: 'Hindi', era: '2010s' },
    { id: 49, title: 'Swag Se Swagat', artist: 'Tiger Zinda Hai', duration: '3:28', cover: '/bottle3.jpeg', audioSrc: '/music/swag-se-swagat.mp3', language: 'Hindi', era: '2010s' },
    { id: 50, title: 'Gali Gali', artist: 'KGF', duration: '3:32', cover: '/bottle2.jpeg', audioSrc: '/music/gali-gali.mp3', language: 'Hindi', era: '2010s' },
    { id: 89, title: 'Agar Tum Saath Ho', artist: 'Tamasha', duration: '5:30', cover: '/bottle3.jpeg', audioSrc: '/music/AGAR%20TUM%20SAATH%20HO%20Full%20VIDEO%20song%20Tamasha%20Ranbir%20Kapoor%20Deepika%20Padukone%20T%20Series.mp3', language: 'Hindi', era: '2010s' },
    { id: 90, title: 'Channa Mereya', artist: 'Ae Dil Hai Mushkil', duration: '4:50', cover: '/bottle4.jpeg', audioSrc: '/music/Channa%20Mereya%20Lyric%20Video%20Ae%20Dil%20Hai%20Mushkil%20Karan%20Johar%20Ranbir%20Anushka%20Pritam%20Arijit.mp3', language: 'Hindi', era: '2010s' },
    { id: 91, title: 'Galliyan', artist: 'Ek Villain', duration: '4:22', cover: '/gallery/promo-serenity.jpg', audioSrc: '/music/Lyrical%20Galliyan%20Full%20Song%20with%20Lyrics%20Ek%20Villain%20Ankit%20Tiwari%20Sidharth%20Malhotra.mp3', language: 'Hindi', era: '2010s' },
    { id: 92, title: 'Raabta', artist: 'Agent Vinod', duration: '4:15', cover: '/gallery/promo-elegance.jpg', audioSrc: '/music/Raabta%20Kehte%20Hain%20Khuda%20Full%20Song%20With%20Lyrics%20Agent%20Vinod%20Saif%20Ali%20Khan%20Kareena%20Kapoor%20Pritam.mp3', language: 'Hindi', era: '2010s' },

    // ── 2010s Kannada ──
    { id: 51, title: 'Belageddu', artist: 'Kirik Party', duration: '4:12', cover: '/bottle4.jpeg', audioSrc: '/music/belageddu.mp3', language: 'Kannada', era: '2010s' },
    { id: 52, title: 'Chuttu Chuttu', artist: 'Raambo 2', duration: '3:45', cover: '/gallery/promo-serenity.jpg', audioSrc: '/music/chuttu-chuttu.mp3', language: 'Kannada', era: '2010s' },
    { id: 53, title: 'Bombe Helutaithe', artist: 'Raajakumara', duration: '4:30', cover: '/gallery/promo-elegance.jpg', audioSrc: '/music/bombe-helutaithe.mp3', language: 'Kannada', era: '2010s' },
    { id: 54, title: 'Mungaru Maleyalli', artist: 'Andondittu Kaala', duration: '3:58', cover: '/bottle2.jpeg', audioSrc: '/music/mungaru-maleyalli.mp3', language: 'Kannada', era: '2010s' },
    { id: 55, title: 'Geleya Ennale', artist: 'Mass Leader', duration: '4:15', cover: '/bottle3.jpeg', audioSrc: '/music/geleya-ennale.mp3', language: 'Kannada', era: '2010s' },
    { id: 56, title: 'Sanju Mathu Geetha', artist: 'Sanju Weds Geetha', duration: '4:42', cover: '/bottle4.jpeg', audioSrc: '/music/sanju-mathu-geetha.mp3', language: 'Kannada', era: '2010s' },
    { id: 57, title: 'Naane Neenanthe', artist: 'BRAT', duration: '5:10', cover: '/gallery/promo-serenity.jpg', audioSrc: '/music/naane-neenanthe.mp3', language: 'Kannada', era: '2010s' },
    { id: 58, title: 'Salaam Rocky Bhai', artist: 'KGF Chapter 1', duration: '3:48', cover: '/bottle3.jpeg', audioSrc: '/music/salaam-rocky-bhai.mp3', language: 'Kannada', era: '2010s' },
    { id: 59, title: 'Dheera Dheera', artist: 'KGF', duration: '4:22', cover: '/bottle4.jpeg', audioSrc: '/music/dheera-dheera.mp3', language: 'Kannada', era: '2010s' },
    { id: 125, title: 'Karagida Baaninalli', artist: 'Simple Agi Ondh Love Story', duration: '4:28', cover: '/gallery/promo-serenity.jpg', audioSrc: '/music/Karagida%20Baaninalli%20Simpallaag%20Ond%20Love%20Story%20Rakshit%20Shetty%20Shwetha%20Bharath%20Jhankar%20Music.mp3', language: 'Kannada', era: '2010s' },
    { id: 126, title: 'Ninna Snehadinda', artist: 'Mugulu Nage', duration: '4:15', cover: '/gallery/promo-elegance.jpg', audioSrc: '/music/MUGULU%20NAGE%20%20NINNA%20SNEHADINDA%20FULL%20SONG%20GANESH%20YOGRAJ%20BHAT%20HARIKRISHNA%20%20SHREYA%20GHOSHAL%20%20SALAM%20-%20DBeatsMusicWorld%20%28youtube%29.mp3', language: 'Kannada', era: '2010s' },
    { id: 127, title: 'Annthamma', artist: 'Mr & Mrs Ramachari', duration: '4:05', cover: '/bottle2.jpeg', audioSrc: '/music/Mr%20Mrs%20Ramachari%20Annthamma%20Kannada%20Movie%20Full%20Song%20Yash%20Radhika%20Pandit%20V%20Harikrishna.mp3', language: 'Kannada', era: '2010s' },
    { id: 128, title: 'Usire Usire', artist: 'Hebbuli', duration: '4:38', cover: '/bottle3.jpeg', audioSrc: '/music/Usire%20Usire%20Full%20Video%20Hebbuli%20Kiccha%20Sudeep%20Amala%20Paul%20Ravichandran%20Shaan%20Shreya%20Ghoshal.mp3', language: 'Kannada', era: '2010s' },

    // ── Latest (2020s) Hindi ──
    { id: 60, title: 'Akhiyaan Gulaab', artist: 'Teri Baaton Mein Aisa Uljha Jiya', duration: '4:28', cover: '/gallery/promo-elegance.jpg', audioSrc: '/music/akhiyaan-gulaab.mp3', language: 'Hindi', era: 'Latest' },
    { id: 61, title: 'Satyanaas', artist: 'Chandu Champion', duration: '3:55', cover: '/bottle2.jpeg', audioSrc: '/music/satyanaas.mp3', language: 'Hindi', era: 'Latest' },
    { id: 62, title: 'Tauba Tauba', artist: 'Bad Newz', duration: '3:42', cover: '/bottle3.jpeg', audioSrc: '/music/tauba-tauba.mp3', language: 'Hindi', era: 'Latest' },
    { id: 63, title: 'Vaada Hai', artist: "O'Romeo", duration: '4:15', cover: '/bottle4.jpeg', audioSrc: '/music/vaada-hai.mp3', language: 'Hindi', era: 'Latest' },
    { id: 64, title: 'Zinda Banda', artist: 'Jawan', duration: '3:18', cover: '/gallery/promo-serenity.jpg', audioSrc: '/music/zinda-banda.mp3', language: 'Hindi', era: 'Latest' },
    { id: 65, title: 'Main Hoon', artist: 'Battle Of Galwan', duration: '4:05', cover: '/gallery/promo-elegance.jpg', audioSrc: '/music/main-hoon.mp3', language: 'Hindi', era: 'Latest' },
    { id: 93, title: 'Chaleya', artist: 'Jawan', duration: '3:45', cover: '/bottle2.jpeg', audioSrc: '/music/JAWAN%20Chaleya%20Hindi%20Shah%20Rukh%20Khan%20Nayanthara%20Atlee%20Anirudh%20Arijit%20S%20Shilpa%20R%20Kumaar.mp3', language: 'Hindi', era: 'Latest' },
    { id: 94, title: 'Gehra Hua', artist: 'Dhurandhar', duration: '4:12', cover: '/bottle3.jpeg', audioSrc: '/music/Gehra%20Hua%20Dhurandhar%20Ranveer%20Singh%20Sara%20Arjun%20Shashwat%20Sachdev%20Arijit%20Singh%20Irshad%20Kamil.mp3', language: 'Hindi', era: 'Latest' },
    { id: 95, title: 'Heeriye', artist: 'Jasleen Royal ft. Arijit Singh', duration: '4:28', cover: '/bottle4.jpeg', audioSrc: '/music/Heeriye%20Official%20Video%20Jasleen%20Royal%20ft%20Arijit%20Singh%20Dulquer%20Salmaan%20Aditya%20Sharma%20Taani%20Tanvir.mp3', language: 'Hindi', era: 'Latest' },
    { id: 96, title: 'Kesariya', artist: 'Brahmastra', duration: '4:28', cover: '/gallery/promo-serenity.jpg', audioSrc: '/music/Kesariya%20Brahm%C4%81stra%20Ranbir%20Kapoor%20Alia%20Bhatt%20Pritam%20Arijit%20Singh%20Amitabh%20Bhattacharya%204K.mp3', language: 'Hindi', era: 'Latest' },
    { id: 97, title: 'Lutt Le Gaya', artist: 'Dhurandhar', duration: '3:55', cover: '/gallery/promo-elegance.jpg', audioSrc: '/music/Lutt%20Le%20Gaya%20Lyrical%20Dhurandhar%20Ranveer%20Singh%20Akshaye%20Khanna%20Shashwat%20Sachdev%20Simran%20C.mp3', language: 'Hindi', era: 'Latest' },
    { id: 98, title: 'Param Sundari', artist: 'Mimi', duration: '4:08', cover: '/bottle2.jpeg', audioSrc: '/music/Pardesiya%20Param%20Sundari%20Sidharth%20M%20Janhvi%20K%20Sachin%20Jigar%20Sonu%20Nigam%20Krishnakali%20Amitabh%20B.mp3', language: 'Hindi', era: 'Latest' },
    { id: 99, title: 'Tere Pyaar Mein', artist: 'Tu Jhoothi Main Makkaar', duration: '4:42', cover: '/bottle3.jpeg', audioSrc: '/music/Tere%20Pyaar%20Mein%20Full%20Video%20Tu%20Jhoothi%20Main%20Makkaar%20Ranbir%20Shraddha%20Pritam%20Arijit%20Nikhita%20Amitabh.mp3', language: 'Hindi', era: 'Latest' },

    // ── Latest (2020s) Kannada ──
    { id: 66, title: 'Idre Nemdiyaag Irbek', artist: 'The Devil', duration: '4:55', cover: '/gallery/promo-serenity.jpg', audioSrc: '/music/idre-nemdiyaag.mp3', language: 'Kannada', era: 'Latest' },
    { id: 67, title: 'Bangle Bangari', artist: 'EKKA', duration: '5:08', cover: '/gallery/promo-elegance.jpg', audioSrc: '/music/bangle-bangari.mp3', language: 'Kannada', era: 'Latest' },
    { id: 68, title: 'Ayyo Sivane', artist: 'Cult', duration: '4:15', cover: '/bottle2.jpeg', audioSrc: '/music/ayyo-sivane.mp3', language: 'Kannada', era: 'Latest' },
    { id: 69, title: 'Shiva Shiva', artist: 'KD', duration: '3:42', cover: '/bottle3.jpeg', audioSrc: '/music/shiva-shiva.mp3', language: 'Kannada', era: 'Latest' },
    { id: 129, title: 'Nee Sigoovaregu', artist: 'Bhajarangi 2', duration: '4:22', cover: '/bottle4.jpeg', audioSrc: '/music/Bhajarangi%202%20Nee%20Sigoovaregu%20Dr.Shivarajkumar%20Sid%20Sriram%20Bhavana%20Arjun%20Janya%20K.Kalyan%20A.Harsha.mp3', language: 'Kannada', era: 'Latest' },
    { id: 130, title: 'Brahmakalasha', artist: 'Kantara', duration: '3:58', cover: '/gallery/promo-serenity.jpg', audioSrc: '/music/Brahmakalasha%20Kannada%20Video%20Song%20Kantara%20Chapter%201%20Rishab%20Shetty%20Rukmini%20Hombale%20Films.mp3', language: 'Kannada', era: 'Latest' },
    { id: 131, title: 'Dhamaka', artist: 'Siddu Moolimani', duration: '4:10', cover: '/gallery/promo-elegance.jpg', audioSrc: '/music/Dhamaka%20Naanu%20Hogoku%20Modlu%20Video%20Song%20Siddu%20Moolimani%20Priya%20J%20Achar%20Shivraj%20KR%20Pete%20Nayana.mp3', language: 'Kannada', era: 'Latest' },
    { id: 132, title: 'Naavaduva Nudiye', artist: 'Gandhada Gudi 2', duration: '4:35', cover: '/bottle2.jpeg', audioSrc: '/music/Naavaduva%20Nudiye%20Kannada%20Nudi%20Video%20Song%20Gandhada%20Gudi%202%20Dr.Shivarajkumar%20Dr%20Rajkumar.mp3', language: 'Kannada', era: 'Latest' },
    { id: 133, title: 'Sapta Sagaradaache Ello', artist: 'Sapta Sagaradaache Ello', duration: '4:48', cover: '/bottle3.jpeg', audioSrc: '/music/Sapta%20Sagaradaache%20Ello%20Title%20Track%20Rakshit%20Shetty%20Rukmini%20Hemanth%20M%20Rao%20Charan%20Raj%20Kapil.mp3', language: 'Kannada', era: 'Latest' },
    { id: 134, title: 'Singara Siriye', artist: 'Kantara', duration: '4:05', cover: '/bottle4.jpeg', audioSrc: '/music/Kantara%20Singara%20Siriye%20Rishab%20Shetty%20Vijay%20Prakash%20Ananya%20Bhat%20Ajaneesh%20Loknath%20Hombale%20Films.mp3', language: 'Kannada', era: 'Latest' },
    { id: 135, title: 'Sojugada Soojumallige', artist: 'GGVV', duration: '4:18', cover: '/gallery/promo-serenity.jpg', audioSrc: '/music/Sojugada%20Soojumallige%20Video%20Song%20GGVV%20I%20Raj%20B%20Shetty%20I%20Midhun%20Mukundan%20I%20Chaithra%20J%20Achar.mp3', language: 'Kannada', era: 'Latest' },
    { id: 136, title: 'Sulthana', artist: 'KGF Chapter 2', duration: '3:52', cover: '/gallery/promo-elegance.jpg', audioSrc: '/music/Sulthana%20Video%20Song%20Kannada%20KGF%20Chapter%202%20RockingStar%20Yash%20Prashanth%20Neel%20Ravi%20Basrur%20Hombale.mp3', language: 'Kannada', era: 'Latest' },
    { id: 137, title: 'Thoogire Rangana', artist: 'Dr. Vidyabhushana', duration: '4:25', cover: '/bottle2.jpeg', audioSrc: '/music/Thoogire%20Rangana%20Kannada%20New%20Lyrical%20Video%20Dr.Vidyabhushana%20Shri%20Purandara%20Dasaru.mp3', language: 'Kannada', era: 'Latest' },
    { id: 138, title: 'Toofan', artist: 'KGF Chapter 2', duration: '4:12', cover: '/bottle3.jpeg', audioSrc: '/music/Full%20Video%20Toofan%20Kannada%20KGF%20Chapter%202%20RockingStar%20Yash%20Prashanth%20Neel%20Ravi%20Basrur%20Hombale.mp3', language: 'Kannada', era: 'Latest' },
    { id: 139, title: 'Varaha Roopam', artist: 'Kantara', duration: '4:42', cover: '/bottle4.jpeg', audioSrc: '/music/Kantara%20Varaha%20Roopam%20Video%20Song%20Rishab%20Shetty%20Ajaneesh%20Loknath%20Vijay%20Kiragandur%20Hombale%20Films.mp3', language: 'Kannada', era: 'Latest' },
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
