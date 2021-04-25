const NetworkScanner = require('network-scanner-js')
const netScan = new NetworkScanner()

module.exports = (client, interaction) => new Promise(async (resolve) => {
  resolve({
    content: '경유 라우터 정보를 수집 중입니다... (10초 이내의 응답만 표시됩니다)'
  })

  const dest = interaction.data.options[0].value
  const res = await netScan.poll(dest, { timeout: 2 })
  
  const timeout = setTimeout(send, 10000)

  const hops = []
  netScan.traceroute(dest, (hop) => {
    hops.push(hop)
    if (res.ip_address === hop.ip) {
      clearTimeout(timeout)
      send()
    }
  })

  function send () {
    client.channels.resolve(interaction.channel_id)
      .send(`\`${dest}\`의 대한 경유 라우터 정보\n\`\`\`${hops.reduce((prev, curr) => prev + `#${curr.hop}: ${curr.ip} (${curr.rtt1})\n`, '')}\`\`\``)
  }
})

module.exports._ = 'traceroute'
module.exports.meta = {
  data: {
    name: 'traceroute',
    description: 'DNS쿼리 후 그 ip에 도달하기까지의 모든 라우터의 정보를 출력합니다',
    options: [
      {
        type: 3,
        name: 'dest',
        description: '경유 라우터 정보 요청을 보낼 도메인 혹은 IP',
        required: true
      }
    ]
  }
}
