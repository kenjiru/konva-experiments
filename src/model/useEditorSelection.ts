import { atom, useAtom } from 'jotai';
import { useCallback } from 'react';

export const selectedFigureAtom = atom<string | undefined>(undefined);

export const useEditorSelection = () => {
    const [ selectedFigureId, setSelectedFigureId ] = useAtom(selectedFigureAtom);

    const clearSelection = useCallback(() => setSelectedFigureId(undefined), [ setSelectedFigureId ]);

    return {
        selectedFigureId,
        setSelectedFigureId,
        clearSelection,
    }
}
