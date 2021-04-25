const SYSTEM_NAME = { bin: 2, oct: 8, dec: 10, hex: 16 }

module.exports = (_, interaction) => {
  const from = interaction.data.options[0].value
  const to = interaction.data.options[1].value

  const raw = interaction.data.options[2].value
  const value = parseInt(raw, SYSTEM_NAME[from])
  
  return {
    embeds: [
      {
        title: `\`${raw}\`의 \`${from}->${to}\` 변환 결과`,
        type: 'rich',
        description: `\`\`\`${value.toString(SYSTEM_NAME[to])}\`\`\``
      }
    ]
  }
}

module.exports._ = 'conv'
module.exports.meta = {
  data: {
    type: 1,
    name: 'conv',
    description: '입력받은 수의 진법을 변환합니다',
    options: [
      {
        type: 3,
        name: 'from',
        description: '~에서',
        required: true,
        choices: [
          { name: '2진수', value: 'bin' },
          { name: '8진수', value: 'oct' },
          { name: '10진수', value: 'dec' },
          { name: '16진수', value: 'hex' }
        ]
      },
      {
        type: 3,
        name: 'to',
        description: '~로 변환',
        required: true,
        choices: [
          { name: '2진수', value: 'bin' },
          { name: '8진수', value: 'oct' },
          { name: '10진수', value: 'dec' },
          { name: '16진수(소문자)', value: 'hex' },
          { name: '16진수(대문자)', value: 'hexC' }
        ]
      },
      {
        type: 3,
        name: 'value',
        description: '값을 입력하세요',
        required: true
      }
    ]
  }
}
