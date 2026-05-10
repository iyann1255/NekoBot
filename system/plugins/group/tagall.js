module.exports = {
  command: "tagall",
  alias: ["alltag", "tagmember", "tageveryone"],
  category: ["group"],
  settings: {
    group: true,
    admin: true,
  },
  description: "📢 Tag semua member grup",
  async run(m, { sock, text }) {
    const grup = m.metadata;
    const members = grup.participants;
    const mentions = members.map((p) => p.id);
    const pesan = text || "📢 Perhatian semua member!";

    let teks = `*– 乂 Tag All Member*\n\n`;
    teks += `*${pesan}*\n\n`;
    for (const member of members) {
      teks += `@${member.id.split("@")[0]}\n`;
    }

    await sock.sendMessage(m.cht, {
      text: teks,
      mentions: mentions,
    });
  },
};
