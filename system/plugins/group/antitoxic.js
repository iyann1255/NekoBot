module.exports = {
  command: "antitoxic",
  alias: ["setantitoxic"],
  category: ["group"],
  settings: {
    group: true,
    admin: true,
  },
  description: "🤬 Aktifkan/nonaktifkan filter kata kasar di grup",
  async run(m, { sock, text }) {
    const group = db.list().group[m.cht];
    const status = group?.antitoxic;

    if (!text) {
      return m.reply(
        `*– 乂 Anti Toxic*\n\n> *Status:* ${status ? "✅ Aktif" : "❌ Nonaktif"}\n\n> Gunakan:\n> • *antitoxic on* → aktifkan\n> • *antitoxic off* → nonaktifkan\n\n📌 _Pesan mengandung kata kasar akan otomatis dihapus._`
      );
    }

    if (text === "on") {
      db.list().group[m.cht].antitoxic = true;
      m.reply(`*✅ Anti Toxic Diaktifkan!*\n\n> Pesan mengandung kata kasar akan otomatis dihapus.`);
    } else if (text === "off") {
      db.list().group[m.cht].antitoxic = false;
      m.reply(`*❌ Anti Toxic Dinonaktifkan!*`);
    } else {
      m.reply(`*⚠️ Format Salah!*\n\n> Gunakan: *antitoxic on/off*`);
    }
  },
};
