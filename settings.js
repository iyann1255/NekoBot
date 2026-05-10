const fs = require("node:fs");

const config = {
  owner: ["639753504323", ""],
  name: "-  - Simple WhatsApp bot",
  sessions: "sessions",
  prefix: [".", "?", "!"], // Tambahkan prefix sesuai kebutuhan
  sticker: {
    packname: "✨  ✨", 
    author: "🐾  🐾", 
  },
  id: {
    newsletter: "120363388655497053@newsletter", 
    group: "120363370515588374@g.us" 
  },
  messages: {
    wait: "> ⏳ *Mohon tunggu sebentar*... Kami sedang memproses permintaan Anda, harap bersabar ya!", 
    owner: "> 🧑‍💻 *Fitur ini hanya untuk pemilik bot*... Maaf, Anda tidak memiliki akses ke fitur ini.", 
    premium: "> 🥇 *Upgrade ke Premium* untuk mendapatkan akses ke fitur eksklusif, murah dan cepat! Hubungi admin untuk info lebih lanjut.", 
    group: "> 👥 *Fitur ini hanya tersedia di grup*... Pastikan Anda berada di grup WhatsApp untuk mengakses fitur ini.",
    botAdmin: "> ⚠️ *Anda harus menjadi admin grup* untuk menggunakan fitur ini, karena bot memerlukan hak akses admin.", 
    grootbotbup: "> 🛠️ *Jadikan NekoBot sebagai admin* grup untuk menggunakan fitur ini. Pastikan Anda memberikan hak admin kepada bot.", 
  },
  database: "neko-db",
  tz: "Asia/Jakarta",
};

module.exports = config;

let file = require.resolve(__filename);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  delete require.cache[file];
});
