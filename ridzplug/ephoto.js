const axios = require('axios');

module.exports = [
    {
        command: ['glossysilver', 'glossy'],
           react: "🍹", 
        operate: async ({ ridzcoder, m, reply, text, prefix }) => {
            if (!text) return reply(`📌 *Usage:* ${prefix}glossysilver <text>`);
            try {
                await ridzcoder.sendMessage(m.chat, { react: { text: "🎨", key: m.key } });
                const apiUrl = `https://api.princetechn.com/api/ephoto360/glossysilver?apikey=prince&text=${encodeURIComponent(text)}`;
                const { data } = await axios.get(apiUrl);
                if (!data.success || !data.result?.image_url) throw new Error('ɴᴏ ɪᴍᴀɢᴇ');
                await ridzcoder.sendMessage(m.chat, {
                    image: { url: data.result.image_url },
                    caption: `✨ *ɢʟᴏꜱꜱʏ ꜱɪʟᴠᴇʀ*\n\n> ${global.wm || ''}`
                }, { quoted: m });
                await ridzcoder.sendMessage(m.chat, { react: { text: "✅", key: m.key } });
            } catch (e) {
                console.error('glossysilver error:', e);
                await ridzcoder.sendMessage(m.chat, { react: { text: "❌", key: m.key } });
                reply("ꜰᴀɪʟᴇᴅ ᴛᴏ ɢᴇɴᴇʀᴀᴛᴇ ɪᴍᴀɢᴇ.");
            }
        }
    },
    {
        command: ['writetext', 'wtext'],
    react: "🍹",
        operate: async ({ ridzcoder, m, reply, text, prefix }) => {
            if (!text) return reply(`📌 *Usage:* ${prefix}writetext <text>`);
            try {
                await ridzcoder.sendMessage(m.chat, { react: { text: "🎨", key: m.key } });
                const apiUrl = `https://api.princetechn.com/api/ephoto360/writetext?apikey=prince&text=${encodeURIComponent(text)}`;
                const { data } = await axios.get(apiUrl);
                if (!data.success || !data.result?.image_url) throw new Error('ɴᴏ ɪᴍᴀɢᴇ');
                await ridzcoder.sendMessage(m.chat, {
                    image: { url: data.result.image_url },
                    caption: `✍️ *ᴡʀɪᴛᴇ ᴛᴇxᴛ*\n\n> ${global.wm || ''}`
                }, { quoted: m });
                await ridzcoder.sendMessage(m.chat, { react: { text: "✅", key: m.key } });
            } catch (e) {
                console.error('writetext error:', e);
                await ridzcoder.sendMessage(m.chat, { react: { text: "❌", key: m.key } });
                reply("ꜰᴀɪʟᴇᴅ ᴛᴏ ɢᴇɴᴇʀᴀᴛᴇ ɪᴍᴀɢᴇ.");
            }
        }
    },
    {
        command: ['blackpinklogo', 'bplogo'],
    react: "🍹",
        operate: async ({ ridzcoder, m, reply, text, prefix }) => {
            if (!text) return reply(`📌 *Usage:* ${prefix}blackpinklogo <text>`);
            try {
                await ridzcoder.sendMessage(m.chat, { react: { text: "🎨", key: m.key } });
                const apiUrl = `https://api.princetechn.com/api/ephoto360/blackpinklogo?apikey=prince&text=${encodeURIComponent(text)}`;
                const { data } = await axios.get(apiUrl);
                if (!data.success || !data.result?.image_url) throw new Error('ɴᴏ ɪᴍᴀɢᴇ');
                await ridzcoder.sendMessage(m.chat, {
                    image: { url: data.result.image_url },
                    caption: `🖤 *ʙʟᴀᴄᴋ ᴘɪɴᴋ ʟᴏɢᴏ*\n\n> ${global.wm || ''}`
                }, { quoted: m });
                await ridzcoder.sendMessage(m.chat, { react: { text: "✅", key: m.key } });
            } catch (e) {
                console.error('blackpinklogo error:', e);
                await ridzcoder.sendMessage(m.chat, { react: { text: "❌", key: m.key } });
                reply("ꜰᴀɪʟᴇᴅ ᴛᴏ ɢᴇɴᴇʀᴀᴛᴇ ɪᴍᴀɢᴇ.");
            }
        }
    },
    {
        command: ['glitchtext', 'glitch'],
    react: "🍹",
        operate: async ({ ridzcoder, m, reply, text, prefix }) => {
            if (!text) return reply(`📌 *Usage:* ${prefix}glitchtext <text>`);
            try {
                await ridzcoder.sendMessage(m.chat, { react: { text: "🎨", key: m.key } });
                const apiUrl = `https://api.princetechn.com/api/ephoto360/glitchtext?apikey=prince&text=${encodeURIComponent(text)}`;
                const { data } = await axios.get(apiUrl);
                if (!data.success || !data.result?.image_url) throw new Error('ɴᴏ ɪᴍᴀɢᴇ');
                await ridzcoder.sendMessage(m.chat, {
                    image: { url: data.result.image_url },
                    caption: `⚡ *ɢʟɪᴛᴄʜ ᴛᴇxᴛ*\n\n> ${global.wm || ''}`
                }, { quoted: m });
                await ridzcoder.sendMessage(m.chat, { react: { text: "✅", key: m.key } });
            } catch (e) {
                console.error('glitchtext error:', e);
                await ridzcoder.sendMessage(m.chat, { react: { text: "❌", key: m.key } });
                reply("ꜰᴀɪʟᴇᴅ ᴛᴏ ɢᴇɴᴇʀᴀᴛᴇ ɪᴍᴀɢᴇ.");
            }
        }
    },
    {
        command: ['advancedglow', 'aglow'],
    react: "🍹",
        operate: async ({ ridzcoder, m, reply, text, prefix }) => {
            if (!text) return reply(`📌 *Usage:* ${prefix}advancedglow <text>`);
            try {
                await ridzcoder.sendMessage(m.chat, { react: { text: "🎨", key: m.key } });
                const apiUrl = `https://api.princetechn.com/api/ephoto360/advancedglow?apikey=prince&text=${encodeURIComponent(text)}`;
                const { data } = await axios.get(apiUrl);
                if (!data.success || !data.result?.image_url) throw new Error('ɴᴏ ɪᴍᴀɢᴇ');
                await ridzcoder.sendMessage(m.chat, {
                    image: { url: data.result.image_url },
                    caption: `✨ *ᴀᴅᴠᴀɴᴄᴇᴅ ɢʟᴏᴡ*\n\n> ${global.wm || ''}`
                }, { quoted: m });
                await ridzcoder.sendMessage(m.chat, { react: { text: "✅", key: m.key } });
            } catch (e) {
                console.error('advancedglow error:', e);
                await ridzcoder.sendMessage(m.chat, { react: { text: "❌", key: m.key } });
                reply("ꜰᴀɪʟᴇᴅ ᴛᴏ ɢᴇɴᴇʀᴀᴛᴇ ɪᴍᴀɢᴇ.");
            }
        }
    },
    {
        command: ['typographytext', 'typo'],
    react: "🍹",
        operate: async ({ ridzcoder, m, reply, text, prefix }) => {
            if (!text) return reply(`📌 *Usage:* ${prefix}typographytext <text>`);
            try {
                await ridzcoder.sendMessage(m.chat, { react: { text: "🎨", key: m.key } });
                const apiUrl = `https://api.princetechn.com/api/ephoto360/typographytext?apikey=prince&text=${encodeURIComponent(text)}`;
                const { data } = await axios.get(apiUrl);
                if (!data.success || !data.result?.image_url) throw new Error('ɴᴏ ɪᴍᴀɢᴇ');
                await ridzcoder.sendMessage(m.chat, {
                    image: { url: data.result.image_url },
                    caption: `🖋️ *ᴛʏᴘᴏɢʀᴀᴘʜʏ ᴛᴇxᴛ*\n\n> ${global.wm || ''}`
                }, { quoted: m });
                await ridzcoder.sendMessage(m.chat, { react: { text: "✅", key: m.key } });
            } catch (e) {
                console.error('typographytext error:', e);
                await ridzcoder.sendMessage(m.chat, { react: { text: "❌", key: m.key } });
                reply("ꜰᴀɪʟᴇᴅ ᴛᴏ ɢᴇɴᴇʀᴀᴛᴇ ɪᴍᴀɢᴇ.");
            }
        }
    },
    {
        command: ['pixelglitch', 'pglitch'],
    react: "🍹",
        operate: async ({ ridzcoder, m, reply, text, prefix }) => {
            if (!text) return reply(`📌 *Usage:* ${prefix}pixelglitch <text>`);
            try {
                await ridzcoder.sendMessage(m.chat, { react: { text: "🎨", key: m.key } });
                const apiUrl = `https://api.princetechn.com/api/ephoto360/pixelglitch?apikey=prince&text=${encodeURIComponent(text)}`;
                const { data } = await axios.get(apiUrl);
                if (!data.success || !data.result?.image_url) throw new Error('ɴᴏ ɪᴍᴀɢᴇ');
                await ridzcoder.sendMessage(m.chat, {
                    image: { url: data.result.image_url },
                    caption: `🎮 *ᴘɪxᴇʟ ɢʟɪᴛᴄʜ*\n\n> ${global.wm || ''}`
                }, { quoted: m });
                await ridzcoder.sendMessage(m.chat, { react: { text: "✅", key: m.key } });
            } catch (e) {
                console.error('pixelglitch error:', e);
                await ridzcoder.sendMessage(m.chat, { react: { text: "❌", key: m.key } });
                reply("ꜰᴀɪʟᴇᴅ ᴛᴏ ɢᴇɴᴇʀᴀᴛᴇ ɪᴍᴀɢᴇ.");
            }
        }
    },
    {
        command: ['neonglitch', 'nglitch'],
         react: "🍹",   
        operate: async ({ ridzcoder, m, reply, text, prefix }) => {
            if (!text) return reply(`📌 *Usage:* ${prefix}neonglitch <text>`);
            try {
                await ridzcoder.sendMessage(m.chat, { react: { text: "🎨", key: m.key } });
                const apiUrl = `https://api.princetechn.com/api/ephoto360/neonglitch?apikey=prince&text=${encodeURIComponent(text)}`;
                const { data } = await axios.get(apiUrl);
                if (!data.success || !data.result?.image_url) throw new Error('ɴᴏ ɪᴍᴀɢᴇ');
                await ridzcoder.sendMessage(m.chat, {
                    image: { url: data.result.image_url },
                    caption: `🌟 *ɴᴇᴏɴ ɢʟɪᴛᴄʜ*\n\n> ${global.wm || ''}`
                }, { quoted: m });
                await ridzcoder.sendMessage(m.chat, { react: { text: "✅", key: m.key } });
            } catch (e) {
                console.error('neonglitch error:', e);
                await ridzcoder.sendMessage(m.chat, { react: { text: "❌", key: m.key } });
                reply("ꜰᴀɪʟᴇᴅ ᴛᴏ ɢᴇɴᴇʀᴀᴛᴇ ɪᴍᴀɢᴇ.");
            }
        }
    },
    {
        command: ['nigerianflag', 'nigflag'],
    react: "🍹",
        operate: async ({ ridzcoder, m, reply, text, prefix }) => {
            if (!text) return reply(`📌 *Usage:* ${prefix}nigerianflag <text>`);
            try {
                await ridzcoder.sendMessage(m.chat, { react: { text: "🎨", key: m.key } });
                const apiUrl = `https://api.princetechn.com/api/ephoto360/nigerianflag?apikey=prince&text=${encodeURIComponent(text)}`;
                const { data } = await axios.get(apiUrl);
                if (!data.success || !data.result?.image_url) throw new Error('ɴᴏ ɪᴍᴀɢᴇ');
                await ridzcoder.sendMessage(m.chat, {
                    image: { url: data.result.image_url },
                    caption: `🇳🇬 *ɴɪɢᴇʀɪᴀɴ ꜰʟᴀɢ*\n\n> ${global.wm || ''}`
                }, { quoted: m });
                await ridzcoder.sendMessage(m.chat, { react: { text: "✅", key: m.key } });
            } catch (e) {
                console.error('nigerianflag error:', e);
                await ridzcoder.sendMessage(m.chat, { react: { text: "❌", key: m.key } });
                reply("ꜰᴀɪʟᴇᴅ ᴛᴏ ɢᴇɴᴇʀᴀᴛᴇ ɪᴍᴀɢᴇ.");
            }
        }
    },
    {
        command: ['americanflag', 'usaflag'],
    react: "🍹",
        operate: async ({ ridzcoder, m, reply, text, prefix }) => {
            if (!text) return reply(`📌 *Usage:* ${prefix}americanflag <text>`);
            try {
                await ridzcoder.sendMessage(m.chat, { react: { text: "🎨", key: m.key } });
                const apiUrl = `https://api.princetechn.com/api/ephoto360/americanflag?apikey=prince&text=${encodeURIComponent(text)}`;
                const { data } = await axios.get(apiUrl);
                if (!data.success || !data.result?.image_url) throw new Error('ɴᴏ ɪᴍᴀɢᴇ');
                await ridzcoder.sendMessage(m.chat, {
                    image: { url: data.result.image_url },
                    caption: `🇺🇸 *ᴀᴍᴇʀɪᴄᴀɴ ᴛᴇxᴛ*\n\n> ${global.wm || ''}`
                }, { quoted: m });
                await ridzcoder.sendMessage(m.chat, { react: { text: "✅", key: m.key } });
            } catch (e) {
                console.error('americanflag error:', e);
                await ridzcoder.sendMessage(m.chat, { react: { text: "❌", key: m.key } });
                reply("ꜰᴀɪʟᴇᴅ ᴛᴏ ɢᴇɴᴇʀᴀᴛᴇ ɪᴍᴀɢᴇ.");
            }
        }
    },
    {
        command: ['deletingtext', 'dtext'],
    react: "🍹",
        operate: async ({ ridzcoder, m, reply, text, prefix }) => {
            if (!text) return reply(`📌 *Usage:* ${prefix}deletingtext <text>`);
            try {
                await ridzcoder.sendMessage(m.chat, { react: { text: "🎨", key: m.key } });
                const apiUrl = `https://api.princetechn.com/api/ephoto360/deletingtext?apikey=prince&text=${encodeURIComponent(text)}`;
                const { data } = await axios.get(apiUrl);
                if (!data.success || !data.result?.image_url) throw new Error('ɴᴏ ɪᴍᴀɢᴇ');
                await ridzcoder.sendMessage(m.chat, {
                    image: { url: data.result.image_url },
                    caption: `🗑️ *ᴅᴇʟᴇᴛɪɴɢ ᴛᴇxᴛ*\n\n> ${global.wm || ''}`
                }, { quoted: m });
                await ridzcoder.sendMessage(m.chat, { react: { text: "✅", key: m.key } });
            } catch (e) {
                console.error('deletingtext error:', e);
                await ridzcoder.sendMessage(m.chat, { react: { text: "❌", key: m.key } });
                reply("ꜰᴀɪʟᴇᴅ ᴛᴏ ɢᴇɴᴇʀᴀᴛᴇ ɪᴍᴀɢᴇ.");
            }
        }
    },
    {
        command: ['blackpinkstyle', 'bpstyle'],
    react: "🍹",
        operate: async ({ ridzcoder, m, reply, text, prefix }) => {
            if (!text) return reply(`📌 *Usage:* ${prefix}blackpinkstyle <text>`);
            try {
                await ridzcoder.sendMessage(m.chat, { react: { text: "🎨", key: m.key } });
                const apiUrl = `https://api.princetechn.com/api/ephoto360/blackpinkstyle?apikey=prince&text=${encodeURIComponent(text)}`;
                const { data } = await axios.get(apiUrl);
                if (!data.success || !data.result?.image_url) throw new Error('ɴᴏ ɪᴍᴀɢᴇ');
                await ridzcoder.sendMessage(m.chat, {
                    image: { url: data.result.image_url },
                    caption: `🖤 *ʙʟᴀᴄᴋ ᴘɪɴᴋ ꜱᴛʏʟᴇ*\n\n> ${global.wm || ''}`
                }, { quoted: m });
                await ridzcoder.sendMessage(m.chat, { react: { text: "✅", key: m.key } });
            } catch (e) {
                console.error('blackpinkstyle error:', e);
                await ridzcoder.sendMessage(m.chat, { react: { text: "❌", key: m.key } });
                reply("ꜰᴀɪʟᴇᴅ ᴛᴏ ɢᴇɴᴇʀᴀᴛᴇ ɪᴍᴀɢᴇ.");
            }
        }
    },
    {
        command: ['glowingtext', 'gtext'],
    react: "🍹",
        operate: async ({ ridzcoder, m, reply, text, prefix }) => {
            if (!text) return reply(`📌 *Usage:* ${prefix}glowingtext <text>`);
            try {
                await ridzcoder.sendMessage(m.chat, { react: { text: "🎨", key: m.key } });
                const apiUrl = `https://api.princetechn.com/api/ephoto360/glowingtext?apikey=prince&text=${encodeURIComponent(text)}`;
                const { data } = await axios.get(apiUrl);
                if (!data.success || !data.result?.image_url) throw new Error('ɴᴏ ɪᴍᴀɢᴇ');
                await ridzcoder.sendMessage(m.chat, {
                    image: { url: data.result.image_url },
                    caption: `💡 *ɢʟᴏᴡɪɴɢ ᴛᴇxᴛ*\n\n> ${global.wm || ''}`
                }, { quoted: m });
                await ridzcoder.sendMessage(m.chat, { react: { text: "✅", key: m.key } });
            } catch (e) {
                console.error('glowingtext error:', e);
                await ridzcoder.sendMessage(m.chat, { react: { text: "❌", key: m.key } });
                reply("ꜰᴀɪʟᴇᴅ ᴛᴏ ɢᴇɴᴇʀᴀᴛᴇ ɪᴍᴀɢᴇ.");
            }
        }
    },
    {
        command: ['underwater', 'uwtext'],
    react: "🍹",
        operate: async ({ ridzcoder, m, reply, text, prefix }) => {
            if (!text) return reply(`📌 *Usage:* ${prefix}underwater <text>`);
            try {
                await ridzcoder.sendMessage(m.chat, { react: { text: "🎨", key: m.key } });
                const apiUrl = `https://api.princetechn.com/api/ephoto360/underwater?apikey=prince&text=${encodeURIComponent(text)}`;
                const { data } = await axios.get(apiUrl);
                if (!data.success || !data.result?.image_url) throw new Error('ɴᴏ ɪᴍᴀɢᴇ');
                await ridzcoder.sendMessage(m.chat, {
                    image: { url: data.result.image_url },
                    caption: `🌊 *ᴜɴᴅᴇʀ ᴡᴀᴛᴇʀ*\n\n> ${global.wm || ''}`
                }, { quoted: m });
                await ridzcoder.sendMessage(m.chat, { react: { text: "✅", key: m.key } });
            } catch (e) {
                console.error('underwater error:', e);
                await ridzcoder.sendMessage(m.chat, { react: { text: "❌", key: m.key } });
                reply("ꜰᴀɪʟᴇᴅ ᴛᴏ ɢᴇɴᴇʀᴀᴛᴇ ɪᴍᴀɢᴇ.");
            }
        }
    },
    {
        command: ['logomaker', 'lmaker'],
    react: "🍹",
        operate: async ({ ridzcoder, m, reply, text, prefix }) => {
            if (!text) return reply(`📌 *Usage:* ${prefix}logomaker <text>`);
            try {
                await ridzcoder.sendMessage(m.chat, { react: { text: "🎨", key: m.key } });
                const apiUrl = `https://api.princetechn.com/api/ephoto360/logomaker?apikey=prince&text=${encodeURIComponent(text)}`;
                const { data } = await axios.get(apiUrl);
                if (!data.success || !data.result?.image_url) throw new Error('ɴᴏ ɪᴍᴀɢᴇ');
                await ridzcoder.sendMessage(m.chat, {
                    image: { url: data.result.image_url },
                    caption: `🎯 *ʟᴏɢᴏ ᴍᴀᴋᴇʀ*\n\n> ${global.wm || ''}`
                }, { quoted: m });
                await ridzcoder.sendMessage(m.chat, { react: { text: "✅", key: m.key } });
            } catch (e) {
                console.error('logomaker error:', e);
                await ridzcoder.sendMessage(m.chat, { react: { text: "❌", key: m.key } });
                reply("ꜰᴀɪʟᴇᴅ ᴛᴏ ɢᴇɴᴇʀᴀᴛᴇ ɪᴍᴀɢᴇ.");
            }
        }
    },
    {
        command: ['cartoonstyle', 'cartoon'],
    react: "🍹",
        operate: async ({ ridzcoder, m, reply, text, prefix }) => {
            if (!text) return reply(`📌 *Usage:* ${prefix}cartoonstyle <text>`);
            try {
                await ridzcoder.sendMessage(m.chat, { react: { text: "🎨", key: m.key } });
                const apiUrl = `https://api.princetechn.com/api/ephoto360/cartoonstyle?apikey=prince&text=${encodeURIComponent(text)}`;
                const { data } = await axios.get(apiUrl);
                if (!data.success || !data.result?.image_url) throw new Error('ɴᴏ ɪᴍᴀɢᴇ');
                await ridzcoder.sendMessage(m.chat, {
                    image: { url: data.result.image_url },
                    caption: `🎭 *ᴄᴀʀᴛᴏᴏɴ ꜱᴛʟʏᴇ*\n\n> ${global.wm || ''}`
                }, { quoted: m });
                await ridzcoder.sendMessage(m.chat, { react: { text: "✅", key: m.key } });
            } catch (e) {
                console.error('cartoonstyle error:', e);
                await ridzcoder.sendMessage(m.chat, { react: { text: "❌", key: m.key } });
                reply("ꜰᴀɪʟᴇᴅ ᴛᴏ ɢᴇɴᴇʀᴀᴛᴇ ɪᴍᴀɢᴇ.");
            }
        }
    },
    {
        command: ['papercut', 'pcut'],
    react: "🍹",
        operate: async ({ ridzcoder, m, reply, text, prefix }) => {
            if (!text) return reply(`📌 *Usage:* ${prefix}papercut <text>`);
            try {
                await ridzcoder.sendMessage(m.chat, { react: { text: "🎨", key: m.key } });
                const apiUrl = `https://api.princetechn.com/api/ephoto360/papercut?apikey=prince&text=${encodeURIComponent(text)}`;
                const { data } = await axios.get(apiUrl);
                if (!data.success || !data.result?.image_url) throw new Error('ɴᴏ ɪᴍᴀɢᴇ');
                await ridzcoder.sendMessage(m.chat, {
                    image: { url: data.result.image_url },
                    caption: `📄 *ᴘᴀᴘᴇʀ ᴄᴜᴛ*\n\n> ${global.wm || ''}`
                }, { quoted: m });
                await ridzcoder.sendMessage(m.chat, { react: { text: "✅", key: m.key } });
            } catch (e) {
                console.error('papercut error:', e);
                await ridzcoder.sendMessage(m.chat, { react: { text: "❌", key: m.key } });
                reply("ꜰᴀɪʟᴇᴅ ᴛᴏ ɢᴇɴᴇʀᴀᴛᴇ ɪᴍᴀɢᴇ.");
            }
        }
    },
    {
        command: ['multicolored', 'mcolor'],
            react: "🍹",
        operate: async ({ ridzcoder, m, reply, text, prefix }) => {
            if (!text) return reply(`📌 *Usage:* ${prefix}multicolored <text>`);
            try {
                await ridzcoder.sendMessage(m.chat, { react: { text: "🎨", key: m.key } });
                const apiUrl = `https://api.princetechn.com/api/ephoto360/multicolored?apikey=prince&text=${encodeURIComponent(text)}`;
                const { data } = await axios.get(apiUrl);
                if (!data.success || !data.result?.image_url) throw new Error('ɴᴏ ɪᴍᴀɢᴇ');
                await ridzcoder.sendMessage(m.chat, {
                    image: { url: data.result.image_url },
                    caption: `🌈 *ᴍᴜʟᴛɪ ᴄᴏʟᴏʀᴇᴅ*\n\n> ${global.wm || ''}`
                }, { quoted: m });
                await ridzcoder.sendMessage(m.chat, { react: { text: "✅", key: m.key } });
            } catch (e) {
                console.error('multicolored error:', e);
                await ridzcoder.sendMessage(m.chat, { react: { text: "❌", key: m.key } });
                reply("ꜰᴀɪʟᴇᴅ ᴛᴏ ɢᴇɴᴇʀᴀᴛᴇ ɪᴍᴀɢᴇ.");
            }
        }
    },
    {
        command: ['effectclouds', 'clouds'],
        react: "🍹",    
        operate: async ({ ridzcoder, m, reply, text, prefix }) => {
            if (!text) return reply(`📌 *Usage:* ${prefix}effectclouds <text>`);
            try {
                await ridzcoder.sendMessage(m.chat, { react: { text: "🎨", key: m.key } });
                const apiUrl = `https://api.princetechn.com/api/ephoto360/effectclouds?apikey=prince&text=${encodeURIComponent(text)}`;
                const { data } = await axios.get(apiUrl);
                if (!data.success || !data.result?.image_url) throw new Error('ɴᴏ ɪᴍᴀɢᴇ');
                await ridzcoder.sendMessage(m.chat, {
                    image: { url: data.result.image_url },
                    caption: `☁️ *ᴇꜰꜰᴇᴄᴛ ᴄʟᴏᴜᴅꜱ*\n\n> ${global.wm || ''}`
                }, { quoted: m });
                await ridzcoder.sendMessage(m.chat, { react: { text: "✅", key: m.key } });
            } catch (e) {
                console.error('effectclouds error:', e);
                await ridzcoder.sendMessage(m.chat, { react: { text: "❌", key: m.key } });
                reply("ꜰᴀɪʟᴇᴅ ᴛᴏ ɢᴇɴᴇʀᴀᴛᴇ ɪᴍᴀɢᴇ.");
            }
        }
    },
    {
        command: ['gradienttext', 'grdtext'],
    react: "🍹",
        operate: async ({ ridzcoder, m, reply, text, prefix }) => {
            if (!text) return reply(`📌 *Usage:* ${prefix}gradienttext <text>`);
            try {
                await ridzcoder.sendMessage(m.chat, { react: { text: "🎨", key: m.key } });
                const apiUrl = `https://api.princetechn.com/api/ephoto360/gradienttext?apikey=prince&text=${encodeURIComponent(text)}`;
                const { data } = await axios.get(apiUrl);
                if (!data.success || !data.result?.image_url) throw new Error('ɴᴏ ɪᴍᴀɢᴇ');
                await ridzcoder.sendMessage(m.chat, {
                    image: { url: data.result.image_url },
                    caption: `🎨 *ɢʀᴀᴅɪᴇɴᴛ ᴛᴇxᴛ*\n\n> ${global.wm || ''}`
                }, { quoted: m });
                await ridzcoder.sendMessage(m.chat, { react: { text: "✅", key: m.key } });
            } catch (e) {
                console.error('gradienttext error:', e);
                await ridzcoder.sendMessage(m.chat, { react: { text: "❌", key: m.key } });
                reply("ꜰᴀɪʟᴇᴅ ᴛᴏ ɢᴇɴᴇʀᴀᴛᴇ ɪᴍᴀɢᴇ.");
            }
        }
    },
    {
        command: ['summerbeach', 'sbeach'],
          react: "🍹",  
        operate: async ({ ridzcoder, m, reply, text, prefix }) => {
            if (!text) return reply(`📌 *Usage:* ${prefix}summerbeach <text>`);
            try {
                await ridzcoder.sendMessage(m.chat, { react: { text: "🎨", key: m.key } });
                const apiUrl = `https://api.princetechn.com/api/ephoto360/summerbeach?apikey=prince&text=${encodeURIComponent(text)}`;
                const { data } = await axios.get(apiUrl);
                if (!data.success || !data.result?.image_url) throw new Error('ɴᴏ ɪᴍᴀɢᴇ');
                await ridzcoder.sendMessage(m.chat, {
                    image: { url: data.result.image_url },
                    caption: `🏖️ *ꜱᴜᴍᴍᴇʀ ʙᴇᴀᴄʜ*\n\n> ${global.wm || ''}`
                }, { quoted: m });
                await ridzcoder.sendMessage(m.chat, { react: { text: "✅", key: m.key } });
            } catch (e) {
                console.error('summerbeach error:', e);
                await ridzcoder.sendMessage(m.chat, { react: { text: "❌", key: m.key } });
                reply("ꜰᴀɪʟᴇᴅ ᴛᴏ ɢᴇɴᴇʀᴀᴛᴇ ɪᴍᴀɢᴇ.");
            }
        }
    },
    {
        command: ['sandsummer', 'ssummer'],
    react: "🍹",
        operate: async ({ ridzcoder, m, reply, text, prefix }) => {
            if (!text) return reply(`📌 *Usage:* ${prefix}sandsummer <text>`);
            try {
                await ridzcoder.sendMessage(m.chat, { react: { text: "🎨", key: m.key } });
                const apiUrl = `https://api.princetechn.com/api/ephoto360/sandsummer?apikey=prince&text=${encodeURIComponent(text)}`;
                const { data } = await axios.get(apiUrl);
                if (!data.success || !data.result?.image_url) throw new Error('ɴᴏ ɪᴍᴀɢᴇ');
                await ridzcoder.sendMessage(m.chat, {
                    image: { url: data.result.image_url },
                    caption: `🏝️ *ꜱᴀɴᴅ ꜱᴜᴍᴍᴇʀ*\n\n> ${global.wm || ''}`
                }, { quoted: m });
                await ridzcoder.sendMessage(m.chat, { react: { text: "✅", key: m.key } });
            } catch (e) {
                console.error('sandsummer error:', e);
                await ridzcoder.sendMessage(m.chat, { react: { text: "❌", key: m.key } });
                reply("ꜰᴀɪʟᴇᴅ ᴛᴏ ɢᴇɴᴇʀᴀᴛᴇ ɪᴍᴀɢᴇ.");
            }
        }
    },
    {
        command: ['luxurygold', 'lgold'],
            react: "🍹",
        operate: async ({ ridzcoder, m, reply, text, prefix }) => {
            if (!text) return reply(`📌 *Usage:* ${prefix}luxurygold <text>`);
            try {
                await ridzcoder.sendMessage(m.chat, { react: { text: "🎨", key: m.key } });
                const apiUrl = `https://api.princetechn.com/api/ephoto360/luxurygold?apikey=prince&text=${encodeURIComponent(text)}`;
                const { data } = await axios.get(apiUrl);
                if (!data.success || !data.result?.image_url) throw new Error('ɴᴏ ɪᴍᴀɢᴇ');
                await ridzcoder.sendMessage(m.chat, {
                    image: { url: data.result.image_url },
                    caption: `👑 *ʟᴜxᴜʀʏ ɢᴏʟᴅ*\n\n> ${global.wm || ''}`
                }, { quoted: m });
                await ridzcoder.sendMessage(m.chat, { react: { text: "✅", key: m.key } });
            } catch (e) {
                console.error('luxurygold error:', e);
                await ridzcoder.sendMessage(m.chat, { react: { text: "❌", key: m.key } });
                reply("ꜰᴀɪʟᴇᴅ ᴛᴏ ɢᴇɴᴇʀᴀᴛᴇ ɪᴍᴀɢᴇ.");
            }
        }
    },
    {
        command: ['galaxy', 'galaxytext'],
    react: "🍹",
        operate: async ({ ridzcoder, m, reply, text, prefix }) => {
            if (!text) return reply(`📌 *Usage:* ${prefix}galaxy <text>`);
            try {
                await ridzcoder.sendMessage(m.chat, { react: { text: "🎨", key: m.key } });
                const apiUrl = `https://api.princetechn.com/api/ephoto360/galaxy?apikey=prince&text=${encodeURIComponent(text)}`;
                const { data } = await axios.get(apiUrl);
                if (!data.success || !data.result?.image_url) throw new Error('ɴᴏ ɪᴍᴀɢᴇ');
                await ridzcoder.sendMessage(m.chat, {
                    image: { url: data.result.image_url },
                    caption: `🌌 *ɢᴀʟᴀxʏ*\n\n> ${global.wm || ''}`
                }, { quoted: m });
                await ridzcoder.sendMessage(m.chat, { react: { text: "✅", key: m.key } });
            } catch (e) {
                console.error('galaxy error:', e);
                await ridzcoder.sendMessage(m.chat, { react: { text: "❌", key: m.key } });
                reply("ꜰᴀɪʟᴇᴅ ᴛᴏ ɢᴇɴᴇʀᴀᴛᴇ ɪᴍᴀɢᴇ.");
            }
        }
    },
    {
        command: ['1917', 'text1917'],
    react: "🍹",
        operate: async ({ ridzcoder, m, reply, text, prefix }) => {
            if (!text) return reply(`📌 *Usage:* ${prefix}1917 <text>`);
            try {
                await ridzcoder.sendMessage(m.chat, { react: { text: "🎨", key: m.key } });
                const apiUrl = `https://api.princetechn.com/api/ephoto360/1917?apikey=prince&text=${encodeURIComponent(text)}`;
                const { data } = await axios.get(apiUrl);
                if (!data.success || !data.result?.image_url) throw new Error('ɴᴏ ɪᴍᴀɢᴇ');
                await ridzcoder.sendMessage(m.chat, {
                    image: { url: data.result.image_url },
                    caption: `🎬 *1917*\n\n> ${global.wm || ''}`
                }, { quoted: m });
                await ridzcoder.sendMessage(m.chat, { react: { text: "✅", key: m.key } });
            } catch (e) {
                console.error('1917 error:', e);
                await ridzcoder.sendMessage(m.chat, { react: { text: "❌", key: m.key } });
                reply("ꜰᴀɪʟᴇᴅ ᴛᴏ ɢᴇɴᴇʀᴀᴛᴇ ɪᴍᴀɢᴇ.");
            }
        }
    },
    {
        command: ['makingneon', 'mneon'],
    react: "🍹",
        operate: async ({ ridzcoder, m, reply, text, prefix }) => {
            if (!text) return reply(`📌 *Usage:* ${prefix}makingneon <text>`);
            try {
                await ridzcoder.sendMessage(m.chat, { react: { text: "🎨", key: m.key } });
                const apiUrl = `https://api.princetechn.com/api/ephoto360/makingneon?apikey=prince&text=${encodeURIComponent(text)}`;
                const { data } = await axios.get(apiUrl);
                if (!data.success || !data.result?.image_url) throw new Error('ɴᴏ ɪᴍᴀɢᴇ');
                await ridzcoder.sendMessage(m.chat, {
                    image: { url: data.result.image_url },
                    caption: `💫 *ᴍᴀᴋɪɴɢ ɴᴇᴏɴ*\n\n> ${global.wm || ''}`
                }, { quoted: m });
                await ridzcoder.sendMessage(m.chat, { react: { text: "✅", key: m.key } });
            } catch (e) {
                console.error('makingneon error:', e);
                await ridzcoder.sendMessage(m.chat, { react: { text: "❌", key: m.key } });
                reply("ꜰᴀɪʟᴇᴅ ᴛᴏ ɢᴇɴᴇʀᴀᴛᴇ ɪᴍᴀɢᴇ.");
            }
        }
    },
    {
        command: ['texteffect', 'teffect'],
    react: "🍹",
        operate: async ({ ridzcoder, m, reply, text, prefix }) => {
            if (!text) return reply(`📌 *Usage:* ${prefix}texteffect <text>`);
            try {
                await ridzcoder.sendMessage(m.chat, { react: { text: "🎨", key: m.key } });
                const apiUrl = `https://api.princetechn.com/api/ephoto360/texteffect?apikey=prince&text=${encodeURIComponent(text)}`;
                const { data } = await axios.get(apiUrl);
                if (!data.success || !data.result?.image_url) throw new Error('ɴᴏ ɪᴍᴀɢᴇ');
                await ridzcoder.sendMessage(m.chat, {
                    image: { url: data.result.image_url },
                    caption: `🎭 *ᴛᴇxᴛ ᴇꜰꜰᴇᴄᴛ*\n\n> ${global.wm || ''}`
                }, { quoted: m });
                await ridzcoder.sendMessage(m.chat, { react: { text: "✅", key: m.key } });
            } catch (e) {
                console.error('texteffect error:', e);
                await ridzcoder.sendMessage(m.chat, { react: { text: "❌", key: m.key } });
                reply("ꜰᴀɪʟᴇᴅ ᴛᴏ ɢᴇɴᴇʀᴀᴛᴇ ɪᴍᴀɢᴇ.");
            }
        }
    },
    {
        command: ['galaxystyle', 'gstyle'],
    react: "🍹",
        operate: async ({ ridzcoder, m, reply, text, prefix }) => {
            if (!text) return reply(`📌 *Usage:* ${prefix}galaxystyle <text>`);
            try {
                await ridzcoder.sendMessage(m.chat, { react: { text: "🎨", key: m.key } });
                const apiUrl = `https://api.princetechn.com/api/ephoto360/galaxystyle?apikey=prince&text=${encodeURIComponent(text)}`;
                const { data } = await axios.get(apiUrl);
                if (!data.success || !data.result?.image_url) throw new Error('ɴᴏ ɪᴍᴀɢᴇ');
                await ridzcoder.sendMessage(m.chat, {
                    image: { url: data.result.image_url },
                    caption: `🌠 ɢᴀʟᴀxʏ ꜱᴛʏʟᴇ*\n\n> ${global.wm || ''}`
                }, { quoted: m });
                await ridzcoder.sendMessage(m.chat, { react: { text: "✅", key: m.key } });
            } catch (e) {
                console.error('galaxystyle error:', e);
                await ridzcoder.sendMessage(m.chat, { react: { text: "❌", key: m.key } });
                reply("ꜰᴀɪʟᴇᴅ ᴛᴏ ɢᴇɴᴇʀᴀᴛᴇ ɪᴍᴀɢᴇ.");
            }
        }
    },
    {
        command: ['lighteffect', 'leffect'],
            react: "🍹",
            operate: async ({ ridzcoder, m, reply, text, prefix }) => {
            if (!text) return reply(`📌 *Usage:* ${prefix}lighteffect <text>`);
            try {
                await ridzcoder.sendMessage(m.chat, { react: { text: "🎨", key: m.key } });
                const apiUrl = `https://api.princetechn.com/api/ephoto360/lighteffect?apikey=prince&text=${encodeURIComponent(text)}`;
                const { data } = await axios.get(apiUrl);
                if (!data.success || !data.result?.image_url) throw new Error('ɴᴏ ɪᴍᴀɢᴇ');
                await ridzcoder.sendMessage(m.chat, {
                    image: { url: data.result.image_url },
                    caption: `💡 *ʟɪɢʜᴛ ᴇꜰꜰᴇᴄᴛ*\n\n> ${global.wm || ''}`
                }, { quoted: m });
                await ridzcoder.sendMessage(m.chat, { react: { text: "✅", key: m.key } });
            } catch (e) {
                console.error('lighteffect error:', e);
                await ridzcoder.sendMessage(m.chat, { react: { text: "❌", key: m.key } });
                reply("ꜰᴀɪʟᴇᴅ ᴛᴏ ɢᴇɴᴇʀᴀᴛᴇ ɪᴍᴀɢᴇ.");
            }
        }
    }
];