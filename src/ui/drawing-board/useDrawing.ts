import Konva from 'konva';
import { nanoid } from 'nanoid';
import { Point, useDrawingState } from '../../model/useDrawingState';
import { Figure, FigureType, useEditorContent } from '../../model/useEditorContent';
import { useEditorMode } from '../../model/useEditorMode';

let DEFAULT_POINT: Point = {
    x: 0,
    y: 0,
};

export const createFigureFromPoints = (
    startPoint: Point | undefined = DEFAULT_POINT,
    endPoint: Point | undefined = DEFAULT_POINT,
): Figure => {
    const x = Math.min(startPoint.x, endPoint.x);
    const y = Math.min(startPoint.y, endPoint.y);
    const width = Math.abs((endPoint.x) - startPoint.x);
    const height = Math.abs((endPoint.y) - startPoint.y);

    return {
        id: nanoid(),
        type: FigureType.Rect,
        x,
        y,
        width,
        height,
    }
};

export const useDrawing = () => {
    const { isDrawing } = useEditorMode();
    const { startPoint, setStartPoint, setEndPoint, resetDrawingState } = useDrawingState();
    const { addFigure } = useEditorContent();

    const handleMouseDown = (ev: Konva.KonvaEventObject<MouseEvent>) => {
        const stage = ev.target.getStage();

        if (stage === null || !isDrawing) {
            return
        }

        const pointerPosition = stage.getPointerPosition() ?? undefined;

        if (!startPoint) {
            setStartPoint(pointerPosition);
        }
    }

    const handleMouseUp = (ev: Konva.KonvaEventObject<MouseEvent>) => {
        const stage = ev.target.getStage();

        if (stage === null || !isDrawing || !startPoint) {
            return
        }

        const pointerPosition = stage.getPointerPosition();

        if (!pointerPosition) {
            return
        }

        const newFigure: Figure = createFigureFromPoints(startPoint, pointerPosition);
        addFigure(newFigure);
        resetDrawingState();
    }

    const handleMouseMove = (ev: Konva.KonvaEventObject<MouseEvent>) => {
        const stage = ev.target.getStage();

        if (stage === null || !isDrawing) {
            return
        }

        const pointerPosition = stage.getPointerPosition();

        if (!pointerPosition) {
            return
        }

        setEndPoint(pointerPosition);
    }

    return {
        handleMouseDown,
        handleMouseUp,
        handleMouseMove,
    }
}
