import Konva from 'konva';

let scales = [ 5, 4, 3, 2.5, 2, 1.5, 1, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1, 0.05 ]

export const useZoom = () => {
    let currentScale = 6;

    const handleZoom = (e: Konva.KonvaEventObject<WheelEvent>) => {
        e.evt.preventDefault();

        const stage = e.target as Konva.Stage;
        const oldScale = stage.scaleX();
        const pointer = stage.getPointerPosition() ?? { x: 0, y: 0 };

        const mousePointTo = {
            x: (pointer.x - stage.x()) / oldScale,
            y: (pointer.y - stage.y()) / oldScale,
        };

        let direction = e.evt.deltaY > 0 ? 1 : -1;

        if (e.evt.ctrlKey) {
            direction = -direction;
        }

        if (direction > 0) {
            currentScale = currentScale > 0 ? currentScale - 1 : currentScale;
        } else {
            currentScale = currentScale < scales.length - 1 ? currentScale + 1 : currentScale;
        }

        const newScale = scales[currentScale];

        stage.scale({ x: newScale, y: newScale });

        const newPos = {
            x: pointer.x - mousePointTo.x * newScale,
            y: pointer.y - mousePointTo.y * newScale,
        };

        stage.position(newPos);
    };

    return {
        handleZoom,
    }
}
