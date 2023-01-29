import React from 'react';
import { Stage, Layer, Rect, Circle } from 'react-konva';
import { useZoom } from './useZoom';

const App = () => {
    const { handleZoom } = useZoom();

    return (
        <Stage width={window.innerWidth} height={window.innerHeight} onWheel={handleZoom}>
            <Layer>
                <Rect width={50} height={50} fill="red" />
                <Circle x={200} y={200} stroke="black" radius={50} />
            </Layer>
        </Stage>
    );
}

export default App;
