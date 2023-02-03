import { atom, useAtom } from 'jotai';

export enum EditorMode {
    Pointer,
    Rectangle
}

const DEFAULT_EDITOR_MODE = EditorMode.Pointer;

export const editorModeAtom = atom<EditorMode>(DEFAULT_EDITOR_MODE);

export const useEditorMode = () => {
    const [ editorMode, setEditorMode ] = useAtom(editorModeAtom);

    return {
        editorMode,
        setEditorMode,
    };
}
