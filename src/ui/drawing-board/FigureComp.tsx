import Konva from 'konva';
import type { FC } from 'react';
import { useCallback } from 'react';
import { Rect } from 'react-konva';
import { Figure, useEditorContent } from '../../model/useEditorContent';

interface Props {
    figure: Figure;
    isSelected: boolean;
}

const DEFAULT_STROKE = 'red';
const SELECT_STROKE = 'blue';

export const FigureComp: FC<Props> = ({
    figure: { id, x, y, width, height },
    isSelected,
}) => {
    const { updateFigure } = useEditorContent();

    const handleDragMove = useCallback((ev: Konva.KonvaEventObject<DragEvent>) => {
        updateFigure(id, {
            x: ev.target.x(),
            y: ev.target.y(),
        });
    }, [ id, updateFigure ]);

    return (
        <Rect
            id={id}
            x={x}
            y={y}
            width={width}
            height={height}
            stroke={isSelected ? SELECT_STROKE : DEFAULT_STROKE}
            onDragMove={handleDragMove}
            draggable={isSelected}
        />
    );
}
