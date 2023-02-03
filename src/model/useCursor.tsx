import { atom, useAtomValue } from 'jotai';
import { EditorMode, editorModeAtom } from './editorMode';

const cursorClassAtom = atom((get) => {
    const editorMode = get(editorModeAtom);

    switch (editorMode) {
        case EditorMode.Pointer:
            return 'cursorPointer';
        case EditorMode.Rectangle:
            return 'cursorCrosshair';
    }
});

export const useCursor = () => {
    const cursorClass = useAtomValue(cursorClassAtom);

    return {
        cursorClass,
    }
};
