const axios = require('axios');
const sharp = require('sharp');
const { getBuffer } = require('../start/lib/myfunction');

const ANIMU_BASE = 'https://api.some-random-api.com/animu';
const WAIFU_BASE = 'https://api-faa.my.id/faa/waifu';

async function convertToSticker(mediaBuffer) {
    try {
        const sticker = await sharp(mediaBuffer)
            .resize(512, 512, { fit: 'cover' })
            .webp()
            .toBuffer();
        return sticker;
    } catch (error) {
        console.error('Error converting to sticker:', error);
        return null;
    }
}

// FIXED: Properly download image from Faa API
async function fetchAndSendSticker(ridzcoder, from, endpoint, m) {
    try {
        const { data } = await axios.get(endpoint);
        
        if (data.link || data.url) {
            const imageUrl = data.link || data.url;
            
            // Download image using getBuffer
            const imageBuffer = await getBuffer(imageUrl);
            
            if (!imageBuffer) {
                console.error('Failed to download image');
                return false;
            }
            
            const stickerBuf = await convertToSticker(imageBuffer);
            
            if (stickerBuf) {
                await ridzcoder.sendMessage(from, { sticker: stickerBuf }, { quoted: m });
                return true;
            }
        }
        return false;
    } catch (error) {
        console.error('Error fetching sticker:', error);
        return false;
    }
}

// FIXED: For Waifu API that returns JSON with image URL
async function sendWaifu(ridzcoder, from, type, m) {
    try {
        const apiUrl = `${WAIFU_BASE}/${type}`;
        console.log(`Fetching from: ${apiUrl}`);
        
        const { data } = await axios.get(apiUrl, { timeout: 15000 });
        
        // Faa API returns { status: true, url: "https://..." }
        if (data && data.status === true && data.url) {
            // Download the image using getBuffer
            const imageBuffer = await getBuffer(data.url);
            
            if (!imageBuffer) {
                await ridzcoder.sendMessage(from, { text: `❌ Failed to fetch ${type} image` }, { quoted: m });
                return;
            }
            
            // Convert to sticker
            const stickerBuf = await convertToSticker(imageBuffer);
            
            if (stickerBuf) {
                await ridzcoder.sendMessage(from, { sticker: stickerBuf }, { quoted: m });
            } else {
                // Fallback: send as image
                await ridzcoder.sendMessage(from, { image: imageBuffer }, { quoted: m });
            }
        } else {
            await ridzcoder.sendMessage(from, { text: `❌ No ${type} image found` }, { quoted: m });
        }
    } catch (error) {
        console.error(`Error in ${type} command:`, error.message);
        await ridzcoder.sendMessage(from, { text: `❌ Error: ${error.message}` }, { quoted: m });
    }
}

// For Animu API (works the same)
async function sendAnimu(ridzcoder, from, type, m) {
    try {
        const apiUrl = `${ANIMU_BASE}/${type}`;
        const { data } = await axios.get(apiUrl);
        
        if (data.link) {
            const imageBuffer = await getBuffer(data.link);
            const stickerBuf = await convertToSticker(imageBuffer);
            
            if (stickerBuf) {
                await ridzcoder.sendMessage(from, { sticker: stickerBuf }, { quoted: m });
            } else {
                await ridzcoder.sendMessage(from, { image: imageBuffer }, { quoted: m });
            }
        }
    } catch (error) {
        console.error(`Error in animu ${type}:`, error.message);
        await ridzcoder.sendMessage(from, { text: `❌ Error fetching ${type}` }, { quoted: m });
    }
}

// Fix the sendWaifu function to work with ridzcoder.sendImageAsSticker properly
async function sendWaifuAsSticker(ridzcoder, from, type, m) {
    try {
        const apiUrl = `${WAIFU_BASE}/${type}`;
        const { data } = await axios.get(apiUrl);
        
        if (data && data.status === true && data.url) {
            // Use sendImageAsSticker with URL directly (if your function supports it)
            // Or download and convert manually
            const imageBuffer = await getBuffer(data.url);
            const stickerBuf = await convertToSticker(imageBuffer);
            
            if (stickerBuf) {
                await ridzcoder.sendMessage(from, { sticker: stickerBuf }, { quoted: m });
            } else {
                await ridzcoder.sendMessage(from, { image: imageBuffer, caption: `💕 ${type}` }, { quoted: m });
            }
        } else {
            await ridzcoder.sendMessage(from, { text: `❌ No ${type} found` }, { quoted: m });
        }
    } catch (error) {
        console.error(`Error in ${type}:`, error.message);
        await ridzcoder.sendMessage(from, { text: `❌ Error: ${error.message}` }, { quoted: m });
    }
}

