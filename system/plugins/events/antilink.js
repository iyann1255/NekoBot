const { getUrlInfo } = require("baileys");

async function events(m, { sock, Func }) {
  if (!m.isGroup) return;
  if (m.isAdmin) return;

  const group = db.list().group[m.cht];
  if (!group?.antilink) return;

  // Deteksi semua jenis link (bukan hanya WA link)
  const linkRegex =
    /(https?:\/\/[^\s]+|www\.[^\s]+|chat\.whatsapp\.com\/[^\s]+|t\.me\/[^\s]+|bit\.ly\/[^\s]+|youtu\.be\/[^\s]+)/i;

  if (Func.isUrl(m.body) || linkRegex.test(m.body)) {
    try {
      await sock.sendMessage(m.cht, { delete: m.key });
      await sock.sendMessage(m.cht, {
        text: `*🚫 Anti Link Terdeteksi!*\n\n> @${m.sender.split("@")[0]} dilarang mengirim link di grup *${m.metadata.subject}*.\n\n> Pesan Anda telah dihapus otomatis. 🙏`,
        mentions: [m.sender],
      });
    } catch (e) {
      console.error("antilink error:", e);
    }
    return true;
  }
}

module.exports = { events };
