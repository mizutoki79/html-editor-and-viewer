chrome.storage.sync.get(['html', 'js', 'css'], items => {
    console.log(items);
    const container = document.getElementById('container');
    container.insertAdjacentHTML('afterbegin', items.html);
});
