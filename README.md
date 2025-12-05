# ProtonMail - Auto Select Next Message

A userscript that automatically selects the next email in ProtonMail after you archive, delete, snooze or spam the current message. It maintains your position in the list rather than jumping back to the top.

I can't understand why this hasn't already been built — this 'feature' has been standard in Gmail and other major email services for years.

**ProtonMail — if you're reading this — please implement this properly!**

## Features

- **Automatic selection** — After archiving, deleting, snoozing or spamming an email, the next one is automatically selected
- **Position aware** — Stays at your current position in the list instead of jumping to the top
- **Works everywhere** — Supports toolbar buttons, hover buttons, keyboard shortcuts, and dropdown menus
- **Keyboard shortcuts** — Works with ProtonMail's built-in shortcuts (A for archive, T for trash, S for spam)

## Supported Actions

| Location | Archive | Trash | Spam | Snooze |
|----------|---------|-------|------|--------|
| Toolbar buttons | ✅ | ✅ | ✅ | ✅* |
| Hover buttons (email list) | ✅ | ✅ | — | — |
| Expanded message header | — | ✅ | — | — |
| "More" dropdown menu | ✅ | — | ✅ | — |
| Keyboard shortcuts | ✅ | ✅ | ✅ | — |

*Snooze works for quick options (Tomorrow, Later this week, Next week) but not for custom date/time selection.

## Installation

### 1. Install Tampermonkey

- **Chrome:** [Tampermonkey for Chrome](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
- **Firefox:** [Tampermonkey for Firefox](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/)
- **Edge:** [Tampermonkey for Edge](https://microsoftedge.microsoft.com/addons/detail/tampermonkey/iikmkjmpaadaobahmlepeloendndfphd)
- **Safari:** [Tampermonkey for Safari](https://apps.apple.com/app/tampermonkey/id1482490089)

### 2. Install the Script

Click here to install: **[ProtonMail - Auto Select Next Message](https://github.com/tompos2/proton_mail_auto_select_next_message/raw/main/main.user.js)**

Tampermonkey will open and show you the script. Click **Install** to add it.

### 3. Use ProtonMail

Open [ProtonMail](https://mail.proton.me) and the script will work automatically. No configuration needed.

## How It Works

1. The script listens for clicks on archive/trash/spam/snooze buttons and keyboard shortcuts
2. Before the action completes, it records which email position you're at in the list
3. After ProtonMail removes the email, the script clicks on the email now at that same position
4. This effectively selects the "next" email, letting you power through your inbox

### Technical Details

- Uses **event capturing** to intercept clicks before ProtonMail's virtualised list removes elements from the DOM
- Identifies buttons by their `data-testid` attributes and `.sr-only` accessibility labels
- Includes a 300ms delay to allow ProtonMail to finish updating the UI
- Excludes editable elements (inputs, textareas, contenteditable) from keyboard shortcut detection

## Privacy & Security

This script:

- ✅ Only interacts with the ProtonMail interface
- ✅ Cannot read your email content
- ✅ Does not send any data externally
- ✅ Contains no analytics or tracking
- ✅ Is fully open source — inspect the code yourself

The script simply listens for button clicks and keyboard shortcuts, then simulates a click on the next email in the list. That's it.

## Compatibility

Tested with:

- Google Chrome (latest)
- Mozilla Firefox (latest)
- ProtonMail web interface (mail.proton.me)

Works with both split view and full-view layouts.

## Troubleshooting

**Script not working?**

1. Check Tampermonkey is enabled (click the icon in your browser toolbar)
2. Ensure the script is enabled in Tampermonkey's dashboard
3. Refresh ProtonMail
4. Check the browser console (F12) for any errors

**Custom snooze not working?**

The custom date/time picker for snooze is not supported as it requires additional confirmation. Use the quick snooze options (Tomorrow, Later this week, Next week) instead.

## Contributing

Found a bug or have a suggestion?

- [Open an issue](https://github.com/tompos2/proton_mail_auto_select_next_message/issues) on GitHub
- Submit a pull request
- Email: 3gchyyth@duck.com

## Changelog

### v2.1 (December 2025)
- Added support for hover action buttons on email rows
- Added support for keyboard shortcuts (A, T, S)
- Added support for expanded message header buttons
- Added support for dropdown menu actions
- Added snooze support (quick options)
- Now maintains position in list instead of jumping to top
- Fixed issues with ProtonMail's virtualised list using event capturing

### v1.0 (Original)
- Basic toolbar button support

## License

[MIT License](LICENSE) — do whatever you want with it.
