chrome.browserAction.onClicked.addListener(() =>
    chrome.tabs.create({}, tab => {
        tab.active = true;
    }),
);
