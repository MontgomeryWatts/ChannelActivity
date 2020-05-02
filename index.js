const Discord = require('discord.js');
const client = new Discord.Client();



client.on('ready', () => {
  console.log(`Logged in as ${client.user.username}`);
});

client.on('message', msg => {
  if (msg.content === '!activity') {
    let manager = msg.channel.messages;

    manager.fetch({
      limit: 50,
      before: msg.id
    }).then(messages => {
      let countObject = messages.reduce( (obj, message) => {
        let author = message.author.username;
        obj[author] = obj[author] ? obj[author]+1 : 1;
        return obj;
      }, {});

      let authorKeys = Object.keys(countObject);
      let replyString = authorKeys.reduce( (accumulator, author) => {
        let percentage = countObject[author]/messages.size*100;
        let visualRepresentation = '';
        let bigDiamonds = Math.floor(percentage / 10);
        console.log(bigDiamonds)
        console.log(percentage)
        for (let i = 0; i < bigDiamonds; i++) visualRepresentation += ':large_blue_diamond:';
        if (percentage - (bigDiamonds*10) >= 5) visualRepresentation += ':small_blue_diamond:';
        return accumulator + `\n**${author}**: ${countObject[author]} messages (${percentage.toFixed(2)}%)\n${visualRepresentation}\n`;
      }, 'Message Activity Report (Last 50 Messages):\n');
      
      msg.channel.send(replyString)
    }).catch(_ => msg.channel.send('Unable to retrieve messages'));

  }
});

client.login(process.env.ACTIVITY_TOKEN);