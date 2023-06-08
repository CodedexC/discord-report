// reportPackage.js

let reportChannel = ""; 
let reporter = null;
let reported = null;
let reason = null;
let messageContent = null;
let messageEmbed = null;
let messages = {
  selfReportError: "`❌` | Self Report isn't allowed",
  botReportError: "`❌` | Bot Report isn't allowed",
  reportSentSuccess: "`✅` | Report sendet.",
  reportChannelNotFound: "`❌` | Couldn't found a Report Channel"
};

module.exports = {
  setReportChannel: function(channel) {
    reportChannel = channel;
  },
  setReporter: function(user) {
    reporter = user;
  },
  setReported: function(user) {
    reported = user;
  },
  setReason: function(reasonText) {
    reason = reasonText;
  },
  setMessageContent: function(content) {
    messageContent = content;
  },
  setMessageEmbed: function(embed) {
    messageEmbed = embed;
  },
  setMessages: function(customMessages) {
    messages = Object.assign(messages, customMessages);
  },
  getReporter: function() {
    return reporter;
  },
  getReported: function() {
    return reported;
  },
  getReason: function() {
    return reason;
  },
  execute: async function(interaction, client) {
    const { SlashCommandBuilder, Colors, EmbedBuilder } = require("discord.js");

    const reportedUser = interaction.options.getUser("user");
    const grund = interaction.options.getString("grund");

    if (reportedUser.id == interaction.user.id) {
      return await interaction.reply({ content: messages.selfReportError, ephemeral: true });
    }
    if (reportedUser.bot == true) {
      return await interaction.reply({ content: messages.botReportError, ephemeral: true });
    }

    const modChannel = interaction.guild.channels.cache.find((channel) => channel.id === reportChannel);
    if (!modChannel) {
      return await interaction.reply({ content: messages.reportChannelNotFound, ephemeral: true });
    }

    reporter = interaction.user;
    reported = reportedUser;
    reason = grund;

    if (messageContent) {
      await modChannel.send({ content: messageContent });
    } else if (messageEmbed) {
      await modChannel.send({ embeds: [messageEmbed] });
    } else {
      // Fallback to default report message
      const reportEmbed = new EmbedBuilder()
        .setTitle(`\`📝\` | New Report by ${interaction.user.tag}`)
        .setColor(Colors.Red)
        .addFields([
          {
            name: "`👤` | **User**",
            value: reportedUser.toString(),
          },
          {
            name: "`🫅` | **By**",
            value: interaction.user.toString(),
          },
          {
            name: "`📝` | **Reason**",
            value: grund,
          },
        ]);

      await modChannel.send({ embeds: [reportEmbed] });
    }

    await interaction.reply({ content: messages.reportSentSuccess, ephemeral: true });
  }
};
