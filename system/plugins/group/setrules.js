module.exports = {
  command: "setrules",
  alias: ["setperaturan"],
  category: ["group"],
  settings: {
    group: true,
    admin: true,
  },
  description: "📋 Atur peraturan grup",
  async run(m, { sock, text }) {
    if (!text)
      throw `*⚠️ Masukkan isi peraturan!*\n\n> Contoh:\n> *setrules 1. Dilarang spam\n2. Hormati sesama\n3. No SARA*`;

    db.list().group[m.cht].rules = text;
    m.reply(
      `*✅ Peraturan Grup Berhasil Diatur!*\n\n> Ketik *rules* untuk melihat peraturan.\n\n*📋 Preview:*\n${text}`
    );
  },
};
