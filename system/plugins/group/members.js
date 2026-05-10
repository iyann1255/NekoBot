module.exports = {
  command: "members",
  alias: ["listmember", "member", "anggota"],
  category: ["group"],
  settings: {
    group: true,
  },
  description: "👥 Tampilkan list semua member grup",
  async run(m, { sock }) {
    const grup = m.metadata;
    const members = grup.participants;

    let teks = `*– 乂 Daftar Member Grup*\n`;
    teks += `> *📌 Grup:* ${grup.subject}\n`;
    teks += `> *👥 Total:* ${members.length} member\n`;
    teks += `> ${"─".repeat(20)}\n\n`;

    let no = 1;
    for (const member of members) {
      const nomor = member.id.split("@")[0];
      const role =
        member.admin === "superadmin"
          ? "👑"
          : member.admin === "admin"
          ? "🛡️"
          : "👤";
      teks += `${role} ${no}. +${nomor}\n`;
      no++;
    }

    teks += `\n> 👑 Owner  |  🛡️ Admin  |  👤 Member`;
    m.reply(teks);
  },
};
