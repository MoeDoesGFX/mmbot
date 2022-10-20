const { MessageEmbed } = require('discord.js');
const Discord = require("discord.js");
const Json = require("edit-json-file");
const Roblox = require("noblox.js");
const Bot = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGES", "GUILD_MESSAGE_REACTIONS"], partials: ["MESSAGE", "CHANNEL", "REACTION", "USER"] })
const Request = require("request");

console.log("Awesome's bot")

let Checkfor = [

];

setInterval(() => {
        Checkfor.forEach((Value, Index) => {
                try {
                        const txid = Value.id;
                        Request("https://chain.so/api/v2/get_confidence/BTC/" + txid, (Error, Response, Data) => {
                                if (JSON.parse(Data).status == "fail") {
                                        const userid = Value.user;
                                        const channel = Value.channel;
                                        Bot.guilds.cache.get("846787546116653067").channels.cache.get(channel).send("<@" + userid + ">, we were unable to find this transaction and it has been removed from our waitlist.");
                                        Checkfor[Index] = null;
                                };
                                if (JSON.parse(Data).data.confirmations > 0) {
                                        const userid = Value.user;
                                        const channel = Value.channel;
                                        Bot.guilds.cache.get("846787546116653067").channels.cache.get(channel).send("<@" + userid + ">, your transaction (`" + txid + "`) has been confirmed!");
                                        Checkfor[Index] = null;
                                };
                        });
                } catch(E) {};
        });
}, 1000);

Bot.on("ready", () => {
        Bot.user.setActivity("discord.gg/middlemann", { type: "WATCHING" });
});

