import Konva from 'konva';
import type { FC } from 'react';
import { useRef } from 'react';
import { Rect } from 'react-konva';
import { Figure } from '../../model/useEditorContent';
import { ResizeTransformer } from './ResizeTransformer';
import { useFigureDrag } from './useFigureDrag';
import { useFigureTransform } from './useFigureTransform';

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
    const figureRef = useRef<Konva.Rect>(null);
    const { handleDragMove } = useFigureDrag(id);
    const { handleTransform } = useFigureTransform(figureRef);

    return (
        <>
            <Rect
                ref={figureRef}
                id={id}
                x={x}
                y={y}
                width={width}
                height={height}
                stroke={isSelected ? SELECT_STROKE : DEFAULT_STROKE}
                onDragMove={handleDragMove}
                onTransform={handleTransform}
                draggable={isSelected}
            />
            {isSelected &&
                <ResizeTransformer figureRef={figureRef} />
            }
        </>
    );
}
