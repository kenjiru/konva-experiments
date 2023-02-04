import type { FC } from 'react';
import React from 'react';
import { Rect } from 'react-konva';
import { useDrawingState } from '../../model/useDrawingState';
import { useEditorMode } from '../../model/useEditorMode';
import { createFigureFromPoints } from './useDrawing';

const DEFAULT_STROKE = 'green';

export const DrawnFigure: FC = () => {
    const { isDrawing } = useEditorMode();
    const { startPoint, endPoint } = useDrawingState();

    if (!isDrawing || !startPoint) {
        return null;
    }

    const { x, y, width, height } = createFigureFromPoints(startPoint, endPoint)

    return (
        <Rect x={x} y={y} width={width} height={height} stroke={DEFAULT_STROKE} />
    );
}
