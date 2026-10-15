const { smsg, getBuffer } = require('../start/lib/myfunction');
const { toAudio } = require('../start/lib/converter');
const { handleMediaUpload } = require('../start/lib/catbox');
const fs = require('fs');
const fetch = require("node-fetch")
const cheerio = require('cheerio')
const path = require('path');
const { exec } = require('child_process');

function getRandom(ext) {
    return `${Math.floor(Math.random() * 10000)}${ext}`;
}

// function that converts to audio and video====
async function webp2mp4(source) {
  let form = new FormData();
  let isUrl = typeof source === 'string' && /https?:\/\//.test(source);

  form.append('new-image-url', isUrl ? source : '');
  form.append('new-image', isUrl ? '' : source, 'image.webp');

  let res = await fetch('https://ezgif.com/webp-to-mp4', {
    method: 'POST',
    body: form
  });

  let html = await res.text();
  let $ = cheerio.load(html);
  let form2 = new FormData();
  let obj = {};

  $('form input[name]').each((_, el) => {
    obj[$(el).attr('name')] = $(el).val();
    form2.append($(el).attr('name'), $(el).val());
  });

  let res2 = await fetch('https://ezgif.com/webp-to-mp4/' + obj.file, {
    method: 'POST',
    body: form2
  });

  let html2 = await res2.text();
  let $2 = cheerio.load(html2);
  return new URL($2('div#output > p.outfile > video > source').attr('src'), res2.url).toString();
}


