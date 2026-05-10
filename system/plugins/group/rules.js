module.exports = {
  command: "rules",
  alias: ["peraturan", "rule"],
  category: ["group"],
  settings: {
    group: true,
  },
  description: "📋 Tampilkan peraturan grup",
  async run(m, { sock }) {
    const group = db.list().group[m.cht];
    const rules = group?.rules;

    if (!rules)
      throw `*⚠️ Belum ada peraturan yang diatur!*\n\n> Admin dapat mengatur dengan:\n> *.setrules [isi peraturan]*`;

    m.reply(
      `*– 乂 Peraturan Grup*\n> *📌 ${m.metadata.subject}*\n> ${"─".repeat(20)}\n\n${rules}`
    );
  },
};
