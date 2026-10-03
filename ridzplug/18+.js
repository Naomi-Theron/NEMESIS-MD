const axios = require('axios');

module.exports = [
    {
        command: ['18+', 'leakvid'],
        operate: async ({ ridzcoder, m, reply, from }) => {
            try {
                await reply("⏳ Fetching leak video...");

                const videoUrl = "https://arslan-apis-v2.vercel.app/leakvideos";

                await ridzcoder.sendMessage(from || m.chat, {
                    video: { url: videoUrl },
                    mimetype: "video/mp4",
                    caption: `🎬 *Random Leak Video*\n\n> ${global.wm || ''}`,
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
                await reply("⏳ Fetching leak video...");

                const videoUrl = "https://arslan-apis-v2.vercel.app/leakvideos2";

                await ridzcoder.sendMessage(from || m.chat, {
                    video: { url: videoUrl },
                    mimetype: "video/mp4",
                    caption: `🔥 *Random Leak Video 2*\n\n> ${global.wm || ''}`,
                    contextInfo: { mentionedJid: [m.sender] }
                }, { quoted: m });

            } catch (err) {
                console.error('Leakvideo2 error:', err);
                reply("❌ Failed to load video.");
            }
        }
    }
];