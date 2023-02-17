import Konva from 'konva';
import { useCallback } from 'react';
import { useEditorContent } from '../../model/useEditorContent';

export const useFigureDrag = (id: string) => {
    const { updateFigure } = useEditorContent();

    const handleDragMove = useCallback((ev: Konva.KonvaEventObject<DragEvent>) => {
        updateFigure(id, {
            x: ev.target.x(),
            y: ev.target.y(),
        });
    }, [ id, updateFigure ]);

    return {
        handleDragMove,
    }
}
