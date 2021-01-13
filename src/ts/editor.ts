import * as monaco from 'monaco-editor';

const prefersDarkTheme = () => window.matchMedia('(prefers-color-scheme: dark)').matches;

const saveDocument = (editor: monaco.editor.ICodeEditor) => {
    const doc = editor.getValue({ preserveBOM: false, lineEnding: '\n' });
    chrome.storage.local.set({ index: doc });
};

const saveAndRender = (editor: monaco.editor.ICodeEditor) => {
    console.log('save and render');
    saveDocument(editor);
    chrome.storage.local.get(['index'], items => {
        console.log(items);
    });
};

const extendCommandPalette = (editor: monaco.editor.IStandaloneCodeEditor) => {
    const descriptor: monaco.editor.IActionDescriptor = {
        id: 'saveAndRender',
        label: 'Save and Render',
        keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter],
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
    editor.onDidChangeCursorSelection(() => {
        saveDocument(editor);
    });
};

const main = () => {
    const options: monaco.editor.IStandaloneEditorConstructionOptions = {
        value: 'editor',
        language: 'html',
        theme: prefersDarkTheme ? 'vs-dark' : 'vs',
    };
    createEditor('container', options);
};

main();
