import { useEditorMode } from '../../model/useEditorMode';
import { useDrawing } from './useDrawing';

export const useMouseManager = () => {
    const { isDrawing } = useEditorMode();
    const { handleMouseDown, handleMouseUp, handleMouseMove } = useDrawing();

    if (!isDrawing) {
        return {
            handleMouseDown: () => {
            },
            handleMouseUp: () => {
            },
            handleMouseMove: () => {
            },
        }
    }

    return {
        handleMouseDown,
        handleMouseMove,
        handleMouseUp,
    }
}
