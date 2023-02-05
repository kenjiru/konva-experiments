import { useEditorMode } from '../../model/useEditorMode';
import { useDrawing } from './useDrawing';
import { useSelection } from './useSelection';

export const useMouseManager = () => {
    const { isDrawing } = useEditorMode();
    const { handleMouseDown, handleMouseUp, handleMouseMove } = useDrawing();
    const { handleClick } = useSelection();

    if (!isDrawing) {
        return {
            handleMouseDown: undefined,
            handleMouseUp: undefined,
            handleMouseMove: undefined,
            handleClick,
        }
    }

    return {
        handleMouseDown,
        handleMouseMove,
        handleMouseUp,
        handleClick: undefined,
    }
}
