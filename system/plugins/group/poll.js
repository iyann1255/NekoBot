module.exports = {
  command: "poll",
  alias: ["polling", "vote"],
  category: ["group"],
  settings: {
    group: true,
  },
  description: "📊 Buat polling di grup",
  async run(m, { sock, text }) {
    if (!text)
      throw `*⚠️ Format Salah!*\n\n> *Cara penggunaan:*\n> *poll Pertanyaan? | Pilihan 1 | Pilihan 2*\n\n> *Contoh:*\n> *poll Mau makan apa? | Nasi Goreng | Mie Ayam | Bakso*`;

    const parts = text.split("|").map(s => s.trim());
    if (parts.length < 3)
      throw `*⚠️ Minimal 2 pilihan!*\n\n> Contoh:\n> *poll Pertanyaan? | Pilihan 1 | Pilihan 2*`;
    if (parts.length > 13)
      throw `*⚠️ Maksimal 12 pilihan!*`;

    const pertanyaan = parts[0];
    const pilihan = parts.slice(1);

    try {
      await sock.sendMessage(m.cht, {
        poll: {
          name: pertanyaan,
          values: pilihan,
          selectableCount: 1,
        },
      });
    } catch (e) {
      // Fallback teks jika native poll tidak support
      const emoji = ["1️⃣","2️⃣","3️⃣","4️⃣","5️⃣","6️⃣","7️⃣","8️⃣","9️⃣","🔟","🔢","🔣"];
      let teks = `*– 乂 📊 POLLING*\n\n`;
      teks += `*❓ ${pertanyaan}*\n\n`;
      pilihan.forEach((p, i) => {
        teks += `${emoji[i] || `${i + 1}.`} ${p}\n`;
      });
      teks += `\n📌 _Balas dengan nomor pilihanmu!_`;
      m.reply(teks);
    }
  },
};
