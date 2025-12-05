// ==UserScript==
// @name ProtonMail - Auto Select Next Message
// @namespace http://tampermonkey.net/
// @version 2.1
// @description Automatically selects the next email in ProtonMail after archiving, deleting, snoozing or spamming the current one.
// @author Tom Stayte
// @match *://mail.proton.me/*
// @grant none
// ==/UserScript==

/**
 * ProtonMail Auto Select Next Message
 *
 * This script automatically selects the next email in your inbox after you
 * archive, delete, snooze or mark as spam the current message. It maintains
 * your position in the list rather than jumping back to the top.
 *
 * Supports:
 * - Toolbar buttons (archive, trash, spam)
 * - Hover action buttons on email rows
 * - Keyboard shortcuts (A for archive, T for trash, S for spam)
 * - Expanded message header buttons
 * - Dropdown menu actions (more menu, snooze options)
 *
 * Technical notes:
 * - Uses event capturing (3rd param = true) to intercept clicks before
 *   ProtonMail's virtualised list removes elements from the DOM
 * - Tracks selected email index before action, then selects same index
 *   after the action completes (which will be the next email)
 */

console.log('ProtonMail Auto Select Next Message: Script loaded');

(function() {
    'use strict';

    // =========================================================================
    // CONFIGURATION
    // =========================================================================

    /**
     * data-testid values that trigger the auto-select behaviour.
     * These are the actual action buttons that remove/move emails.
     */
    const ACTION_TEST_IDS = [
        // Toolbar buttons (top of screen)
        'toolbar:movetotrash',
        'toolbar:movetoarchive',
        'toolbar:movetospam',

        // Expanded message header (when viewing an email)
        'message-header-expanded:move-to-trash',

        // "More" dropdown menu items
        'message-view-more-dropdown:archive',
        'message-view-more-dropdown:move-to-spam',

        // Snooze duration options (from snooze dropdown)
        // Note: 'snooze-duration-custom' is excluded as it opens a date picker
        // rather than immediately snoozing
        'snooze-duration-tomorrow',
        'snooze-duration-later',
        'snooze-duration-nextweek'
    ];

    /**
     * Button labels (from .sr-only elements) for hover action buttons.
     * These appear when you hover over an email row in the list.
     * Note: 'Snooze' is excluded as it only opens a dropdown, not an action.
     */
    const HOVER_BUTTON_TEXTS = [
        'Move to trash',
        'Move to archive'
    ];

    /**
     * Keyboard shortcuts that trigger actions.
     * These are ProtonMail's built-in shortcuts.
     */
    const ACTION_KEYS = ['a', 't', 's']; // archive, trash, spam

    /**
     * Delay (ms) before selecting the next email.
     * Allows ProtonMail to finish updating the DOM after the action.
     */
    const SELECTION_DELAY = 300;

    // =========================================================================
    // STATE
    // =========================================================================

    /** Stores the index of the selected email before an action is triggered */
    let lastSelectedIndex = 0;

    // =========================================================================
    // HELPER FUNCTIONS
    // =========================================================================

    /**
     * Finds the index of the currently selected email in the list.
     * ProtonMail marks the selected item with data-shortcut-target-selected="true"
     *
     * @returns {number} Index of selected email, or 0 if none found
     */
    function getSelectedIndex() {
        const items = document.querySelectorAll('[data-shortcut-target="item-container"]');
        for (let i = 0; i < items.length; i++) {
            if (items[i].getAttribute('data-shortcut-target-selected') === 'true') {
                return i;
            }
        }
        return 0;
    }

    /**
     * Clicks on the email at the specified index to select it.
     * If the index is beyond the list length (e.g., deleted the last email),
     * it selects the last available email instead.
     *
     * @param {number} index - The index of the email to select
     */
    function selectItemAtIndex(index) {
        const items = document.querySelectorAll('[data-shortcut-target="item-container"]');
        if (items.length === 0) return;

        // Clamp index to valid range
        const targetIndex = Math.min(index, items.length - 1);
        const item = items[targetIndex];

        if (item) {
            item.click();
        }
    }

    /**
     * Called when an action (archive/delete/spam/snooze) is triggered.
     * Saves the current position and schedules selection of the next email.
     */
    function triggerAction() {
        lastSelectedIndex = getSelectedIndex();
        setTimeout(() => selectItemAtIndex(lastSelectedIndex), SELECTION_DELAY);
    }

    /**
     * Checks if an element is an editable field (input, textarea, contenteditable).
     * Used to prevent keyboard shortcuts from triggering while typing.
     *
     * @param {Element} element - The element to check
     * @returns {boolean} True if the element is editable
     */
    function isEditableElement(element) {
        if (!element) return false;
        const tagName = element.tagName;
        if (tagName === 'INPUT' || tagName === 'TEXTAREA') return true;
        if (element.isContentEditable) return true;
        if (element.closest('[contenteditable="true"]')) return true;
        return false;
    }

    // =========================================================================
    // EVENT HANDLERS
    // =========================================================================

    /**
     * Handles click events on action buttons.
     * Checks both data-testid attributes and hover button labels.
     *
     * @param {MouseEvent} event - The click event
     */
    function handleClick(event) {
        const target = event.target;

        // Walk up the DOM tree checking for data-testid matches
        let currentTarget = target;
        while (currentTarget && currentTarget !== document) {
            const testId = currentTarget.getAttribute('data-testid');
            if (testId && ACTION_TEST_IDS.includes(testId)) {
                triggerAction();
                return;
            }
            currentTarget = currentTarget.parentNode;
        }

        // Check for hover action buttons (they don't have data-testid,
        // so we identify them by their container class and .sr-only text)
        const hoverContainer = target.closest('.item-hover-action-buttons');
        if (hoverContainer) {
            const button = target.closest('button');
            const srText = button?.querySelector('.sr-only')?.textContent;
            if (srText && HOVER_BUTTON_TEXTS.includes(srText)) {
                triggerAction();
                return;
            }
        }
    }

    /**
     * Handles keyboard shortcuts for actions.
     * Only triggers if not in an editable field.
     *
     * @param {KeyboardEvent} event - The keydown event
     */
    function handleKeydown(event) {
        if (isEditableElement(event.target)) return;
        if (ACTION_KEYS.includes(event.key.toLowerCase())) {
            triggerAction();
        }
    }

    // =========================================================================
    // INITIALISATION
    // =========================================================================

    // Use capture phase (3rd param = true) to intercept events before
    // ProtonMail's virtualised list can remove elements from the DOM.
    // This is crucial for the hover buttons to work correctly.
    document.addEventListener('click', handleClick, true);
    document.addEventListener('keydown', handleKeydown, true);

})();