module.exports = [
    // Animu commands
    {
        command: ['animu', 'animequote'],
        operate: async ({ ridzcoder, m, args }) => {
            const type = args[0]?.toLowerCase() || 'quote';
            let normalized = type;
            if (type === 'facepalm' || type === 'face_palm') normalized = 'face-palm';
            if (type === 'quote') normalized = 'quote';
            await sendAnimu(ridzcoder, m.chat, normalized, m);
        }
    },
    {
        command: ['animuwink'],
        operate: async ({ ridzcoder, m }) => {
            await sendAnimu(ridzcoder, m.chat, 'wink', m);
        }
    },
    {
        command: ['animupat'],
        operate: async ({ ridzcoder, m }) => {
            await sendAnimu(ridzcoder, m.chat, 'pat', m);
        }
    },
    {
        command: ['animuhug'],
        operate: async ({ ridzcoder, m }) => {
            await sendAnimu(ridzcoder, m.chat, 'hug', m);
        }
    },
    // Waifu.pics commands (FIXED - using sendWaifu)
    {
        command: ['kiss', 'cium', 'beso'],
        operate: async ({ ridzcoder, m }) => {
            await sendWaifu(ridzcoder, m.chat, 'kiss', m);
        }
    },
    {
        command: ['cry'],
        operate: async ({ ridzcoder, m }) => {
            await sendWaifu(ridzcoder, m.chat, 'cry', m);
        }
    },
    {
        command: ['blush'],
        operate: async ({ ridzcoder, m }) => {
            await sendWaifu(ridzcoder, m.chat, 'blush', m);
        }
    },
    {
        command: ['dance'],
        operate: async ({ ridzcoder, m }) => {
            await sendWaifu(ridzcoder, m.chat, 'dance', m);
        }
    },
    {
        command: ['kill'],
        operate: async ({ ridzcoder, m }) => {
            await sendWaifu(ridzcoder, m.chat, 'kill', m);
        }
    },
    {
        command: ['hug'],
        operate: async ({ ridzcoder, m }) => {
            await sendWaifu(ridzcoder, m.chat, 'hug', m);
        }
    },
    {
        command: ['kick'],
        operate: async ({ ridzcoder, m }) => {
            await sendWaifu(ridzcoder, m.chat, 'kick', m);
        }
    },
    {
        command: ['slap'],
        operate: async ({ ridzcoder, m }) => {
            await sendWaifu(ridzcoder, m.chat, 'slap', m);
        }
    },
    {
        command: ['happy'],
        operate: async ({ ridzcoder, m }) => {
            await sendWaifu(ridzcoder, m.chat, 'happy', m);
        }
    },
    {
        command: ['bully'],
        operate: async ({ ridzcoder, m }) => {
            await sendWaifu(ridzcoder, m.chat, 'bully', m);
        }
    },
    {
        command: ['pat', 'headpat'],
        operate: async ({ ridzcoder, m }) => {
            await sendWaifu(ridzcoder, m.chat, 'pat', m);
        }
    },
    {
        command: ['poke'],
        operate: async ({ ridzcoder, m }) => {
            await sendWaifu(ridzcoder, m.chat, 'poke', m);
        }
    },
    {
        command: ['cuddle'],
        operate: async ({ ridzcoder, m }) => {
            await sendWaifu(ridzcoder, m.chat, 'cuddle', m);
        }
    },
    {
        command: ['smile'],
        operate: async ({ ridzcoder, m }) => {
            await sendWaifu(ridzcoder, m.chat, 'smile', m);
        }
    },
    {
        command: ['wave'],
        operate: async ({ ridzcoder, m }) => {
            await sendWaifu(ridzcoder, m.chat, 'wave', m);
        }
    },
    {
        command: ['bite'],
        operate: async ({ ridzcoder, m }) => {
            await sendWaifu(ridzcoder, m.chat, 'bite', m);
        }
    },
    {
        command: ['lick'],
        operate: async ({ ridzcoder, m }) => {
            await sendWaifu(ridzcoder, m.chat, 'lick', m);
        }
    },
    {
        command: ['bonk'],
        operate: async ({ ridzcoder, m }) => {
            await sendWaifu(ridzcoder, m.chat, 'bonk', m);
        }
    },
    {
        command: ['yeet'],
        operate: async ({ ridzcoder, m }) => {
            await sendWaifu(ridzcoder, m.chat, 'yeet', m);
        }
    },
    {
        command: ['nom'],
        operate: async ({ ridzcoder, m }) => {
            await sendWaifu(ridzcoder, m.chat, 'nom', m);
        }
    },
    {
        command: ['tickle'],
        operate: async ({ ridzcoder, m }) => {
            await sendWaifu(ridzcoder, m.chat, 'tickle', m);
        }
    },
    {
        command: ['facepalm'],
        operate: async ({ ridzcoder, m }) => {
            await sendWaifu(ridzcoder, m.chat, 'facepalm', m);
        }
    },
    {
        command: ['handhold', 'holdhands'],
        operate: async ({ ridzcoder, m }) => {
            await sendWaifu(ridzcoder, m.chat, 'handhold', m);
        }
    },
    {
        command: ['stare'],
        operate: async ({ ridzcoder, m }) => {
            await sendWaifu(ridzcoder, m.chat, 'stare', m);
        }
    },
    {
        command: ['shrug'],
        operate: async ({ ridzcoder, m }) => {
            await sendWaifu(ridzcoder, m.chat, 'shrug', m);
        }
    },
    {
        command: ['scream'],
        operate: async ({ ridzcoder, m }) => {
            await sendWaifu(ridzcoder, m.chat, 'scream', m);
        }
    },
    {
        command: ['pout'],
        operate: async ({ ridzcoder, m }) => {
            await sendWaifu(ridzcoder, m.chat, 'pout', m);
        }
    },
    {
        command: ['shy'],
        operate: async ({ ridzcoder, m }) => {
            await sendWaifu(ridzcoder, m.chat, 'shy', m);
        }
    },
    {
        command: ['thinking'],
        operate: async ({ ridzcoder, m }) => {
            await sendWaifu(ridzcoder, m.chat, 'thinking', m);
        }
    },
    {
        command: ['love'],
        operate: async ({ ridzcoder, m }) => {
            await sendWaifu(ridzcoder, m.chat, 'love', m);
        }
    }
];