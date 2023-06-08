# Discord.js-report

**discord.js-report** is a Node.js package for Discord.js that allows users to easily create and send reports within their Discord bots. With ReportPackage, you can streamline the reporting process by providing a simple interface for users to report other users and specify a reason for the report.

## Features

- Simplifies the creation and sending of reports in Discord bots.
- Provides a customizable interface for reporting users and specifying reasons.
- Supports both text content and embed messages for the report notifications.
- Offers the flexibility for users to define their own custom messages.

## Installation

You can install ReportPackage via NPM by running the following command:

```bash
npm i discord.js-report
```
## Usage
To use ReportPackage in your Discord bot, you'll need to require the package and configure the necessary settings. Here's an example:

```js
const { setReportChannel, setReporter, setReported, setReason, execute } = require('discord.js-report');

// Configure the report channel
setReportChannel('your_report_channel_id');

// Set the reporter, reported user, and reason
setReporter(interaction.user);
setReported(interaction.options.getUser('user'));
setReason(interaction.options.getString('reason'));

// Execute the report command
await execute(interaction, client);
```
Make sure to replace **'your_report_channel_id'** with the ID of your desired report channel.

For more information on how to use ReportPackage and its available methods, please refer to the package documentation.

## Contributions
Contributions, bug reports, and feature requests are welcome! If you encounter any issues or have suggestions for improvement, please open an issue on the GitHub repository.