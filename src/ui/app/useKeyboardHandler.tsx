import { useAtom } from 'jotai';
import { useCallback, useEffect } from 'react';
import { EditorMode, editorModeAtom } from '../../model/editorMode';

const ESC_KEY = 'Escape';

export const useKeyboardHandler = () => {
    const [ editorMode, setEditorMode ] = useAtom(editorModeAtom);

    const handleKeyUp = useCallback((ev: KeyboardEvent): any => {
        if (ev.code === ESC_KEY && editorMode !== EditorMode.Pointer) {
            setEditorMode(EditorMode.Pointer);
        }
    }, [ editorMode, setEditorMode ]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyUp);

        return () => {
            window.removeEventListener('keydown', handleKeyUp);
        }
    }, [ handleKeyUp ])
}
