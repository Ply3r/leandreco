import { useContext, useState } from 'react';
import gameContext from '../provider/GameContext';
import Icon from './Icon';
import { AiFillQuestionCircle, AiOutlineInfoCircle } from 'react-icons/ai'
import { SlPuzzle } from "react-icons/sl";
import { IoGameController } from "react-icons/io5";
import { BsGearFill } from 'react-icons/bs';
import { MdRestore } from 'react-icons/md';
import Config from './Config';
import Doubts from './Doubts';
import Info from './Info';


const Header = () => {
  const [config, setConfig] = useState(false);
  const [doubts, setDoubts] = useState(false);
  const [info, setInfo] = useState(false);
  const { mode, setMode, createCards } = useContext(gameContext);

  const changeMode = () => {
    const newMode = mode === 'game' ? 'solver' : 'game'
    setMode(newMode);
    createCards(newMode === 'solver');
  }

  return (
    <>
      <div className="header">
        <div style={ { 'display': 'flex' } } >
          <Icon 
            callback={ changeMode } 
            description={ mode === 'game' ? 'Resolver' : 'Jogar' }
            Icone={ mode === 'game' ? SlPuzzle : IoGameController } 
          />
          <Icon 
            callback={ () => setDoubts(!doubts) } 
            description={ 'Dúvidas?' }
            Icone={ AiFillQuestionCircle } 
          />
          <Icon 
            callback={ () => createCards(mode === 'solver') } 
            description={ 'Recomeçar' }
            Icone={ MdRestore } 
          />
        </div>
        <h1 className='hero'>Leandreco</h1>
        <div style={ { 'display': 'flex' } } >
          <Icon 
            callback={ () => setConfig(!config) } 
            description={ 'Configurar' }
            Icone={ BsGearFill } 
          />
          <Icon 
            callback={ () => setInfo(!info) } 
            description={ 'Informação' }
            Icone={ AiOutlineInfoCircle } 
          />
        </div>
      </div>
      { config && <Config /> }
      { doubts && <Doubts /> }
      { info && <Info /> }
    </>
  )
}

export default Header;
