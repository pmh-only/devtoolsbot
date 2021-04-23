const path = require('path')
const { readdirSync } = require('fs')
const { Client } = require('discord.js')
const client = new Client()

const commandsConf = require('./commands/commands.json')

client.on('ready', () => {
  const cmdFiles = readdirSync(path.join(__dirname, 'commands')).filter((file) => file.endsWith('.js')).map((cmd) => ({ name: cmd.replace('.js', ''), fn: require(`./commands/${cmd.replace('.js', '')}`) }))
  commandsConf.forEach((data) => client.api.applications(client.user.id).guilds('541782241131495434').commands.post(data))
  client.ws.on('INTERACTION_CREATE', async (interaction) => {
    const cmd = cmdFiles.find((cmd) => cmd.name === interaction.data.name)
    if (!cmd) return

    client.api.interactions(interaction.id, interaction.token).callback.post({ data: {
      type: 4,
      data: await cmd.fn(client, interaction)
    }})
  })
})

client.login(process.env.TOKEN)