import * as monaco from 'monaco-editor';
import { TabId, isTabId } from './common';

const editorData: EditorData = {
    html: {
        state: null,
        model: null,
    },
    js: {
        state: null,
        model: null,
    },
    css: {
        state: null,
        model: null,
    },
};

const prefersDarkTheme = () => window.matchMedia('(prefers-color-scheme: dark)').matches;

const tabIdToModelId: { [key in TabId]: keyof EditorData } = {
    'html-tab': 'html',
    'javascript-tab': 'js',
    'css-tab': 'css',
};

const changeTab = (editor: monaco.editor.ICodeEditor, tabId: TabId) => {
    saveDocument(editor);
    editor.setModel(editorData[tabIdToModelId[tabId]].model);
    editor.restoreViewState(editorData[tabIdToModelId[tabId]].state);
    editor.focus();
};

const messageEventListener = (editor: monaco.editor.ICodeEditor) => (event: MessageEvent<Message>) => {
    const { message, content } = event.data;
    if (message === 'tab-change' && isTabId(content)) {
        const tabId = content;
        changeTab(editor, tabId);
    }
};

const saveDocument = (editor: monaco.editor.ICodeEditor) => {
    const document = editor.getValue({ preserveBOM: false, lineEnding: '\n' });
    const currentState = editor.saveViewState();
    const currentModel = editor.getModel();
    switch (currentModel) {
        case editorData.html.model:
            editorData.html.state = currentState;
            chrome.storage.sync.set({ html: document });
            break;
        case editorData.js.model:
            editorData.js.state = currentState;
            chrome.storage.sync.set({ js: document });
            break;
        case editorData.css.model:
            editorData.css.state = currentState;
            chrome.storage.sync.set({ css: document });
            break;
    }
};

const renderViewer = () => {
    const postMessage: Message = {
        message: 'reload',
    };
    window.parent.postMessage(postMessage, '*');
};

const saveAndRender = (editor: monaco.editor.ICodeEditor) => {
    saveDocument(editor);
    renderViewer();
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
    window.addEventListener('message', messageEventListener(editor));
};

const main = () => {
    chrome.storage.sync.get(['html', 'js', 'css'], items => {
        const defaultHtmlValue = items.html ?? '<strong>something</strong> <font color="red">code</font>';
        const htmlModel = monaco.editor.createModel(defaultHtmlValue, 'html');
        const jsModel = monaco.editor.createModel(items.js ?? 'JavaScript', 'javascript');
        const cssModel = monaco.editor.createModel(items.css ?? 'css', 'css');
        editorData.html.model = htmlModel;
        editorData.js.model = jsModel;
        editorData.css.model = cssModel;
        const options: monaco.editor.IStandaloneEditorConstructionOptions = {
            model: htmlModel,
            value: defaultHtmlValue,
            language: 'html',
            theme: prefersDarkTheme ? 'vs-dark' : 'vs',
        };
        createEditor('container', options);
        renderViewer();
    });
};

main();
