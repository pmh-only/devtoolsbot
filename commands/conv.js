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