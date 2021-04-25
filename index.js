const path = require('path')
const { readdirSync } = require('fs')
const { Client } = require('discord.js')
const client = new Client()

client.on('ready', () => {
  const cmdFiles = readdirSync(path.join(__dirname, 'commands')).filter((file) => file.endsWith('.js'))
  const commands = cmdFiles.map((cmd) => require(`./commands/${cmd.replace('.js', '')}`))

  for (const cmd of commands) {
    client.api
      .applications(client.user.id)
      .guilds('541782241131495434')
      .commands.post(cmd.meta)
  }

  client.ws.on('INTERACTION_CREATE', async (interaction) => {
    const cmd = commands.find((cmd) => cmd._ === interaction.data.name)
    if (!cmd) return

    client.api.interactions(interaction.id, interaction.token).callback.post({ data: {
      type: 4,
      data: await cmd(client, interaction)
    }})
  })
})

client.login(process.env.TOKEN)