module.exports = {
  command: "mute",
  alias: ["bisugrup", "closegrup"],
  category: ["group"],
  settings: {
    group: true,
    admin: true,
    botAdmin: true,
  },
  description: "🔇 Bisu grup — hanya admin yang bisa chat",
  async run(m, { sock }) {
    await sock
      .groupSettingUpdate(m.cht, "announcement")
      .then(() =>
        m.reply(
          `*✅ Grup Berhasil Dibisukan!*\n\n> 🔇 Sekarang hanya admin yang dapat mengirim pesan.\n\n📌 _Gunakan *unmute* untuk membuka kembali._`
        )
      )
      .catch(() =>
        m.reply(
          `*❌ Gagal Membisukan Grup!*\n\n> Pastikan bot memiliki hak admin.`
        )
      );
  },
};
