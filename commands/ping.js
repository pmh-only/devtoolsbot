const NetworkScanner = require('network-scanner-js')
const netScan = new NetworkScanner()

module.exports = async (_, interaction) => {
  const dest = interaction.data.options[0].value
  const res = await netScan.poll(dest, { timeout: 2 })

  return {
    embeds: [{
      title: `\`${dest}\`로 보낸 핑의 결과입니다`,
      description: `**IP Address**: \`${res.ip_address}\`\n**Latency**: \`${res.res_avg}ms\`\n**Packet Loss**: \`${res.packet_loss}%\`\n\n\`\`\`${res.log}\`\`\``,
      color: res.status === 'online' ? 0x00ff00 : 0xff0000
    }]
  }
}

module.exports._ = 'ping'
module.exports.meta = {
  data: {
    name: 'ping',
    description: 'DNS쿼리 후 그 ip로 ping을 보냅니다',
    options: [
      {
        type: 3,
        name: 'dest',
        description: 'ping을 보낼 도메인 혹은 IP',
        required: true
      }
    ]
  }
}
