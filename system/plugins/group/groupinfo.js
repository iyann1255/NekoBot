module.exports = {
  command: "groupinfo",
  alias: ["ginfo", "infogrup", "gcinfo"],
  category: ["group"],
  settings: {
    group: true,
  },
  description: "📋 Tampilkan info lengkap grup",
  async run(m, { sock }) {
    const grup = m.metadata;
    const totalMember = grup.participants.length;
    const totalAdmin = grup.participants.filter((p) => p.admin).length;
    const dibuat = new Date(grup.creation * 1000).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    let caption = `*– 乂 Informasi Grup*\n\n`;
    caption += `> *📌 Nama:* ${grup.subject}\n`;
    caption += `> *🆔 ID:* ${m.cht}\n`;
    caption += `> *👑 Owner:* @${grup.owner?.split("@")[0] || "Tidak diketahui"}\n`;
    caption += `> *📅 Dibuat:* ${dibuat}\n`;
    caption += `> *👥 Total Member:* ${totalMember}\n`;
    caption += `> *🛡️ Total Admin:* ${totalAdmin}\n\n`;
    caption += `> *📝 Deskripsi:*\n> ${grup.desc || "Tidak ada deskripsi"}`;

    await m.reply(caption, {
      mentions: grup.owner ? [grup.owner] : [],
    });
  },
};
