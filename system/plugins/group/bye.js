module.exports = {
  command: "bye",
  alias: ["setbye", "goodbye"],
  category: ["group"],
  settings: {
    group: true,
    admin: true,
  },
  description: "👋 Setting pesan perpisahan member keluar",
  async run(m, { sock, text }) {
    const group = db.list().group[m.cht];
    const status = group?.bye;
    const pesanSaat = group?.byeMsg || "Belum diatur (menggunakan pesan default)";

    if (!text) {
      return m.reply(
        `*– 乂 Bye Message*\n\n> *Status:* ${status ? "✅ Aktif" : "❌ Nonaktif"}\n> *Pesan:* ${pesanSaat}\n\n> Gunakan:\n> • *bye on* → aktifkan\n> • *bye off* → nonaktifkan\n> • *bye set [pesan]* → atur pesan custom\n> • *bye reset* → reset ke default\n\n📌 _Variabel: {nama} {grup}_`
      );
    }

    const [sub, ...rest] = text.split(" ");
    const pesan = rest.join(" ");

    if (sub === "on") {
      db.list().group[m.cht].bye = true;
      m.reply(`*✅ Bye Message Diaktifkan!*`);
    } else if (sub === "off") {
      db.list().group[m.cht].bye = false;
      m.reply(`*❌ Bye Message Dinonaktifkan!*`);
    } else if (sub === "set") {
      if (!pesan) throw `*⚠️ Masukkan pesan bye!*\n\nContoh:\n> *bye set Sampai jumpa {nama}!*`;
      db.list().group[m.cht].byeMsg = pesan;
      db.list().group[m.cht].bye = true;
      m.reply(`*✅ Pesan Bye Berhasil Diatur!*\n\n> *Preview:*\n${pesan.replace(/{nama}/g, "@" + m.sender.split("@")[0]).replace(/{grup}/g, m.metadata.subject)}`);
    } else if (sub === "reset") {
      delete db.list().group[m.cht].byeMsg;
      m.reply(`*✅ Pesan Bye Direset ke Default!*`);
    } else {
      m.reply(`*⚠️ Format Salah!*\n\n> Gunakan: *bye on/off/set/reset*`);
    }
  },
};
