const fs = require('fs');

global.owner = ["Rɪᴅᴢ Cᴏᴅᴇʀ❦"];  
global.status = false; // true = public, false = private
global.versions = "v2.1.0";
global.botname = "NEMESIS-MD"; 

// ========= Other Global Settings ========= //
global.SESSION_ID = process.env.SESSION_ID || '';
global.postgresqls = process.env.DATABASE_URL || "";

// ========= Setting WM ========= //
global.packname = 'Nemesis-md';
global.author = 'Ridz Coder';
global.wm = '©NEMESIS-MD RUINS IN THE SHADOW';

// === For only developer ============
global.api = "https://apiskeith.top";
global.wwe = "https://www.wwe.com/api/news";
global.wwe1 = "https://www.thesportsdb.com/api/v1/json/3/searchfilename.php?e=wwe";
global.wwe2 = "https://www.thesportsdb.com/api/v1/json/3/searchevents.php?e=wrestling";
global.falcon = "https://flowfalcon.dpdns.org";
global.siputzx = "https://api.siputzx.my.id"; 
global.updateZipUrl = "https://github.com/ridzcoder/NEMESIS-MD/archive/refs/heads/main.zip";

global.gcount = {
  prem: 500,
  user: 15
};

global.limitCount = 10;

global.mess = {
  group: "This is not group!",
  notadmin: "This command is only preserved for group admins!",
  notgroup: "This command can only be used in groups!",
  owner: "This command is only preserved for bot owner and sudo!",
  error: "An error occurred while processing the command!",
  done: "Mission complete ✅",
  notext: "Please provide the necessary text",
  premium: "*First become a premium user*",
  botadmin: "The bot needs admin permission to perform this command!",
  botnotadmin: "Please first make bot admin to use this command!",
  limited: "*Limit reached*",
  siputzx: "https://api.siputzx.my.id" 
};


let file = require.resolve(__filename);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  delete require.cache[file];
  require(file);
});


