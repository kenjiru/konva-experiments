import Konva from 'konva';
import { useState } from 'react';

const scales = [ 5, 4, 3, 2.5, 2, 1.5, 1, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1, 0.05 ]
const DEFAULT_SCALE_INDEX = 6;
const DEFAULT_STAGE_POS = {
    x: 0,
    y: 0,
};

export const useZoom = () => {
    const [ scaleIndex, setScaleIndex ] = useState(DEFAULT_SCALE_INDEX)
    const [ stagePos, setStagePos ] = useState(DEFAULT_STAGE_POS)

    const handleZoom = (e: Konva.KonvaEventObject<WheelEvent>) => {
        e.evt.preventDefault();

        const stage = e.target.getStage();

        if (stage === null) {
            return
        }

        const currentScale = stage.scaleX();
        const pointerPosition = stage.getPointerPosition() ?? { x: 0, y: 0 };

        const scaledPointerPosition = {
            x: (pointerPosition.x - stage.x()) / currentScale,
            y: (pointerPosition.y - stage.y()) / currentScale,
        };

        let direction = e.evt.deltaY > 0 ? 1 : -1;

        if (e.evt.ctrlKey) {
            direction = -direction;
        }

        let newScaleIndex;
        if (direction > 0) {
            newScaleIndex = scaleIndex > 0 ? scaleIndex - 1 : scaleIndex;
        } else {
            newScaleIndex = scaleIndex < scales.length - 1 ? scaleIndex + 1 : scaleIndex;
        }
        setScaleIndex(newScaleIndex);

        const newScaleValue = scales[newScaleIndex];

        setStagePos({
            x: pointerPosition.x - scaledPointerPosition.x * newScaleValue,
            y: pointerPosition.y - scaledPointerPosition.y * newScaleValue,
        });
    };

    const handleDrag = (ev: Konva.KonvaEventObject<MouseEvent>) => {
        const stage = ev.target.getStage();

        if (!stage) {
            return;
        }

        // Here we just update the state variable to trigger a re-render
        setStagePos({
            x: stage.x(),
            y: stage.y(),
        });
    }

    return {
        handleZoom,
        handleDrag,
        scale: scales[scaleIndex],
        stagePos: stagePos,
    }
}
