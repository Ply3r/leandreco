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
      <p className="creditos">
        Feito por <a href="https://github.com/Ply3r">Leandro Henrique</a>
      </p>
      <div className="header">
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
        <h1 className='hero'>Leandreco</h1>
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
      { config && <Config /> }
      { doubts && <Doubts /> }
      { info && <Info /> }
    </>
  )
}

export default Header;
