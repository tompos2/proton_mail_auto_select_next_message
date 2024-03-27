# ProtonMail - Auto Select to Next Message

This user script automatically selects the next message in the list after archiving, deleting or spamming the current one. I can't really understand why this hasn't already been built as this 'feature' has been on Gmail for years. It should save quite a bit of time and help your email workflow!

ProtonMail - if you are reading this - you should implement this asap!

## Features

- Automatically selects the next message in the list after archiving, deleting or spamming the current one
- Works seamlessly with the ProtonMail web interface
- Easy to install and use with the Tampermonkey browser extension

## What is a userscript?

A userscript is a mini program that enhances or modifies the functionality of a website. It runs in your web browser by injecting javascript into the current webpage and can customize the appearance, add new features, or automate tasks. Userscripts are installed and managed using a browser extension like Tampermonkey.

## Installation

To use this user script, you need to have the Tampermonkey browser extension installed. Follow these steps to install Tampermonkey and the user script:

1. Install Tampermonkey:
   - For Chrome: [Tampermonkey for Chrome](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
   - For Firefox: [Tampermonkey for Firefox](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/)

2. Install the user script:
   - Click on this link: [ProtonMail - Auto Move to Next Message](https://github.com/yourusername/protonmail-auto-move-to-next-message/raw/main/protonmail-auto-move-to-next-message.user.js)
   - Tampermonkey will detect the user script and open a new tab with the script's details.
   - Click on the "Install" button to install the script.

3. Configure ProtonMail:
   - Log in to your ProtonMail account.
   - The user script will automatically start working on the ProtonMail inbox page.

## How It Works

The script uses Javascript to listen for click events on the "Move to Trash", "Archive" and "Spam" buttons. When one of these buttons is clicked, the script performs the following steps:

1. It finds the parent container that holds the list of messages.
2. Within the parent container, it identifies the first message item.
3. It simulates pressing the "Enter" key on the first message item, effectively selecting the next message in the list.

This process is triggered automatically after processing a message, allowing you to seamlessly move to the next message without manual intervention.

## Compatibility

This user script has been tested with the following browsers:

- Google Chrome v123.0.6
- Mozilla Firefox 123.0.1

## Contributing

If you encounter any issues or have suggestions for improvements, feel free to open an issue or submit a pull request on the [GitHub repository](https://github.com/yourusername/protonmail-auto-move-to-next-message).

## License

This user script is released under the [MIT License](https://opensource.org/licenses/MIT).
