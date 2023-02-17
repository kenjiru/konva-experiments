import Konva from 'konva';
import { RefObject, useCallback } from 'react';

const DEFAULT_SIZE = 5;

export const useFigureTransform = (figureRef: RefObject<Konva.Rect>) => {
    const handleTransform = useCallback(() => {
        const figure = figureRef.current;

        if (!figure) {
            return;
        }

        figure.setAttrs({
            width: Math.max(figure.width() * figure.scaleX(), DEFAULT_SIZE),
            height: Math.max(figure.height() * figure.scaleY(), DEFAULT_SIZE),
            scaleX: 1,
            scaleY: 1,
        });
    }, [ figureRef ]);

    return {
        handleTransform,
    }
}
