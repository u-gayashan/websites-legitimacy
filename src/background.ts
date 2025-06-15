import { send } from "process"

// src/background.ts
let count = 0

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {

    if (message.type === "GET_COUNT") {
        sendResponse({ count })
    }

    if (message.type === "INCREMENT_COUNT") {
        count += 1
        sendResponse({ count })

        chrome.tabs.query({}, (tabs) => {
            for (const tab of tabs) {
                if (tab.id) {
                    chrome.tabs.sendMessage(tab.id, {
                        type: "COUNT_UPDATED",
                        count
                    }, () => {
                        if (chrome.runtime.lastError) {
                            // Silently ignore tabs without content scripts
                            console.warn(
                                `Tab ${tab.id} does not have content script:`,
                                chrome.runtime.lastError.message
                            )
                        }
                    })
                }
            }
        })


    }

    return true
})


// Define userInfo before using it
const userInfo = {}; // Replace with actual user information if available
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "BROADCAST_USER_INFO") {
        chrome.tabs.query({}, (tabs) => {
            for (const tab of tabs) {
                if (tab.id) {
                    chrome.tabs.sendMessage(tab.id, {
                        type: "USER_INFO_UPDATED",
                        payload: message.payload
                    }).catch((err) => {
                        if (
                            err.message.includes("Extension context invalidated") ||
                            err.message.includes("Receiving end does not exist")
                        ) {
                            console.warn(`Tab ${tab.id} has no active content script.`);
                        } else {
                            console.error(`Error sending message to tab ${tab.id}:`, err);
                        }
                    });
                }
            }
        });
        sendResponse({ success: true });
        return true;
    }
});


chrome.action.onClicked.addListener(async (tab) => {
    console.log(tab)
    if (tab.id) {
        try {
            await chrome.tabs.sendMessage(tab.id, {
                type: "TOGGLE_SIDEBAR"
            })
        } catch (error) {
            console.error("Error sending message to content script:", error);
        }
    }
})