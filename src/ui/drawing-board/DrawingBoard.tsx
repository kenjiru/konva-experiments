import type { FC } from 'react';
import React from 'react';
import { Circle, Layer, Rect, Stage } from 'react-konva';
import { Grid } from './grid/Grid';
import { useCursor } from './useCursor';
import { useZoom } from './useZoom';

export const DrawingBoard: FC = () => {
    const { handleZoom, handleDrag, scale, stagePos } = useZoom();
    const { cursorClass } = useCursor();

    return (
        <Stage
            className={cursorClass}
            onWheel={handleZoom}
            onDragEnd={handleDrag}
            width={window.innerWidth}
            height={window.innerHeight}
            scaleX={scale}
            scaleY={scale}
            x={stagePos.x}
            y={stagePos.y}
            draggable={true}
        >
            <Layer>
                <Rect width={50} height={50} fill="red" />
                <Circle x={200} y={200} stroke="black" radius={50} />
            </Layer>
            <Grid />
        </Stage>
    );
}
