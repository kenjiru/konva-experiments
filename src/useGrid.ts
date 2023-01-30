import Konva from 'konva';

const STEP_SIZE = 40; // set a value for the grid step gap.
const width = window.innerWidth;
const height = window.innerHeight;

export const useGrid = (stage: Konva.Stage | undefined) => {
    const gridLines: any[] = [];

    if (stage === undefined) {
        return {
            gridLines,
        };
    }

    const unScale = (val: number) => (val / stage.scaleX());

    const stageRect = {
        x1: 0,
        y1: 0,
        x2: stage.width(),
        y2: stage.height(),
        offset: {
            x: unScale(stage.position().x),
            y: unScale(stage.position().y),
        },
    };
    const gridOffset = {
        x: Math.ceil(unScale(stage.position().x) / STEP_SIZE) * STEP_SIZE,
        y: Math.ceil(unScale(stage.position().y) / STEP_SIZE) * STEP_SIZE,
    };
    const gridRect = {
        x1: -gridOffset.x,
        y1: -gridOffset.y,
        x2: unScale(width) - gridOffset.x + STEP_SIZE,
        y2: unScale(height) - gridOffset.y + STEP_SIZE,
    };
    const fullRect = {
        x1: Math.min(stageRect.x1, gridRect.x1),
        y1: Math.min(stageRect.y1, gridRect.y1),
        x2: Math.max(stageRect.x2, gridRect.x2),
        y2: Math.max(stageRect.y2, gridRect.y2),
    };

    const xSize = (fullRect.x2 - fullRect.x1);
    const ySize = (fullRect.y2 - fullRect.y1);
    const xSteps = Math.round(xSize / STEP_SIZE);
    const ySteps = Math.round(ySize / STEP_SIZE);

    // draw vertical lines
    for (let i = 0; i <= xSteps; i++) {
        gridLines.push({
            x: fullRect.x1 + i * STEP_SIZE,
            y: fullRect.y1,
            points: [ 0, 0, 0, ySize ],
        })
    }

    // draw Horizontal lines
    for (let i = 0; i <= ySteps; i++) {
        gridLines.push({
            x: fullRect.x1,
            y: fullRect.y1 + i * STEP_SIZE,
            points: [ 0, 0, xSize, 0 ],
        });
    }

    return {
        gridLines,
    };
}
