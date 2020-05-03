const { Client, MessageEmbed } = require('discord.js');
const client = new Client();



client.on('ready', () => {
  console.log(`Logged in as ${client.user.username}`);
});

client.on('message', msg => {
  if (msg.content === '!activity') {
    let manager = msg.channel.messages;

    manager.fetch({
      limit: 100,
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
        for (let i = 0; i < bigDiamonds; i++) visualRepresentation += ':large_blue_diamond:';
        if (bigDiamonds == 0 || percentage - (bigDiamonds*10) >= 5) visualRepresentation += ':small_blue_diamond:';
        return accumulator + `\n**${author}**: ${countObject[author]} messages (${percentage}%)\n${visualRepresentation}\n`;
      }, '');

      let embed = new MessageEmbed()
        .setTitle('Message Activity Report (Last 100 Messages)\n')
        .setDescription(replyString);
      
      msg.channel.send(embed);
    }).catch(err => {
      console.error(err);
      msg.channel.send('Unable to retrieve messages')
    });

  }
});

client.login(process.env.ACTIVITY_TOKEN);