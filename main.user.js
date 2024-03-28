// ==UserScript==
// @name ProtonMail - Auto Select Next Message
// @namespace http://tampermonkey.net/
// @version 1.0
// @description Automatically selects the next email in ProtonMail after archiving, deleting or spamming the current one.
// @author tompos2
// @match *://mail.proton.me/*
// @grant none
// ==/UserScript==

console.log('Script is running');

(function() {
    'use strict';

    // Function to simulate click on the first email in inbox
function selectNextItem() {
    const parentContainer = document.querySelector('.delight-items-column-list-container');
    if (!parentContainer) return;

    const firstItem = parentContainer.querySelector('.item-container-wrapper.relative');
    if (!firstItem) return;

    const enterKeyEvent = new KeyboardEvent('keydown', {
        key: 'Enter',
        bubbles: true,
        cancelable: true
    });
    firstItem.dispatchEvent(enterKeyEvent);
}

    // Function to handle the click event
    function handleClick(event) {
        console.log('Archive, trash or spam button clicked');
        const target = event.target;

        // Check if the clicked element or its parents have a data-testid attribute matching our criteria
        let currentTarget = target;
        while (currentTarget && currentTarget !== document) {
            const testId = currentTarget.getAttribute('data-testid');
            if (testId === 'toolbar:movetotrash' || testId === 'toolbar:movetoarchive' || testId ==='toolbar:movetospam') {
                // Use requestAnimationFrame to wait for the next animation frame before selecting the next item
                console.log('Selecting next item');
                requestAnimationFrame(() => {
                    selectNextItem();
                });
                break;
            }
            currentTarget = currentTarget.parentNode;
        }
    }

    // Event listener for the archive, trash and spam buttons
    document.addEventListener('click', handleClick);
})();

