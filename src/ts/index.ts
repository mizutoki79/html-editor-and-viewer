const isHTMLIFrame = (element: HTMLElement): element is HTMLIFrameElement => element instanceof HTMLIFrameElement;

const reloadViewer = (content: string) => {
    const viewerIframe = document.getElementById('viewer');
    if (isHTMLIFrame(viewerIframe)) {
        const frameDoc = viewerIframe.contentWindow.document;
        frameDoc.open();
        frameDoc.write(content);
        frameDoc.close();
    }
};

const messageEventListener = (event: MessageEvent<MessageFromIframeToParent>) => {
    const { message, content } = event.data;
    if (message === 'reload') {
        reloadViewer(content);
    }
};

window.addEventListener('message', messageEventListener);
