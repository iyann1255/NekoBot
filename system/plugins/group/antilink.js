module.exports = {
  command: "antilink",
  alias: ["setantilink"],
  category: ["group"],
  settings: {
    group: true,
    admin: true,
  },
  description: "🔗 Aktifkan/nonaktifkan anti link di grup",
  async run(m, { sock, Func, text }) {
    const group = db.list().group[m.cht];
    const status = group?.antilink;

    if (!text) {
      return m.reply(
        `*– 乂 Anti Link*\n\n> *Status:* ${Func.switcher(status, "✅ Aktif", "❌ Nonaktif")}\n\n> *Penggunaan:*\n> • *antilink on* → aktifkan\n> • *antilink off* → nonaktifkan`
      );
    }

    if (text === "on") {
      db.list().group[m.cht].antilink = true;
      m.reply(`*✅ Anti Link Diaktifkan!*\n\n> Semua link akan otomatis dihapus.`);
    } else if (text === "off") {
      db.list().group[m.cht].antilink = false;
      m.reply(`*❌ Anti Link Dinonaktifkan!*`);
    } else {
      throw `*⚠️ Format Salah!*\n\n> Gunakan: *antilink on/off*`;
    }
  },
};
