import * as monaco from 'monaco-editor';

const prefersDarkTheme = () => window.matchMedia('(prefers-color-scheme: dark)').matches;

const createEditor = (id: string, options: monaco.editor.IStandaloneEditorConstructionOptions) => {
    // const editor = monaco.editor.create(document.getElementById(id), options);
    monaco.editor.create(document.getElementById(id), options);
    // window.onresize = function () {
    //     editor.layout();
    // };
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
