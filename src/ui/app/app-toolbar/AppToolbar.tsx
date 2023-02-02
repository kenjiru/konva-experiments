import type { FC } from 'react';
import { useDrawingActions } from '../../../model/useDrawingActions';

export const AppToolbar: FC = () => {
    const { drawRect } = useDrawingActions();

    return (
        <div>Toolbar: <button onClick={drawRect}>Draw rect</button></div>
    );
}
