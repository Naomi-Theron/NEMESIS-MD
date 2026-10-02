const axios = require('axios');
const {
veniceAICommand,
mistralAICommand,
perplexityAICommand,
bardAICommand,
gpt4NanoAICommand,
RidzAICommand,
claudeAICommand
} = require('../start/ridzcmd/ai');

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
    }
];