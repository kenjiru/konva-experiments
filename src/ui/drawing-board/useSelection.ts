import Konva from 'konva';
import { useCallback } from 'react';
import { useEditorSelection } from '../../model/useEditorSelection';

const SHAPE = 'Shape';
const isShape = (figure: Konva.Shape | Konva.Stage) => figure.nodeType === SHAPE;

export const useSelection = () => {
    const { setSelectedFigureId } = useEditorSelection();

    const handleClick = useCallback((ev: Konva.KonvaEventObject<MouseEvent>) => {
        const figure = ev.target;

        if (isShape(figure)) {
            setSelectedFigureId(figure.id());
        }
    }, [ setSelectedFigureId ]);

    return {
        handleClick,
    }
};
