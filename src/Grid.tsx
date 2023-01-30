import Konva from 'konva';
import React, { useEffect, useRef, useState } from 'react';
import { Layer, Line, } from 'react-konva';
import { useGrid } from './useGrid';

export const Grid = () => {
    const layerRef = useRef<Konva.Layer>(null);
    const [stage, setStage] = useState<Konva.Stage | undefined>()
    const { gridLines } = useGrid(stage);

    useEffect(() => {
        if (layerRef.current) {
            setStage(layerRef.current.getStage())
        }
    }, [layerRef])

    const gridLinesComponents = gridLines.map((gridLineDef, index) => (
        <Line
            key={`line-${index}`}
            {...gridLineDef}
            stroke="rgba(0, 0, 0, 0.2)"
            strokeWidth={1}
        />
    ))

    return (
        <Layer ref={layerRef}>
            {gridLinesComponents}
        </Layer>
    );
}
