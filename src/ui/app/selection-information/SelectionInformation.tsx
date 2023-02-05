import type { FC } from 'react';
import { useEditorContent } from '../../../model/useEditorContent';
import { useEditorSelection } from '../../../model/useEditorSelection';
import styles from './SelectionInformation.module.css';

export const SelectionInformation: FC = () => {
    const { figures } = useEditorContent();
    const { selectedFigureId } = useEditorSelection();

    const selectedFigure = figures.find(figure => figure.id === selectedFigureId);

    if (!selectedFigure) {
        return null
    }

    const { id, x, y, width, height } = selectedFigure;

    return (
        <div className={styles.selectionInformation}>
            <p>Figure id: {id}</p>
            <p>Figure position: {`x: ${x}, y: ${y}, width: ${width}, height: ${height}`}</p>
        </div>
    );
}
