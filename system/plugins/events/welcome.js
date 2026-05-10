async function events(m, { sock, Func }) {
  if (!m.isGroup) return;

  const group = db.list().group[m.cht];
  if (!group?.welcome) return;

  // Deteksi member baru join
  const msg = m.raw?.message;
  if (!msg) return;

  const action = m.raw?.messageStubType;
  // 27 = GROUP_PARTICIPANT_ADD, 31 = GROUP_PARTICIPANT_INVITE
  if (action !== 27 && action !== 31) return;

  const participants = m.raw?.messageStubParameters || [];
  const metadata = m.metadata;

  for (const jid of participants) {
    const nomor = jid.split("@")[0];
    const totalMember = metadata?.participants?.length || 0;

    let pesan = group.welcomeMsg ||
      `👋 *Selamat Datang!*\n\n> Halo @${nomor}, selamat bergabung di *${metadata?.subject}* 🎉\n> Sekarang ada *${totalMember}* member di sini.\n\n📌 _Ketik .rules untuk melihat peraturan grup._`;

    pesan = pesan
      .replace(/{nama}/g, "@" + nomor)
      .replace(/{grup}/g, metadata?.subject || "")
      .replace(/{total}/g, totalMember);

    try {
      await sock.sendMessage(m.cht, {
        text: pesan,
        mentions: [jid],
      });
    } catch (e) {
      console.error("welcome error:", e);
    }
  }
  return true;
}

module.exports = { events };
