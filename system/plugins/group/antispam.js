module.exports = {
  command: "antispam",
  alias: ["setantispam"],
  category: ["group"],
  settings: {
    group: true,
    admin: true,
  },
  description: "🚫 Aktifkan/nonaktifkan anti spam di grup",
  async run(m, { sock, Func, text }) {
    const group = db.list().group[m.cht];
    const status = group?.antispam;

    if (!text) {
      return m.reply(
        `*– 乂 Anti Spam*\n\n> *Status:* ${Func.switcher(status, "✅ Aktif", "❌ Nonaktif")}\n\n> *Penggunaan:*\n> • *antispam on* → aktifkan\n> • *antispam off* → nonaktifkan\n\n> 📌 _Member yang kirim 5 pesan dalam 5 detik akan dikick otomatis._`
      );
    }

    if (text === "on") {
      db.list().group[m.cht].antispam = true;
      m.reply(`*✅ Anti Spam Diaktifkan!*\n\n> Member yang terdeteksi spam akan dikick otomatis.`);
    } else if (text === "off") {
      db.list().group[m.cht].antispam = false;
      m.reply(`*❌ Anti Spam Dinonaktifkan!*`);
    } else {
      throw `*⚠️ Format Salah!*\n\n> Gunakan: *antispam on/off*`;
    }
  },
};
