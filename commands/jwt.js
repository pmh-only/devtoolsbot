const { decode, verify } = require('jsonwebtoken')

module.exports = (_, interaction) => {
  if (interaction.data.options[0].name === 'query') {
    const data = decode(interaction.data.options[0].options[0].value, { complete: true })
  
    if (!data) {
      return {
        embeds: [
          {
            color: 0xff0000,
            title: 'JWT 분석에 실패하였습니다',
            description: '입력 받은 JWT가 유효하지 않습니다'
          }
        ]
      }
    }
  
    return {
      embeds: [
        {
          title: 'JWT 분석 결과:',
          type: 'rich',
          description: `\`\`\`json\n${JSON.stringify(data, null, 2)}\`\`\``
        }
      ]
    }
  }

  if (interaction.data.options[0].name === 'verify') {
    try {
      verify(interaction.data.options[0].options[0].value, interaction.data.options[0].options[1].value)
      return {
        embeds: [
          {
            color: 0x00ff00,
            title: 'JWT 검증 성공',
            description: '올바른 시크릿입니다'
          }
        ]
      }
    } catch (e) {
      return {
        embeds: [
          {
            color: 0xff0000,
            title: 'JWT 검증에 실패하였습니다',
            description: '올바른 JWT 혹은 시크릿이 아닙니다'
          }
        ]
      }
    }
  }
}