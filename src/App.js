import React from 'react';
import Cards from './components/Cards';
import Keyboard from './components/Keyboard';
import GameProvider from './provider/GameProvider';

function App() {
  return (
    <>
      <div>
        <h1 className='hero'>Leandreco</h1>
      </div>
      <GameProvider>
        <Cards />
        <Keyboard />
      </GameProvider>
    </>
  );
}

export default App;
