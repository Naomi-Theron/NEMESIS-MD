const fetch = require('node-fetch');

module.exports = [
    // ─────────────────────────────────────────────
    // CHRISTIANITY - BIBLE
    // ─────────────────────────────────────────────
    {
        command: ['bible'],
        operate: async ({ reply, m, text, prefix }) => {
            const BASE_URL = "https://bible-api.com";

            try {
                let chapterInput = text.split(" ").join("").trim();
                if (!chapterInput) {
                    throw new Error(`*Please specify the chapter number or name. Example: ${prefix}bible John 3:16*`);
                }
                chapterInput = encodeURIComponent(chapterInput);
                let chapterRes = await fetch(`${BASE_URL}/${chapterInput}`);
                if (!chapterRes.ok) {
                    throw new Error(`*Please specify the chapter number or name. Example: ${prefix}bible John 3:16*`);
                }

                let chapterData = await chapterRes.json();
                let bibleChapter = `
╭──⧼♛*The Holy Bible*\n
│┃ ♛*Chapter ${chapterData.reference}*\n
│┃ ♛Type: ${chapterData.translation_name}\n
│┃ ♛Number of verses: ${chapterData.verses.length}\n
│┃ ♛*Chapter Content:*\n
${chapterData.text}\n
╰────────────────≽`;

                reply(bibleChapter);
            } catch (error) {
                reply(`Error: ${error.message}`);
            }
        }
    },
    {
        command: ['biblelist'],
        operate: async ({ reply, m, ridzcoder, getSetting }) => {
            try {
                const bibleList = `
╭──⧼♛📜 *Old Testament*:
│┃ ♛ 1. Genesis
│┃ ♛ 2. Exodus
│┃ ♛ 3. Leviticus
│┃ ♛ 4. Numbers
│┃ ♛ 5. Deuteronomy
│┃ ♛ 6. Joshua
│┃ ♛ 7. Judges
│┃ ♛ 8. Ruth
│┃ ♛ 9. 1 Samuel
│┃ ♛ 10. 2 Samuel
│┃ ♛ 11. 1 Kings
│┃ ♛ 12. 2 Kings
│┃ ♛ 13. 1 Chronicles
│┃ ♛ 14. 2 Chronicles
│┃ ♛ 15. Ezra
│┃ ♛ 16. Nehemiah
│┃ ♛ 17. Esther
│┃ ♛ 18. Job
│┃ ♛ 19. Psalms
│┃ ♛ 20. Proverbs
│┃ ♛ 21. Ecclesiastes
│┃ ♛ 22. Song of Solomon
│┃ ♛ 23. Isaiah
│┃ ♛ 24. Jeremiah
│┃ ♛ 25. Lamentations
│┃ ♛ 26. Ezekiel
│┃ ♛ 27. Daniel
│┃ ♛ 28. Hosea
│┃ ♛ 29. Joel
│┃ ♛ 30. Amos
│┃ ♛ 31. Obadiah
│┃ ♛ 32. Jonah
│┃ ♛ 33. Micah
│┃ ♛ 34. Nahum
│┃ ♛ 35. Habakkuk
│┃ ♛ 36. Zephaniah
│┃ ♛ 37. Haggai
│┃ ♛ 38. Zechariah
│┃ ♛ 39. Malachi
╰────────────────≽

╭──⧼♛📖 *New Testament*:
│┃ ♛ 1. Matthew
│┃ ♛ 2. Mark
│┃ ♛ 3. Luke
│┃ ♛ 4. John
│┃ ♛ 5. Acts
│┃ ♛ 6. Romans
│┃ ♛ 7. 1 Corinthians
│┃ ♛ 8. 2 Corinthians
│┃ ♛ 9. Galatians
│┃ ♛ 10. Ephesians
│┃ ♛ 11. Philippians
│┃ ♛ 12. Colossians
│┃ ♛ 13. 1 Thessalonians
│┃ ♛ 14. 2 Thessalonians
│┃ ♛ 15. 1 Timothy
│┃ ♛ 16. 2 Timothy
│┃ ♛ 17. Titus
│┃ ♛ 18. Philemon
│┃ ♛ 19. Hebrews
│┃ ♛ 20. James
│┃ ♛ 21. 1 Peter
│┃ ♛ 22. 2 Peter
│┃ ♛ 23. 1 John
│┃ ♛ 24. 2 John
│┃ ♛ 25. 3 John
│┃ ♛ 26. Jude
│┃ ♛ 27. Revelation
╰────────────────≽

💢 ${getSetting ? getSetting('botname', 'Nemesis') : 'Nemesis'} 💢
`;

                const imageUrl = "https://files.catbox.moe/dynze8.png";

                if (!m.chat) {
                    return reply("❌ *An error occurred: Invalid chat.*");
                }

                await ridzcoder.sendMessage(m.chat, {
                    image: { url: imageUrl },
                    caption: `📖 *NEMESIS MD BIBLE LIST*:\n\n` +
                             `Here is the complete list of books in the Bible:\n\n` +
                             bibleList.trim()
                }, { quoted: m });
            } catch (error) {
                console.error(error);
                reply("❌ *An error occurred while fetching the Bible list. Please try again.*");
            }
        }
    },
    {
        command: ['verse', 'dailyverse', 'bibleverse'],
        operate: async ({ reply, m, text }) => {
            try {
                const verses = [
                    "John 3:16", "Psalm 23:1", "Philippians 4:13", "Romans 8:28",
                    "Jeremiah 29:11", "Proverbs 3:5-6", "Isaiah 40:31", "Matthew 11:28",
                    "Joshua 1:9", "Psalm 46:10", "1 Corinthians 13:4-7", "Romans 12:2"
                ];
                const random = verses[Math.floor(Math.random() * verses.length)];
                const res = await fetch(`https://bible-api.com/${encodeURIComponent(random)}`);
                const data = await res.json();
                reply(`📖 *Verse of the Day*\n\n*${data.reference}*\n\n${data.text}\n\n— ${data.translation_name}`);
            } catch (e) {
                reply("Error fetching verse.");
            }
        }
    },

    // ─────────────────────────────────────────────
    // ISLAM - QURAN
    // ─────────────────────────────────────────────
    {
        command: ['quran'],
        operate: async ({ reply, m, ridzcoder, text }) => {
            try {
                const surahNumber = parseInt(text.trim());

                if (!text || isNaN(surahNumber)) {
                    await ridzcoder.sendMessage(m.chat, { text: "Usage: .quran <surah_number>\nExample: .quran 1" });
                    return;
                }

                const url = `https://apis.davidcyril.name.ng/quran?surah=${surahNumber}`;
                const res = await fetch(url);
                const data = await res.json();

                if (!data.success) {
                    await ridzcoder.sendMessage(m.chat, { text: "Could not fetch Surah. Please try another number." });
                    return;
                }

                const { number, name, type, ayahCount, tafsir, recitation } = data.surah;

                let replyText = `📖 *${name.english}* (${name.arabic})\n`;
                replyText += `Number: ${number} | Type: ${type} | Ayahs: ${ayahCount}\n\n`;
                replyText += `Tafsir: ${tafsir.id}`;

                await ridzcoder.sendMessage(m.chat, { text: replyText });

                await ridzcoder.sendMessage(m.chat, {
                    audio: { url: recitation },
                    mimetype: "audio/mpeg",
                    mp3: true
                }, { quoted: m });

            } catch (err) {
                await ridzcoder.sendMessage(m.chat, { text: "Error fetching Surah. Try again later." });
                console.error("Quran command error:", err.message);
            }
        }
    },
    {
        command: ['quranlist', 'surahlist'],
        operate: async ({ ridzcoder, m }) => {
            try {
                const surahs = `📖 *THE HOLY QURAN - 114 SURAHS*

1. Al-Fatihah (The Opening)
2. Al-Baqarah (The Cow)
3. Ali 'Imran (Family of Imran)
4. An-Nisa (The Women)
5. Al-Ma'idah (The Table Spread)
6. Al-An'am (The Cattle)
7. Al-A'raf (The Heights)
8. Al-Anfal (The Spoils of War)
9. At-Tawbah (The Repentance)
10. Yunus (Jonah)
11. Hud
12. Yusuf (Joseph)
13. Ar-Ra'd (The Thunder)
14. Ibrahim (Abraham)
15. Al-Hijr (The Rocky Tract)
16. An-Nahl (The Bee)
17. Al-Isra (The Night Journey)
18. Al-Kahf (The Cave)
19. Maryam (Mary)
20. Ta-Ha
21. Al-Anbya (The Prophets)
22. Al-Hajj (The Pilgrimage)
23. Al-Mu'minun (The Believers)
24. An-Nur (The Light)
25. Al-Furqan (The Criterion)
26. Ash-Shu'ara (The Poets)
27. An-Naml (The Ant)
28. Al-Qasas (The Stories)
29. Al-Ankabut (The Spider)
30. Ar-Rum (The Romans)

... (use .quran <number> to read any surah 1-114)

📌 *Example:* .quran 1 (Al-Fatihah)
📌 *Example:* .quran 2 (Al-Baqarah)

> ᴘᴏᴡᴇʀᴇᴅ ʙʏ NEMESIS MD`;

                await ridzcoder.sendMessage(m.chat, { text: surahs }, { quoted: m });
            } catch (e) {
                console.log('quranlist error:', e);
            }
        }
    },
    {
        command: ['hadith', 'dailyhadith'],
        operate: async ({ ridzcoder, m }) => {
            try {
                const hadiths = [
                    "The best among you are those who have the best manners and character. — Sahih Bukhari",
                    "None of you truly believes until he loves for his brother what he loves for himself. — Sahih Bukhari",
                    "The strong is not the one who overcomes the people by his strength, but the strong is the one who controls himself while in anger. — Sahih Bukhari",
                    "Do not wish to be like anyone except in two cases: A person whom Allah has given wealth and he spends it righteously, and a person whom Allah has given wisdom and he acts according to it. — Sahih Bukhari",
                    "He who does not thank people, does not thank Allah. — Sunan Abi Dawud",
                    "Allah is not kind to him who is not kind to people. — Sahih Muslim",
                    "The most beloved deeds to Allah are those done consistently, even if they are small. — Sahih Bukhari"
                ];
                const random = hadiths[Math.floor(Math.random() * hadiths.length)];
                ridzcoder.sendMessage(m.chat, { text: `🕌 *Hadith of the Day*\n\n${random}` }, { quoted: m });
            } catch (e) {
                console.log('hadith error:', e);
            }
        }
    },

    // ─────────────────────────────────────────────
    // JUDAISM - TORAH
    // ─────────────────────────────────────────────
    {
        command: ['torah', 'tanakh'],
        operate: async ({ reply, m, ridzcoder, text }) => {
            try {
                // Torah portions / weekly parsha
                const parshiot = [
                    { name: "Bereshit", book: "Genesis 1:1-6:8", summary: "Creation of the world, Adam and Eve, Cain and Abel, and the beginning of humanity." },
                    { name: "Noach", book: "Genesis 6:9-11:32", summary: "Noah's ark, the flood, the covenant of the rainbow, and the Tower of Babel." },
                    { name: "Lech-Lecha", book: "Genesis 12:1-17:27", summary: "God calls Abraham to leave his homeland and go to Canaan." },
                    { name: "Vayeira", book: "Genesis 18:1-22:24", summary: "Abraham's hospitality, Sodom and Gomorrah, and the binding of Isaac." },
                    { name: "Chayei Sarah", book: "Genesis 23:1-25:18", summary: "The death of Sarah and finding a wife for Isaac." },
                    { name: "Toldot", book: "Genesis 25:19-28:9", summary: "The birth of Jacob and Esau and Jacob's blessing." },
                    { name: "Vayetzei", book: "Genesis 28:10-32:3", summary: "Jacob's ladder and his journey to Haran." },
                    { name: "Vayishlach", book: "Genesis 32:4-36:43", summary: "Jacob wrestles with the angel and reunites with Esau." },
                    { name: "Vayeshev", book: "Genesis 37:1-40:23", summary: "Joseph's dreams and his sale into slavery." },
                    { name: "Miketz", book: "Genesis 41:1-44:17", summary: "Joseph interprets Pharaoh's dreams and becomes viceroy of Egypt." }
                ];
                
                if (!text) {
                    let list = `✡️ *TORAH - Weekly Portions (Parshot)*\n\n`;
                    parshiot.forEach((p, i) => {
                        list += `${i + 1}. *${p.name}* — ${p.book}\n`;
                    });
                    list += `\n📌 Use: .torah <number> for details\n📌 Example: .torah 1`;
                    return reply(list);
                }

                const idx = parseInt(text.trim()) - 1;
                if (isNaN(idx) || idx < 0 || idx >= parshiot.length) {
                    return reply("❌ Invalid number. Use .torah to see the list (1-10).");
                }

                const p = parshiot[idx];
                await ridzcoder.sendMessage(m.chat, {
                    text: `✡️ *Torah Portion*\n\n📜 *${p.name}*\n📖 *Reading:* ${p.book}\n\n📝 *Summary:*\n${p.summary}\n\n> ᴘᴏᴡᴇʀᴇᴅ ʙʏ NEMESIS MD`
                }, { quoted: m });

            } catch (e) {
                console.log('torah error:', e);
                reply("Error fetching Torah portion.");
            }
        }
    },
    {
        command: ['jewishquote', 'torahquote'],
        operate: async ({ ridzcoder, m }) => {
            try {
                const quotes = [
                    "Who is wise? He who learns from every person. — Pirkei Avot 4:1",
                    "It is not your duty to finish the work, but neither are you at liberty to neglect it. — Pirkei Avot 2:16",
                    "The world stands on three things: Torah, worship, and acts of loving kindness. — Pirkei Avot 1:2",
                    "Love peace and pursue peace. — Pirkei Avot 1:12",
                    "Do not separate yourself from the community. — Pirkei Avot 2:4",
                    "In a place where there are no men, strive to be a man. — Pirkei Avot 2:5",
                    "Repentance, prayer, and charity avert the severe decree. — High Holiday Liturgy"
                ];
                const random = quotes[Math.floor(Math.random() * quotes.length)];
                ridzcoder.sendMessage(m.chat, { text: `✡️ *Jewish Wisdom*\n\n${random}` }, { quoted: m });
            } catch (e) {
                console.log('jewishquote error:', e);
            }
        }
    },

    // ─────────────────────────────────────────────
    // HINDUISM - BHAGAVAD GITA
    // ─────────────────────────────────────────────
    {
        command: ['gita', 'bhagavadgita'],
        operate: async ({ reply, m, ridzcoder, text }) => {
            try {
                const res = await fetch('https://bhagavad-gita3.p.rapidapi.com/v2/chapters/?limit=18', {
                    method: 'GET',
                    headers: {
                        'X-RapidAPI-Key': 'demo',
                        'X-RapidAPI-Host': 'bhagavad-gita3.p.rapidapi.com'
                    }
                }).catch(() => null);

                // Fallback to a static list if API fails
                const chapters = [
                    { num: 1, name: "Arjuna Visada Yoga", meaning: "The Yoga of Arjuna's Dejection", verses: 47 },
                    { num: 2, name: "Sankhya Yoga", meaning: "The Yoga of Knowledge", verses: 72 },
                    { num: 3, name: "Karma Yoga", meaning: "The Yoga of Action", verses: 43 },
                    { num: 4, name: "Jnana Karma Sanyasa Yoga", meaning: "The Yoga of Knowledge and Action", verses: 42 },
                    { num: 5, name: "Karma Sanyasa Yoga", meaning: "The Yoga of Renunciation", verses: 29 },
                    { num: 6, name: "Dhyana Yoga", meaning: "The Yoga of Meditation", verses: 47 },
                    { num: 7, name: "Jnana Vijnana Yoga", meaning: "The Yoga of Knowledge and Wisdom", verses: 30 },
                    { num: 8, name: "Aksara Brahma Yoga", meaning: "The Yoga of the Imperishable Brahman", verses: 28 },
                    { num: 9, name: "Raja Vidya Raja Guhya Yoga", meaning: "The Yoga of Royal Knowledge", verses: 34 },
                    { num: 10, name: "Vibhuti Yoga", meaning: "The Yoga of Divine Glories", verses: 42 },
                    { num: 11, name: "Visvarupa Darsana Yoga", meaning: "The Yoga of the Universal Form", verses: 55 },
                    { num: 12, name: "Bhakti Yoga", meaning: "The Yoga of Devotion", verses: 20 },
                    { num: 13, name: "Ksetra Ksetrajna Vibhaga Yoga", meaning: "The Yoga of the Field and Knower", verses: 35 },
                    { num: 14, name: "Gunatraya Vibhaga Yoga", meaning: "The Yoga of the Three Gunas", verses: 27 },
                    { num: 15, name: "Purusottama Yoga", meaning: "The Yoga of the Supreme Person", verses: 20 },
                    { num: 16, name: "Daivasura Sampad Vibhaga Yoga", meaning: "The Yoga of Divine and Demonic Natures", verses: 24 },
                    { num: 17, name: "Sraddhatraya Vibhaga Yoga", meaning: "The Yoga of the Threefold Faith", verses: 28 },
                    { num: 18, name: "Moksa Sanyasa Yoga", meaning: "The Yoga of Liberation", verses: 78 }
                ];

                if (!text) {
                    let list = `🕉️ *BHAGAVAD GITA - 18 CHAPTERS*\n\n`;
                    chapters.forEach(c => {
                        list += `*${c.num}. ${c.name}*\n   ${c.meaning} (${c.verses} verses)\n\n`;
                    });
                    list += `📌 Use: .gita <number>\n📌 Example: .gita 2`;
                    return reply(list);
                }

                const num = parseInt(text.trim());
                if (isNaN(num) || num < 1 || num > 18) {
                    return reply("❌ Invalid chapter. Choose 1-18. Use .gita to see list.");
                }

                const ch = chapters[num - 1];
                await ridzcoder.sendMessage(m.chat, {
                    text: `🕉️ *BHAGAVAD GITA - Chapter ${ch.num}*\n\n📖 *${ch.name}*\n💡 *Meaning:* ${ch.meaning}\n📊 *Verses:* ${ch.verses}\n\n_"You have the right to work, but never to the fruit of work."_ — BG 2.47\n\n> ᴘᴏᴡᴇʀᴇᴅ ʙʏ NEMESIS MD`
                }, { quoted: m });

            } catch (e) {
                console.log('gita error:', e);
                reply("Error fetching Gita chapter.");
            }
        }
    },
    {
        command: ['gitaverse', 'krishnaquote'],
        operate: async ({ ridzcoder, m }) => {
            try {
                const verses = [
                    { ref: "2.47", text: "You have a right to perform your prescribed duties, but you are not entitled to the fruits of your actions." },
                    { ref: "2.20", text: "The soul is neither born, and nor does it die at any time. It is eternal, unborn, and ever-existing." },
                    { ref: "4.7-8", text: "Whenever there is a decline in righteousness, I manifest Myself. For the protection of the good and destruction of the wicked." },
                    { ref: "6.5", text: "Elevate yourself through the power of your mind, and not degrade yourself, for the mind can be the friend and also the enemy of the self." },
                    { ref: "9.22", text: "To those who are constantly devoted and worship Me with love, I give the understanding by which they can come to Me." },
                    { ref: "18.66", text: "Abandon all varieties of dharma and simply surrender unto Me alone. I shall liberate you from all sinful reactions; do not fear." },
                    { ref: "2.14", text: "Happiness and distress are temporary. They come and go like winter and summer seasons. One must learn to tolerate them without being disturbed." }
                ];
                const v = verses[Math.floor(Math.random() * verses.length)];
                ridzcoder.sendMessage(m.chat, { text: `🕉️ *Bhagavad Gita ${v.ref}*\n\n${v.text}` }, { quoted: m });
            } catch (e) {
                console.log('gitaverse error:', e);
            }
        }
    },

    // ─────────────────────────────────────────────
    // BUDDHISM - DHAMMAPADA
    // ─────────────────────────────────────────────
    {
        command: ['dhammapada', 'buddhaquote'],
        operate: async ({ ridzcoder, m, text }) => {
            try {
                const verses = [
                    { ref: "1:1", text: "All mental phenomena have mind as their forerunner; they have mind as their chief; they are mind-made. If one speaks or acts with an evil mind, suffering follows him just as the wheel follows the hoof of the ox." },
                    { ref: "1:2", text: "All mental phenomena have mind as their forerunner; they have mind as their chief; they are mind-made. If one speaks or acts with a pure mind, happiness follows him, like a shadow that never leaves him." },
                    { ref: "1:5", text: "Hatred is never appeased by hatred in this world. By non-hatred alone is hatred appeased. This is a law eternal." },
                    { ref: "2:1", text: "Wakefulness is the way to life. The fool sleeps as if he were already dead, but the master is awake and he lives forever." },
                    { ref: "5:1", text: "Better than a thousand hollow words is one word that brings peace." },
                    { ref: "10:1", text: "Better than a thousand useless verses is one useful verse, hearing which one attains peace." },
                    { ref: "13:1", text: "As a fletcher straightens an arrow, a wise man straightens his mind, which is fickle and unsteady, difficult to guard and difficult to control." },
                    { ref: "15:1", text: "He who delights in the destruction of life, and speaks falsely, and takes what is not given, and goes to the wife of another — such a man digs up his own root in this world." },
                    { ref: "20:1", text: "If you find no one to support you on the spiritual path, walk alone. There is no companionship with the immature." }
                ];
                const v = verses[Math.floor(Math.random() * verses.length)];
                ridzcoder.sendMessage(m.chat, { text: `☸️ *Dhammapada ${v.ref}*\n\n${v.text}\n\n_— The Buddha_` }, { quoted: m });
            } catch (e) {
                console.log('dhammapada error:', e);
            }
        }
    },
    {
        command: ['zen', 'zenquote'],
        operate: async ({ ridzcoder, m }) => {
            try {
                const res = await fetch('https://zenquotes.io/api/random');
                const data = await res.json();
                ridzcoder.sendMessage(m.chat, { text: `☸️ *Zen Wisdom*\n\n"${data[0].q}"\n\n— ${data[0].a}` }, { quoted: m });
            } catch (e) {
                const fallbacks = [
                    "Sitting quietly, doing nothing, spring comes, and the grass grows by itself. — Basho",
                    "The obstacle is the path. — Zen Proverb",
                    "When you realize nothing is lacking, the whole world belongs to you. — Lao Tzu",
                    "Let go of your mind and then be mindful. Close your ears and listen. — Rumi"
                ];
                const q = fallbacks[Math.floor(Math.random() * fallbacks.length)];
                ridzcoder.sendMessage(m.chat, { text: `☸️ *Zen Wisdom*\n\n${q}` }, { quoted: m });
            }
        }
    },

    // ─────────────────────────────────────────────
    // SIKHISM - GURU GRANTH SAHIB
    // ─────────────────────────────────────────────
    {
        command: ['gurbani', 'sikhquote'],
        operate: async ({ ridzcoder, m }) => {
            try {
                const quotes = [
                    "One who practices truth, contentment, compassion, and dharma — realize the essence of the One. — Guru Granth Sahib",
                    "Do not be proud of your youth, wealth, or power; these things are like a passing cloud. — Guru Granth Sahib",
                    "Nanak says: those who meditate on the Name of the Lord shall be saved. — Guru Granth Sahib",
                    "Truth is higher than everything; but higher still is truthful living. — Guru Nanak",
                    "There is no Hindu, there is no Muslim — only one humanity. — Guru Nanak",
                    "The Lord is the support of the soul, the breath of life, the wealth, and the peace. — Guru Granth Sahib",
                    "He who serves others with love is the true Sikh of the Guru. — Guru Granth Sahib"
                ];
                const q = quotes[Math.floor(Math.random() * quotes.length)];
                ridzcoder.sendMessage(m.chat, { text: `🪯 *Gurbani / Sikh Wisdom*\n\n${q}` }, { quoted: m });
            } catch (e) {
                console.log('gurbani error:', e);
            }
        }
    },

    // ─────────────────────────────────────────────
    // TAOISM - TAO TE CHING
    // ─────────────────────────────────────────────
    {
        command: ['tao', 'taoteching', 'laotzu'],
        operate: async ({ ridzcoder, m }) => {
            try {
                const verses = [
                    "The Tao that can be told is not the eternal Tao. The name that can be named is not the eternal name. — Tao Te Ching Ch. 1",
                    "When people see some things as beautiful, other things become ugly. When people see some things as good, other things become bad. — Tao Te Ching Ch. 2",
                    "The highest good is like water. Water gives life to the ten thousand things and does not strive. — Tao Te Ching Ch. 8",
                    "A journey of a thousand miles begins with a single step. — Tao Te Ching Ch. 64",
                    "Knowing others is intelligence; knowing yourself is true wisdom. Mastering others is strength; mastering yourself is true power. — Tao Te Ching Ch. 33",
                    "Nature does not hurry, yet everything is accomplished. — Lao Tzu",
                    "Care about what other people think and you will always be their prisoner. — Lao Tzu"
                ];
                const q = verses[Math.floor(Math.random() * verses.length)];
                ridzcoder.sendMessage(m.chat, { text: `☯️ *Taoist Wisdom*\n\n${q}` }, { quoted: m });
            } catch (e) {
                console.log('tao error:', e);
            }
        }
    },

    // ─────────────────────────────────────────────
    // UNIVERSAL - DAILY INSPIRATION
    // ─────────────────────────────────────────────
    {
        command: ['verse365', 'inspiration'],
        operate: async ({ ridzcoder, m }) => {
            try {
                const sources = [
                    { name: "🕉️ Bhagavad Gita", text: "Set thy heart upon thy work, but never on its reward." },
                    { name: "✡️ Pirkei Avot", text: "Who is wise? He who learns from every person." },
                    { name: "✝️ Bible", text: "I can do all things through Christ who strengthens me. — Philippians 4:13" },
                    { name: "☪️ Quran", text: "Verily, with hardship comes ease. — Surah Ash-Sharh 94:6" },
                    { name: "☸️ Dhammapada", text: "Better than a thousand hollow words is one word that brings peace." },
                    { name: "🪯 Gurbani", text: "Truth is higher than everything; but higher still is truthful living." },
                    { name: "☯️ Tao Te Ching", text: "A journey of a thousand miles begins with a single step." }
                ];
                const s = sources[Math.floor(Math.random() * sources.length)];
                ridzcoder.sendMessage(m.chat, {
                    text: `🌍 *Daily Spiritual Wisdom*\n\n*${s.name}*\n\n"${s.text}"\n\n> ᴘᴏᴡᴇʀᴇᴅ ʙʏ NEMESIS MD`
                }, { quoted: m });
            } catch (e) {
                console.log('verse365 error:', e);
            }
        }
    }
]