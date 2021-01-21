interface Message {
    message: 'reload' | 'tab-change';
    content?: string;
}

interface EditorDataDetail {
    model: import('monaco-editor').editor.ITextModel;
    state: import('monaco-editor').editor.ICodeEditorViewState;
}

interface EditorData {
    html: EditorDataDetail;
    css: EditorDataDetail;
    js: EditorDataDetail;
}
