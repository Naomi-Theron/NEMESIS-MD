const fs = require('fs');
const path = require('path');
const yts = require('yt-search');
const fetch = require("node-fetch");
const axios = require('axios');

module.exports = [
    {
        command: ['shazam', 'identifymusic', 'musicid'],
        operate: async ({ ridzcoder, m, reply, quoted, acr, mime }) => {
            
            if (!quoted || !/audio|video/.test(mime)) {
                return reply("Reply to an audio or video to identify music.");
            }
            
            try {
                const media = await m.quoted.download();
                const filePath = `./tmp/${m.sender}.${mime.split('/')[1]}`;
                fs.writeFileSync(filePath, media);
                
                const res = await acr.identify(fs.readFileSync(filePath));
                
                if (res.status.code != 0) {
                    throw new Error(res.status.msg);
                }

                if (!res.metadata?.music || res.metadata.music.length === 0) {
                    return reply("No music identified in this audio/video.");
                }

                const { title, artists, album, release_date } = res.metadata.music[0];
                const resultText = `🎵 *Music Identified!*\n\n*Title:* ${title}\n*Artist(s):* ${artists.map(v => v.name).join(', ')}\n*Album:* ${album?.name || 'Unknown'}\n*Release Date:* ${release_date || 'Unknown'}`;
                
                reply(resultText);
                
            } catch (error) {
                console.error(error);
                reply("Error identifying music: " + error.message);
            }
        }
    },
    {
        command: ['ytsearch', 'youtubesearch', 'yts'],
        operate: async ({ ridzcoder, m, reply, text, prefix, command }) => {
            if (!text) return reply(`📌 *Example: ${prefix + command} Eminem Godzilla*`);

            try {
                const searchResults = await yts(text);
                if (!searchResults.all.length) return reply("❌ *No YouTube results found.*");

                let responseText = `🎥 *YouTube Search Results for:* ${text}\n\n`;
                searchResults.all.slice(0, 10).forEach((video, index) => {
                    responseText += `□ *${index + 1}.* ${video.title}\n□ *Uploaded:* ${video.ago}\n□ *Views:* ${video.views}\n□ *Duration:* ${video.timestamp}\n□ *URL:* ${video.url}\n\n─────────────────\n\n`;
                });

                await ridzcoder.sendMessage(
                    m.chat,
                    { image: { url: searchResults.all[0].thumbnail }, caption: responseText },
                    { quoted: m }
                );
            } catch (error) {
                console.error("YT Search command failed:", error);
                reply("❌ *An error occurred while fetching YouTube search results.*");
            }
        }
    },
    {
  command: ['yts2', 'ytsearch2', 'youtubesearch2'],
  operate: async ({ m, reply, args, ridzcoder }) => {
    const query = args.join(' ');
    
    if (!query) return reply("*Please provide a search term. Example: `.yts2 JEXPLOIT-BOT*`");
    
    try {
      const response = await fetch(`${global.siputzx}/api/s/youtube?query=${encodeURIComponent(query)}`);
      const data = await response.json();
      
      if (!data.status || !data.data || data.data.length === 0) {
        return reply(`❌ No videos found for "${query}"`);
      }
      
      const videos = data.data.slice(0, 5);
      
      let message = `📺 *YouTube Search Results for "${query}"*\n\n`;
      
      videos.forEach((video, index) => {
        message += `*${index + 1}. ${video.title}*\n`;
        message += `   👤 Channel: ${video.author?.name || 'Unknown'}\n`;
        message += `   ⏱️ Duration: ${video.timestamp || 'N/A'}\n`;
        message += `   👁️ Views: ${video.views?.toLocaleString() || 'N/A'}\n`;
        message += `   📅 Uploaded: ${video.ago || 'N/A'}\n`;
        message += `   🔗 Link: ${video.url}\n\n`;
      });
      
      message += `> ${global.wm || ''}`;
      
      reply(message);
      
    } catch (error) {
      console.error('YouTube search error:', error);
      reply("❌ Error searching YouTube. Try again later.");
    }
  }
},
    {
        command: ['imdb', 'movie'],
        operate: async ({ ridzcoder, m, reply, text }) => {
            if (!text) return reply("Provide a movie or series name.");
            
            try {
                const { data } = await axios.get(`http://www.omdbapi.com/?apikey=742b2d09&t=${text}&plot=full`);
                if (data.Response === "False") throw new Error();

                const imdbText = `🎬 *IMDB SEARCH*\n\n`
                    + `*Title:* ${data.Title}\n*Year:* ${data.Year}\n*Rated:* ${data.Rated}\n`
                    + `*Released:* ${data.Released}\n*Runtime:* ${data.Runtime}\n*Genre:* ${data.Genre}\n`
                    + `*Director:* ${data.Director}\n*Actors:* ${data.Actors}\n*Plot:* ${data.Plot}\n`
                    + `*IMDB Rating:* ${data.imdbRating} ⭐\n*Votes:* ${data.imdbVotes}`;

                ridzcoder.sendMessage(m.chat, { image: { url: data.Poster }, caption: imdbText }, { quoted: m });
            } catch (error) {
                reply("❌ Unable to fetch IMDb data.");
            }
        }
    },
{
        command: ['apksearch', 'playstore', 'searchapp'],
        operate: async ({ ridzcoder, m, reply, args, prefix }) => {
            const query = args.join(" ");
            if (!query) return reply(`Example: ${prefix}apksearch WhatsApp`);

            try {
                await reply(`Searching for "${query}"...`);

                const axios = require('axios');
                const apiUrl = `https://api.princetechn.com/api/search/playstore?apikey=prince&query=${encodeURIComponent(query)}`;
                const response = await axios.get(apiUrl);
                
                if (response.data?.success && response.data?.results?.length > 0) {
                    const results = response.data.results.slice(0, 5);
                    
                    let text = `*PLAY STORE RESULTS*\n\n`;
                    for (let i = 0; i < results.length; i++) {
                        const app = results[i];
                        text += `${i + 1}. *${app.name}*\n`;
                        text += `   Developer: ${app.developer}\n`;
                        text += `   Rating: ${app.rating} ⭐\n`;
                        text += `   ${app.summary}\n\n`;
                    }
                    text += `> ${global.wm || 'Vesper-Xmd'}`;
                    
                    await reply(text);
                } else {
                    reply(`No results found for "${query}"`);
                }
            } catch (error) {
                console.error(error);
                reply(`Failed to search for "${query}"`);
            }
        }
    },
 
{
    command: ['lyrics', 'lyric'],
    operate: async ({ ridzcoder, m, reply, text, prefix }) => {
       if (!text) {
            return reply(`🎵 *Lyrics Finder*\n\nUsage: ${prefix}lyrics <song name>\n\nExamples:\n• ${prefix}lyrics shape of you\n• ${prefix}lyrics Sekkle down by bunnie Gunter\n• ${prefix}lyrics Blinding Lights The Weeknd`);
        }

        try {
            await reply(`🔍 Searching lyrics for: *"${text}"*...`);

            const apiUrl = `https://api.popcat.xyz/v2/lyrics?song=${encodeURIComponent(text)}`;
            const res = await fetch(apiUrl, { timeout: 15000 });
            
            if (!res.ok) throw new Error(`API status: ${res.status}`);
            
            const data = await res.json();

            if (data.error === true) {
                return reply(`No lyrics found for *"${text}"*\n\nTry:\n• Add artist name\n• Check spelling\n• Use exact title`);
            }

            
            if (!data.message || typeof data.message !== 'object' || !data.message.lyrics) {
                return reply(`Lyrics not available for *"${text}"*`);
            }

            const lyricsData = data.message;
            const lyrics = lyricsData.lyrics;
            const artist = lyricsData.artist || 'Unknown';
            const title = lyricsData.title || text;
            const image = lyricsData.image;

            const cleanLyrics = lyrics.replace(/^\d+\s+Contributor.*?\n/i, '');

            let message = `🎵 *${title}*\n🎤 *Artist:* ${artist}\n\n📖 *Lyrics:*\n\n${cleanLyrics}`;
            
            if (message.length > 3500) {
                message = message.substring(0, 3500) + '\n\n*Lyrics truncated - song too long*';
            }
            
            message += `\n\n${global.wm || ''}`;

            if (image && typeof image === 'string' && image.includes('http') && !image.includes('default_cover_image')) {
                try {
                    await ridzcoder.sendMessage(m.chat, {
                        image: { url: image },
                        caption: `🎵 *${title}*\n🎤 *Artist:* ${artist}`
                    }, { quoted: m });
                    
                    await new Promise(resolve => setTimeout(resolve, 300));
                } catch (e) {
                    console.log('Image failed:', e.message);
                }
            }

            await ridzcoder.sendMessage(m.chat, { text: message }, { quoted: m });

        } catch (error) {
            console.error('Lyrics error:', error);
            
            let errMsg = `Error: ${error.message}`;
            if (error.message.includes('timeout')) errMsg = 'Request timed out';
            if (error.message.includes('network')) errMsg = 'Network error';
            if (error.message.includes('status: 5')) errMsg = 'Service unavailable';
            
            reply(`${errMsg}\n\nTry again in a few moments!`);
        }
     }
}, 
    {
        command: ['chord', 'cr'],
        operate: async ({ reply, m, text }) => {
            if (!text) return reply(`*Query input needed*\n\nExample: .chord shape of you`);
            
            try {
                const apiUrl = `https://api.princetechn.com/api/search/chord?apikey=prince&query=${encodeURIComponent(text)}`;
                const res = await fetch(apiUrl);
                const response = await res.json();
                
                if (!response.success || !response.results || response.results.length === 0) {
                    return reply(`❌ No results found for "${text}"\nPlease try a different query.`);
                }
                
                const results = response.results.slice(0, 5);
                
                let chordMessage = `🎵 *Search Results for "${text}"*\n\n`;
                results.forEach((item, i) => {
                    chordMessage += `*${i + 1}. ${item.name || 'Unknown'}*\n`;
                    if (item.developer) chordMessage += `👤 *Developer:* ${item.developer}\n`;
                    if (item.rating) chordMessage += `⭐ *Rating:* ${item.rating}\n`;
                    if (item.summary) chordMessage += `📝 ${item.summary}\n`;
                    chordMessage += `\n`;
                });
                
                chordMessage += `> ${global.wm || ''}`;
                
                reply(chordMessage);
                
            } catch (error) {
                console.error('Error in chord command:', error);
                reply('Error fetching results. Please try again later.');
            }
        }
    },
        {
        command: ['weather'],
        operate: async ({ reply, m, ridzcoder, text }) => {
            if (!text) return reply("Provide a location.");
            
            try {
                const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${text}&units=metric&appid=060a6bcfa19809c2cd4d97a212b19273`);
                
                const weatherInfo = `🌤️ *Weather for ${text}*\n\n`
                    + `🌡️ *Temperature:* ${data.main.temp}°C (Feels like ${data.main.feels_like}°C)\n`
                    + `🌪️ *Weather:* ${data.weather[0].main} - ${data.weather[0].description}\n`
                    + `💨 *Wind Speed:* ${data.wind.speed} m/s\n`
                    + `📍 *Coordinates:* ${data.coord.lat}, ${data.coord.lon}\n`
                    + `🌍 *Country:* ${data.sys.country}`;

                ridzcoder.sendMessage(m.chat, { text: weatherInfo }, { quoted: m });
            } catch (error) {
                reply("❌ Unable to fetch weather data.");
            }
        }
    },
    {
  command: ['tiktoksearch', 'ttsearch', 'tiksearch'],
  operate: async ({ m, reply, args }) => {
    const query = args.join(' ');
    
    if (!query) return reply("*Please provide a search term. Example: `.tiktoksearch keizzah4189*`");
    
    try {
      const response = await fetch(`https://api.princetechn.com/api/stalk/tiktokstalk?apikey=prince&query=${encodeURIComponent(query)}`);
      const data = await response.json();
      
      if (!data.success || !data.results?.length) {
        return reply(`❌ No results found for "${query}"`);
      }
      
      let message = `*Search Results for "${query}"*\n\n`;
      message += `*📊 Found:* ${data.results.length} results\n\n`;
      
      data.results.slice(0, 5).forEach((item, i) => {
        message += `*${i + 1}. ${item.name || 'Unknown'}*\n`;
        if (item.developer) message += `👤 *Developer:* ${item.developer}\n`;
        if (item.rating) message += `⭐ *Rating:* ${item.rating}\n`;
        if (item.summary) message += `📝 ${item.summary}\n`;
        message += `\n`;
      });
      
      message += `\n_Showing top 5 results._`;
      
      reply(message);
    } catch (error) {
      console.error('TikTok Search Error:', error);
      reply("❌ Error searching. Try again later.");
    }
  }
},
{
  command: ['imagesearch', 'imgsearch', 'image', 'img'],
  operate: async ({ m, reply, args, ridzcoder }) => {
    const query = args.join(' ');
    
    if (!query) return reply("*Please provide a search term. Example: `.imagesearch dog*`");
    
    try {
      const response = await fetch(`https://api.princetechn.com/api/search/googleimage?apikey=prince&query=${encodeURIComponent(query)}`);
      const data = await response.json();
      
      if (!data.success || !data.results?.length) {
        return reply(`❌ No results found for "${query}"`);
      }
      
      const results = data.results.slice(0, 5);
      
      let message = `*🔍 Search Results for "${query}"*\n\n`;
      results.forEach((item, i) => {
        message += `*${i + 1}. ${item.name || 'Unknown'}*\n`;
        if (item.developer) message += `👤 *Developer:* ${item.developer}\n`;
        if (item.rating) message += `⭐ *Rating:* ${item.rating}\n`;
        if (item.summary) message += `📝 ${item.summary}\n`;
        if (item.icon) message += `🖼️ *Icon:* ${item.icon}\n`;
        message += `\n`;
      });
      
      message += `> ${global.wm || ''}`;
      
      if (results[0].icon) {
        await ridzcoder.sendMessage(m.chat, {
          image: { url: results[0].icon },
          caption: message
        }, { quoted: m });
      } else {
        reply(message);
      }
      
    } catch (error) {
      console.error('Image Search Error:', error);
      reply("❌ Error searching. Try again later.");
    }
  }
},
    // ─────────────────────────────────────────────
    // DEFINE - Urban Dictionary via PrinceTech
    // ─────────────────────────────────────────────
    {
        command: ['define', 'dictionary', 'urbandictionary'],
        operate: async ({ ridzcoder, mek, m, reply, text, q }) => {
            try {
                const word = (q || text || '').trim();
                if (!word) return reply("Please provide a word to define.\n\n📌 *Usage:* .define [word]\n📌 *Example:* .define dog");

                const apiUrl = `https://api.princetechn.com/api/tools/define?apikey=prince&term=${encodeURIComponent(word)}`;
                const { data } = await axios.get(apiUrl);

                if (!data || !data.success || !data.results || data.results.length === 0) {
                    return reply(`🚫 *No definition found for "${word}".*\nPlease check the spelling and try again.`);
                }

                const results = data.results.slice(0, 5);

                let message = `📖 *DEFINITIONS FOR "${word.toUpperCase()}"*\n\n`;
                results.forEach((item, i) => {
                    // Clean up Urban Dictionary bracket formatting
                    const definition = (item.definition || 'No definition').replace(/\[|\]/g, '');
                    const example = (item.example || '').replace(/\[|\]/g, '');

                    message += `*${i + 1}. By ${item.author || 'Unknown'}* ${item.written_on ? `(${new Date(item.written_on).toLocaleDateString()})` : ''}\n`;
                    message += `📚 ${definition}\n`;
                    if (example) message += `✍️ _${example}_\n`;
                    message += `🔗 ${item.permalink || ''}\n\n`;
                });

                message += `> ${global.wm || ''}`;

                // Trim to WhatsApp limit
                if (message.length > 4000) {
                    message = message.substring(0, 4000) + '\n\n*...truncated*';
                }

                return reply(message);
            } catch (e) {
                console.error("❌ Define error:", e);
                return reply("⚠️ An error occurred while fetching the definition. Please try again later.");
            }
        }
    },

    // ─────────────────────────────────────────────
    // SCREENSHOTS
    // ─────────────────────────────────────────────
    {
        command: ['ssphone', 'ssmobile2', 'ssmobileweb'],
        operate: async ({ ridzcoder, m, reply, text, prefix }) => {
            const url = (text || '').trim();
            if (!url) return reply(`📌 *Usage:* ${prefix}ssphone https://example.com`);
            if (!url.startsWith('http')) return reply("❌ URL must start with http:// or https://");

            try {
                await ridzcoder.sendMessage(m.chat, { react: { text: "📱", key: m.key } });

                const apiUrl = `https://api.princetechn.com/api/tools/ssphone?apikey=prince&url=${encodeURIComponent(url)}`;

                await ridzcoder.sendMessage(m.chat, {
                    image: { url: apiUrl },
                    caption: `📱 *Phone Screenshot*\n\n🔗 ${url}\n\n> ${global.wm || ''}`
                }, { quoted: m });

                await ridzcoder.sendMessage(m.chat, { react: { text: "✅", key: m.key } });
            } catch (error) {
                console.error('ssphone error:', error);
                await ridzcoder.sendMessage(m.chat, { react: { text: "❌", key: m.key } });
                reply("❌ Error generating phone screenshot.");
            }
        }
    },
    {
        command: ['sspc2', 'ssdesktop2', 'sscomputer'],
        operate: async ({ ridzcoder, m, reply, text, prefix }) => {
            const url = (text || '').trim();
            if (!url) return reply(`📌 *Usage:* ${prefix}sspc2 https://example.com`);
            if (!url.startsWith('http')) return reply("❌ URL must start with http:// or https://");

            try {
                await ridzcoder.sendMessage(m.chat, { react: { text: "💻", key: m.key } });

                const apiUrl = `https://api.princetechn.com/api/tools/sspc?apikey=prince&url=${encodeURIComponent(url)}`;

                await ridzcoder.sendMessage(m.chat, {
                    image: { url: apiUrl },
                    caption: `💻 *PC Screenshot*\n\n🔗 ${url}\n\n> ${global.wm || ''}`
                }, { quoted: m });

                await ridzcoder.sendMessage(m.chat, { react: { text: "✅", key: m.key } });
            } catch (error) {
                console.error('sspc error:', error);
                await ridzcoder.sendMessage(m.chat, { react: { text: "❌", key: m.key } });
                reply("❌ Error generating PC screenshot.");
            }
        }
    },
    {
        command: ['sstab2', 'sstablet'],
        operate: async ({ ridzcoder, m, reply, text, prefix }) => {
            const url = (text || '').trim();
            if (!url) return reply(`📌 *Usage:* ${prefix}sstab2 https://example.com`);
            if (!url.startsWith('http')) return reply("❌ URL must start with http:// or https://");

            try {
                await ridzcoder.sendMessage(m.chat, { react: { text: "📟", key: m.key } });

                const apiUrl = `https://api.princetechn.com/api/tools/sstab?apikey=prince&url=${encodeURIComponent(url)}`;

                await ridzcoder.sendMessage(m.chat, {
                    image: { url: apiUrl },
                    caption: `📟 *Tablet Screenshot*\n\n🔗 ${url}\n\n> ${global.wm || ''}`
                }, { quoted: m });

                await ridzcoder.sendMessage(m.chat, { react: { text: "✅", key: m.key } });
            } catch (error) {
                console.error('sstab error:', error);
                await ridzcoder.sendMessage(m.chat, { react: { text: "❌", key: m.key } });
                reply("❌ Error generating tablet screenshot.");
            }
        }
    },
    {
        command: ['ssweb2', 'ssfull', 'ssfullpage'],
        operate: async ({ ridzcoder, m, reply, text, prefix }) => {
            const url = (text || '').trim();
            if (!url) return reply(`📌 *Usage:* ${prefix}ssweb2 https://example.com`);
            if (!url.startsWith('http')) return reply("❌ URL must start with http:// or https://");

            try {
                await ridzcoder.sendMessage(m.chat, { react: { text: "🌐", key: m.key } });

                const apiUrl = `https://api.princetechn.com/api/tools/ssweb?apikey=prince&url=${encodeURIComponent(url)}`;

                await ridzcoder.sendMessage(m.chat, {
                    image: { url: apiUrl },
                    caption: `🌐 *Full Web Screenshot*\n\n🔗 ${url}\n\n> ${global.wm || ''}`
                }, { quoted: m });

                await ridzcoder.sendMessage(m.chat, { react: { text: "✅", key: m.key } });
            } catch (error) {
                console.error('ssweb error:', error);
                await ridzcoder.sendMessage(m.chat, { react: { text: "❌", key: m.key } });
                reply("❌ Error generating web screenshot.");
            }
        }
    },

{
        command: ['news'],
        operate: async ({ ridzcoder, mek, m, from, reply, text, q }) => {
        try {
        const apiKey="0f2c43ab11324578a7b1709651736382";
        const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`);
        const articles = response.data.articles;

        if (!articles.length) return reply("No news articles found.");

        for (let i = 0; i < Math.min(articles.length, 5); i++) {
            const article = articles[i];
            let message = `
📰 *${article.title}*
⚠️ _${article.description}_
🔗 _${article.url}_

> ${global.wm}
            `;

            console.log('Article URL:', article.urlToImage); 

            if (article.urlToImage) {
                await ridzcoder.sendMessage(from, { image: { url: article.urlToImage }, caption: message });
            } else {
                
                await ridzcoder.sendMessage(from, { text: message });
            }
        };
    } catch (e) {
        console.error("Error fetching news:", e);
        reply("Could not fetch news. Please try again later.");
    }
  }
},
{
        command: ['searchrepo', 'srepo'],
        operate: async ({ ridzcoder, mek, m, args, store, from, reply, text, q }) => {
        try {
    const repoName = args.join(" ");
    if (!repoName) {
      return reply("Please provide a GitHub repository in the format 📌 `owner/repo`.");
    }

    const apiUrl = `https://api.github.com/repos/${repoName}`;
    const { data } = await axios.get(apiUrl);

    let responseMsg = `📁 *GitHub Repository Info* 📁\n\n`;
    responseMsg += `*Name*: ${data.name}\n`;
    responseMsg += `*URL*: ${data.html_url}\n`;
    responseMsg += `*Description*: ${data.description || "No description"}\n`;
    responseMsg += `*Stars*: ${data.stargazers_count}\n`;
    responseMsg += `*Forks*: ${data.forks_count}\n`;
    responseMsg += `*Owner*: ${data.owner.login}\n`;
    responseMsg += `*Created At*: ${new Date(data.created_at).toLocaleDateString()}\n`;
    responseMsg += `\n> ${global.wm}`;

    await ridzcoder.sendMessage(from, { text: responseMsg }, { quoted: m });
  } catch (error) {
    console.error("GitHub API Error:", error);
    reply(`❌ Error fetching repository data: ${error.response?.data?.message || error.message}`);
  }
 }
},
{
        command: ['ytstalk'],
        operate: async ({ ridzcoder, mek, m, args, reply, from, text, q }) => {
        try {
    const username = args.join(" ");
    if (!username) {
      return reply("Please provide a YouTube username. Example: `.ytstalk KelvinTech-hub`");
    }

    const response = await axios.get(`https://api.siputzx.my.id/api/stalk/youtube?username=${encodeURIComponent(username)}`);
    const { status, data } = response.data;

    if (!status || !data) {
      return reply("No information found for the specified YouTube channel. Please try again.");
    }

    const {
      channel: {
        username: ytUsername,
        subscriberCount,
        videoCount,
        avatarUrl,
        channelUrl,
        description,
      },
      latest_videos,
    } = data;

    const ytMessage = `
📺 *YouTube Channel*: ${ytUsername}
👥 *Subscribers*: ${subscriberCount}
🎥 *Total Videos*: ${videoCount}
📝 *Description*: ${description || "N/A"}
🔗 *Channel URL*: ${channelUrl}

🎬 *Latest Videos*:
${latest_videos.slice(0, 3).map((video, index) => `
${index + 1}. *${video.title}*
   ▶️ *Views*: ${video.viewCount}
   ⏱️ *Duration*: ${video.duration}
   📅 *Published*: ${video.publishedTime}
   🔗 *Video URL*: ${video.videoUrl}
`).join("\n")}
    `;


    await ridzcoder.sendMessage(from, {
      image: { url: avatarUrl }, 
      caption: ytMessage, 
    });
  } catch (error) {
    console.error("Error fetching YouTube channel information:", error);
    reply("❌ Unable to fetch YouTube channel information. Please try again later.");
  }
 }
},
{
        command: ['twitterstalk', 'xstalk'],
        operate: async ({ ridzcoder, mek, m, q, reply, from, text }) => {
        try {
    if (!q) {
      return reply("Please provide a valid Twitter/X username or search term.");
    }

    await ridzcoder.sendMessage(from, {
      react: { text: "⏳", key: m.key }
    });

    const apiUrl = `https://api.princetechn.com/api/stalk/?apikey=prince&query=${encodeURIComponent(q)}`;
    const { data } = await axios.get(apiUrl);

    if (!data || !data.success || !data.results || data.results.length === 0) {
      return reply("⚠️ No results found. Please try a different query.");
    }

    const results = data.results.slice(0, 5);

    let caption = `╭━━━〔 *SEARCH RESULTS* 〕━━━⊷\n\n`;
    results.forEach((item, i) => {
      caption += `┃ *${i + 1}. ${item.name || 'Unknown'}*\n`;
      if (item.developer) caption += `┃ 👤 *Developer:* ${item.developer}\n`;
      if (item.rating) caption += `┃ ⭐ *Rating:* ${item.rating}\n`;
      if (item.summary) caption += `┃ 📝 ${item.summary}\n`;
      caption += `┃\n`;
    });
    caption += `╰━━━⪼\n\n🔹 > ${global.wm}`;

    if (results[0].icon) {
      await ridzcoder.sendMessage(from, {
        image: { url: results[0].icon },
        caption: caption
      }, { quoted: m });
    } else {
      await ridzcoder.sendMessage(from, { text: caption }, { quoted: m });
    }

  } catch (error) {
    console.error("Error:", error);
    reply("❌ An error occurred while processing your request. Please try again.");
  }
 }
},
{
    command: ['iguser', 'igprofile', 'instagramuser'],
    operate: async ({ m, reply, args, ridzcoder }) => {
        const username = args[0];
        
        if (!username) return reply("*Please provide a search term. Example: `.iguser siputzx_*`");
        
        try {
            await reply(`🔍 Searching for "${username}"...`);
            
            const response = await fetch(`https://api.princetechn.com/api/search/playstore?apikey=prince&query=${encodeURIComponent(username)}`);
            const data = await response.json();
            
            if (!data.success || !data.results?.length) {
                return reply(`❌ No results found for "${username}".`);
            }
            
            const results = data.results.slice(0, 5);
            
            let message = `*🔍 SEARCH RESULTS*\n\n`;
            results.forEach((item, i) => {
                message += `*${i + 1}. ${item.name || 'Unknown'}*\n`;
                if (item.developer) message += `👤 *Developer:* ${item.developer}\n`;
                if (item.rating) message += `⭐ *Rating:* ${item.rating}\n`;
                if (item.summary) message += `📝 ${item.summary}\n`;
                message += `\n`;
            });
            
            message += `> ${global.wm || ''}`;
            
            if (results[0].icon) {
                await ridzcoder.sendMessage(m.chat, {
                    image: { url: results[0].icon },
                    caption: message
                }, { quoted: m });
            } else {
                reply(message);
            }
            
            await ridzcoder.sendMessage(m.chat, { react: { text: "✅", key: m.key } });
            
        } catch (error) {
            console.error('Search error:', error);
            reply("❌ Error fetching results. Try again later.");
            await ridzcoder.sendMessage(m.chat, { react: { text: "❌", key: m.key } });
        }
    }
}
        

];