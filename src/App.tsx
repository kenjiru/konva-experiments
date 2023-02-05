import React from 'react';
import { AppContainer } from './ui/app/app-container/AppContainer';
import { AppToolbar } from './ui/app/app-toolbar/AppToolbar';
import { SelectionInformation } from './ui/app/selection-information/SelectionInformation';
import { useKeyboardHandler } from './ui/app/useKeyboardHandler';
import { DrawingBoard } from './ui/drawing-board/DrawingBoard';

const App = () => {
    useKeyboardHandler();

    return (
        <AppContainer>
            <AppToolbar />
            <SelectionInformation />
            <DrawingBoard />
        </AppContainer>
    );
}

export default App;
