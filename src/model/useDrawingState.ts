import { atom, useAtom } from 'jotai';
import { useCallback, useEffect } from 'react';
import { EditorMode, useEditorMode } from './useEditorMode';

export interface Point {
    x: number;
    y: number;
}

interface DrawingState {
    startPoint: Point | undefined;
    endPoint: Point | undefined;
}

export const drawingStateAtom = atom<DrawingState>({
    startPoint: undefined,
    endPoint: undefined,
})

export const useDrawingState = () => {
    const [ { startPoint, endPoint }, setDrawingState ] = useAtom(drawingStateAtom);
    const { editorMode } = useEditorMode();

    const resetDrawingState = useCallback(() => setDrawingState({
        startPoint: undefined,
        endPoint: undefined,
    }), [ setDrawingState ])

    useEffect(() => {
        if (editorMode === EditorMode.Pointer) {
            resetDrawingState();
        }
    }, [ editorMode, resetDrawingState ]);

    return {
        startPoint,
        endPoint,
        setStartPoint: (point: Point | undefined) => setDrawingState({
            startPoint: point,
            endPoint,
        }),
        setEndPoint: (point: Point | undefined) => setDrawingState({
            startPoint,
            endPoint: point,
        }),
        resetDrawingState,
    }
}
