import type { FC } from 'react';
import React from 'react';
import { Layer, Stage } from 'react-konva';
import { useCursor } from '../../model/useCursor';
import { useDraggable } from '../../model/useDraggable';
import { useEditorContent } from '../../model/useEditorContent';
import styles from './DrawingBoard.module.css';
import { DrawnFigure } from './DrawnFigure';
import { FigureComp } from './FigureComp';
import { Grid } from './grid/Grid';
import { useMouseManager } from './useMouseManager';
import { useZoom } from './useZoom';

export const DrawingBoard: FC = () => {
    const { handleZoom, handleDrag, scale, stagePos } = useZoom();
    const { cursorClass } = useCursor();
    const { isDraggable } = useDraggable();
    const { handleMouseDown, handleMouseUp, handleMouseMove, handleClick } = useMouseManager();
    const { figures } = useEditorContent();
    const figureComponents = figures.map((figure) =>
        <FigureComp key={figure.id} figure={figure} />,
    )

    return (
        <Stage
            className={styles[cursorClass as keyof typeof styles]}
            onWheel={handleZoom}
            onDragEnd={handleDrag}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onClick={handleClick}
            width={window.innerWidth}
            height={window.innerHeight}
            scaleX={scale}
            scaleY={scale}
            x={stagePos.x}
            y={stagePos.y}
            draggable={isDraggable}
        >
            <Layer>
                {figureComponents}
                <DrawnFigure />
            </Layer>
            <Grid />
        </Stage>
    );
}
