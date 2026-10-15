const axios = require('axios');
const { getBuffer } = require('../start/lib/myfunction');

function getCompatibilityMessage(score) {
    if (score >= 900) return "ꜱᴏᴜʟᴍᴀᴛᴇꜱ! 💞 ʏᴏᴜʀ'ᴇ ᴘᴇʀꜰᴇᴄᴛ ꜰᴏʀ ᴇᴀᴄʜ ᴏᴛʜᴇʀ!";
    if (score >= 700) return "ɢʀᴇᴀᴛ ᴡᴏʀᴋ! 💕 ʏᴏᴜ ᴄᴏᴍᴘʟɪᴍᴇɴᴛ ᴇᴀᴄʜ ᴏᴛʜᴇʀ.";
    if (score >= 500) return "ɢᴏᴏᴅ ᴘᴏᴛᴇɴᴛɪᴀʟ! 💗 ᴡɪᴛʜ ꜱᴏᴍᴇ ᴡᴏʀᴋ, ᴛʜɪꜱ ᴄᴏᴜʟᴅ ʙᴇ ɢʀᴇᴀᴛ.";
    if (score >= 300) return "ɴᴏᴛ ʙᴀᴅ! 💖 ᴛʜᴇʀᴇ'ꜱ  ꜱᴏᴍᴇ ᴄʜᴇᴍɪꜱᴛʀʏ ʜᴇʀᴇ.";
    return "ᴍɪɢʜᴛ ɴᴇᴇᴅ ꜱᴏᴍᴇ ᴡᴏʀᴋ... 💔 ʙᴜᴛ ᴅᴏɴ'ᴛ ɢɪᴠᴇ ᴜᴘ!";
}

