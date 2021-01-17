console.log('viewer.js');
chrome.storage.local.get(['index'], items => {
    console.log(items);
});
