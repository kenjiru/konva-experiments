import Konva from 'konva';
import { nanoid } from 'nanoid';
import { useCallback } from 'react';
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

    const normalizePoint = ({ x, y }: Point, stagePosition: Point, stageScale: number): Point => ({
        x: (x - stagePosition.x) / stageScale,
        y: (y - stagePosition.y) / stageScale,
    });

    const handleMouseDown = useCallback((ev: Konva.KonvaEventObject<MouseEvent>) => {
        const stage = ev.target.getStage();

        if (stage === null || !isDrawing) {
            return
        }

        const pointerPosition = stage.getPointerPosition() ?? undefined;

        if (!startPoint && pointerPosition) {
            setStartPoint(normalizePoint(pointerPosition, stage.getPosition(), stage.scaleX()));
        }
    }, [ startPoint, isDrawing, setStartPoint ]);

    const handleMouseUp = useCallback((ev: Konva.KonvaEventObject<MouseEvent>) => {
        const stage = ev.target.getStage();

        if (stage === null || !isDrawing || !startPoint) {
            return
        }

        const pointerPosition = stage.getPointerPosition();

        if (!pointerPosition) {
            return
        }

        const newFigure: Figure = createFigureFromPoints(startPoint, normalizePoint(pointerPosition, stage.getPosition(), stage.scaleX()));
        addFigure(newFigure);
        resetDrawingState();
    }, [ startPoint, isDrawing, addFigure, resetDrawingState ]);

    const handleMouseMove = useCallback((ev: Konva.KonvaEventObject<MouseEvent>) => {
        const stage = ev.target.getStage();

        if (stage === null || !isDrawing) {
            return
        }

        const pointerPosition = stage.getPointerPosition();

        if (!pointerPosition) {
            return
        }

        setEndPoint(normalizePoint(pointerPosition, stage.getPosition(), stage.scaleX()));
    }, [ isDrawing, setEndPoint ]);

    return {
        handleMouseDown,
        handleMouseUp,
        handleMouseMove,
    }
}
