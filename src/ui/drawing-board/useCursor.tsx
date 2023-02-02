import { useAtomValue } from 'jotai';
import { EditorMode, editorModeAtom } from '../../model/editorMode';

export const useCursor = () => {
    const editorMode = useAtomValue(editorModeAtom)

    let cursorClass;

    switch (editorMode) {
        case EditorMode.Pointer:
            cursorClass = 'cursor-pointer';
            break
        case EditorMode.Rectangle:
            cursorClass = 'cursor-crosshairs';
    }

    return {
        cursorClass,
    }
};
