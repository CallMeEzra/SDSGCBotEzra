// Load up the discord.js library
const Discord = require("discord.js");

/*
 DISCORD.JS VERSION 11 CODE
*/

// This is your client. Some people call it `bot`, some people call it `self`, 
// some might call it `cootchie`. Either way, when you see `client.something`, or `bot.something`,
// this is what we're refering to. Your client.
const client = new Discord.Client();

// Here we load the config.json file that contains our token and our prefix values. 
const config = require("./config.json");
// config.token contains the bot's token
// config.prefix contains the message prefix.

client.on("ready", () => {
  // This event will run if the bot starts, and logs in, successfully.
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`); 
  // Example of changing the bot's playing game to something useful. `client.user` is what the
  // docs refer to as the "ClientUser".
  //client.user.setActivity("Max beim Duschen zu", { type: "WATCHING"});
  
  client.user.setPresence({
        game: { 
            name: 'Schaut Max beim Duschen zsssu',
            type: 'Watching'
        },
        status: 'idle'
    })
});

client.on("guildCreate", guild => {
  // This event triggers when the bot joins a guild.
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  client.user.setActivity(`Serving ${client.guilds.size} servers`);
});

client.on("guildDelete", guild => {
  // this event triggers when the bot is removed from a guild.
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
  client.user.setActivity(`Serving ${client.guilds.size} servers`);
});

client.on("message", async message => {
  // This event will run on every single message received, from any channel or DM.
  
  // It's good practice to ignore other bots. This also makes your bot ignore itself
  // and not get into a spam loop (we call that "botception").
  if(message.author.bot) return;
  
  // Also good practice to ignore any message that does not start with our prefix, 
  // which is set in the configuration file.
  if(!message.content.startsWith(config.prefix)) return;
  
  // Here we separate our "command" name, and our "arguments" for the command. 
  // e.g. if we have the message "+say Is this the real life?" , we'll get the following:
  // command = say
  // args = ["Is", "this", "the", "real", "life?"]
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  
  // Let's go with a few common example commands! Feel free to delete or change those.
  
   if(command === "teams") {
   message.channel.send({embed: {
    color: 3447003,
    author: {
      name: client.user.username,
      icon_url: client.user.avatarURL
    },
    title: "This is an embed",
    url: "http://google.com",
    description: "This is a test embed to showcase what they look like and what they can do.",
    fields: [{
        name: "Fields",
        value: "They can have different fields with small headlines."
      },
      {
        name: "Masked links",
        value: "You can put [masked links](http://google.com) inside of rich embeds."
      },
      {
        name: "Markdown",
        value: "You can put all the *usual* **__Markdown__** inside of them."
      }
    ],
    timestamp: new Date(),
    footer: {
      icon_url: client.user.avatarURL,
      text: "© Example"
    }
  }
});
  }
  
  if(command === "reddemon") {
   const embed = new Discord.RichEmbed()
  .setTitle("Gute Teams für Red Demon Deatchmatch")
  .setAuthor(" SDSGC Bot by Ezra", "https://pbs.twimg.com/profile_images/708120061249105920/531-93_H_400x400.jpg")
  /*
   * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
   */
   
  .setColor(0x00AE86)
  .setDescription("Teams Beispiele für den Red Demon")
  .setFooter("SDSGC Bot by Ezra V 0.1", "https://pbs.twimg.com/profile_images/708120061249105920/531-93_H_400x400.jpg")
  .setImage("https://cdn.7ds.guide/wp-content/uploads/2020/03/red-demon.jpg")
  .setThumbnail("https://cdn.7ds.guide/wp-content/uploads/2020/03/red-demon.jpg")
  /*
   * Takes a Date object, defaults to current date.
   */
  .setTimestamp()
  //.setURL("https://discord.js.org/#/docs/main/indev/class/RichEmbed")
  .addField("This is a field title, it can hold 256 characters",
    "This is a field value, it can hold 1024 characters.")
  /*
   * Inline fields may not display as inline if the thumbnail and/or image is too big.
   */
  .addField("Inline Field", "They can also be inline.", true)
  /*
   * Blank field, useful to create some space.
   */
  .addBlankField(true)
  .addField("Inline Field 3", "You can have a maximum of 25 fields.", true);
 
  message.channel.send({embed});
  }
  
  if(command === "bluedemonmeliodas") {
   const embed = new Discord.RichEmbed()
  .setTitle("Blue Demon Meliodas")
  .setURL("https://www.sdsgc.gg/characters/87/meliodas")
  .setAuthor(" SDSGC Bot by Ezra", "https://cdn.discordapp.com/avatars/196594030866464778/01944e43d1bf28156799332e246bad84.png?size=256")
  /*
   * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
   */
   
  .setColor(0x00AE86)
  .setDescription("Korrosion, AOE, Durchdringen, Schwachpunkt")
  .setFooter("SDSGC Bot by Ezra V 0.1", "https://cdn.discordapp.com/avatars/196594030866464778/01944e43d1bf28156799332e246bad84.png?size=256")
  //.setImage("https://cdn.7ds.guide/wp-content/uploads/2020/03/red-demon.jpg")
  .setThumbnail("https://rerollcdn.com/SDSGC/portraits/portrait_87.png")

   // Takes a Date object, defaults to current date.

  .setTimestamp()
  .addField("This is a field title, it can hold 256 characters",
    "This is a field value, it can hold 1024 characters.")
	
  .addField("Basis Werte", "Angriff \nVerteidigung \nLeben", true)
  .addBlankField(true)
  .addField("Werte", "550 \n320 \n6400", true);
 
  message.channel.send({embed});
  }
 
  if(command === "ping") {
    // Calculates ping between sending a message and editing it, giving a nice round-trip latency.
    // The second ping is an average latency between the bot and the websocket server (one-way, not round-trip)
    const m = await message.channel.send("Ping?");
    m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
  }
  
  if(command === "say") {
    // makes the bot say something and delete the message. As an example, it's open to anyone to use. 
    // To get the "message" itself we join the `args` back into a string with spaces: 
    const sayMessage = args.join(" ");
    // Then we delete the command message (sneaky, right?). The catch just ignores the error with a cute smiley thing.
    message.delete().catch(O_o=>{}); 
    // And we get the bot to say the thing: 
    message.channel.send(sayMessage);
  }

  if(command === "purge") {
    // This command removes all messages from all users in the channel, up to 100.
    
    // get the delete count, as an actual number.
    const deleteCount = parseInt(args[0], 10);
    
    // Ooooh nice, combined conditions. <3
    if(!deleteCount || deleteCount < 2 || deleteCount > 100)
      return message.reply("Please provide a number between 2 and 100 for the number of messages to delete");
    
    // So we get our messages, and delete them. Simple enough, right?
    const fetched = await message.channel.fetchMessages({limit: deleteCount});
    message.channel.bulkDelete(fetched)
      .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
  }
});

client.login(config.token);