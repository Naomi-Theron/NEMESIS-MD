const axios = require('axios');

module.exports = [
    {
        command: ['generate', 'genimage', 'aiimage'],
        operate: async ({ ridzcoder, m, reply, text }) => {
            if (!text) return reply(global.mess?.notext || '*Please provide text to generate image*');
            
            const apiUrl = `https://api.gurusensei.workers.dev/dream?prompt=${encodeURIComponent(text)}`;
            try {
                await ridzcoder.sendMessage(m.chat, { image: { url: apiUrl } }, { quoted: m });
            } catch (error) {
                console.error('Error generating image:', error);
                reply(global.mess?.error || '*Failed to generate image*');
            }
        }
    },

    {
        command: ['copilot'],
        operate: async ({ ridzcoder, m, reply, args, prefix }) => {
            const query = args.join(' ');
            
            if (!query) {
                return reply(`*Usage:* ${prefix}copilot <question>\n*Example:* ${prefix}copilot How are you?`);
            }

            await reply(`⏳ *Thinking...*`);

            try {
                const apiUrl = `https://api.nexray.eu.cc/ai/copilot?text=${encodeURIComponent(query)}`;
                const response = await fetch(apiUrl);
                const data = await response.json();

                if (!data.status || !data.result) {
                    throw new Error('No response from API');
                }

                await reply(data.result);

            } catch (error) {
                console.error('Copilot error:', error);
                reply(`❌ Error: ${error.message}`);
            }
        }
    },
    {
        command: ['phi2', 'phiai'],
        operate: async ({ m, reply, args, ridzcoder }) => {
            const text = args.join(' ');
            
            if (!text) return reply("*Please provide a question. Example: `.phi2 How are you*`");
            
            try {
                await reply("🤔 Thinking...");
                
                const response = await fetch(`${global.siputzx}/api/ai/phi2?prompt=${encodeURIComponent(text)}&system=You+are+a+helpful+assistant&temperature=0.7`);
                const data = await response.json();
                
                if (!data.status || !data.data?.response) {
                    return reply("❌ Failed to get response from PHI2.");
                }
                
                reply(data.data.response);
                
            } catch (error) {
                console.error('PHI2 error:', error);
                reply("❌ Error communicating with PHI2 AI.");
            }
        }
    },

    // ─────────────────────────────────────────────
    // DAVID CYRIL AI VIDEO GENERATORS
    // ─────────────────────────────────────────────
    {
        command: ['txt2vid', 'text2video', 'texttovideo'],
        operate: async ({ ridzcoder, m, reply, text, prefix }) => {
            if (!text) return reply(`📌 *Usage:* ${prefix}txt2vid <prompt>\n📌 *Example:* ${prefix}txt2vid a cat walking on the beach at sunset, cinematic`);

            try {
                await reply("⏳ *Generating video...* This may take a while.");
                await ridzcoder.sendMessage(m.chat, { react: { text: "🎬", key: m.key } });

                const apiUrl = `https://apis.davidcyril.name.ng/ai/txt2vid?prompt=${encodeURIComponent(text)}&aspect_ratio=auto&ai_sound=true`;
                const response = await fetch(apiUrl, {
                    method: 'GET',
                    headers: { 'X-API-Key': 'dc_live_0e4LwwrTNGh-FVPp9kxe9WH0c5Jt6TvT' }
                });
                const data = await response.json();

                const videoUrl = data?.result?.video_url || data?.result?.url || data?.video_url || data?.url || data?.data?.video_url || data?.data?.url;
                if (!videoUrl) { console.log('txt2vid:', JSON.stringify(data)); throw new Error('No video URL'); }

                await ridzcoder.sendMessage(m.chat, {
                    video: { url: videoUrl },
                    mimetype: "video/mp4",
                    caption: `🎬 *Text-to-Video*\n\n📝 *Prompt:* ${text}\n\n> ${global.wm || ''}`
                }, { quoted: m });

                await ridzcoder.sendMessage(m.chat, { react: { text: "✅", key: m.key } });
            } catch (e) {
                console.error('txt2vid error:', e);
                await ridzcoder.sendMessage(m.chat, { react: { text: "❌", key: m.key } });
                reply("❌ Failed to generate video. Try again later.");
            }
        }
    },
    {
        command: ['jollyvideo', 'jollyvid'],
        operate: async ({ ridzcoder, m, reply, text, prefix }) => {
            if (!text) return reply(`📌 *Usage:* ${prefix}jollyvideo <prompt>\n📌 *Example:* ${prefix}jollyvideo a dragon flying over mountains`);

            try {
                await reply("⏳ *Submitting Jolly Video job...*");
                await ridzcoder.sendMessage(m.chat, { react: { text: "🎬", key: m.key } });

                const submitUrl = `https://apis.davidcyril.name.ng/ai/jolly-video?prompt=${encodeURIComponent(text)}`;
                const submitRes = await fetch(submitUrl, {
                    method: 'GET',
                    headers: { 'X-API-Key': 'dc_live_0e4LwwrTNGh-FVPp9kxe9WH0c5Jt6TvT' }
                });
                const submitData = await submitRes.json();

                const jobId = submitData?.result?.job_id || submitData?.job_id || submitData?.id || submitData?.data?.job_id;
                if (!jobId) { console.log('jolly submit:', JSON.stringify(submitData)); throw new Error('No job ID'); }

                await reply(`📋 *Job submitted!*\n🆔 \`${jobId}\`\n⏳ Polling for result...`);

                let videoUrl = null;
                for (let i = 0; i < 40; i++) {
                    await new Promise(r => setTimeout(r, 5000));

                    const statusRes = await fetch(`https://apis.davidcyril.name.ng/ai/jolly-job-status?job_id=${jobId}`, {
                        method: 'GET',
                        headers: { 'X-API-Key': 'dc_live_0e4LwwrTNGh-FVPp9kxe9WH0c5Jt6TvT' }
                    });
                    const statusData = await statusRes.json();

                    const status = statusData?.result?.status || statusData?.status || statusData?.data?.status;
                    videoUrl = statusData?.result?.video_url || statusData?.result?.url || statusData?.video_url || statusData?.data?.video_url;

                    console.log(`[jolly ${i + 1}] status: ${status}`);

                    if (videoUrl || status === 'completed' || status === 'success' || status === 'done') {
                        videoUrl = videoUrl || statusData?.result?.video_url || statusData?.result?.url;
                        break;
                    }
                    if (status === 'failed' || status === 'error') {
                        throw new Error(`Job failed: ${statusData?.result?.error || statusData?.error || 'unknown'}`);
                    }
                }

                if (!videoUrl) throw new Error('Timeout waiting for video');

                await ridzcoder.sendMessage(m.chat, {
                    video: { url: videoUrl },
                    mimetype: "video/mp4",
                    caption: `🎬 *Jolly Video*\n\n📝 *Prompt:* ${text}\n🆔 *Job:* ${jobId}\n\n> ${global.wm || ''}`
                }, { quoted: m });

                await ridzcoder.sendMessage(m.chat, { react: { text: "✅", key: m.key } });
            } catch (e) {
                console.error('jollyvideo error:', e);
                await ridzcoder.sendMessage(m.chat, { react: { text: "❌", key: m.key } });
                reply(`❌ ${e.message}`);
            }
        }
    },
    {
        command: ['jollystatus', 'jollyjob'],
        operate: async ({ ridzcoder, m, reply, text, prefix }) => {
            if (!text) return reply(`📌 *Usage:* ${prefix}jollystatus <job_id>`);

            try {
                await ridzcoder.sendMessage(m.chat, { react: { text: "🔄", key: m.key } });

                const apiUrl = `https://apis.davidcyril.name.ng/ai/jolly-job-status?job_id=${encodeURIComponent(text)}`;
                const res = await fetch(apiUrl, {
                    method: 'GET',
                    headers: { 'X-API-Key': 'dc_live_0e4LwwrTNGh-FVPp9kxe9WH0c5Jt6TvT' }
                });
                const data = await res.json();

                const status = data?.result?.status || data?.status || 'unknown';
                const videoUrl = data?.result?.video_url || data?.result?.url || data?.video_url;

                let msg = `📋 *Jolly Job Status*\n\n🆔 *Job ID:* ${text}\n📊 *Status:* ${status}`;
                if (videoUrl) msg += `\n🎬 *Video:* ${videoUrl}`;
                msg += `\n\n> ${global.wm || ''}`;

                await reply(msg);
                await ridzcoder.sendMessage(m.chat, { react: { text: "✅", key: m.key } });
            } catch (e) {
                console.error('jollystatus error:', e);
                await ridzcoder.sendMessage(m.chat, { react: { text: "❌", key: m.key } });
                reply("❌ Failed to fetch job status.");
            }
        }
    },
    {
        command: ['wanvideo', 'wanvid'],
        operate: async ({ ridzcoder, m, reply, text, prefix }) => {
            if (!text) return reply(`📌 *Usage:* ${prefix}wanvideo <prompt>\n📌 *Example:* ${prefix}wanvideo a futuristic city at night`);

            try {
                await reply("⏳ *Submitting Wan Video job...*");
                await ridzcoder.sendMessage(m.chat, { react: { text: "🎬", key: m.key } });

                const submitUrl = `https://apis.davidcyril.name.ng/ai/wan-video?prompt=${encodeURIComponent(text)}`;
                const submitRes = await fetch(submitUrl, {
                    method: 'GET',
                    headers: { 'X-API-Key': 'dc_live_0e4LwwrTNGh-FVPp9kxe9WH0c5Jt6TvT' }
                });
                const submitData = await submitRes.json();

                const jobId = submitData?.result?.job_id || submitData?.job_id || submitData?.id || submitData?.data?.job_id;
                if (!jobId) { console.log('wan submit:', JSON.stringify(submitData)); throw new Error('No job ID'); }

                await reply(`📋 *Job submitted!*\n🆔 \`${jobId}\`\n⏳ Polling for result...`);

                let videoUrl = null;
                for (let i = 0; i < 40; i++) {
                    await new Promise(r => setTimeout(r, 5000));

                    const statusRes = await fetch(`https://apis.davidcyril.name.ng/ai/wan-job-status?job_id=${jobId}`, {
                        method: 'GET',
                        headers: { 'X-API-Key': 'dc_live_0e4LwwrTNGh-FVPp9kxe9WH0c5Jt6TvT' }
                    });
                    const statusData = await statusRes.json();

                    const status = statusData?.result?.status || statusData?.status;
                    videoUrl = statusData?.result?.video_url || statusData?.result?.url || statusData?.video_url;

                    console.log(`[wan ${i + 1}] status: ${status}`);
                    if (videoUrl || status === 'completed' || status === 'success' || status === 'done') break;
                    if (status === 'failed' || status === 'error') throw new Error(`Job failed: ${status}`);
                }

                if (!videoUrl) throw new Error('Timeout');

                await ridzcoder.sendMessage(m.chat, {
                    video: { url: videoUrl },
                    mimetype: "video/mp4",
                    caption: `🎬 *Wan Video*\n\n📝 *Prompt:* ${text}\n🆔 *Job:* ${jobId}\n\n> ${global.wm || ''}`
                }, { quoted: m });
                await ridzcoder.sendMessage(m.chat, { react: { text: "✅", key: m.key } });
            } catch (e) {
                console.error('wanvideo error:', e);
                await ridzcoder.sendMessage(m.chat, { react: { text: "❌", key: m.key } });
                reply(`❌ ${e.message}`);
            }
        }
    },
    {
        command: ['wanstatus', 'wanjob'],
        operate: async ({ ridzcoder, m, reply, text, prefix }) => {
            if (!text) return reply(`📌 *Usage:* ${prefix}wanstatus <job_id>`);

            try {
                await ridzcoder.sendMessage(m.chat, { react: { text: "🔄", key: m.key } });

                const res = await fetch(`https://apis.davidcyril.name.ng/ai/wan-job-status?job_id=${encodeURIComponent(text)}`, {
                    method: 'GET',
                    headers: { 'X-API-Key': 'dc_live_0e4LwwrTNGh-FVPp9kxe9WH0c5Jt6TvT' }
                });
                const data = await res.json();

                const status = data?.result?.status || data?.status || 'unknown';
                const videoUrl = data?.result?.video_url || data?.result?.url || data?.video_url;

                let msg = `📋 *Wan Job Status*\n\n🆔 *Job ID:* ${text}\n📊 *Status:* ${status}`;
                if (videoUrl) msg += `\n🎬 *Video:* ${videoUrl}`;
                msg += `\n\n> ${global.wm || ''}`;

                await reply(msg);
                await ridzcoder.sendMessage(m.chat, { react: { text: "✅", key: m.key } });
            } catch (e) {
                console.error('wanstatus error:', e);
                await ridzcoder.sendMessage(m.chat, { react: { text: "❌", key: m.key } });
                reply("❌ Failed to fetch job status.");
            }
        }
    },
    {
        command: ['klingvideo', 'klingvid'],
        operate: async ({ ridzcoder, m, reply, text, prefix }) => {
            if (!text) return reply(`📌 *Usage:* ${prefix}klingvideo <prompt>\n📌 *Example:* ${prefix}klingvideo a majestic lion in the savanna`);

            try {
                await reply("⏳ *Submitting Kling Video job...*");
                await ridzcoder.sendMessage(m.chat, { react: { text: "🎬", key: m.key } });

                const submitRes = await fetch(`https://apis.davidcyril.name.ng/ai/kling-video?prompt=${encodeURIComponent(text)}`, {
                    method: 'GET',
                    headers: { 'X-API-Key': 'dc_live_0e4LwwrTNGh-FVPp9kxe9WH0c5Jt6TvT' }
                });
                const submitData = await submitRes.json();

                const jobId = submitData?.result?.job_id || submitData?.job_id || submitData?.id || submitData?.data?.job_id;
                if (!jobId) { console.log('kling submit:', JSON.stringify(submitData)); throw new Error('No job ID'); }

                await reply(`📋 *Job submitted!*\n🆔 \`${jobId}\`\n⏳ Polling for result...`);

                let videoUrl = null;
                for (let i = 0; i < 40; i++) {
                    await new Promise(r => setTimeout(r, 5000));

                    const statusRes = await fetch(`https://apis.davidcyril.name.ng/ai/kling-job-status?job_id=${jobId}`, {
                        method: 'GET',
                        headers: { 'X-API-Key': 'dc_live_0e4LwwrTNGh-FVPp9kxe9WH0c5Jt6TvT' }
                    });
                    const statusData = await statusRes.json();

                    const status = statusData?.result?.status || statusData?.status;
                    videoUrl = statusData?.result?.video_url || statusData?.result?.url || statusData?.video_url;

                    console.log(`[kling ${i + 1}] status: ${status}`);
                    if (videoUrl || status === 'completed' || status === 'success' || status === 'done') break;
                    if (status === 'failed' || status === 'error') throw new Error(`Job failed: ${status}`);
                }

                if (!videoUrl) throw new Error('Timeout');

                await ridzcoder.sendMessage(m.chat, {
                    video: { url: videoUrl },
                    mimetype: "video/mp4",
                    caption: `🎬 *Kling Video*\n\n📝 *Prompt:* ${text}\n🆔 *Job:* ${jobId}\n\n> ${global.wm || ''}`
                }, { quoted: m });
                await ridzcoder.sendMessage(m.chat, { react: { text: "✅", key: m.key } });
            } catch (e) {
                console.error('klingvideo error:', e);
                await ridzcoder.sendMessage(m.chat, { react: { text: "❌", key: m.key } });
                reply(`❌ ${e.message}`);
            }
        }
    },
    {
        command: ['klingstatus', 'klingjob'],
        operate: async ({ ridzcoder, m, reply, text, prefix }) => {
            if (!text) return reply(`📌 *Usage:* ${prefix}klingstatus <job_id>`);

            try {
                await ridzcoder.sendMessage(m.chat, { react: { text: "🔄", key: m.key } });

                const res = await fetch(`https://apis.davidcyril.name.ng/ai/kling-job-status?job_id=${encodeURIComponent(text)}`, {
                    method: 'GET',
                    headers: { 'X-API-Key': 'dc_live_0e4LwwrTNGh-FVPp9kxe9WH0c5Jt6TvT' }
                });
                const data = await res.json();

                const status = data?.result?.status || data?.status || 'unknown';
                const videoUrl = data?.result?.video_url || data?.result?.url || data?.video_url;

                let msg = `📋 *Kling Job Status*\n\n🆔 *Job ID:* ${text}\n📊 *Status:* ${status}`;
                if (videoUrl) msg += `\n🎬 *Video:* ${videoUrl}`;
                msg += `\n\n> ${global.wm || ''}`;

                await reply(msg);
                await ridzcoder.sendMessage(m.chat, { react: { text: "✅", key: m.key } });
            } catch (e) {
                console.error('klingstatus error:', e);
                await ridzcoder.sendMessage(m.chat, { react: { text: "❌", key: m.key } });
                reply("❌ Failed to fetch job status.");
            }
        }
    }
];