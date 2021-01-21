import { isHTMLIFrame, tabIds, TabId } from './common';

const changeTab = (selectedTabNode: HTMLElement, selectedTabId: TabId) => {
    const tabs = document.getElementById('editor-tabs').childNodes;
    tabs.forEach((tab: HTMLElement) => {
        tab.className = 'tab';
    });
    selectedTabNode.className = 'tab active';
    const editorFrame = document.getElementById('editor');
    if (isHTMLIFrame(editorFrame)) {
        const message: Message = {
            message: 'tab-change',
            content: selectedTabId,
        };
        editorFrame.contentWindow.postMessage(message, '*');
    }
};

const reloadViewer = () => {
    const viewerIframe = document.getElementById('viewer');
    if (isHTMLIFrame(viewerIframe)) {
        viewerIframe.contentWindow.location.reload();
    }
};

const messageEventListener = (event: MessageEvent<Message>) => {
    const { message } = event.data;
    if (message === 'reload') {
        reloadViewer();
    }
};

const addListenerToTab = (tabId: TabId) => {
    const tabElement = document.getElementById(tabId);
    const callback = () => {
        changeTab(tabElement, tabId);
    };
    tabElement.addEventListener('click', callback);
};

const main = () => {
    window.addEventListener('message', messageEventListener);
    tabIds.forEach((tabId: TabId) => {
        addListenerToTab(tabId);
    });
};

main();
