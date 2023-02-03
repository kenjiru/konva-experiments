import { useSetAtom } from 'jotai';
import { EditorMode, editorModeAtom } from './useEditorMode';

export const useDrawingActions = () => {
    const setEditorMode = useSetAtom(editorModeAtom);

    const drawRect = () => {
        setEditorMode(EditorMode.Rectangle)
    }

    return {
        drawRect,
    }
}
