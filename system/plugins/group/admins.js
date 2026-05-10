module.exports = {
  command: "admins",
  alias: ["listadmin", "admin", "adminlist"],
  category: ["group"],
  settings: {
    group: true,
  },
  description: "🛡️ Tampilkan list semua admin grup",
  async run(m, { sock }) {
    const grup = m.metadata;
    const admins = grup.participants.filter(p => p.admin);

    if (admins.length === 0)
      return m.reply("*❌ Tidak ada admin di grup ini!*");

    let teks = `*– 乂 Daftar Admin Grup*\n`;
    teks += `> *📌 Grup:* ${grup.subject}\n`;
    teks += `> *🛡️ Total:* ${admins.length} admin\n`;
    teks += `> ${"─".repeat(20)}\n\n`;

    let no = 1;
    for (const admin of admins) {
      const nomor = admin.id.split("@")[0];
      const role = admin.admin === "superadmin" ? "👑 Owner" : "🛡️ Admin";
      teks += `${no}. +${nomor} — ${role}\n`;
      no++;
    }

    m.reply(teks);
  },
};
