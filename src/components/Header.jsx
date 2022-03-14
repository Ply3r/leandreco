import { useContext, useState } from 'react';
import gameContext from '../provider/GameContext';
import Icons from './Icon';
import { AiFillQuestionCircle, AiOutlineInfoCircle } from 'react-icons/ai'
import { BsGearFill } from 'react-icons/bs';
import { MdRestore } from 'react-icons/md';
import Config from './Config';
import Doubts from './Doubts';
import Info from './Info';


const Header = () => {
  const [config, setConfig] = useState(false);
  const [doubts, setDoubts] = useState(false);
  const [info, setInfo] = useState(false);
  const { createCards } = useContext(gameContext);

  return (
    <>
      <div className="header">
        <div style={ { 'display': 'flex' } } >
          <Icons 
            callback={ () => setDoubts(!doubts) } 
            description={ 'Dúvidas?' }
            Icone={ AiFillQuestionCircle } 
          />
          <Icons 
            callback={ createCards } 
            description={ 'Recomeçar' }
            Icone={ MdRestore } 
          />
        </div>
        <h1 className='hero'>Leandreco</h1>
        <div style={ { 'display': 'flex' } } >
          <Icons 
            callback={ () => setConfig(!config) } 
            description={ 'Configurar' }
            Icone={ BsGearFill } 
          />
          <Icons 
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
