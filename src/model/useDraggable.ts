import { atom, useAtomValue } from 'jotai';
import { EditorMode, editorModeAtom } from './useEditorMode';

const isDraggableAtom = atom((get) => get(editorModeAtom) === EditorMode.Pointer);

export const useDraggable = () => {
    const isDraggable = useAtomValue(isDraggableAtom);

    return {
        isDraggable,
    };
}
