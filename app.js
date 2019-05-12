const { App } = require('@slack/bolt')

const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET
});

app.message('hello', ({ message, say}) => {
    say(`Hey there <@${message.user}>!`)
});

app.event('team_join', async({ event, context }) => {
    
    try {
        const im = await app.client.im.open({
            token: context.botToken,
            user: event.user.id
        })

        const result = await app.client.chat.postMessage({
            token: context.botToken,
            channel: im.channel.id,
            text: `Slackへようこそ！ <@${event.user.id}>`
        })
    } catch (error) {
        console.error(error)
    }
});

(async () => {
    await app.start(process.env.PORT || 3000)
    console.log('Bolt app is running!')
})()