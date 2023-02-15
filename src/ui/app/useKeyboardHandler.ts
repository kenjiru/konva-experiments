import { useCallback, useEffect } from 'react';
import { EditorMode, useEditorMode } from '../../model/useEditorMode';
import { useEditorSelection } from '../../model/useEditorSelection';

const ESC_KEY = 'Escape';

export const useKeyboardHandler = () => {
    const { editorMode, setEditorMode } = useEditorMode();
    const { clearSelection } = useEditorSelection();

    const handleKeyUp = useCallback((ev: KeyboardEvent): any => {
        if (ev.code === ESC_KEY) {
            if (editorMode !== EditorMode.Pointer) {
                setEditorMode(EditorMode.Pointer);
            } else {
                clearSelection();
            }
        }
    }, [ editorMode, setEditorMode, clearSelection ]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyUp);

        return () => {
            window.removeEventListener('keydown', handleKeyUp);
        }
    }, [ handleKeyUp ])
}
