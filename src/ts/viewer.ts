const appendStyle = (style: string) => {
    const styleElement = document.createElement('style');
    styleElement.textContent = style;
    document.head.append(styleElement);
};

const appendScript = (script: string) => {
    const scriptElement = document.createElement('script');
    scriptElement.innerHTML = script;
    document.body.appendChild(scriptElement);
};

chrome.storage.sync.get(['html', 'js', 'css'], items => {
    console.log(items);
    const container = document.getElementById('container');
    container.insertAdjacentHTML('afterbegin', items.html);
    appendStyle(items.css);
    appendScript(items.js);
    // const tabQueryOption: chrome.tabs.QueryInfo = {
    //     currentWindow: true,
    //     active: true,
    //     lastFocusedWindow: true,
    // };
    // chrome.tabs.query(tabQueryOption, tabs => {
    //     console.log('tabs: ', tabs);
    //     console.log(tabs[0].id);
    //     chrome.webNavigation.getAllFrames({ tabId: tabs[0].id }, details => {
    //         console.log('details: ', details);
    //         const scripts = items.js;
    //         chrome.tabs.executeScript(tabs[0].id, {
    //             allFrames: true,
    //             frameId: details[0].frameId,
    //             code: scripts,
    //         });
    //     });
    // });
});
