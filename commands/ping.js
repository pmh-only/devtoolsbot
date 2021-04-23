const ping = require('ping')

module.exports = async (_, interaction) => {
  const dest = interaction.data.options[0].value
  const res = await ping.promise.probe(dest, { timeout: 2 })
  return {
    embeds: [{
      title: `\`${dest}\`로 보낸 핑의 결과입니다`,
      description: `**IP Address**: \`${res.numeric_host}\`\n**Latency**: \`${res.avg}ms\`\n**Packet Loss**: \`${res.packetLoss}%\`\n\n\`\`\`${res.output}\`\`\``,
      color: res.alive ? 0x00ff00 : 0xff0000
    }]
  }
}