Bot.on("messageCreate", async Message => {
        if (Message.content.toLowerCase().split(" ")[0] == "-proof") {
           Message.reply("this bot was created by <@656777937839718410>");
        }
        if (Message.content.toLowerCase().split(" ")[0] == "-sendrequest") {
          Message.channel.send({content: "hi"})
          let linkedinfo = Json("./linked-info.json");
          let cookie;
          let username;
      
          let args = Message.content.toLowerCase().split(" ");
          username = args[0]
          cookie = linkedinfo.get("cookie");
      
          Roblox.setCookie(cookie)
          Roblox.getIdFromUsername(username).then(id => {
            Roblox.sendFriendRequest(id)
            Message.channel.send({content: "done!"})
        })}
       if (Message.content.toLowerCase().split(" ")[0] == "-information") {
        if (Message.content.split(" ")[1]) {
                Request("https://chain.so/api/v2/get_confidence/BTC/" + Message.content.split(" ")[1], (Error, Response, Data) => {
                        Message.channel.send(
                                new Discord.MessageEmbed()
                                .setTitle("Transaction Information")
                                .setColor("#f1c40f")
                                .setDescription("json\n" + Data + "")
                        );
                });
        } else {
                Message.reply("please specify a txid.");
        };
  };
  if (Message.content.toLowerCase().split(" ")[0] == "-check") {
        if (Message.content.split(" ")[1]) {
                Checkfor.push({
                        "id": Message.content.split(" ")[1],
                        "user": Message.author.id,
                        "channel": Message.channel.id
                });
                Message.reply("you will be pinged in this channel when this transaction hits 1 confirmation.");
        } else {
                Message.reply("please specify a txid to track.");
        };
  };
  if (
    Message.author.id == "814989978626686976" ||
    Message.author.id == "814989978626686976"
  ) {
    if (Message.content.toLowerCase().split(" ")[0] == "-mm") {
      Message.delete();
      var Info = Json("./linked-info.json");
      var Icon = Message.guild.iconURL([".png", false, 64]);
      if (Icon == null) {
        Icon =
          "https://media.discordapp.net/attachments/827571529410936873/831205222654410822/image0.png";
      }
      if (Info.get("id")) {
        let Username = await Roblox.getUsernameFromId(parseInt(Info.get("id")));
        let Avatar = await Roblox.getPlayerThumbnail(
          parseInt(Info.get("id")),
          "720x720",
          "png",
          false,
          "Body"
        );
        const embed = new Discord.MessageEmbed()
            .setTitle("Information:")
            .setDescription(
              "Send the limiteds you are dealing with to this account, **you can add an extra small if you can as a gift :wink:.\n\nThe account listed below is **my only active MM account* at the moment, any other accounts anyone provides you are scam attempts."
            )
            .setThumbnail(Avatar[0].imageUrl)
            .setFooter(
              "If you are on mobile, react with the 📜 emoji below to get the trade link."
            )
            .addField("**MM Account Username:**", Username)
            .addField(
              "**Profile Link:**",
              "https://www.roblox.com/users/" + Info.get("id") + "/profile"
            )
            .addField(
              "**Trade Link:**",
              "https://www.roblox.com/users/" + Info.get("id") + "/trade"
            )
            .setColor("#f1c40f")
        let sentMessage = await Message.channel.send({embeds: [embed]});
        const em2 = new Discord.MessageEmbed()
        .setDescription("**If you have sent the trade so please type in the chat that u have sent the trade to the MM Account.**")
        .setFooter("Thank you for choosing Awesome's MM Service.")
        .setColor("#f1c40f")
        await Message.channel.send({embeds: [em2]})
        sentMessage.react("📜").then(() => {
          sentMessage
            .awaitReactions((Reaction, User) => Reaction.emoji.name == "📜", {
              max: 1,
              time: 600000
            })
            .then(Collected => {
              try {
                if (Collected.first().emoji.name == "📜") {
                  Message.channel.send(
                    "https://www.roblox.com/users/" + Info.get("id") + "/trade"
                  );
                }
              } catch (E) {}
            });
        });
      } else {
        Message.channel.send({ embed: [
          new Discord.MessageEmbed()
            .setTitle("Information:")
            .setDescription(
              "No account is linked! To link an account, a user with Administration permissions must use the `-linkaccount` command."
            )
            .setColor("#f1c40f")
        ]});
      }
    }

    if (Message.content.toLowerCase().split(" ")[0] == "-say") {
      Message.delete();
      if (Message.content.split(" ")[1]) {
        const Data = Message.content.split("-say ")[1];
        Message.channel.send(Data);
      } else {
        Message.channel.send({embeds: [
          new Discord.MessageEmbed()
            .setTitle("Information:")
            .setDescription(
              "You must specify messaga to say! e.g `$say Hello World!`"
            )
            .setColor("#f1c40f")
            ]});
      }
    }

    if (Message.content.toLowerCase().split(" ")[0] == "-stock") {
      var Info = Json("./linked-info.json");
      var Icon = Message.guild.iconURL([".png", false, 64]);
      if (Icon == null) {
        Icon =
          "https://media.discordapp.net/attachments/827571529410936873/831205222654410822/image0.png";
      }
    }

    if (Message.content.toLowerCase().split(" ")[0] == "-end") {
      Message.delete();
      Message.channel.send({embeds: [
        new Discord.MessageEmbed()
          .setDescription(
            `Thank you for choosing Awesome's MM Service, We appreciate you for your support. 

**Please leave a vouch in <#849540748508790794> stating the deal amount in $ or the items involved in the deal.** like "Vouch <@!806390205816897536> MM'ed $100"

**And if you would like to donate, any type of donations are accepted 😀!**`
          )
          .setColor("#f1c40f")
          .setFooter("This ticket will be automatically deleted in 5 minutes.")
          ]});
      setTimeout(() => {
        Message.channel.delete();
      }, 300000);
    }

    if (Message.content.toLowerCase().split(" ")[0] == "-linkaccount") {
      var Info = Json("./linked-info.json");
      var Icon = Message.guild.iconURL([".png", false, 64]);
      if (Icon == null) {
        Icon =
          "https://media.discordapp.net/attachments/827571529410936873/831205222654410822/image0.png";
      }
if (Message.member.permissions.has('ADMINISTRATOR')) {
        if (Message.content.split(" ")[1]) {
          let Found = false;
          Roblox.getIdFromUsername(Message.content.split(" ")[1]).then(
            async ID => {
              Found = true;
              let PossibleUsername = await Roblox.getUsernameFromId(ID);
              let PossibleAvatar = await Roblox.getPlayerThumbnail(
                ID,
                "720x720",
                "png",
                false,
                "Body"
              );
              let PossibleMessage = new Discord.MessageEmbed()
                  .setTitle("Confirmation:")
                  .setDescription(
                    "Are you sure you'd like to link **" +
                      PossibleUsername +
                      "**?"
                  )
                  .setImage(PossibleAvatar[0].imageUrl)
                  .setColor("#f1c40f")

await Message.channel.send({embeds: [PossibleMessage]}).then(PossibleMessage => {
              PossibleMessage.react("✅").then(() => {
                PossibleMessage.react("❎").then(() => {
                let filter1 = (Reaction, User) => User.id == Message.author.id && (Reaction.emoji.name == "❎" || Reaction.emoji.name == "✅")
                 PossibleMessage.awaitReactions({filter1, time: 60_000, max: 1}).then(Collected => {
                    if (Collected.first().emoji.name == "✅") {
                      Info.set({
                        "id": ID.toString(),
                        "cookie": Info.get("cookie")
                      });
                      Info.save();
                     let linkedEmbed = new Discord.MessageEmbed()
                        .setTitle("Information:")
                        .setDescription("Your account has been linked! ✅")
                        .setColor("#f1c40f")
                    Message.channel.send({embeds: [linkedEmbed]})
                    } else {
                        let cancelEmbed = new Discord.MessageEmbed()
                        .setTitle("Information:")
                        .setDescription(
                          "Your account link has been cancelled! No changes occured! ❎"
                        )
                        .setColor("#f1c40f")
                        Message.channel.send({embeds: [cancelEmbed]})
                    }
                  });
                });
              });
              })
            }
          );
          setTimeout(() => {
            if (Found == false) {
                let embed1 = new Discord.MessageEmbed()
                    .setTitle("Information:")
                    .setDescription(
                    "Please make sure the username you specified is valid!"
                    )
                    .setColor("#f1c40f")
                Message.channel.send({embeds: [embed1]})
            }
          }, 500);
        } else {
          Message.channel.send({embeds: [
            new Discord.MessageEmbed()
              .setTitle("Information:")
              .setDescription(
                "You must specify a username to link with! e.g `-linkaccount ROBLOX`"
              )
              .setColor("#f1c40f")
              ]});
        }
      } else {
        Message.channel.send({embeds: [
          new Discord.MessageEmbed()
            .setTitle("Information:")
            .setDescription(
              "You're unable to run this command! You're missing the `ADMINISTRATOR` permissions!"
            )
            .setColor("#f1c40f")
            ]});
      }
    }
  }
});

