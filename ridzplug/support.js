module.exports = [

  // ─────────────────────────────────────────────
  // DEV / DEVELOPER
  // ─────────────────────────────────────────────
  {
    command: ['dev', 'developer'],
    operate: async ({ ridzcoder, m }) => {
      try {
        await ridzcoder.sendMessage(m.chat, { react: { text: "👨💻", key: m.key } })

        const devInfo = {
          name: "Ridz Coder",
          number: "243818786249",
          organization: "Ridz Network Ug",
          note: "Bot Developer"
        };

        const vcard =
          `BEGIN:VCARD\n` +
          `VERSION:3.0\n` +
          `FN:${devInfo.name}\n` +
          `ORG:${devInfo.organization}\n` +
          `TEL;type=CELL;type=VOICE;waid=${devInfo.number}:+${devInfo.number}\n` +
          `NOTE:${devInfo.note}\n` +
          `END:VCARD`;

        await ridzcoder.sendMessage(
          m.chat,
          {
            contacts: {
              displayName: devInfo.name,
              contacts: [{ displayName: devInfo.name, vcard }]
            }
          },
          { quoted: m }
        );
      } catch (e) {
        console.log('dev error:', e);
        m.reply('❌ Failed to send developer contact.');
      }
    }
  },

  // ─────────────────────────────────────────────
  // GITINFO
  // ─────────────────────────────────────────────
  {
    command: ['gitinfo'],
    operate: async ({ ridzcoder, m, text }) => {
      try {
        await ridzcoder.sendMessage(m.chat, { react: { text: "📊", key: m.key } })

        if (!text) return m.reply("Example: .repo username")

        let res = await fetch(`https://api.github.com/users/${text}`)
        let json = await res.json()

        m.reply(`📊 *GitHub Stats*

👤 Username: ${json.login}
📦 Public Repos: ${json.public_repos}
👥 Followers: ${json.followers}
➡️ Following: ${json.following}
⭐ Bio: ${json.bio || "None"}
🔗 ${json.html_url}`)
      } catch (e) {
        console.log('gitinfo error:', e)
        m.reply("Error fetching GitHub stats")
      }
    }
  },

  // ─────────────────────────────────────────────
  // GITCLONE
  // ─────────────────────────────────────────────
  {
    command: ['gitclone'],
    operate: async ({ ridzcoder, m, text }) => {
      try {
        await ridzcoder.sendMessage(m.chat, { react: { text: "📥", key: m.key } })

        if (!text) return m.reply("Example: .gitclone https://github.com/user/repo")

        let repoPath = text.replace("https://github.com/", "")
        let zipUrl = `https://github.com/${repoPath}/archive/refs/heads/main.zip`

        await ridzcoder.sendMessage(m.chat, {
          document: { url: zipUrl },
          fileName: `${repoPath.split("/")[1]}.zip`,
          mimetype: "application/zip"
        }, { quoted: m })
      } catch (e) {
        console.log('gitclone error:', e)
        m.reply("Failed to download repo")
      }
    }
  },

  // ─────────────────────────────────────────────
  // WORDOFDAY
  // ─────────────────────────────────────────────
  {
    command: ['wordofday'],
    operate: async ({ ridzcoder, m }) => {
      try {
        await ridzcoder.sendMessage(m.chat, { react: { text: "📖", key: m.key } })

        let res = await fetch("https://random-word-api.herokuapp.com/word")
        let json = await res.json()

        m.reply(`📖 *Word of the Day*\n${json[0]}`)
      } catch (e) {
        console.log('wordofday error:', e)
        m.reply("Error fetching word")
      }
    }
  },

  // ─────────────────────────────────────────────
  // HISTORYFACT
  // ─────────────────────────────────────────────
  {
    command: ['historyfact'],
    operate: async ({ ridzcoder, m }) => {
      try {
        await ridzcoder.sendMessage(m.chat, { react: { text: "📜", key: m.key } })

        let res = await fetch("https://history.muffinlabs.com/date")
        let json = await res.json()

        let fact = json.data.Events[Math.floor(Math.random() * json.data.Events.length)]
        m.reply(`📜 *History Fact*\n${fact.year} - ${fact.text}`)
      } catch (e) {
        console.log('historyfact error:', e)
        m.reply("Error fetching history")
      }
    }
  },

  // ─────────────────────────────────────────────
  // APK
  // ─────────────────────────────────────────────
  {
    command: ['apk'],
    operate: async ({ ridzcoder, m, text }) => {
      try {
        await ridzcoder.sendMessage(m.chat, { react: { text: "📥", key: m.key } })

        if (!text) return m.reply("Example: .apk whatsapp")

        let res = await fetch(`https://kayiza-apis.zone.id/discovery/happymod?query=${encodeURIComponent(text)}`)
        let json = await res.json()

        if (!json.result || json.result.length === 0) {
          return m.reply("App not found")
        }

        let app = json.result[0]

        let caption = `📥 *HappyMod Download*

📛 Name: ${app.name}
📦 Size: ${app.size}
⭐ Rating: ${app.rating}
📥 Downloads: ${app.download}

🔗 Download: ${app.link}

> ᴘᴏᴡᴇʀᴇᴅ ʙʏ Rɪᴅᴢ Cᴏᴅᴇʀ`

        await ridzcoder.sendMessage(m.chat, {
          image: { url: app.icon },
          caption: caption
        }, { quoted: m })

        await ridzcoder.sendMessage(m.chat, {
          document: { url: app.link },
          fileName: `${app.name}.apk`,
          mimetype: "application/vnd.android.package-archive"
        }, { quoted: m })
      } catch (e) {
        console.log('apk error:', e)
        m.reply("Error fetching app")
      }
    }
  },

  // ─────────────────────────────────────────────
  // SUPPORT
  // ─────────────────────────────────────────────
  {
    command: ['support'],
    operate: async ({ ridzcoder, m }) => {
      try {
        await ridzcoder.sendMessage(m.chat, { react: { text: "🌋", key: m.key } })

        let dec = `    
⟣──────────────────⟢
▧ *ᴄʀᴇᴀᴛᴏʀ* : *Ridz Coder X Kevin tech*
▧ *ᴍᴏᴅᴇ* : *public*
▧ *ᴘʀᴇғɪx* : .
▧ *ᴠᴇʀsɪᴏɴ* : *2.1.0*

⟣──────────────────⟢

> NEMESIS MD 
https://github.com/Ridzcoder/NEMESIS-MD

⟣──────────────────⟢
> CHANNEL
https://whatsapp.com/channel/0029Vb73EYZFXUujAoHFor1i

> GROUP
https://chat.whatsapp.com/KQzM54TU1LmGwIGc2TcOGi?mode=gi_t
`

        await ridzcoder.sendMessage(
          m.chat,
          {
            image: { url: "https://files.catbox.moe/qhl7st.png" },
            caption: dec,
            contextInfo: {
              mentionedJid: [m.sender],
              forwardingScore: 999,
              isForwarded: true,
              forwardedNewsletterMessageInfo: {
                newsletterJid: "120363404529319592@newsletter",
                newsletterName: "Airbyte Synergetic Labs🌋",
                serverMessageId: 143
              }
            }
          },
          { quoted: m }
        )
      } catch (e) {
        console.log('support error:', e)
        m.reply("Error")
      }
    }
  },

  // ─────────────────────────────────────────────
  // FAMILY
  // ─────────────────────────────────────────────
  {
    command: ['family'],
    operate: async ({ ridzcoder, m }) => {
      try {
        await ridzcoder.sendMessage(m.chat, { react: { text: "🌋", key: m.key } })

        let caption = `
      *╭┈──[ • RIDZ TECH 𝖥𝖠𝖬𝖨𝖫𝖸 • ]───•*
      *│  ◦* *▢➠*
      *│  ◦* *▢➠ Kelvin tech*
      *│  ◦* *▢➠ Jessie*
      *│  ◦* *▢➠ Livie*
      *│  ◦* *▢➠ prossie*
      *│  ◦* *▢➠ And You*
      *╰┈───────────────•*
        *•────────────•⟢*
      Family is not about blood,It's about the people who choose to be there for you, support you, and love you unconditionally, no matter what. They're the ones who show up, who listen, and who care 🤗
`

        await ridzcoder.sendMessage(
          m.chat,
          {
            image: { url: "https://files.catbox.moe/qhl7st.png" },
            caption: caption,
            contextInfo: {
              mentionedJid: [m.sender],
              forwardingScore: 999,
              isForwarded: true,
              forwardedNewsletterMessageInfo: {
                newsletterJid: "120363404529319592@newsletter",
                newsletterName: "Ridz Network UG🪀",
                serverMessageId: 143
              }
            }
          },
          { quoted: m }
        )
      } catch (e) {
        console.log('family error:', e)
        m.reply("Error")
      }
    }
  },

  // ─────────────────────────────────────────────
  // RIDZCODER / KAYIZA
  // ─────────────────────────────────────────────
  {
    command: ['ridzcoder', 'kayiza'],
    operate: async ({ ridzcoder, m }) => {
      try {
        await ridzcoder.sendMessage(m.chat, { react: { text: "🌋", key: m.key } })

        let caption = `
╭━━〔 ʀɪᴅᴢ ᴄᴏᴅᴇʀ ɪɴғᴏ〕━━┈⊷
┃★
┃★ •ʜᴇʟʟᴏ There 👋, ɪ ᴀᴍ ʀɪᴅᴢ ᴄᴏᴅᴇʀ.
┃★ •ɪ ʟᴀᴜɢʜ ᴀᴛ ᴇᴠᴇʀʏᴏɴᴇ ᴡʜᴏ ʟᴀᴜɢʜs ᴀᴛ ᴍᴇ.
┃★ •ɪ ᴀᴍ ᴛʜᴇ ʟᴀsᴛ ᴛʜɪᴇғ, ʙᴜᴛ ᴅᴏɴ'ᴛ ᴄʜᴀsᴇ ᴀғᴛᴇʀ ᴍᴇ
┃★ •ʙᴇᴄᴀᴜsᴇ ɪ ᴡɪʟʟ ᴄʜᴀɴɢᴇ ᴍʏsᴇʟғ
┃★ •ᴀsᴋ ᴛʜᴇᴍ ᴀʟʟ ᴀɴᴅ ᴛʜᴇʏ ᴡɪʟʟ ᴛᴇʟʟ ʏᴏᴜ:
┃★ •ɪғ ʏᴏᴜ sᴛᴀɴᴅ ʙᴇʜɪɴᴅ ᴍᴇ, ɪ ᴘʀᴏᴛᴇᴄᴛ ʏᴏᴜ.
┃★ •ɪғ ʏᴏᴜ sᴛᴀɴᴅ ʙᴇsɪᴅᴇ ᴍᴇ, ɪ ʀᴇsᴘᴇᴄᴛ ʏᴏᴜ.
┃★ •ʙᴜᴛ ɪғ ʏᴏᴜ sᴛᴀɴᴅ ᴀɢᴀɪɴsᴛ ᴍᴇ, ɪ sʜᴏᴡ ɴᴏ ᴍᴇʀᴄʏ.
┃★
╰━━━━━━━━━━━━━━━┈⊷

> *ᴀ sɪᴍᴘʟᴇ ᴡʜᴀᴛsᴀᴘᴘ ᴅᴇᴠᴇʟᴏᴘᴇʀ*

*╭━━━〔 • MY TOP FRIENDS• 〕━━━┈⊷*
*┃★╭──────────────*
*┃★│* *▢KEVIN TECH*
*┃★│* *▢JESSIE*
*┃★│* *▢PROSSIE*
*┃★│* *▢LIVIE*
*┃★╰──────────────*
*╰━━━━━━━━━━━━━━━┈⊷*

*•────────────•⟢*
> © ᴘᴏᴡᴇʀᴇᴅ ʙʏ Rɪᴅᴢ Cᴏᴅᴇʀ
*•────────────•⟢*
`

        await ridzcoder.sendMessage(
          m.chat,
          {
            image: { url: "https://files.catbox.moe/qhl7st.png" },
            caption: caption,
            contextInfo: {
              mentionedJid: [m.sender],
              forwardingScore: 999,
              isForwarded: true,
              forwardedNewsletterMessageInfo: {
                newsletterJid: "120363404529319592@newsletter",
                newsletterName: "Ridz Network UG🪀",
                serverMessageId: 999
              }
            }
          },
          { quoted: m }
        )
      } catch (e) {
        console.log('ridzcoder error:', e)
        m.reply("Error")
      }
    }
  }

];