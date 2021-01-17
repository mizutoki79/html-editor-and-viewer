const isHTMLIFrame = (element: HTMLElement): element is HTMLIFrameElement => element instanceof HTMLIFrameElement;

const reloadViewer = () => {
    const viewerIframe = document.getElementById('viewer');
    if (isHTMLIFrame(viewerIframe)) {
        viewerIframe.contentWindow.location.reload();
    }
};

const messageEventListener = (event: MessageEvent<MessageFromIframeToParent>) => {
    console.log('listener');
    console.log(event);
    if (event.data.message === 'reload') {
        console.log('reload');
        reloadViewer();
    }
};

window.addEventListener('message', messageEventListener);