Bot.on("messageCreate", async content => {
  if ( content.author.id == "814989978626686976" ||
    content.author.id == "814989978626686976" ||
    content.author.id == "814989978626686976") {
  if (content.content == "-inv") {
    content.delete();
    var Info = Json("./linked-info.json");
                let inventorystring = "";
                const lims = await Roblox.getCollectibles({userId: parseFloat(Info.get("id")), sortOrder: "Asc", limit: 100});
                lims.forEach((Value, Index) => {
                        inventorystring = inventorystring + Value.name + " [R$"+ Value.recentAveragePrice + "]\n";
                });
                content.channel.send({embeds: [
                        new Discord.MessageEmbed()
                        .setTitle("Inventory:")
                        .setColor("#f1c40f")
                        .setDescription(inventorystring)
      .addField(
        "Rolimons Link:",
        "https://www.rolimons.com/player/" + Info.get("id")
      )
      ]})
        };
  if (content.content.toLowerCase().split(" ")[0] == "-linkcookie") {
    var Info = Json("./linked-info.json");
      var Icon = content.guild.iconURL([".png", false, 64]);
      if (Icon == null) {
        Icon =
          "https://media.discordapp.net/attachments/827571529410936873/831205222654410822/image0.png";
      }
     if (content.member.permissions.has('ADMINISTRATOR'))
 {
        if (content.content.split(" ")[1]) {
          Info.set({
            "id": Info.get("id"),
            "cookie": content.content.split(" ")[1]
          });
          Info.save();
          content.reply("linked!");
        } else {
          content.channel.send({embeds: [
            new Discord.MessageEmbed()
              .setTitle("Information:")
              .setDescription(
                "You must specify a cookie to link with! e.g `-linkcookie _WARNING_DO_NOT_SHARE`"
              )
              .setColor("#f1c40f")
              ]});
        }
      } else {
        content.channel.send({embeds: [
          new Discord.MessageEmbed()
            .setTitle("Information:")
            .setDescription(
              "You're unable to run this command! You're missing the `ADMINISTRATOR` permissions!"
            )
            .setColor("#f1c40f")
            ]});
      }
  };
  if (content.content.toLowerCase().split(" ")[0] == "-trades") {
    content.delete();
    let linkedinfo = Json("./linked-info.json");
    if (linkedinfo.get("cookie")) {
    } else {
      return content.channel.send({embeds: [
        new Discord.MessageEmbed()
          .setTitle("Information:")
          .setDescription(
            "No cookie is linked! To link a cookie, a user with Administration permissions must use the `-linkcookie` command, please do this in an admin channel or in bot DMs."
          )
          .setColor("#f1c40f")
          ]});
    }
    Roblox.setCookie(linkedinfo.get("cookie")).then(async function() {
      let trades = await Roblox.getTrades("Inbound");
      if (trades[0] == null) {
        content.channel.send({embeds: [
          new Discord.MessageEmbed()
            .setTitle("No current inbound trades!")
            .setColor("#f1c40f")
        ]});
      }
      let dealwith = trades[0].user.id;
      let dealwithname = trades[0].user.name;
      let tradeid = trades[0].id;
      let trade = await Roblox.getTradeInfo(tradeid);
      let whatyousend = trade.offers[1].userAssets;
      let whattheysend = trade.offers[0].userAssets;
      let whatyousendstring = "";
      let whattheysendstring = "";
      let thumbnail = await Roblox.getPlayerThumbnail(
                      dealwith,
                      "720x720",
                      "png",
                      false,
                      "Body"
                    );
      thumbnail = thumbnail[0].imageUrl
      whatyousend.forEach(Value => {
        whatyousendstring = whatyousendstring + Value.name + " [R$" + Value.recentAveragePrice + "]\n";
      });
      whattheysend.forEach(Value => {
        whattheysendstring = whattheysendstring + Value.name + " [R$" + Value.recentAveragePrice + "]\n";
      });
      function percentage(num, per) {
        return Math.floor((num / 100) * per);
      }

      let robuxtheygive = trade.offers[0].robux;
      robuxtheygive = robuxtheygive - percentage(robuxtheygive, 30);
      let robuxyougive = trade.offers[1].robux;
      robuxyougive = robuxyougive - percentage(robuxtheygive, 30);
      const msg = await content.channel.send({embeds: [
        new Discord.MessageEmbed()
          .setTitle("Trade with " + dealwithname)
          .setColor("#f1c40f")
          .setThumbnail(thumbnail)
          .setDescription(
            "Trade ID: `" +
              tradeid +
              "`\n\n*What You Give:*\n" +
	      whatyousendstring +
              "Robux (After tax): " +
              robuxyougive +
              "\n\n*What They Give:*\n" +
              whattheysendstring +
              "Robux (After tax): " +
              robuxtheygive
          )
          ]});
      msg.react("✅").then(() => {
        msg.react("❎").then(() => {
          msg
            .awaitReactions(
              (Reaction, User) =>
                User.id == content.author.id &&
                (Reaction.emoji.name == "✅" || Reaction.emoji.name == "❎"),
              {
                max: 1,
                time: 600000
              }
            )
            .then(Collected => {
              try {
                if (Collected.first().emoji.name == "✅") {
                  Roblox.acceptTrade(tradeid).then(() => {
                    msg.channel.send({embeds: [
                      new Discord.MessageEmbed()
                        .setTitle("Trade Completed! ✅")
                        .setColor("#f1c40f")
                    ]});
                  });
                } else {
                  Roblox.declineTrade(tradeid).then(() => {
                    msg.channel.send({embeds: [
                      new Discord.MessageEmbed()
                        .setTitle("Trade Declined! ❎")
                        .setColor("#f1c40f")
                    ]});
                  });
                }
              } catch (E) {}
            });
        });
      });
    });
  }
  }
});


Bot.on("channelCreate", async (channel) => {
        if (channel.parentID == "849553325892698122") {
                setTimeout(() => {
                        channel.send({embeds: [
                                new Discord.MessageEmbed()
                                .setDescription("If your deal involves limiteds, *ONLY send the limiteds to the roblox account linked by <@831203862018523228>*, and make sure it is the actual bot, not an impersonator!")
                                .setFooter("Impersonators mid-tickets are common! Always make sure to double check!")
                                .setColor("#f1c40f")
                        ]});
                }, 1000);
        };
});


Bot.login("ur bot token here");
