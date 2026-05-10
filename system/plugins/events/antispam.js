const spamTracker = {};

async function events(m, { sock, Func }) {
  if (!m.isGroup) return;
  if (m.isAdmin) return;

  const group = db.list().group[m.cht];
  if (!group?.antispam) return;

  const key = `${m.cht}_${m.sender}`;
  const now = Date.now();

  if (!spamTracker[key]) {
    spamTracker[key] = { count: 1, last: now };
  } else {
    const diff = now - spamTracker[key].last;
    if (diff < 5000) {
      spamTracker[key].count++;
    } else {
      spamTracker[key] = { count: 1, last: now };
    }
  }

  if (spamTracker[key].count >= 5) {
    try {
      await sock.sendMessage(m.cht, {
        text: `*🚫 Anti Spam Terdeteksi!*\n\n> @${m.sender.split("@")[0]} telah mengirim pesan terlalu cepat dan dikick otomatis.`,
        mentions: [m.sender],
      });
      await sock.groupParticipantsUpdate(m.cht, [m.sender], "remove");
      delete spamTracker[key];
    } catch (e) {
      console.error("antispam error:", e);
    }
    return true;
  }
}

module.exports = { events };
