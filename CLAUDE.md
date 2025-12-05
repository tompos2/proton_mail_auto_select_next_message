# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Tampermonkey userscript that enhances ProtonMail's web interface by automatically selecting the next message after archiving, deleting, or spamming the current one. The script is browser-based JavaScript that runs on `mail.proton.me`.

## Architecture

**Single-file userscript**: The entire functionality is contained in `main.user.js` with standard Tampermonkey metadata headers.

**Core mechanism**:
1. A global click event listener monitors all clicks on the document
2. When a click is detected, the handler traverses up the DOM tree to check for specific `data-testid` attributes (`toolbar:movetotrash`, `toolbar:movetoarchive`, `toolbar:movetospam`)
3. If a match is found, `requestAnimationFrame` is used to wait for the ProtonMail UI to update
4. The script then simulates an "Enter" keypress on the first item in the message list container (`.delight-items-column-list-container`)

**ProtonMail DOM structure dependencies**:
- `.delight-items-column-list-container`: Parent container for the message list
- `.item-container-wrapper.relative`: Individual message items
- `data-testid` attributes on toolbar buttons for identifying user actions

## Development

**No build process**: This is a plain JavaScript userscript with no transpilation or bundling. Edit `main.user.js` directly.

**Testing**:
1. Install Tampermonkey extension in Chrome or Firefox
2. Load the script via Tampermonkey dashboard
3. Navigate to ProtonMail (`mail.proton.me`) and test with archive/delete/spam buttons in the toolbar
4. Check browser console for debug logs ("Script is running", "Archive, trash or spam button clicked", "Selecting next item")

**Installation for users**: Users install directly from the GitHub raw URL via Tampermonkey's auto-detection.

## Known Limitations

- Only works with toolbar buttons (not in-email or list buttons)
- Does not support drag-and-drop folder operations
- Relies on ProtonMail's current DOM structure and CSS classes, which may change with UI updates

## Version Management

Update the version number in the `@version` metadata header when making changes. This affects how Tampermonkey handles script updates for users.
