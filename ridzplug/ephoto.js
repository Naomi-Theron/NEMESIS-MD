const axios = require('axios');

module.exports = [
    // ─────────────────────────────────────────────
    // EPHOTO360 - LOGO & TEXT EFFECT GENERATORS
    // ─────────────────────────────────────────────
    {
        command: ['glossysilver', 'glossy'],
        operate: async ({ ridzcoder, m, reply, text, prefix }) => {
            if (!text) return reply(`📌 *Usage:* ${prefix}glossysilver <text>`);
            try {
                await ridzcoder.sendMessage(m.chat, { react: { text: "🎨", key: m.key } });
                const apiUrl = `https://api.princetechn.com/api/ephoto360/glossysilver?apikey=prince&text=${encodeURIComponent(text)}`;
                const { data } = await axios.get(apiUrl);
                if (!data.success || !data.result?.image_url) throw new Error('No image');
                await ridzcoder.sendMessage(m.chat, {
                    image: { url: data.result.image_url },
                    caption: `✨ *Glossy Silver*\n\n> ${global.wm || ''}`
                }, { quoted: m });
                await ridzcoder.sendMessage(m.chat, { react: { text: "✅", key: m.key } });
            } catch (e) {
                console.error('glossysilver error:', e);
                await ridzcoder.sendMessage(m.chat, { react: { text: "❌", key: m.key } });
                reply("❌ Failed to generate image.");
            }
        }
    },
    {
        command: ['writetext', 'wtext'],
        operate: async ({ ridzcoder, m, reply, text, prefix }) => {
            if (!text) return reply(`📌 *Usage:* ${prefix}writetext <text>`);
            try {
                await ridzcoder.sendMessage(m.chat, { react: { text: "🎨", key: m.key } });
                const apiUrl = `https://api.princetechn.com/api/ephoto360/writetext?apikey=prince&text=${encodeURIComponent(text)}`;
                const { data } = await axios.get(apiUrl);
                if (!data.success || !data.result?.image_url) throw new Error('No image');
                await ridzcoder.sendMessage(m.chat, {
                    image: { url: data.result.image_url },
                    caption: `✍️ *Write Text*\n\n> ${global.wm || ''}`
                }, { quoted: m });
                await ridzcoder.sendMessage(m.chat, { react: { text: "✅", key: m.key } });
            } catch (e) {
                console.error('writetext error:', e);
                await ridzcoder.sendMessage(m.chat, { react: { text: "❌", key: m.key } });
                reply("❌ Failed to generate image.");
            }
        }
    },
    {
        command: ['blackpinklogo', 'bplogo'],
        operate: async ({ ridzcoder, m, reply, text, prefix }) => {
            if (!text) return reply(`📌 *Usage:* ${prefix}blackpinklogo <text>`);
            try {
                await ridzcoder.sendMessage(m.chat, { react: { text: "🎨", key: m.key } });
                const apiUrl = `https://api.princetechn.com/api/ephoto360/blackpinklogo?apikey=prince&text=${encodeURIComponent(text)}`;
                const { data } = await axios.get(apiUrl);
                if (!data.success || !data.result?.image_url) throw new Error('No image');
                await ridzcoder.sendMessage(m.chat, {
                    image: { url: data.result.image_url },
                    caption: `🖤 *Black Pink Logo*\n\n> ${global.wm || ''}`
                }, { quoted: m });
                await ridzcoder.sendMessage(m.chat, { react: { text: "✅", key: m.key } });
            } catch (e) {
                console.error('blackpinklogo error:', e);
                await ridzcoder.sendMessage(m.chat, { react: { text: "❌", key: m.key } });
                reply("❌ Failed to generate image.");
            }
        }
    },
    {
        command: ['glitchtext', 'glitch'],
        operate: async ({ ridzcoder, m, reply, text, prefix }) => {
            if (!text) return reply(`📌 *Usage:* ${prefix}glitchtext <text>`);
            try {
                await ridzcoder.sendMessage(m.chat, { react: { text: "🎨", key: m.key } });
                const apiUrl = `https://api.princetechn.com/api/ephoto360/glitchtext?apikey=prince&text=${encodeURIComponent(text)}`;
                const { data } = await axios.get(apiUrl);
                if (!data.success || !data.result?.image_url) throw new Error('No image');
                await ridzcoder.sendMessage(m.chat, {
                    image: { url: data.result.image_url },
                    caption: `⚡ *Glitch Text*\n\n> ${global.wm || ''}`
                }, { quoted: m });
                await ridzcoder.sendMessage(m.chat, { react: { text: "✅", key: m.key } });
            } catch (e) {
                console.error('glitchtext error:', e);
                await ridzcoder.sendMessage(m.chat, { react: { text: "❌", key: m.key } });
                reply("❌ Failed to generate image.");
            }
        }
    },
    {
        command: ['advancedglow', 'aglow'],
        operate: async ({ ridzcoder, m, reply, text, prefix }) => {
            if (!text) return reply(`📌 *Usage:* ${prefix}advancedglow <text>`);
            try {
                await ridzcoder.sendMessage(m.chat, { react: { text: "🎨", key: m.key } });
                const apiUrl = `https://api.princetechn.com/api/ephoto360/advancedglow?apikey=prince&text=${encodeURIComponent(text)}`;
                const { data } = await axios.get(apiUrl);
                if (!data.success || !data.result?.image_url) throw new Error('No image');
                await ridzcoder.sendMessage(m.chat, {
                    image: { url: data.result.image_url },
                    caption: `✨ *Advanced Glow*\n\n> ${global.wm || ''}`
                }, { quoted: m });
                await ridzcoder.sendMessage(m.chat, { react: { text: "✅", key: m.key } });
            } catch (e) {
                console.error('advancedglow error:', e);
                await ridzcoder.sendMessage(m.chat, { react: { text: "❌", key: m.key } });
                reply("❌ Failed to generate image.");
            }
        }
    },
    {
        command: ['typographytext', 'typo'],
        operate: async ({ ridzcoder, m, reply, text, prefix }) => {
            if (!text) return reply(`📌 *Usage:* ${prefix}typographytext <text>`);
            try {
                await ridzcoder.sendMessage(m.chat, { react: { text: "🎨", key: m.key } });
                const apiUrl = `https://api.princetechn.com/api/ephoto360/typographytext?apikey=prince&text=${encodeURIComponent(text)}`;
                const { data } = await axios.get(apiUrl);
                if (!data.success || !data.result?.image_url) throw new Error('No image');
                await ridzcoder.sendMessage(m.chat, {
                    image: { url: data.result.image_url },
                    caption: `🖋️ *Typography Text*\n\n> ${global.wm || ''}`
                }, { quoted: m });
                await ridzcoder.sendMessage(m.chat, { react: { text: "✅", key: m.key } });
            } catch (e) {
                console.error('typographytext error:', e);
                await ridzcoder.sendMessage(m.chat, { react: { text: "❌", key: m.key } });
                reply("❌ Failed to generate image.");
            }
        }
    },
    {
        command: ['pixelglitch', 'pglitch'],
        operate: async ({ ridzcoder, m, reply, text, prefix }) => {
            if (!text) return reply(`📌 *Usage:* ${prefix}pixelglitch <text>`);
            try {
                await ridzcoder.sendMessage(m.chat, { react: { text: "🎨", key: m.key } });
                const apiUrl = `https://api.princetechn.com/api/ephoto360/pixelglitch?apikey=prince&text=${encodeURIComponent(text)}`;
                const { data } = await axios.get(apiUrl);
                if (!data.success || !data.result?.image_url) throw new Error('No image');
                await ridzcoder.sendMessage(m.chat, {
                    image: { url: data.result.image_url },
                    caption: `🎮 *Pixel Glitch*\n\n> ${global.wm || ''}`
                }, { quoted: m });
                await ridzcoder.sendMessage(m.chat, { react: { text: "✅", key: m.key } });
            } catch (e) {
                console.error('pixelglitch error:', e);
                await ridzcoder.sendMessage(m.chat, { react: { text: "❌", key: m.key } });
                reply("❌ Failed to generate image.");
            }
        }
    },
    {
        command: ['neonglitch', 'nglitch'],
        operate: async ({ ridzcoder, m, reply, text, prefix }) => {
            if (!text) return reply(`📌 *Usage:* ${prefix}neonglitch <text>`);
            try {
                await ridzcoder.sendMessage(m.chat, { react: { text: "🎨", key: m.key } });
                const apiUrl = `https://api.princetechn.com/api/ephoto360/neonglitch?apikey=prince&text=${encodeURIComponent(text)}`;
                const { data } = await axios.get(apiUrl);
                if (!data.success || !data.result?.image_url) throw new Error('No image');
                await ridzcoder.sendMessage(m.chat, {
                    image: { url: data.result.image_url },
                    caption: `🌟 *Neon Glitch*\n\n> ${global.wm || ''}`
                }, { quoted: m });
                await ridzcoder.sendMessage(m.chat, { react: { text: "✅", key: m.key } });
            } catch (e) {
                console.error('neonglitch error:', e);
                await ridzcoder.sendMessage(m.chat, { react: { text: "❌", key: m.key } });
                reply("❌ Failed to generate image.");
            }
        }
    },
    {
        command: ['nigerianflag', 'nigflag'],
        operate: async ({ ridzcoder, m, reply, text, prefix }) => {
            if (!text) return reply(`📌 *Usage:* ${prefix}nigerianflag <text>`);
            try {
                await ridzcoder.sendMessage(m.chat, { react: { text: "🎨", key: m.key } });
                const apiUrl = `https://api.princetechn.com/api/ephoto360/nigerianflag?apikey=prince&text=${encodeURIComponent(text)}`;
                const { data } = await axios.get(apiUrl);
                if (!data.success || !data.result?.image_url) throw new Error('No image');
                await ridzcoder.sendMessage(m.chat, {
                    image: { url: data.result.image_url },
                    caption: `🇳🇬 *Nigerian Flag*\n\n> ${global.wm || ''}`
                }, { quoted: m });
                await ridzcoder.sendMessage(m.chat, { react: { text: "✅", key: m.key } });
            } catch (e) {
                console.error('nigerianflag error:', e);
                await ridzcoder.sendMessage(m.chat, { react: { text: "❌", key: m.key } });
                reply("❌ Failed to generate image.");
            }
        }
    },
    {
        command: ['americanflag', 'usaflag'],
        operate: async ({ ridzcoder, m, reply, text, prefix }) => {
            if (!text) return reply(`📌 *Usage:* ${prefix}americanflag <text>`);
            try {
                await ridzcoder.sendMessage(m.chat, { react: { text: "🎨", key: m.key } });
                const apiUrl = `https://api.princetechn.com/api/ephoto360/americanflag?apikey=prince&text=${encodeURIComponent(text)}`;
                const { data } = await axios.get(apiUrl);
                if (!data.success || !data.result?.image_url) throw new Error('No image');
                await ridzcoder.sendMessage(m.chat, {
                    image: { url: data.result.image_url },
                    caption: `🇺🇸 *American Flag*\n\n> ${global.wm || ''}`
                }, { quoted: m });
                await ridzcoder.sendMessage(m.chat, { react: { text: "✅", key: m.key } });
            } catch (e) {
                console.error('americanflag error:', e);
                await ridzcoder.sendMessage(m.chat, { react: { text: "❌", key: m.key } });
                reply("❌ Failed to generate image.");
            }
        }
    },
    {
        command: ['deletingtext', 'dtext'],
        operate: async ({ ridzcoder, m, reply, text, prefix }) => {
            if (!text) return reply(`📌 *Usage:* ${prefix}deletingtext <text>`);
            try {
                await ridzcoder.sendMessage(m.chat, { react: { text: "🎨", key: m.key } });
                const apiUrl = `https://api.princetechn.com/api/ephoto360/deletingtext?apikey=prince&text=${encodeURIComponent(text)}`;
                const { data } = await axios.get(apiUrl);
                if (!data.success || !data.result?.image_url) throw new Error('No image');
                await ridzcoder.sendMessage(m.chat, {
                    image: { url: data.result.image_url },
                    caption: `🗑️ *Deleting Text*\n\n> ${global.wm || ''}`
                }, { quoted: m });
                await ridzcoder.sendMessage(m.chat, { react: { text: "✅", key: m.key } });
            } catch (e) {
                console.error('deletingtext error:', e);
                await ridzcoder.sendMessage(m.chat, { react: { text: "❌", key: m.key } });
                reply("❌ Failed to generate image.");
            }
        }
    },
    {
        command: ['blackpinkstyle', 'bpstyle'],
        operate: async ({ ridzcoder, m, reply, text, prefix }) => {
            if (!text) return reply(`📌 *Usage:* ${prefix}blackpinkstyle <text>`);
            try {
                await ridzcoder.sendMessage(m.chat, { react: { text: "🎨", key: m.key } });
                const apiUrl = `https://api.princetechn.com/api/ephoto360/blackpinkstyle?apikey=prince&text=${encodeURIComponent(text)}`;
                const { data } = await axios.get(apiUrl);
                if (!data.success || !data.result?.image_url) throw new Error('No image');
                await ridzcoder.sendMessage(m.chat, {
                    image: { url: data.result.image_url },
                    caption: `🖤 *BlackPink Style*\n\n> ${global.wm || ''}`
                }, { quoted: m });
                await ridzcoder.sendMessage(m.chat, { react: { text: "✅", key: m.key } });
            } catch (e) {
                console.error('blackpinkstyle error:', e);
                await ridzcoder.sendMessage(m.chat, { react: { text: "❌", key: m.key } });
                reply("❌ Failed to generate image.");
            }
        }
    },
    {
        command: ['glowingtext', 'gtext'],
        operate: async ({ ridzcoder, m, reply, text, prefix }) => {
            if (!text) return reply(`📌 *Usage:* ${prefix}glowingtext <text>`);
            try {
                await ridzcoder.sendMessage(m.chat, { react: { text: "🎨", key: m.key } });
                const apiUrl = `https://api.princetechn.com/api/ephoto360/glowingtext?apikey=prince&text=${encodeURIComponent(text)}`;
                const { data } = await axios.get(apiUrl);
                if (!data.success || !data.result?.image_url) throw new Error('No image');
                await ridzcoder.sendMessage(m.chat, {
                    image: { url: data.result.image_url },
                    caption: `💡 *Glowing Text*\n\n> ${global.wm || ''}`
                }, { quoted: m });
                await ridzcoder.sendMessage(m.chat, { react: { text: "✅", key: m.key } });
            } catch (e) {
                console.error('glowingtext error:', e);
                await ridzcoder.sendMessage(m.chat, { react: { text: "❌", key: m.key } });
                reply("❌ Failed to generate image.");
            }
        }
    },
    {
        command: ['underwater', 'uwtext'],
        operate: async ({ ridzcoder, m, reply, text, prefix }) => {
            if (!text) return reply(`📌 *Usage:* ${prefix}underwater <text>`);
            try {
                await ridzcoder.sendMessage(m.chat, { react: { text: "🎨", key: m.key } });
                const apiUrl = `https://api.princetechn.com/api/ephoto360/underwater?apikey=prince&text=${encodeURIComponent(text)}`;
                const { data } = await axios.get(apiUrl);
                if (!data.success || !data.result?.image_url) throw new Error('No image');
                await ridzcoder.sendMessage(m.chat, {
                    image: { url: data.result.image_url },
                    caption: `🌊 *Under Water*\n\n> ${global.wm || ''}`
                }, { quoted: m });
                await ridzcoder.sendMessage(m.chat, { react: { text: "✅", key: m.key } });
            } catch (e) {
                console.error('underwater error:', e);
                await ridzcoder.sendMessage(m.chat, { react: { text: "❌", key: m.key } });
                reply("❌ Failed to generate image.");
            }
        }
    },
    {
        command: ['logomaker', 'lmaker'],
        operate: async ({ ridzcoder, m, reply, text, prefix }) => {
            if (!text) return reply(`📌 *Usage:* ${prefix}logomaker <text>`);
            try {
                await ridzcoder.sendMessage(m.chat, { react: { text: "🎨", key: m.key } });
                const apiUrl = `https://api.princetechn.com/api/ephoto360/logomaker?apikey=prince&text=${encodeURIComponent(text)}`;
                const { data } = await axios.get(apiUrl);
                if (!data.success || !data.result?.image_url) throw new Error('No image');
                await ridzcoder.sendMessage(m.chat, {
                    image: { url: data.result.image_url },
                    caption: `🎯 *Logo Maker*\n\n> ${global.wm || ''}`
                }, { quoted: m });
                await ridzcoder.sendMessage(m.chat, { react: { text: "✅", key: m.key } });
            } catch (e) {
                console.error('logomaker error:', e);
                await ridzcoder.sendMessage(m.chat, { react: { text: "❌", key: m.key } });
                reply("❌ Failed to generate image.");
            }
        }
    },
    {
        command: ['cartoonstyle', 'cartoon'],
        operate: async ({ ridzcoder, m, reply, text, prefix }) => {
            if (!text) return reply(`📌 *Usage:* ${prefix}cartoonstyle <text>`);
            try {
                await ridzcoder.sendMessage(m.chat, { react: { text: "🎨", key: m.key } });
                const apiUrl = `https://api.princetechn.com/api/ephoto360/cartoonstyle?apikey=prince&text=${encodeURIComponent(text)}`;
                const { data } = await axios.get(apiUrl);
                if (!data.success || !data.result?.image_url) throw new Error('No image');
                await ridzcoder.sendMessage(m.chat, {
                    image: { url: data.result.image_url },
                    caption: `🎭 *Cartoon Style*\n\n> ${global.wm || ''}`
                }, { quoted: m });
                await ridzcoder.sendMessage(m.chat, { react: { text: "✅", key: m.key } });
            } catch (e) {
                console.error('cartoonstyle error:', e);
                await ridzcoder.sendMessage(m.chat, { react: { text: "❌", key: m.key } });
                reply("❌ Failed to generate image.");
            }
        }
    },
    {
        command: ['papercut', 'pcut'],
        operate: async ({ ridzcoder, m, reply, text, prefix }) => {
            if (!text) return reply(`📌 *Usage:* ${prefix}papercut <text>`);
            try {
                await ridzcoder.sendMessage(m.chat, { react: { text: "🎨", key: m.key } });
                const apiUrl = `https://api.princetechn.com/api/ephoto360/papercut?apikey=prince&text=${encodeURIComponent(text)}`;
                const { data } = await axios.get(apiUrl);
                if (!data.success || !data.result?.image_url) throw new Error('No image');
                await ridzcoder.sendMessage(m.chat, {
                    image: { url: data.result.image_url },
                    caption: `📄 *Paper Cut*\n\n> ${global.wm || ''}`
                }, { quoted: m });
                await ridzcoder.sendMessage(m.chat, { react: { text: "✅", key: m.key } });
            } catch (e) {
                console.error('papercut error:', e);
                await ridzcoder.sendMessage(m.chat, { react: { text: "❌", key: m.key } });
                reply("❌ Failed to generate image.");
            }
        }
    },
    {
        command: ['multicolored', 'mcolor'],
        operate: async ({ ridzcoder, m, reply, text, prefix }) => {
            if (!text) return reply(`📌 *Usage:* ${prefix}multicolored <text>`);
            try {
                await ridzcoder.sendMessage(m.chat, { react: { text: "🎨", key: m.key } });
                const apiUrl = `https://api.princetechn.com/api/ephoto360/multicolored?apikey=prince&text=${encodeURIComponent(text)}`;
                const { data } = await axios.get(apiUrl);
                if (!data.success || !data.result?.image_url) throw new Error('No image');
                await ridzcoder.sendMessage(m.chat, {
                    image: { url: data.result.image_url },
                    caption: `🌈 *Multi Colored*\n\n> ${global.wm || ''}`
                }, { quoted: m });
                await ridzcoder.sendMessage(m.chat, { react: { text: "✅", key: m.key } });
            } catch (e) {
                console.error('multicolored error:', e);
                await ridzcoder.sendMessage(m.chat, { react: { text: "❌", key: m.key } });
                reply("❌ Failed to generate image.");
            }
        }
    },
    {
        command: ['effectclouds', 'clouds'],
        operate: async ({ ridzcoder, m, reply, text, prefix }) => {
            if (!text) return reply(`📌 *Usage:* ${prefix}effectclouds <text>`);
            try {
                await ridzcoder.sendMessage(m.chat, { react: { text: "🎨", key: m.key } });
                const apiUrl = `https://api.princetechn.com/api/ephoto360/effectclouds?apikey=prince&text=${encodeURIComponent(text)}`;
                const { data } = await axios.get(apiUrl);
                if (!data.success || !data.result?.image_url) throw new Error('No image');
                await ridzcoder.sendMessage(m.chat, {
                    image: { url: data.result.image_url },
                    caption: `☁️ *Effect Clouds*\n\n> ${global.wm || ''}`
                }, { quoted: m });
                await ridzcoder.sendMessage(m.chat, { react: { text: "✅", key: m.key } });
            } catch (e) {
                console.error('effectclouds error:', e);
                await ridzcoder.sendMessage(m.chat, { react: { text: "❌", key: m.key } });
                reply("❌ Failed to generate image.");
            }
        }
    },
    {
        command: ['gradienttext', 'grdtext'],
        operate: async ({ ridzcoder, m, reply, text, prefix }) => {
            if (!text) return reply(`📌 *Usage:* ${prefix}gradienttext <text>`);
            try {
                await ridzcoder.sendMessage(m.chat, { react: { text: "🎨", key: m.key } });
                const apiUrl = `https://api.princetechn.com/api/ephoto360/gradienttext?apikey=prince&text=${encodeURIComponent(text)}`;
                const { data } = await axios.get(apiUrl);
                if (!data.success || !data.result?.image_url) throw new Error('No image');
                await ridzcoder.sendMessage(m.chat, {
                    image: { url: data.result.image_url },
                    caption: `🎨 *Gradient Text*\n\n> ${global.wm || ''}`
                }, { quoted: m });
                await ridzcoder.sendMessage(m.chat, { react: { text: "✅", key: m.key } });
            } catch (e) {
                console.error('gradienttext error:', e);
                await ridzcoder.sendMessage(m.chat, { react: { text: "❌", key: m.key } });
                reply("❌ Failed to generate image.");
            }
        }
    },
    {
        command: ['summerbeach', 'sbeach'],
        operate: async ({ ridzcoder, m, reply, text, prefix }) => {
            if (!text) return reply(`📌 *Usage:* ${prefix}summerbeach <text>`);
            try {
                await ridzcoder.sendMessage(m.chat, { react: { text: "🎨", key: m.key } });
                const apiUrl = `https://api.princetechn.com/api/ephoto360/summerbeach?apikey=prince&text=${encodeURIComponent(text)}`;
                const { data } = await axios.get(apiUrl);
                if (!data.success || !data.result?.image_url) throw new Error('No image');
                await ridzcoder.sendMessage(m.chat, {
                    image: { url: data.result.image_url },
                    caption: `🏖️ *Summer Beach*\n\n> ${global.wm || ''}`
                }, { quoted: m });
                await ridzcoder.sendMessage(m.chat, { react: { text: "✅", key: m.key } });
            } catch (e) {
                console.error('summerbeach error:', e);
                await ridzcoder.sendMessage(m.chat, { react: { text: "❌", key: m.key } });
                reply("❌ Failed to generate image.");
            }
        }
    },
    {
        command: ['sandsummer', 'ssummer'],
        operate: async ({ ridzcoder, m, reply, text, prefix }) => {
            if (!text) return reply(`📌 *Usage:* ${prefix}sandsummer <text>`);
            try {
                await ridzcoder.sendMessage(m.chat, { react: { text: "🎨", key: m.key } });
                const apiUrl = `https://api.princetechn.com/api/ephoto360/sandsummer?apikey=prince&text=${encodeURIComponent(text)}`;
                const { data } = await axios.get(apiUrl);
                if (!data.success || !data.result?.image_url) throw new Error('No image');
                await ridzcoder.sendMessage(m.chat, {
                    image: { url: data.result.image_url },
                    caption: `🏝️ *Sand Summer*\n\n> ${global.wm || ''}`
                }, { quoted: m });
                await ridzcoder.sendMessage(m.chat, { react: { text: "✅", key: m.key } });
            } catch (e) {
                console.error('sandsummer error:', e);
                await ridzcoder.sendMessage(m.chat, { react: { text: "❌", key: m.key } });
                reply("❌ Failed to generate image.");
            }
        }
    },
    {
        command: ['luxurygold', 'lgold'],
        operate: async ({ ridzcoder, m, reply, text, prefix }) => {
            if (!text) return reply(`📌 *Usage:* ${prefix}luxurygold <text>`);
            try {
                await ridzcoder.sendMessage(m.chat, { react: { text: "🎨", key: m.key } });
                const apiUrl = `https://api.princetechn.com/api/ephoto360/luxurygold?apikey=prince&text=${encodeURIComponent(text)}`;
                const { data } = await axios.get(apiUrl);
                if (!data.success || !data.result?.image_url) throw new Error('No image');
                await ridzcoder.sendMessage(m.chat, {
                    image: { url: data.result.image_url },
                    caption: `👑 *Luxury Gold*\n\n> ${global.wm || ''}`
                }, { quoted: m });
                await ridzcoder.sendMessage(m.chat, { react: { text: "✅", key: m.key } });
            } catch (e) {
                console.error('luxurygold error:', e);
                await ridzcoder.sendMessage(m.chat, { react: { text: "❌", key: m.key } });
                reply("❌ Failed to generate image.");
            }
        }
    },
    {
        command: ['galaxy', 'galaxytext'],
        operate: async ({ ridzcoder, m, reply, text, prefix }) => {
            if (!text) return reply(`📌 *Usage:* ${prefix}galaxy <text>`);
            try {
                await ridzcoder.sendMessage(m.chat, { react: { text: "🎨", key: m.key } });
                const apiUrl = `https://api.princetechn.com/api/ephoto360/galaxy?apikey=prince&text=${encodeURIComponent(text)}`;
                const { data } = await axios.get(apiUrl);
                if (!data.success || !data.result?.image_url) throw new Error('No image');
                await ridzcoder.sendMessage(m.chat, {
                    image: { url: data.result.image_url },
                    caption: `🌌 *Galaxy*\n\n> ${global.wm || ''}`
                }, { quoted: m });
                await ridzcoder.sendMessage(m.chat, { react: { text: "✅", key: m.key } });
            } catch (e) {
                console.error('galaxy error:', e);
                await ridzcoder.sendMessage(m.chat, { react: { text: "❌", key: m.key } });
                reply("❌ Failed to generate image.");
            }
        }
    },
    {
        command: ['1917', 'text1917'],
        operate: async ({ ridzcoder, m, reply, text, prefix }) => {
            if (!text) return reply(`📌 *Usage:* ${prefix}1917 <text>`);
            try {
                await ridzcoder.sendMessage(m.chat, { react: { text: "🎨", key: m.key } });
                const apiUrl = `https://api.princetechn.com/api/ephoto360/1917?apikey=prince&text=${encodeURIComponent(text)}`;
                const { data } = await axios.get(apiUrl);
                if (!data.success || !data.result?.image_url) throw new Error('No image');
                await ridzcoder.sendMessage(m.chat, {
                    image: { url: data.result.image_url },
                    caption: `🎬 *1917*\n\n> ${global.wm || ''}`
                }, { quoted: m });
                await ridzcoder.sendMessage(m.chat, { react: { text: "✅", key: m.key } });
            } catch (e) {
                console.error('1917 error:', e);
                await ridzcoder.sendMessage(m.chat, { react: { text: "❌", key: m.key } });
                reply("❌ Failed to generate image.");
            }
        }
    },
    {
        command: ['makingneon', 'mneon'],
        operate: async ({ ridzcoder, m, reply, text, prefix }) => {
            if (!text) return reply(`📌 *Usage:* ${prefix}makingneon <text>`);
            try {
                await ridzcoder.sendMessage(m.chat, { react: { text: "🎨", key: m.key } });
                const apiUrl = `https://api.princetechn.com/api/ephoto360/makingneon?apikey=prince&text=${encodeURIComponent(text)}`;
                const { data } = await axios.get(apiUrl);
                if (!data.success || !data.result?.image_url) throw new Error('No image');
                await ridzcoder.sendMessage(m.chat, {
                    image: { url: data.result.image_url },
                    caption: `💫 *Making Neon*\n\n> ${global.wm || ''}`
                }, { quoted: m });
                await ridzcoder.sendMessage(m.chat, { react: { text: "✅", key: m.key } });
            } catch (e) {
                console.error('makingneon error:', e);
                await ridzcoder.sendMessage(m.chat, { react: { text: "❌", key: m.key } });
                reply("❌ Failed to generate image.");
            }
        }
    },
    {
        command: ['texteffect', 'teffect'],
        operate: async ({ ridzcoder, m, reply, text, prefix }) => {
            if (!text) return reply(`📌 *Usage:* ${prefix}texteffect <text>`);
            try {
                await ridzcoder.sendMessage(m.chat, { react: { text: "🎨", key: m.key } });
                const apiUrl = `https://api.princetechn.com/api/ephoto360/texteffect?apikey=prince&text=${encodeURIComponent(text)}`;
                const { data } = await axios.get(apiUrl);
                if (!data.success || !data.result?.image_url) throw new Error('No image');
                await ridzcoder.sendMessage(m.chat, {
                    image: { url: data.result.image_url },
                    caption: `🎭 *Text Effect*\n\n> ${global.wm || ''}`
                }, { quoted: m });
                await ridzcoder.sendMessage(m.chat, { react: { text: "✅", key: m.key } });
            } catch (e) {
                console.error('texteffect error:', e);
                await ridzcoder.sendMessage(m.chat, { react: { text: "❌", key: m.key } });
                reply("❌ Failed to generate image.");
            }
        }
    },
    {
        command: ['galaxystyle', 'gstyle'],
        operate: async ({ ridzcoder, m, reply, text, prefix }) => {
            if (!text) return reply(`📌 *Usage:* ${prefix}galaxystyle <text>`);
            try {
                await ridzcoder.sendMessage(m.chat, { react: { text: "🎨", key: m.key } });
                const apiUrl = `https://api.princetechn.com/api/ephoto360/galaxystyle?apikey=prince&text=${encodeURIComponent(text)}`;
                const { data } = await axios.get(apiUrl);
                if (!data.success || !data.result?.image_url) throw new Error('No image');
                await ridzcoder.sendMessage(m.chat, {
                    image: { url: data.result.image_url },
                    caption: `🌠 *Galaxy Style*\n\n> ${global.wm || ''}`
                }, { quoted: m });
                await ridzcoder.sendMessage(m.chat, { react: { text: "✅", key: m.key } });
            } catch (e) {
                console.error('galaxystyle error:', e);
                await ridzcoder.sendMessage(m.chat, { react: { text: "❌", key: m.key } });
                reply("❌ Failed to generate image.");
            }
        }
    },
    {
        command: ['lighteffect', 'leffect'],
        operate: async ({ ridzcoder, m, reply, text, prefix }) => {
            if (!text) return reply(`📌 *Usage:* ${prefix}lighteffect <text>`);
            try {
                await ridzcoder.sendMessage(m.chat, { react: { text: "🎨", key: m.key } });
                const apiUrl = `https://api.princetechn.com/api/ephoto360/lighteffect?apikey=prince&text=${encodeURIComponent(text)}`;
                const { data } = await axios.get(apiUrl);
                if (!data.success || !data.result?.image_url) throw new Error('No image');
                await ridzcoder.sendMessage(m.chat, {
                    image: { url: data.result.image_url },
                    caption: `💡 *Light Effect*\n\n> ${global.wm || ''}`
                }, { quoted: m });
                await ridzcoder.sendMessage(m.chat, { react: { text: "✅", key: m.key } });
            } catch (e) {
                console.error('lighteffect error:', e);
                await ridzcoder.sendMessage(m.chat, { react: { text: "❌", key: m.key } });
                reply("❌ Failed to generate image.");
            }
        }
    }
];