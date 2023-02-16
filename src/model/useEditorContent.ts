import { atom, useAtom } from 'jotai';

export enum FigureType {
    Rect
}

export interface Figure {
    id: string;
    type: FigureType;
    x: number;
    y: number;
    width: number;
    height: number;
}

const figuresAtom = atom<Figure[]>([]);

const FIGURE_SIZE_THRESHOLD = 5;
const MIN_FIGURE_SIZE = 40;

const ensureMinimumDimensions = (newFigure: Figure): Figure => {
    const hasMinimumDimensions = Math.max(newFigure.width, newFigure.height) > FIGURE_SIZE_THRESHOLD;

    return ({
        ...newFigure,
        width: hasMinimumDimensions ? newFigure.width : MIN_FIGURE_SIZE,
        height: hasMinimumDimensions ? newFigure.height : MIN_FIGURE_SIZE,
    });
};

export const useEditorContent = () => {
    const [ figures, setFigures ] = useAtom(figuresAtom);

    const addFigure = (newFigure: Figure) => setFigures([
        ...figures,
        ensureMinimumDimensions(newFigure),
    ]);

    const updateFigure = (idToUpdate: string, newFigureProps: Partial<Omit<Figure, 'id'>>) => {
        const foundItem = figures.find(({ id }) => id === idToUpdate);

        if (!foundItem) {
            console.error(`Could not find figure with id ${idToUpdate}`);
            return;
        }


        setFigures([
            ...figures.filter(({ id }) => id !== idToUpdate),
            {
                ...foundItem,
                ...newFigureProps,
            },
        ]);
    }

    return {
        figures,
        setFigures,
        addFigure,
        updateFigure,
    }
}
