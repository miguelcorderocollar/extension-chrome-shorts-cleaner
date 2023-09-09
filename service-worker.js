chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.action === "openNewTab" && message.url) {
        // Check if a tab with the same URL is already open
        chrome.tabs.query({
            url: message.url
        }, function (existingTabs) {
            if (existingTabs && existingTabs.length > 0) {
                // If a tab with the same URL is already open, focus on it
                chrome.tabs.update(existingTabs[0].id, {
                    active: false
                });
            } else {
                // If no tab with the same URL is open, create a new one
                chrome.tabs.create({
                    url: message.url,
                    active: false
                });
            }
        });
    }
});