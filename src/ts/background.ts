chrome.browserAction.onClicked.addListener(() => {
    const url = chrome.extension.getURL('index.html');
    chrome.tabs.create({ url: url }, tab => {
        tab.active = true;
    });
});
