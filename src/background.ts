const userInfo = {};
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

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
    if (message.type === 'SIGN_OUT') {
        (async () => {
            try {
                const token = await new Promise<string | undefined>((resolve) => {
                    chrome.identity.getAuthToken({ interactive: false }, (token) => {
                        if (chrome.runtime.lastError) {
                            console.warn("Couldn't get token:", chrome.runtime.lastError.message);
                            resolve(undefined);
                        } else {
                            resolve(token);
                        }
                    });
                });

                if (token) {
                    await fetch(`https://accounts.google.com/o/oauth2/revoke?token=${token}`);
                    chrome.identity.removeCachedAuthToken({ token });
                    console.log('Token revoked and removed.');
                }

                await chrome.storage.local.remove('google_authenticated_user_info');
                [".google.com", ".accounts.google.com"].forEach(domain => {
                    chrome.cookies.getAll({ domain }, (cookies) => {
                        for (const cookie of cookies) {
                            chrome.cookies.remove({
                                url: `https${cookie.secure ? "s" : ""}://${cookie.domain}${cookie.path}`,
                                name: cookie.name
                            });
                        }
                    });
                });

                console.log('Removed user info from storage.');
                sendResponse({ success: true });
            } catch (err) {
                console.error('Sign out failed:', err);
                sendResponse({ success: false });
            }
        })();
        return true;
    }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "BROADCAST_CLOSE_SIDEBAR") {
        chrome.tabs.query({}, (tabs) => {
            for (const tab of tabs) {
                if (tab.id) {
                    chrome.tabs.sendMessage(tab.id, { type: "CLOSE_SIDEBAR" });
                }
            }
        });
        sendResponse({ success: true });
        return true;
    }
});
