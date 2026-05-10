async function events(m, { sock, Func }) {
  if (!m.isGroup) return;

  const group = db.list().group[m.cht];
  if (!group?.bye) return;

  const action = m.raw?.messageStubType;
  // 28 = GROUP_PARTICIPANT_REMOVE, 29 = GROUP_PARTICIPANT_LEAVE
  if (action !== 28 && action !== 29) return;

  const participants = m.raw?.messageStubParameters || [];
  const metadata = m.metadata;

  for (const jid of participants) {
    const nomor = jid.split("@")[0];

    let pesan = group.byeMsg ||
      `👋 *Sampai Jumpa!*\n\n> @${nomor} telah meninggalkan *${metadata?.subject}*.\n> Semoga sukses selalu! 🙏`;

    pesan = pesan
      .replace(/{nama}/g, "@" + nomor)
      .replace(/{grup}/g, metadata?.subject || "");

    try {
      await sock.sendMessage(m.cht, {
        text: pesan,
        mentions: [jid],
      });
    } catch (e) {
      console.error("bye error:", e);
    }
  }
  return true;
}

module.exports = { events };
