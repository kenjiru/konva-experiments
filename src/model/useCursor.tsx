import { atom, useAtomValue } from 'jotai';
import { EditorMode, editorModeAtom } from './editorMode';

const cursorClassAtom = atom((get) => {
    const editorMode = get(editorModeAtom);

    switch (editorMode) {
        case EditorMode.Pointer:
            return 'cursor-pointer';
        case EditorMode.Rectangle:
            return 'cursor-crosshairs';
    }
});

export const useCursor = () => {
    const cursorClass = useAtomValue(cursorClassAtom);

    return {
        cursorClass,
    }
};