module.exports = [
    {
        command: ['tourl', 'upload', 'mediaurl'],
    react: "🍹",
        operate: async ({ ridzcoder, m, reply, quoted, mime }) => {

            if (!quoted || !mime) {
                return reply('*ʀᴇᴘʟʏ ᴛᴏ ᴀ ᴍᴇᴅɪᴀ ᴍᴇꜱꜱᴀɢᴇ!*');
            }

            try {
                const mediaUrl = await handleMediaUpload(quoted, ridzcoder, mime);
                reply(`*ᴜᴘʟᴏᴀᴅᴇᴅ ꜱᴜᴄᴄᴇꜱꜱꜰᴜʟʟʏ:*\n${mediaUrl}`);
            } catch (error) {
                console.error(error);
                reply('*ᴀɴ ᴇʀʀᴏʀ ᴏᴄᴄᴜʀʀᴇᴅ ᴀᴛ ᴏᴜʀ ᴇɴᴅ.*');
            }
        }
    },

    {
        command: ['toimage', 'stickerimage', 'stickertoimg'],
        operate: async ({ ridzcoder, m, reply, quoted, mime, prefix, command }) => {


            if (!quoted || !/webp/.test(mime)) {
                return reply(`*ꜱᴇɴᴅ ᴏʀ ʀᴇᴘʟʏ ᴛᴏ ᴀ ꜱᴛɪᴄᴋᴇʀ ᴡɪᴛʜ ᴄᴀᴘᴛɪᴏɴ ${prefix + command}*`);
            }

            try {
                const media = await quoted.download();
                const inputPath = path.join(__dirname, getRandom('.webp'));
                fs.writeFileSync(inputPath, media);
                const outputPath = path.join(__dirname, getRandom('.png'));

                exec(`ffmpeg -i ${inputPath} ${outputPath}`, (err) => {
                    fs.unlinkSync(inputPath);

                    if (err) {
                        console.error('Error converting to image:', err);
                        return reply('ᴀɴ ᴇʀʀᴏʀ ᴏᴄᴄᴜʀʀᴇᴅ ᴀᴛ ᴏᴜʀ ᴇɴᴅ.');
                    }

                    const buffer = fs.readFileSync(outputPath);
                    ridzcoder.sendMessage(m.chat, { image: buffer }, { quoted: m });
                    fs.unlinkSync(outputPath);
                });

            } catch (error) {
                console.error('Error converting to image:', error);
                reply('ᴀɴ ᴇʀʀᴏʀ ᴏᴄᴄᴜʀʀᴇᴅ ᴀᴛ ᴏᴜʀ ᴇɴᴅ.');
            }
        }
    },
        {
        command: ['tomp3', 'toaudio', 'extractaudio'],
    react: "🍹",
        operate: async ({ ridzcoder, m, reply, quoted, mime }) => {          

            if (!quoted) return reply('*ʀᴇᴘʟʏ ᴛᴏ ᴀ ᴠɪᴅᴇᴏ ᴛᴏ ᴄᴏɴᴠᴇʀᴛ ɪᴛ ᴛᴏ ᴀᴜᴅɪᴏ!*');
            if (!/video/.test(mime)) return reply('*ᴏɴʟʏ  ᴠɪᴅᴇᴏꜱ ᴄᴀɴ ʙᴇ  ᴄᴏɴᴠᴇʀᴛᴇᴅ ᴛᴏ ᴀᴜᴅɪᴏ!*');

            try {
                let buffer = await quoted.download();
                let converted = await toAudio(buffer, 'mp4');

                await ridzcoder.sendMessage(m.chat, { 
                    audio: converted.data, 
                    mimetype: 'audio/mpeg' 
                }, { quoted: m });

                // Optional: Delete temporary data
                if (converted.delete) {
                    await converted.delete();
                }

            } catch (e) {
                console.error(e);
                reply('*ꜰᴀɪʟᴇᴅ ᴛᴏ ᴄᴏɴᴠᴇʀᴛ ᴠɪᴅᴇᴏ ᴛᴏ ᴀᴜᴅɪᴏ*');
            }
        }
    },
    {
    command: ['tovideo', 'stickertovid', 'sticker2vid'],
    react: "🍹",
    operate: async ({ ridzcoder, m, reply, quoted, mime, prefix, command }) => {
        if (!m.quoted) return reply(`ʀᴇᴘʟʏ ᴛᴏ ᴀ ꜱᴛɪᴄᴋᴇʀ ᴡɪᴛʜ ᴄᴀᴘᴛɪᴏɴ *${prefix + command}*`);
    if (!m.quoted.mimetype.includes('webp')) return reply(`ᴘʟᴇᴀꜱᴇ ʀᴇᴘʟʏ ᴛᴏ ᴀ ᴡᴇʙᴘ ꜱᴛɪᴄᴋᴇʀ.`);

    try {
      const media = await m.quoted.download();
      const videoUrl = await webp2mp4(media);

      if (!videoUrl) throw new Error('ᴄᴏɴᴠᴇꜱɪᴏɴ ꜰᴀɪʟᴇᴅ');

      await ridzcoder.sendFile(m.chat, videoUrl, 'converted.mp4', '', m);

    } catch (error) {
      console.error(error);
      reply('ꜰᴀɪʟᴇᴅ ᴛᴏ ᴄᴏɴᴠᴇʀᴛ ꜱᴛɪᴄᴋᴇʀ ᴛᴏ ᴠɪᴅᴇᴏ,ᴘʟᴇᴀꜱᴇ ᴛʀʏ ᴀɢᴀɪɴ ʟᴀᴛᴇʀ.');
    }
  }
},
    {
        command: ['sticker', 'stiker', 's'],
    react: "🍹",
        operate: async ({ ridzcoder, m, reply, prefix, mime,  command, args, quoted }) => {

            if (!quoted) {
                return reply(`ꜱᴇɴᴅ ᴏʀ ʀᴇᴘʟʏ ᴛᴏ ɪᴍᴀɢᴇꜱ, ᴠɪᴅᴇᴏꜱ,ᴏʀ ɢɪꜰꜱ ᴡɪᴛʜ ᴄᴀᴘᴛɪᴏɴ ${prefix + command}`);
            }

            if (!mime) {
                return reply(`ᴛʜᴇ Qᴜᴏᴛᴇᴅ ᴍᴇꜱꜱᴀɢᴇꜱ ᴅᴏᴇꜱ ɴᴏᴛ ᴄᴏɴᴛᴀɪɴ ᴍᴇᴅɪᴀ. ꜱᴇɴᴅ ᴏʀ ʀᴇᴘʟʏ ᴛᴏ ɪᴍᴀɢᴇꜱ, ᴠɪᴅᴇᴏꜱ,ᴏʀ ɢɪꜰꜱ.`);
            }

            const swns = args.join(" ");
            const pcknms = swns.split("|")[0];
            const atnms = swns.split("|")[1];

            try {
                if (/image/.test(mime)) {
                    const media = await quoted.download();
                    await ridzcoder.sendImageAsSticker(m.chat, media, m, {
                        packname: pcknms ? pcknms : global.packname,
                        author: atnms ? atnms : global.author,
                    });
                }
                else if (/video/.test(mime)) {
                    if ((quoted.msg || quoted).seconds > 10) {
                        return reply("ᴛʜᴇ ᴠɪᴅᴇᴏ ʟᴇɴɢᴛʜ ᴍᴜꜱᴛ ʙᴇ 10 ꜱᴇᴄᴏɴᴅꜱ ᴏʀ ʟᴇꜱꜱ. ᴘʟᴇᴀꜱᴇ ᴛʀʏ ᴀɢᴀɪɴ ʟᴀᴛᴇʀ.");
                    }
                    const media = await quoted.download();
                    await ridzcoder.sendVideoAsSticker(m.chat, media, m, {
                        packname: pcknms ? pcknms : global.packname,
                        author: atnms ? atnms : global.author,
                    });
                }
                else {
                    return reply(`ꜱᴇɴᴅ ᴏʀ ʀᴇᴘʟʏ ᴛᴏ ɪᴍᴀɢᴇꜱ, ᴠɪᴅᴇᴏꜱ,ᴏʀ ɢɪꜰꜱ ᴡɪᴛʜ ᴄᴀᴘᴛɪᴏɴ ${prefix + command}`);
                }
            } catch (error) {
                console.error('Error processing sticker:', error);
                reply('ᴀɴ ᴇʀʀᴏʀ ᴏᴄᴄᴜʀʀᴇᴅ ᴀᴛ ᴏᴜʀ ᴇɴᴅ.');
            }
        }
    }
];