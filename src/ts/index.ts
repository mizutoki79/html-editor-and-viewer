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

const renderViewer = (content: string) => {
    const viewerIframe = document.getElementById('viewer');
    if (isHTMLIFrame(viewerIframe)) {
        const frameDoc = viewerIframe.contentWindow.document;
        frameDoc.open();
        frameDoc.write(content);
        frameDoc.close();
    }
};

const messageEventListener = (event: MessageEvent<Message>) => {
    const { message, content } = event.data;
    if (message === 'reload') {
        renderViewer(content);
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
