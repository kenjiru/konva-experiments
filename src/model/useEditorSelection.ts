import { atom, useAtom } from 'jotai';

export const selectedFigureAtom = atom<string | undefined>(undefined);

export const useEditorSelection = () => {
    const [ selectedFigureId, setSelectedFigureId ] = useAtom(selectedFigureAtom);

    return {
        selectedFigureId,
        setSelectedFigureId,
    }
}
