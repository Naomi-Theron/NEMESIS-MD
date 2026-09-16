const { runtime,
formatSize,
sleep,
getBuffer
 } = require('../start/lib/myfunction');
 const moment = require('moment-timezone');
 const os = require('os');
 const fs = require('fs');
 const { performance } = require("perf_hooks");
const fetch = require('node-fetch');
const axios = require('axios');
const checkDiskSpace = require('check-disk-space').default;

async function checkBandwidth() {
    return {
        download: formatSize(0), 
        upload: formatSize(0)   
    };
}

module.exports = [

{
    command: ['ping', 'p'],
    operate: async ({ ridzcoder, m, reply }) => {
        const start = performance.now();
        
        const sent = await ridzcoder.sendMessage(m.chat, { 
            text: "▸ *Pong!*" 
        }, { quoted: m });
        
        const ping = (performance.now() - start).toFixed(1);
        
        const response = `
╭──⧼♛ NEMESIS MD PONG ♛⧽──≽
│┃ ♛ *Speed* : ${ping}ms
│┃ ♛ *Status* : ${ping < 300 ? '✅ Fast' : ping < 600 ? '⚠️ Medium' : '🐢 Slow'}
╰────────────────≽`;

        await ridzcoder.sendMessage(m.chat, {
            text: response,
            edit: sent.key
        });
    }
},
    {
    command: ['alive'],
    operate: async ({ ridzcoder, m, reply, getServerUptime }) => { 
        const serverUptime = getServerUptime();
        
        // Array of image URLs
        const imageUrls = [
            './start/lib/Media/Images/Nemesis1.jpg',
            './start/lib/Media/Images/Nemesis2.jpg',
            './start/lib/Media/Images/Nemesis3.jpg',
            './start/lib/Media/Images/Nemesis4.jpg'
        ];
        
        const audioUrls = [
            './start/lib/Media/JexAudio1.mp3',
            './start/lib/Media/JexAudio2.mp3',
            './start/lib/Media/JexAudio3.mp3',
            './start/lib/Media/JexAudio4.mp3',
            './start/lib/Media/JexAudio5.mp3',
            './start/lib/Media/JexAudio6.mp3',
            './start/lib/Media/JexAudio8.mp3',
            './start/lib/Media/JexAudio7.mp3'
        ];
        
        // Randomly select an image and audio
        const randomImageUrl = imageUrls[Math.floor(Math.random() * imageUrls.length)];
        const randomAudioUrl = audioUrls[Math.floor(Math.random() * audioUrls.length)];
        
        // Send the randomly selected image with caption (using server uptime)
        await ridzcoder.sendMessage(
            m.chat, 
            { 
                image: { url: randomImageUrl },
                caption: `*We can't change what's done, we can only move on*\n\n*⏰ Server Uptime: ${serverUptime}*`
            },
            { quoted: m }
        );
        
        // Send the randomly selected audio as PTT
        await ridzcoder.sendMessage(
            m.chat,
            {
                audio: { url: randomAudioUrl },
                mp3: true,
                mimetype: 'audio/mp4'
            },
            { quoted: m }
        );
    }
},
    {
    command: ['uptime', 'up', 'runtime'],
    operate: async ({ ridzcoder, m, reply, getServerUptime }) => { 
        const serverUptime = getServerUptime();
        
        const info = `│┃ ♛ *Server Uptime* : *${serverUptime}*`;

        await ridzcoder.sendMessage(m.chat, { text: info }, { quoted: m });
    }
},
    {
    command: ['pair', 'pairing', 'getcode'],
    operate: async ({ ridzcoder, m, reply, text, prefix, command, args }) => {
        if (!text) {
            return reply(
                `Oops! You forgot the number.\n\nExample:\n${prefix + command} 25674293XXXX`
            );
        }

        // Normalize and validate numbers
        const numbers = text.split(",")
            .map(v => v.replace(/[^0-9]/g, "")) // keep only digits
            .filter(v => v.length >= 6 && v.length <= 20);

        if (numbers.length === 0) {
            await ridzcoder.sendMessage(
                m.chat,
                { text: "Invalid number format. Please use digits only (6–20 digits)." },
                { quoted: m }
            );
            return;
        }

        for (const number of numbers) {
            const whatsappID = `${number}@s.whatsapp.net`;
            
            try {
                // Check if number exists on WhatsApp
                const result = await ridzcoder.onWhatsApp(whatsappID);

                if (!result?.[0]?.exists) {
                    await ridzcoder.sendMessage(
                        m.chat,
                        { text: `Number ${number} is not registered on WhatsApp.` },
                        { quoted: m }
                    );
                    continue;
                }

                // Notify processing
                await ridzcoder.sendMessage(
                    m.chat,
                    { text: `Generating code for: ${number}` },
                    { quoted: m }
                );

                // Fetch pairing code from API
                const axios = require('axios');
                const response = await axios.get(
                    `https://session.ridzcoder.xyz/code?number=${number}`,
                    { timeout: 20000 }
                );

                const code = response.data?.code;
                if (!code || code === "Service Unavailable") {
                    throw new Error("Service Unavailable");
                }

                // Send the pairing code
                await sleep(3000);
                await ridzcoder.sendMessage(
                    m.chat,
                    { text: `${code}` },
                    { quoted: m }
                );

                // Send help instructions
                await ridzcoder.sendMessage(
                    m.chat,
                    { 
                        text: `How to Link ${number}\n\n` +
                              `1. Copy the code above\n` +
                              `2. Open WhatsApp\n` +
                              `3. Go to Settings > Linked Devices\n` +
                              `4. Tap Link a Device\n` +
                              `5. Enter the code\n` +
                              `6. Wait for it to load\n` +
                              `7. Done! Your device is now linked.\n\n` +
                              `Tip: Use the session_id in your DM to deploy.`
                    },
                    { quoted: m }
                );

            } catch (apiError) {
                console.error("API Error:", apiError.message);
                
                const errorMessage = apiError.message === "Service Unavailable"
                    ? "Service is currently unavailable. Please try again later."
                    : "Failed to generate pairing code. Please try again later.";

                await ridzcoder.sendMessage(
                    m.chat,
                    { text: errorMessage },
                    { quoted: m }
                );
            }
        }
    }
},
        {
        command: ['botinfo', 'info', 'about'],
        operate: async ({ ridzcoder, m, reply, botNumber }) => {
            const botname = `${global.botname}`;
            const ownername = "Ridz Coder";
            
            const botInfo = `
╭──⧼♛  BOT INFORMATION ♛⧽──≽
│┃ ♛
│┃ ♛ *Name*    : ${global.botname || 'NEMESIS-MD'}
│┃ ♛ *Owner*   : Ridz Coder 
│┃ ♛ *Version* : ${global.versions || '2.1.0'}
│┃ ♛ *Runtime* : ${runtime(process.uptime())}
╰─────────────────────≽`;

            const imageUrl = [
                './start/lib/Media/Images/Nemesis1.jpg',
                './start/lib/Media/Images/Nemesis2.jpg',
                './start/lib/Media/Images/Nemesis3.jpg',
                './start/lib/Media/Images/Nemesis4.jpg'
                
            ];
            
           const audioUrls = [
    './start/lib/Media/JexAudio1.mp3',
    './start/lib/Media/JexAudio2.mp3',
    './start/lib/Media/JexAudio3.mp3',
    './start/lib/Media/JexAudio8.mp3',
    './start/lib/Media/JexAudio4.mp3',
    './start/lib/Media/JexAudio5.mp3',
    './start/lib/Media/JexAudio6.mp3',
    './start/lib/Media/JexAudio7.mp3'
];
            
            // Randomly select an audio URL
            const randomAudioUrl = audioUrls[Math.floor(Math.random() * audioUrls.length)];
            
            // Send the image with caption
            await ridzcoder.sendMessage(
                m.chat, 
                { 
                    image: { url: imageUrl },
                    caption: `*🌹Hi. There ${global.botname}, a friendly WhatsApp bot.*${botInfo}`
                },
                { quoted: m }
            );
            
            // Send the randomly selected audio as PTT
            await ridzcoder.sendMessage(
                m.chat,
                {
                    audio: { url: randomAudioUrl },
                    mp3: true,
                    mimetype: 'audio/mp4'
                },
                { quoted: m }
            );
        }
    },
   {
    command: ['botstatus', 'systeminfo', 'stats'],
    operate: async ({ ridzcoder, m, reply, getHostPlatform, getServerUptime }) => {
        const used = process.memoryUsage();
        const totalRam = os.totalmem();
        const freeRam = os.freemem();
        const usedRam = totalRam - freeRam;
        const ramPercent = ((usedRam / totalRam) * 100).toFixed(1);
        
        const disk = await checkDiskSpace(process.cwd());
        const diskUsed = disk.size - disk.free;
        const diskPercent = ((diskUsed / disk.size) * 100).toFixed(1);
        
        const start = performance.now();
        await reply("⏳ *Calculating system Info...*");
        const ping = (performance.now() - start).toFixed(2);
        
        const serverUptime = getServerUptime();
        
        const cpus = os.cpus();
        const cpuModel = cpus[0].model;
        const cpuCores = cpus.length;
        const loadAvg = os.loadavg();
        
        const status = `
╭──⧼♛  BOT STATUS ♛⧽──≽
│┃ ♛ *Ping*          : ${ping}ms
│┃ ♛ *Server Uptime* : ${serverUptime}
│┃ ♛ *RAM*           : ${formatSize(usedRam)} / ${formatSize(totalRam)} (${ramPercent}%)
│┃ ♛ *Disk*          : ${formatSize(diskUsed)} / ${formatSize(disk.size)} (${diskPercent}%)
│┃ ♛ *CPU*           : ${cpuModel.substring(0, 25)}... (${cpuCores} cores)
│┃ ♛ *Load*          : ${loadAvg[0].toFixed(2)}%, ${loadAvg[1].toFixed(2)}%, ${loadAvg[2].toFixed(2)}%
│┃ ♛ *Platform*      : ${getHostPlatform()} ${os.release()}
│┃ ♛ *Node*          : ${process.version}
│┃ ♛ *Host*          : ${os.hostname()}
╰────────────────≽`;

        await ridzcoder.sendMessage(m.chat, { text: status }, { quoted: m });
    }
},
    {
    command: ['repo', 'source', 'sourcecode', 'repository'],
    operate: async ({ ridzcoder, m, reply }) => {
        try {
            const repoOwner = "ridzcoder";
            const repoName = "NEMESIS-MD";
            const apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}`;
            
            const { data } = await axios.get(apiUrl, {
                timeout: 5000,
                headers: { 'User-Agent': 'NEMESIS-MD' }
            });

            const repoInfo = `
╭──⧼♛  *NEMESIS-MD Repository* ♛⧽──≽
│
│┃ ♛ *Repository*  : ${data.name || repoName}
│┃ ♛ *Owner*       : ${repoOwner}
│┃ ♛ *Description* : ${data.description || 'No description'}
│
│┃ ♛ *Stars*       :  ${data.stargazers_count || 0}
│┃ ♛ *Forks*       :  ${data.forks_count || 0}
│┃ ♛ *Issues*      :  ${data.open_issues_count || 0}
│┃ ♛ *Watchers*    : 👀 ${data.watchers_count || 0}
│
│┃ ♛ *Language*    : ${data.language || 'N/A'}
│┃ ♛ *License*     : ${data.license?.name || 'None'}
│┃ ♛ *Created*     : ${new Date(data.created_at).toLocaleDateString()}
│┃ ♛ *Updated*     :  ${new Date(data.updated_at).toLocaleDateString()}
│
│┃ ♛ *GitHub Link* :
│┃ ♛ https://github.com/${repoOwner}/${repoName}
╰────────────────≽

✨ @${m.sender.split("@")[0]} *Don't forget to ⭐ star the repo!* ✨`;

            const thumbnailUrl = 'https://files.catbox.moe/dynze8.png';
            
            await ridzcoder.sendMessage(m.chat, {
                text: repoInfo,
                contextInfo: {
                    mentionedJid: [m.sender],
                    externalAdReply: {
                        title: "🌟 NEMESIS-MD Repository",
                        body: `⭐ ${data.stargazers_count || 0} Stars | 🍴 ${data.forks_count || 0} Forks`,
                        thumbnailUrl: thumbnailUrl,  
                        sourceUrl: `https://github.com/${repoOwner}/${repoName}`,
                        mediaType: 1,
                        renderLargerThumbnail: true
                    }
                }
            }, { quoted: m });

        } catch (error) {
            console.error('Repo error:', error);
            const fallbackInfo = `
╭──⧼♛ *NEMESIS MD REPO* ♛⧽──≽
│
│┃ ♛ *Repository* : NEMESIS-MD
│┃ ♛ *Owner*      : ridzcoder
│┃ ♛ *GitHub*     : https://github.com/ridzcoder/NEMESIS-MD
╰────────────────≽

✨ @${m.sender.split("@")[0]} *Visit the repo to ⭐ star!* ✨`;

            await ridzcoder.sendMessage(m.chat, { 
                text: fallbackInfo,
                contextInfo: { 
                    mentionedJid: [m.sender],
                    externalAdReply: {
                        title: "NEMESIS-MD",
                        body: "GitHub Repository",
                        thumbnailUrl: 'https://files.catbox.moe/dynze8.png',
                        sourceUrl: "https://github.com/ridzcoder/NEMESIS-MD"
                    }
                }
            }, { quoted: m });
        }
    }
}


];