module.exports = [
    {
        command: ['truth', 'truthgame', 'asktruth'],
           react: "🍹",
        operate: async ({ ridzcoder, m, reply, prefix, getBuffer }) => {
            try {
                const axios = require('axios');
                const apiUrl = 'https://api.princetechn.com/api/fun/truth?apikey=prince';
                const response = await axios.get(apiUrl);
                
                if (response.data?.success && response.data?.result) {
                    const truth = response.data.result;
                    const from = m.chat;
                    
                    try {
                        const buffer = await getBuffer('https://i.ibb.co/305yt26/bf84f20635dedd5dde31e7e5b6983ae9.jpg');
                        
                        await ridzcoder.sendMessage(from, {
                            image: buffer,
                            caption: `*ᴛʀᴜᴛʜ*\n\n${truth}`
                        }, { quoted: m });
                    } catch (imgError) {
                        await ridzcoder.sendMessage(from, {
                            text: `*ᴛʀᴜᴛʜ*\n\n${truth}`
                        }, { quoted: m });
                    }
                } else {
                    reply('ᴀɴ ᴇʀʀᴏʀ ᴏᴄᴄᴜʀʀᴇᴅ ᴀᴛ ᴏᴜʀ ᴇɴᴅ.');
                }
            } catch (error) {
                console.error(error);
                reply('ᴀɴ ᴇʀʀᴏʀ ᴏᴄᴄᴜʀʀᴇᴅ ᴀᴛ ᴏᴜʀ ᴇɴᴅ.');
            }
        }
    },
    {
        command: ['dare', 'truthdare', 'dareme'],
   react: "🍹",
        operate: async ({ ridzcoder, m, reply, prefix }) => {
            try {
                const axios = require('axios');
                const apiUrl = 'https://api.princetechn.com/api/fun/dares?apikey=prince';
                const response = await axios.get(apiUrl);
                
                if (response.data?.success && response.data?.result) {
                    const dare = response.data.result;
                    const from = m.chat;
                    
                    try {
                        const buffer = await getBuffer('https://i.ibb.co/305yt26/bf84f20635dedd5dde31e7e5b6983ae9.jpg');
                        
                        await ridzcoder.sendMessage(from, {
                            image: buffer,
                            caption: `*ᴅᴀʀᴇ*\n\n${dare}`
                        }, { quoted: m });
                    } catch (imgError) {
                        await ridzcoder.sendMessage(from, {
                            text: `*ᴅᴀʀᴇ*\n\n${dare}`
                        }, { quoted: m });
                    }
                } else {
                    reply('ᴀɴ ᴇʀʀᴏʀ ᴏᴄᴄᴜʀʀᴇᴅ ᴀᴛ ᴏᴜʀ ᴇɴᴅ.');
                }
            } catch (error) {
                console.error(error);
                reply('ᴀɴ ᴇʀʀᴏʀ ᴏᴄᴄᴜʀʀᴇᴅ ᴀᴛ ᴏᴜʀ ᴇɴᴅ.');
            }
        }
    },
    {
        command: ['compatibility', 'comp'],  
         react: "🍹",
        operate: async ({ ridzcoder, m, reply, botNumber }) => {
            try {
                // Check if two users are mentioned
                if (!m.mentionedJid || m.mentionedJid.length < 2) {
                    return reply("ᴘʟᴇᴀꜱᴇ ᴍᴇɴᴛɪᴏɴ ᴛᴡᴏ ᴜꜱᴇʀꜱ ᴛᴏ ᴄᴀʟᴄᴜʟᴀᴛᴇ ᴄᴏᴍᴘᴀᴛɪʙɪʟɪᴛʏ.\nᴜꜱᴀɢᴇ: `.ᴄᴏᴍᴘᴀᴛɪʙɪʟɪᴛʏ @ᴜꜱᴇʀ1 @ᴜꜱᴇʀ2`");
                }

                const [user1, user2] = m.mentionedJid.slice(0, 2);
                
                // Calculate random compatibility score (1-1000)
                let compatibilityScore = Math.floor(Math.random() * 1000) + 1;

                // Special case for bot owner
                const ownerNumber = botNumber.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
                if (user1 === ownerNumber || user2 === ownerNumber) {
                    compatibilityScore = 1000;
                }

                // Format the response
                const resultMessage = 
                    `💖 *ᴄᴏᴍᴘᴀᴛɪʙɪʟɪᴛʏ ʀᴇꜱᴜʟᴛ* 💖\n\n` +
                    `@${user1.split('@')[0]} ❤️ @${user2.split('@')[0]}\n` +
                    `ꜱᴄᴏʀᴇ: ${compatibilityScore}/1000\n\n` +
                    `${getCompatibilityMessage(compatibilityScore)}`;

                // Send the result
                await ridzcoder.sendMessage(
                    m.chat,
                    { 
                        text: resultMessage,
                        mentions: [user1, user2]
                    },
                    { quoted: m }
                );

            } catch (error) {
                console.error('Error in compatibility command:', error);
                reply(`ᴇʀʀᴏʀ: ${error.message}`);
            }
        }
    },
        {
        command: ['lovetest', 'love', 'compatibility'],
          react: "🍹", 
        operate: async ({ ridzcoder, m, reply, args }) => {
            if (args.length < 2) return reply("ᴛᴀɢ ᴛᴡᴏ ᴜꜱᴇʀꜱ! ᴇxᴀᴍᴘʟᴇ: .ʟᴏᴠᴇᴛᴇꜱᴛ @ᴜꜱᴇʀ1 @ᴜꜱᴇʀ2");

            let user1 = args[0].replace("@", "") + "@s.whatsapp.net";
            let user2 = args[1].replace("@", "") + "@s.whatsapp.net";

            let lovePercent = Math.floor(Math.random() * 100) + 1;

            let messages = [
                { range: [90, 100], text: "💖 *ᴍᴀᴛᴄʜ ᴍᴀᴅᴇ ɪɴ ʜᴇᴀᴠᴇɴ!* ᴛʀᴜᴇ ʟᴏᴠᴇ ᴇxɪꜱᴛꜱ!" },
                { range: [75, 89], text: "😍 *Strong connection!* This love is deep and meaningful." },
                { range: [50, 74], text: "😊 *ɢᴏᴏᴅ ᴄᴏᴍᴘᴀᴛɪʙɪʟɪᴛʏ!* ʏᴏᴜ ʙᴏᴛʜ ᴄᴀɴ ᴍᴀᴋᴇ ɪᴛ ᴡᴏʀᴋ." },
                { range: [30, 49], text: "🤔 *ɪᴛ'ꜱ ᴄᴏᴍᴘʟɪᴄᴀᴛᴇᴅ!* ɴᴇᴇᴅ ᴇꜰꜰᴏʀᴛ, ʙᴜᴛ ᴘᴏꜱꜱɪʙʟᴇ!" },
                { range: [10, 29], text: "😅 *ɴᴏᴛ ᴛʜᴇ ʙᴇꜱᴛ ᴍᴀᴛᴄʜ!* ᴍᴀʏʙᴇ ᴛʀʏ ʙᴇɪɴɢ ꜰʀɪᴇɴᴅꜱ?" },
                { range: [1, 9], text: "💔 *ᴜʜ-ᴏʜʜ* ᴛʜɪꜱ ʟᴏᴠᴇ ɪꜱ ᴀꜱ ʀᴇᴀʟᴀꜱ ᴀ ʙᴏʟʟʏᴡᴏᴏᴅ ʙʀᴇᴀᴋᴜᴘ!" }
            ];

            let loveMessage = messages.find(msg => lovePercent >= msg.range[0] && lovePercent <= msg.range[1]).text;

            let message = `💘 *ʟᴏᴠᴇ ᴄᴏᴍᴘᴀᴛɪʙɪʟɪᴛʏ ᴛᴇxᴛ 💘\n\n❤️ *@${user1.split("@")[0]}* + *@${user2.split("@")[0]}* = *${lovePercent}%*\n${loveMessage}`;

            await ridzcoder.sendMessage(m.chat, { 
                text: message, 
                mentions: [user1, user2] 
            }, { quoted: m });
        }
    },
    {
        command: ['jokes', 'joke', 'funny'],  
         react: "🍹",
        operate: async ({ ridzcoder, m, reply }) => {
            try {
                let res = await fetch("https://official-joke-api.appspot.com/random_joke");
                let json = await res.json();
                const joke = `${json.setup}\n\n${json.punchline}`;
                await ridzcoder.sendMessage(m.chat, { text: joke }, { quoted: m });
            } catch (error) {
                console.error('Error fetching joke:', error);
                reply('ᴀɴ ᴇʀʀᴏʀ ᴏᴄᴄᴜʀʀᴇᴅ ᴀᴛ ᴏᴜʀ ᴇɴᴅ.');
            }
        }
    },
{
    command: ['valentine', 'valentines', 'vday'], 
      react: "🍹",
    operate: async ({ ridzcoder, m, reply, args, prefix }) => {
        try {
            const axios = require('axios');
            const apiUrl = `https://api.princetechn.com/api/fun/valentines?apikey=prince`;
            const response = await axios.get(apiUrl);
            
            if (response.data?.success && response.data?.result) {
                reply(response.data.result);
            } else {
                reply('ᴀɴ ᴇʀʀᴏʀ ᴏᴄᴄᴜʀʀᴇᴅ ᴀᴛ ᴏᴜʀ ᴇɴᴅ.');
            }
        } catch (error) {
            console.error('Valentine error:', error);
            reply('ᴀɴ ᴇʀʀᴏʀ ᴏᴄᴄᴜʀʀᴇᴅ ᴀᴛ ᴏᴜʀ ᴇɴᴅ.');
        }
    }
},
    {
    command: ['pickupline', 'pickup', 'lovequotes'],
       react: "🍹",
    operate: async ({ ridzcoder, m, reply, args, prefix }) => {
        try {
            const apiUrl = `https://apis.davidcyril.name.ng/pickupline`;
            const response = await axios.get(apiUrl);
            
            if (response.data?.success && response.data?.pickupline) {
                reply(response.data.pickupline);
            } else {
                reply('ᴀɴ ᴇʀʀᴏʀ ᴏᴄᴄᴜʀʀᴇᴅ ᴀᴛ ᴏᴜʀ ᴇɴᴅ.');
            }
        } catch (error) {
            console.error('Pickupline error:', error);
            reply('ᴀɴ ᴇʀʀᴏʀ ᴏᴄᴄᴜʀʀᴇᴅ ᴀᴛ ᴏᴜʀ ᴇɴᴅ.');
        }
    }
},
    {
    command: ['advice', 'advicegenerator', 'lifetips'], 
      react: "🍹",
    operate: async ({ ridzcoder, m, reply, args, prefix }) => {
        try {
            const apiUrl = `https://api.princetechn.com/api/fun/advice?apikey=prince`;
            const response = await axios.get(apiUrl);
            
            if (response.data?.success && response.data?.result) {
                reply(response.data.result);
            } else {
                reply('ᴀɴ ᴇʀʀᴏʀ ᴏᴄᴄᴜʀʀᴇᴅ ᴀᴛ ᴏᴜʀ ᴇɴᴅ.');
            }
        } catch (error) {
            console.error('Advice error:', error);
            reply('ᴀɴ ᴇʀʀᴏʀ ᴏᴄᴄᴜʀʀᴇᴅ ᴀᴛ ᴏᴜʀ ᴇɴᴅ.');
        }
    }
},
    {
    command: ['motivation', 'motivate', 'inspire'], 
      react: "🍹",
    operate: async ({ ridzcoder, m, reply, args, prefix }) => {
        try {
            const apiUrl = `https://api.princetechn.com/api/fun/motivation?apikey=prince`;
            const response = await axios.get(apiUrl);
            
            if (response.data?.success && response.data?.result) {
                reply(response.data.result);
            } else {
                reply('fᴀɴ ᴇʀʀᴏʀ ᴏᴄᴄᴜʀʀᴇᴅ ᴀᴛ ᴏᴜʀ ᴇɴᴅ.');
            }
        } catch (error) {
            console.error('Motivation error:', error);
            reply('ᴀɴ ᴇʀʀᴏʀ ᴏᴄᴄᴜʀʀᴇᴅ ᴀᴛ ᴏᴜʀ ᴇɴᴅ.');
        }
    }
},        
    {
        command: ['character', 'char', 'personality'],
           react: "🍹",
        operate: async ({ ridzcoder, m, reply, isGroup, from }) => {
            try {
                if (!isGroup) {
                    return reply("ᴛʜɪꜱ ᴄᴏᴍᴍᴀɴᴅ ᴄᴀɴ ᴏɴʟʏ ʙᴇ ᴜꜱᴇᴅ ɪɴ ɢʀᴏᴜᴘ ᴀꜱꜱʜᴏʟᴇ.");
                }

                const mentionedUser = m.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0];
                if (!mentionedUser) {
                    return reply("ᴘʟᴇᴀꜱᴇ ᴍᴇɴᴛɪᴏɴ ᴀ ᴜꜱᴇʀ ᴡʜᴏꜱᴇ ᴄʜᴀʀᴀᴄᴛᴇʀ ʏᴏᴜ ᴡᴀɴᴛ ᴛᴏ ᴄʜᴇᴄᴋ.");
                }

                const userChar = [
                    "Sigma", "Generous", "Grumpy", "Overconfident", "Obedient",
                    "Good", "Simp", "Kind", "Patient", "Pervert", "Cool",
                    "Helpful", "Brilliant", "Sexy", "Single", "Hot", "Gorgeous", "Cute"
                ];

                const userCharacterSelection = userChar[Math.floor(Math.random() * userChar.length)];
                const message = `ᴄʜᴀʀᴀᴄᴛᴇʀ ᴏꜰ @${mentionedUser.split("@")[0]} ɪꜱ *${userCharacterSelection}* 🔥⚡`;

                await ridzcoder.sendMessage(from, {
                    text: message,
                    mentions: [mentionedUser],
                }, { quoted: m });

            } catch (e) {
                console.error("Error in character command:", e);
                reply("ᴀɴ ᴇʀʀᴏʀ ᴏᴄᴄᴜʀʀᴇᴅ ᴀᴛ ᴏᴜʀ ᴇɴᴅ.");
            }
        }
    },
    {
  command: ['trivia'],
  react: "🍹",
  operate: async ({ ridzcoder, m, reply }) => {
    try {
      let res = await fetch("https://opentdb.com/api.php?amount=1");
      let json = await res.json();

      let question = json.results[0].question;
      let answer = json.results[0].correct_answer;

      await ridzcoder.sendMessage(m.chat, { text: `Qᴜᴇꜱᴛɪᴏɴ: ${question}\n\nᴛʜɪɴᴋ ʏᴏᴜ ᴋɴᴏᴡ ᴛʜᴇ ᴀɴꜱᴡᴇʀ? ꜱᴇɴᴅ ᴛʜᴇ ᴄᴏʀʀᴇᴄᴛ ᴀɴꜱᴡᴇʀ ᴀꜰᴛᴇʀ 20 ꜱᴇᴄᴏɴᴅꜱ` }, { quoted: m });
      
      setTimeout(async () => {
        await ridzcoder.sendMessage(m.chat, { text: `ᴀɴꜱᴡᴇʀ: ${answer}` });
      }, 20000); // 20 seconds
    } catch (error) {
      console.error('Error fetching trivia question:', error);
      reply('ᴀɴ ᴇʀʀᴏʀ ᴏᴄᴄᴜʀʀᴇᴅ ᴀᴛ ᴏᴜʀ ᴇɴᴅ .');
    }
  }
},
{
  command: ['truthdetector', 'liedetector'],
  react: "🍹",
  operate: async ({ m, reply }) => {
    if (!m.quoted) return reply(`ᴘʟᴇᴀꜱᴇ ʀʀᴘʟʏ ᴛᴏ ᴛʜᴇ ᴍᴇꜱꜱᴀɢᴇ ʏᴏᴜ ᴡᴀɴᴛ ᴛᴏ ᴅᴇᴛᴇᴄᴛ!`);

    let responses = [
      "That's a blatant lie!",
      "Truth revealed!",
      "Lie alert!",
      "Hard to believe, but true!",
      "Professional liar detected!",
      "Fact-check: TRUE",
      "Busted! That's a lie!",
      "Unbelievable, but FALSE!",
      "Detecting... TRUTH!",
      "Lie detector activated: FALSE!",
      "Surprisingly, TRUE!",
      "My instincts say... LIE!",
      "That's partially true!",
      "Can't verify, try again!",
      "Most likely, TRUE!",
      "Don't believe you!",
      "Surprisingly, FALSE!",
      "Truth!",
      "Honest as a saint!",
      "Deceptive much?",
      "Absolutely true!",
      "Completely false!",
      "Seems truthful.",
      "Not buying it!",
      "You're lying through your teeth!",
      "Hard to believe, but it's true!",
      "I sense honesty.",
      "Falsehood detected!",
      "Totally legit!",
      "Lies, lies, lies!",
      "You can't fool me!",
      "Screams truth!",
      "Fabrication alert!",
      "Spot on!",
      "Fishy story, isn't it?",
      "Unquestionably true!",
      "Pure fiction!"
    ];

    let result = responses[Math.floor(Math.random() * responses.length)];
    let replyText = `*ʀᴇꜱᴜʟᴛ*: ${result}`;

    await reply(replyText);
  }
},
{
  command: ['guesscartoon', 'cartoonquiz', 'guesscharacter'],
   react: "🍹",
  operate: async ({ m, reply, ridzcoder }) => {
    try {
      await reply("🎮 ꜰᴇᴛᴄʜɪɴɢ ᴀ ᴄᴀʀᴛᴏᴏɴ ᴄʜᴀʀᴀᴄᴛᴇʀ...");
      
      const response = await fetch(`${global.siputzx}/api/games/tebakkartun`);
      const data = await response.json();
      
      if (!data.status || !data.data) {
        return reply("*ꜰᴀɪʟᴇᴅ ᴛᴏ ꜰᴇᴛᴄʜ ᴄᴀʀᴛᴏᴏɴ ᴄʜᴀʀᴀᴄᴛᴇʀ.*");
      }
      
      await ridzcoder.sendMessage(m.chat, {
        image: { url: data.data.img },
        caption: `🎪 *ɢᴜᴇꜱꜱ ᴛʜᴇ ᴄᴀʀᴛᴏᴏɴ ᴄʜᴀʀᴀᴄᴛᴇʀ!*\n\n` +
                 `ᴄᴀɴ ʏᴏᴜ ɴᴀᴍᴇ ᴛʜɪꜱ ᴄʜᴀʀᴀᴄᴛᴇʀ?\n\n` +
                 `ʀᴇᴘʟʏ ᴡɪᴛʜ ʏᴏᴜʀ ᴀɴꜱᴡᴇʀ!`
      }, { quoted: m });
      
    } catch (error) {
      console.error('Game error:', error);
      reply("ᴇʀʀᴏʀ ꜰᴇᴛᴄʜɪɴɢ ᴄᴀʀᴛᴏᴏɴ ɢᴀᴍᴇ.");
    }
  }
}
    
];