const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.username}`);
});

client.on('message', msg => {
  if (msg.content === '!activity') {
    var manager = msg.channel.messages;

    manager.fetch({
      limit: 50,
      before: msg.id
    }).then(messages => {
      var countObject = messages.reduce( (obj, message) => {
        var author = message.author.username;
        obj[author] = obj[author] ? obj[author]+1 : 1;
        return obj;
      }, {});

      var authorKeys = Object.keys(countObject);
      var replyString = authorKeys.reduce( (accumulator, author) => {
        return accumulator + `\n${author}: ${(countObject[author]/messages.size*100).toFixed(2)}% of last ${messages.size} messages`;
      }, '');
      
      msg.reply(replyString)
    }).catch(_ => msg.reply('Unable to retrieve messages'));

  }
});

client.login(process.env.ACTIVITY_TOKEN);