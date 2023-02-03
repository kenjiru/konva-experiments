import { useAtomValue } from 'jotai';
import { useEffect, useState } from 'react';
import { EditorMode, editorModeAtom } from '../../model/editorMode';

export const useCursor = () => {
    const editorMode = useAtomValue(editorModeAtom)
    const [ cursorClass, setCursorClass ] = useState('');

    useEffect(() => {
        switch (editorMode) {
            case EditorMode.Pointer:
                setCursorClass('cursor-pointer');
                break;
            case EditorMode.Rectangle:
                setCursorClass('cursor-crosshairs');
                break;
        }
    }, [ editorMode ]);

    return {
        cursorClass,
    }
};
