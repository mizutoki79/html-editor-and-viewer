import * as monaco from 'monaco-editor';

const prefersDarkTheme = () => window.matchMedia('(prefers-color-scheme: dark)').matches;

const saveDocument = (document: string) => {
    chrome.storage.sync.set({ html: document });
};

const renderViewer = (document: string) => {
    const postMessage: MessageFromIframeToParent = {
        message: 'reload',
        content: document,
    };
    window.parent.postMessage(postMessage, '*');
};

const saveAndRender = (editor: monaco.editor.ICodeEditor) => {
    const document = editor.getValue({ preserveBOM: false, lineEnding: '\n' });
    saveDocument(document);
    renderViewer(document);
};

const extendCommandPalette = (editor: monaco.editor.IStandaloneCodeEditor) => {
    const descriptor: monaco.editor.IActionDescriptor = {
        id: 'saveAndRender',
        label: 'Save and Render',
        keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_S],
        contextMenuGroupId: '0',
        contextMenuOrder: 0,
        run: editor => saveAndRender(editor),
    };
    editor.addAction(descriptor);
};

const createEditor = (id: string, options: monaco.editor.IStandaloneEditorConstructionOptions) => {
    const editor = monaco.editor.create(document.getElementById(id), options);
    extendCommandPalette(editor);
    window.onresize = () => editor.layout();
};

const main = () => {
    chrome.storage.sync.get(['html'], items => {
        const options: monaco.editor.IStandaloneEditorConstructionOptions = {
            value: items.html ?? '<strong>something</strong> <font color="red">code</font>',
            language: 'html',
            theme: prefersDarkTheme ? 'vs-dark' : 'vs',
        };
        createEditor('container', options);
        renderViewer(options.value);
    });
};

main();
