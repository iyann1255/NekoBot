module.exports = {
  command: "welcome",
  alias: ["setwelcome"],
  category: ["group"],
  settings: {
    group: true,
    admin: true,
  },
  description: "👋 Setting pesan sambutan member baru",
  async run(m, { sock, Func, text }) {
    const group = db.list().group[m.cht];
    const status = group?.welcome;
    const pesanSaat = group?.welcomeMsg || "Default";

    if (!text) {
      return m.reply(
        `*– 乂 Welcome Message*\n\n> *Status:* ${Func.switcher(status, "✅ Aktif", "❌ Nonaktif")}\n> *Pesan:* ${pesanSaat}\n\n> *Penggunaan:*\n> • *welcome on* → aktifkan\n> • *welcome off* → nonaktifkan\n> • *welcome set [pesan]* → atur pesan\n> • *welcome reset* → reset ke default\n\n> 📌 _Variabel: {nama} {grup} {total}_`
      );
    }

    const [sub, ...rest] = text.split(" ");
    const pesan = rest.join(" ");

    if (sub === "on") {
      db.list().group[m.cht].welcome = true;
      m.reply(`*✅ Welcome Message Diaktifkan!*`);
    } else if (sub === "off") {
      db.list().group[m.cht].welcome = false;
      m.reply(`*❌ Welcome Message Dinonaktifkan!*`);
    } else if (sub === "set") {
      if (!pesan) throw `*⚠️ Masukkan pesan welcome!*\n\n> Contoh:\n> *welcome set Halo {nama}, selamat datang di {grup}!*`;
      db.list().group[m.cht].welcomeMsg = pesan;
      db.list().group[m.cht].welcome = true;
      m.reply(
        `*✅ Pesan Welcome Berhasil Diatur!*\n\n> *Preview:*\n${pesan
          .replace(/{nama}/g, m.pushName || m.sender.split("@")[0])
          .replace(/{grup}/g, m.metadata.subject)
          .replace(/{total}/g, m.metadata.participants.length)}`
      );
    } else if (sub === "reset") {
      db.list().group[m.cht].welcomeMsg = "";
      m.reply(`*✅ Pesan Welcome Direset ke Default!*`);
    } else {
      throw `*⚠️ Format Salah!*\n\n> Gunakan: *welcome on/off/set/reset*`;
    }
  },
};
