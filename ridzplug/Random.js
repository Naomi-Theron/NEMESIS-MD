    // ─────────────────────────────────────────────
    // DAVID CYRIL RANDOM ENDPOINTS
    // ─────────────────────────────────────────────
    {
        command: ['bored', 'boredactivity', 'activity'],
        operate: async ({ ridzcoder, m, reply, prefix }) => {
            try {
                await ridzcoder.sendMessage(m.chat, { react: { text: "🎯", key: m.key } });

                const apiUrl = `https://apis.davidcyril.name.ng/endpoints/random/bored`;
                const response = await fetch(apiUrl, {
                    method: 'GET',
                    headers: { 'X-API-Key': 'dc_live_0e4LwwrTNGh-FVPp9kxe9WH0c5Jt6TvT' }
                });
                const data = await response.json();

                // Try common field names
                const activity = data?.result?.activity || data?.activity || data?.result || data?.data?.activity;
                const type = data?.result?.type || data?.type || data?.data?.type;
                const participants = data?.result?.participants || data?.participants || data?.data?.participants;
                const price = data?.result?.price || data?.price || data?.data?.price;

                if (!activity || typeof activity !== 'string') {
                    console.log('bored response:', JSON.stringify(data));
                    throw new Error('No activity in response');
                }

                let msg = `🎯 *Bored Activity*\n\n`;
                msg += `📝 *Activity:* ${activity}\n`;
                if (type) msg += `🏷️ *Type:* ${type}\n`;
                if (participants) msg += `👥 *Participants:* ${participants}\n`;
                if (price !== undefined) msg += `💰 *Price:* ${price}\n`;
                msg += `\n> ${global.wm || ''}`;

                await reply(msg);
                await ridzcoder.sendMessage(m.chat, { react: { text: "✅", key: m.key } });
            } catch (e) {
                console.error('bored error:', e);
                await ridzcoder.sendMessage(m.chat, { react: { text: "❌", key: m.key } });
                reply("❌ Failed to fetch a bored activity.");
            }
        }
    },
    {
        command: ['catfact', 'catfacts', 'meowfact'],
        operate: async ({ ridzcoder, m, reply }) => {
            try {
                await ridzcoder.sendMessage(m.chat, { react: { text: "🐱", key: m.key } });

                const apiUrl = `https://apis.davidcyril.name.ng/endpoints/random/catfact`;
                const response = await fetch(apiUrl, {
                    method: 'GET',
                    headers: { 'X-API-Key': 'dc_live_0e4LwwrTNGh-FVPp9kxe9WH0c5Jt6TvT' }
                });
                const data = await response.json();

                const fact = data?.result?.fact || data?.fact || data?.result || data?.data?.fact;

                if (!fact || typeof fact !== 'string') {
                    console.log('catfact response:', JSON.stringify(data));
                    throw new Error('No fact in response');
                }

                await reply(`🐱 *Cat Fact*\n\n${fact}\n\n> ${global.wm || ''}`);
                await ridzcoder.sendMessage(m.chat, { react: { text: "✅", key: m.key } });
            } catch (e) {
                console.error('catfact error:', e);
                await ridzcoder.sendMessage(m.chat, { react: { text: "❌", key: m.key } });
                reply("❌ Failed to fetch cat fact.");
            }
        }
    },
    {
        command: ['dog', 'dogpic', 'randomdog', 'woof'],
        operate: async ({ ridzcoder, m, reply }) => {
            try {
                await ridzcoder.sendMessage(m.chat, { react: { text: "🐶", key: m.key } });

                const apiUrl = `https://apis.davidcyril.name.ng/endpoints/random/dog`;
                const response = await fetch(apiUrl, {
                    method: 'GET',
                    headers: { 'X-API-Key': 'dc_live_0e4LwwrTNGh-FVPp9kxe9WH0c5Jt6TvT' }
                });
                const data = await response.json();

                const imgUrl =
                    data?.result?.url ||
                    data?.result?.image ||
                    data?.url ||
                    data?.image ||
                    data?.data?.url ||
                    data?.data?.image ||
                    (typeof data?.result === 'string' ? data.result : null);

                if (!imgUrl) {
                    console.log('dog response:', JSON.stringify(data));
                    throw new Error('No image URL in response');
                }

                await ridzcoder.sendMessage(m.chat, {
                    image: { url: imgUrl },
                    caption: `🐶 *Random Dog*\n\n> ${global.wm || ''}`
                }, { quoted: m });

                await ridzcoder.sendMessage(m.chat, { react: { text: "✅", key: m.key } });
            } catch (e) {
                console.error('dog error:', e);
                await ridzcoder.sendMessage(m.chat, { react: { text: "❌", key: m.key } });
                reply("❌ Failed to fetch dog image.");
            }
        }
    },
    {
        command: ['quote', 'inspire', 'randomquote', 'quoteme'],
        operate: async ({ ridzcoder, m, reply }) => {
            try {
                await ridzcoder.sendMessage(m.chat, { react: { text: "💭", key: m.key } });

                const apiUrl = `https://apis.davidcyril.name.ng/endpoints/random/quote`;
                const response = await fetch(apiUrl, {
                    method: 'GET',
                    headers: { 'X-API-Key': 'dc_live_0e4LwwrTNGh-FVPp9kxe9WH0c5Jt6TvT' }
                });
                const data = await response.json();

                const quote = data?.result?.quote || data?.quote || data?.result?.content || data?.content || data?.data?.quote;
                const author = data?.result?.author || data?.author || data?.data?.author;

                if (!quote || typeof quote !== 'string') {
                    console.log('quote response:', JSON.stringify(data));
                    throw new Error('No quote in response');
                }

                let msg = `💭 *Random Quote*\n\n_"${quote}"_`;
                if (author) msg += `\n\n— *${author}*`;
                msg += `\n\n> ${global.wm || ''}`;

                await reply(msg);
                await ridzcoder.sendMessage(m.chat, { react: { text: "✅", key: m.key } });
            } catch (e) {
                console.error('quote error:', e);
                await ridzcoder.sendMessage(m.chat, { react: { text: "❌", key: m.key } });
                reply("❌ Failed to fetch quote.");
            }
        }
    },
    {
        command: ['waifu', 'randomwaifu', 'animewaifu'],
        operate: async ({ ridzcoder, m, reply }) => {
            try {
                await ridzcoder.sendMessage(m.chat, { react: { text: "🌸", key: m.key } });

                const apiUrl = `https://apis.davidcyril.name.ng/endpoints/random/waifu`;
                const response = await fetch(apiUrl, {
                    method: 'GET',
                    headers: { 'X-API-Key': 'dc_live_0e4LwwrTNGh-FVPp9kxe9WH0c5Jt6TvT' }
                });
                const data = await response.json();

                const imgUrl =
                    data?.result?.url ||
                    data?.result?.image ||
                    data?.url ||
                    data?.image ||
                    data?.data?.url ||
                    data?.data?.image ||
                    (typeof data?.result === 'string' ? data.result : null);

                if (!imgUrl) {
                    console.log('waifu response:', JSON.stringify(data));
                    throw new Error('No image URL in response');
                }

                await ridzcoder.sendMessage(m.chat, {
                    image: { url: imgUrl },
                    caption: `🌸 *Random Waifu*\n\n> ${global.wm || ''}`
                }, { quoted: m });

                await ridzcoder.sendMessage(m.chat, { react: { text: "✅", key: m.key } });
            } catch (e) {
                console.error('waifu error:', e);
                await ridzcoder.sendMessage(m.chat, { react: { text: "❌", key: m.key } });
                reply("❌ Failed to fetch waifu image.");
            }
        }
    },
    {
        command: ['technews', 'tech', 'tnews'],
        operate: async ({ ridzcoder, m, reply }) => {
            try {
                await ridzcoder.sendMessage(m.chat, { react: { text: "📰", key: m.key } });

                const apiUrl = `https://apis.davidcyril.name.ng/endpoints/random/technews`;
                const response = await fetch(apiUrl, {
                    method: 'GET',
                    headers: { 'X-API-Key': 'dc_live_0e4LwwrTNGh-FVPp9kxe9WH0c5Jt6TvT' }
                });
                const data = await response.json();

                // Try common shapes
                const results = data?.result || data?.results || data?.data || (Array.isArray(data) ? data : null);

                if (!results || (Array.isArray(results) && results.length === 0)) {
                    console.log('technews response:', JSON.stringify(data));
                    throw new Error('No news found');
                }

                const items = Array.isArray(results) ? results.slice(0, 5) : [results];

                let msg = `📰 *Tech News*\n\n`;
                items.forEach((item, i) => {
                    const title = item?.title || item?.headline || 'Untitled';
                    const desc = item?.description || item?.summary || item?.content || '';
                    const link = item?.url || item?.link || '';
                    const source = item?.source || item?.author || '';

                    msg += `*${i + 1}. ${title}*\n`;
                    if (source) msg += `📡 ${source}\n`;
                    if (desc) msg += `${desc.substring(0, 150)}${desc.length > 150 ? '...' : ''}\n`;
                    if (link) msg += `🔗 ${link}\n`;
                    msg += `\n`;
                });
                msg += `> ${global.wm || ''}`;

                if (msg.length > 4000) msg = msg.substring(0, 4000) + '\n\n*...truncated*';

                await reply(msg);
                await ridzcoder.sendMessage(m.chat, { react: { text: "✅", key: m.key } });
            } catch (e) {
                console.error('technews error:', e);
                await ridzcoder.sendMessage(m.chat, { react: { text: "❌", key: m.key } });
                reply("❌ Failed to fetch tech news.");
            }
        }
    }
];