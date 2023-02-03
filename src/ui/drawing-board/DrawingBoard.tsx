import type { FC } from 'react';
import React from 'react';
import { Circle, Layer, Rect, Stage } from 'react-konva';
import { useCursor } from '../../model/useCursor';
import { useDraggable } from '../../model/useDraggable';
import styles from './DrawingBoard.module.css';
import { Grid } from './grid/Grid';
import { useZoom } from './useZoom';

export const DrawingBoard: FC = () => {
    const { handleZoom, handleDrag, scale, stagePos } = useZoom();
    const { cursorClass } = useCursor();
    const { isDraggable } = useDraggable();

    return (
        <Stage
            className={styles[cursorClass as keyof typeof styles]}
            onWheel={handleZoom}
            onDragEnd={handleDrag}
            width={window.innerWidth}
            height={window.innerHeight}
            scaleX={scale}
            scaleY={scale}
            x={stagePos.x}
            y={stagePos.y}
            draggable={isDraggable}
        >
            <Layer>
                <Rect width={50} height={50} fill="red" />
                <Circle x={200} y={200} stroke="black" radius={50} />
            </Layer>
            <Grid />
        </Stage>
    );
}
