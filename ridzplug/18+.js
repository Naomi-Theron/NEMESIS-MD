const axios = require('axios');

module.exports = [
    {
        command: ['18+', 'leakvid'],
        operate: async ({ ridzcoder, m, reply, from }) => {
            try {
                await reply("⏳ Fetching Adult video...");

                const videoUrl = "https://arslan-apis-v2.vercel.app/leakvideos";

                await ridzcoder.sendMessage(from || m.chat, {
                    video: { url: videoUrl },
                    mimetype: "video/mp4",
                    caption: `🎬 *Random Adult Video*\n\n> ${global.wm || ''}`,
                    contextInfo: { mentionedJid: [m.sender] }
                }, { quoted: m });

            } catch (err) {
                console.error('Leakvideo error:', err);
                reply("❌ Failed to load video.");
            }
        }
    },
    {
        command: ['leakvideo', 'leakvid2'],
        operate: async ({ ridzcoder, m, reply, from }) => {
            try {
                await reply("⏳ Fetching Adult video...");

                const videoUrl = "https://arslan-apis-v2.vercel.app/leakvideos2";

                await ridzcoder.sendMessage(from || m.chat, {
                    video: { url: videoUrl },
                    mimetype: "video/mp4",
                    caption: `🔥 *Random Adult Video 2*\n\n> ${global.wm || ''}`,
                    contextInfo: { mentionedJid: [m.sender] }
                }, { quoted: m });

            } catch (err) {
                console.error('Leakvideo2 error:', err);
                reply("❌ Failed to load video.");
            }
        }
    },
    {
        command: ['cosplaytele', 'cosplay', 'costele'],
        operate: async ({ ridzcoder, m, reply, text, args, prefix }) => {
            const query = text || args.join(' ');

            if (!query) return reply(`📌 *Usage:* ${prefix}cosplaytele <query>\n📌 *Example:* ${prefix}cosplaytele genshin`);

            try {
                await ridzcoder.sendMessage(m.chat, { react: { text: "🔍", key: m.key } });

                const apiUrl = `https://apis.davidcyril.name.ng/xxx/cosplaytele?q=${encodeURIComponent(query)}`;
                const response = await fetch(apiUrl, {
                    method: 'GET',
                    headers: { 'X-API-Key': 'dc_live_0e4LwwrTNGh-FVPp9kxe9WH0c5Jt6TvT' }
                });
                const data = await response.json();

                const results =
                    data?.result ||
                    data?.results ||
                    data?.data ||
                    (Array.isArray(data) ? data : null);

                if (!results || (Array.isArray(results) && results.length === 0)) {
                    console.log('cosplaytele response:', JSON.stringify(data));
                    throw new Error('No results found');
                }

                const items = Array.isArray(results) ? results.slice(0, 5) : [results];

                let sentCount = 0;
                for (const item of items) {
                    const imgUrl = item?.image || item?.url || item?.img || item?.photo || item?.video || (typeof item === 'string' ? item : null);
                    if (!imgUrl) continue;

                    const isVideo = /\.(mp4|webm|mov)$/i.test(imgUrl);

                    try {
                        if (isVideo) {
                            await ridzcoder.sendMessage(m.chat, {
                                video: { url: imgUrl },
                                mimetype: "video/mp4",
                                caption: `🎭 *Cosplay* (${sentCount + 1})\n🔍 ${query}\n\n> ${global.wm || ''}`
                            }, { quoted: m });
                        } else {
                            await ridzcoder.sendMessage(m.chat, {
                                image: { url: imgUrl },
                                caption: `🎭 *Cosplay* (${sentCount + 1})\n🔍 ${query}\n\n> ${global.wm || ''}`
                            }, { quoted: m });
                        }
                        sentCount++;
                    } catch (sendErr) {
                        console.error('cosplaytele send error:', sendErr);
                    }
                }

                if (sentCount === 0) throw new Error('No media URLs found');

                await ridzcoder.sendMessage(m.chat, { react: { text: "✅", key: m.key } });
            } catch (e) {
                console.error('cosplaytele error:', e);
                await ridzcoder.sendMessage(m.chat, { react: { text: "❌", key: m.key } });
                reply(`❌ Failed to fetch cosplay for "${query}". ${e.message}`);
            }
        }
    },
    {
        command: ['leaktube', 'ltube'],
        operate: async ({ ridzcoder, m, reply }) => {
            try {
                await ridzcoder.sendMessage(m.chat, { react: { text: "🎬", key: m.key } });

                const apiUrl = `https://apis.davidcyril.name.ng/leaktube`;
                const response = await fetch(apiUrl, {
                    method: 'GET',
                    headers: { 'X-API-Key': 'dc_live_0e4LwwrTNGh-FVPp9kxe9WH0c5Jt6TvT' }
                });
                const data = await response.json();

                const videoUrl =
                    data?.result?.video_url ||
                    data?.result?.url ||
                    data?.result?.video ||
                    data?.video_url ||
                    data?.url ||
                    data?.video ||
                    data?.data?.video_url ||
                    data?.data?.url ||
                    (typeof data?.result === 'string' ? data.result : null);

                if (!videoUrl) {
                    console.log('leaktube response:', JSON.stringify(data));
                    throw new Error('No video URL in response');
                }

                await ridzcoder.sendMessage(m.chat, {
                    video: { url: videoUrl },
                    mimetype: "video/mp4",
                    caption: `🎬 *LeakTube*\n\n> ${global.wm || ''}`
                }, { quoted: m });

                await ridzcoder.sendMessage(m.chat, { react: { text: "✅", key: m.key } });

            } catch (e) {
                console.error('leaktube error:', e);
                await ridzcoder.sendMessage(m.chat, { react: { text: "❌", key: m.key } });
                reply("❌ Failed to fetch LeakTube video. Try again later.");
            }
        }
    }
];