import type { FC } from 'react';
import { Rect } from 'react-konva';
import { Figure } from '../../model/useEditorContent';
import { useFigureDrag } from './useFigureDrag';

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
    const { handleDragMove } = useFigureDrag(id);

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
