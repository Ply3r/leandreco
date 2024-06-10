import React from 'react';
import Cards from './components/Cards';
import Header from './components/Header';
import Keyboard from './components/Keyboard';
import Status from './components/Status';
import Suggestions from './components/Suggestions';
import GameProvider from './provider/GameProvider';

function App() {
  return (
    <GameProvider>
      <Header />
      <Status />
      <Cards />
      <Keyboard />
      <Suggestions />
    </GameProvider>
  );
}

export default App;
