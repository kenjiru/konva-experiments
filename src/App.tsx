import React from 'react';
import { AppContainer } from './ui/app/app-container/AppContainer';
import { AppToolbar } from './ui/app/app-toolbar/AppToolbar';
import { DrawingBoard } from './ui/drawing-board/DrawingBoard';

const App = () => (
    <AppContainer>
        <AppToolbar />
        <DrawingBoard />
    </AppContainer>
)

export default App;
