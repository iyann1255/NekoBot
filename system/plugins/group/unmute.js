module.exports = {
  command: "unmute",
  alias: ["bukagrup", "opengrup"],
  category: ["group"],
  settings: {
    group: true,
    admin: true,
    botAdmin: true,
  },
  description: "🔊 Buka bisu grup — semua member bisa chat",
  async run(m, { sock }) {
    await sock
      .groupSettingUpdate(m.cht, "not_announcement")
      .then(() =>
        m.reply(
          `*✅ Grup Berhasil Dibuka!*\n\n> 🔊 Sekarang semua member dapat mengirim pesan.\n\n📌 _Gunakan *mute* untuk membisukan kembali._`
        )
      )
      .catch(() =>
        m.reply(
          `*❌ Gagal Membuka Grup!*\n\n> Pastikan bot memiliki hak admin.`
        )
      );
  },
};
