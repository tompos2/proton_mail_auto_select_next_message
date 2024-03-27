# ProtonMail - Auto Select to Next Message

This user script alters functionality of the ProtonMail web app to automatically select the next message in the list after you press archive, delete or spam for the current one. It works both with split view and full-view.

I can't really understand why this hasn't already been built as this 'feature' has been on Gmail and other major email services for many years. 

I hope this saves you some time and makes your email workflow smoother!

ProtonMail - if you are reading this - you should implement this asap!!!

## Features

- Automatically selects the next message in the list after archiving, deleting or spamming the current one
- Works with the ProtonMail web interface on Chrome and Firefox (Desktop)
- Easy to install and use with the Tampermonkey browser extension

## What is a userscript?

A userscript is a mini program that enhances or modifies the functionality of a website. It runs in your web browser by injecting javascript into the current webpage and can customize the appearance, add new features, or automate tasks. Userscripts are installed and managed using a browser extension like Tampermonkey.

## What is Tampermonkey

Tampermonkey is a popular and powerful browser extension that serves as a user script manager, enabling you to enhance and modify the functionality of websites and web applications by installing small pieces of JavaScript known as userscripts. These scripts can alter layouts, automate tasks, inject new features, or otherwise customize the browsing experience on virtually any website. Tampermonkey provides a user-friendly interface to manage and edit these scripts,

## Is this script safe to use?

I chose to use Proton Mail becuase I value privacy, as I'm sure you do if you're reading this. Rest assued this script interacts only with the ProtonMail interface. It cannot read your emails and cannot send any data or information to external servers - you can check the source code yourself to verify this. If you're non-technical, paste the code into ChatGPT and ask it verify what I say here is true. The script simply listens for when you click the archive, trash, or spam buttons and then simulates a keypress to select the next email in your inbox. 

## Installation

To use this user script, you need to have the Tampermonkey browser extension installed. Follow these steps to install Tampermonkey and the user script:

1. Install Tampermonkey:
   - For Chrome: [Tampermonkey for Chrome](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
   - For Firefox: [Tampermonkey for Firefox](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/)

2. Install the user script:
   - Click on this link: [ProtonMail: Auto Select Next Message](https://raw.githubusercontent.com/tompos2/proton_mail_auto_select_next_message/master/main.user.js)
   - Tampermonkey will detect the user script and open a new tab with the script's details.
   - Click on the "Install" button to install the script.

3. Open ProtonMail:
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

If you encounter any issues or have suggestions for improvements:

- Open an issue or submit a pull request on the [GitHub repository](https://github.com/yourusername/protonmail-auto-move-to-next-message).
- Email me at 3gchyyth@duck.com

## License

This user script is released under the [MIT License](https://opensource.org/licenses/MIT).
