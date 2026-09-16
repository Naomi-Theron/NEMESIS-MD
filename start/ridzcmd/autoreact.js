const db = require('../../start/Core/databaseManager'); 

async function handleAutoReact(m, Ridzcoder) {
    try {
        const botNumber = await Ridzcoder.decodeJid(Ridzcoder.user.id);
        
        // ✅ GET AUTO-REACT SETTING FROM SQLITE
        const autoreact = await db.get(botNumber, 'autoreact', false);
        
        // Check if auto-react is enabled
        if (!autoreact) {
            return;
        }

        // Don't react to bot's own messages
        const sender = m.key.participant || m.key.remoteJid;
        if (sender === botNumber) return;

        // List of common emoji reactions
        const reactions = ['👍', '❤️', '😂', '😮', '😢', '🔥', '👏', '🎉', '🤩', '🙏', '💯', '👀', '✨', '🥳', '😎'];
        
        // Pick a random reaction
        const randomReaction = reactions[Math.floor(Math.random() * reactions.length)];
        
        // Send the reaction
        await Ridzcoder.sendMessage(m.key.remoteJid, {
            react: {
                text: randomReaction,
                key: m.key
            }
        });
        
    } catch (error) {
        console.error("❌ Error in auto-react:", error);
    }
}

module.exports = { handleAutoReact };