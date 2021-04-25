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

module.exports._ = 'jwt'
module.exports.meta =   {
  data: {
    name: 'jwt',
    description: '제이슨-웹-토큰(JWT)을 분석하고 검증합니다',
    options: [
      {
        type: 1,
        name: 'query',
        description: '입력받은 JWT의 헤더, 페이로드, 서명을 분석합니다',
        options: [
          {
            type: 3,
            name: 'token',
            description: 'JWT 문자열',
            required: true
          }
        ]
      },
      {
        type: 1,
        name: 'verify',
        description: '입력받은 JWT와 시크릿을 비교해 올바른 서명인지 검증합니다',
        options: [
          {
            type: 3,
            name: 'token',
            description: 'JWT 문자열',
            required: true
          },
          {
            type: 3,
            name: 'secret',
            description: '시크릿',
            required: true
          }
        ]
      }
    ]
  }
}
