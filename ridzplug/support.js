module.exports = [

{
    command: ['dev', 'developer'],
    operate: async ({ ridzcoder, m, reply }) => {
        try {
            const devInfo = {
                name: "Ridz Coder",
                number: "243818786249",
                organization: "Ridz Network Ug",
                note: "Bot Developer"
            };

            // Create vCard
            const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${devInfo.name}
ORG:${devInfo.organization};
TEL;type=CELL;type=VOICE;waid=${devInfo.number}:${devInfo.number}
NOTE:${devInfo.note}
END:VCARD`;

            // Send only contact card - no thumbnail
            await ridzcoder.sendMessage(
                m.chat,
                {
                    contacts: {
                        displayName: devInfo.name,
                        contacts: [{
                            displayName: devInfo.name,
                            vcard: vcard
                        }]
                    }
                },
                { quoted: m }
            );

        } catch (error) {
            console.error('Error in dev command:', error);
            reply('❌ Failed to send developer contact.');
        }
    }
}

]