const KATA_KASAR = [
  "anjing", "bangsat", "babi", "bajingan", "kontol",
  "memek", "ngentot", "kampret", "sialan", "goblok",
  "tolol", "idiot", "tai", "asu", "jancok", "cok",
  "dancok", "mbok", "kimak", "setan"
];

async function events(m, { sock, Func }) {
  if (!m.isGroup) return;
  if (m.isAdmin) return;

  const group = db.list().group[m.cht];
  if (!group?.antitoxic) return;

  const body = m.body?.toLowerCase() || "";
  const adaKataKasar = KATA_KASAR.some(kata => body.includes(kata));

  if (adaKataKasar) {
    try {
      await sock.sendMessage(m.cht, { delete: m.key });
      await sock.sendMessage(m.cht, {
        text: `*⚠️ Peringatan Anti Toxic!*\n\n> @${m.sender.split("@")[0]} harap jaga kata-katamu ya! Pesan yang mengandung kata kasar akan dihapus otomatis.`,
        mentions: [m.sender],
      });
    } catch (e) {
      console.error("antitoxic error:", e);
    }
    return true;
  }
}

module.exports = { events };
