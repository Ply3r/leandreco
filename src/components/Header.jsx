import { useContext, useState } from 'react';
import gameContext from '../provider/GameContext';
import Icons from './Icon';
import { BsGearFill } from 'react-icons/bs';
import { MdRestore } from 'react-icons/md';
import Config from './Config';


const Header = () => {
  const [config, setConfig] = useState(false);
  const { createCards } = useContext(gameContext);

  return (
    <>
      <div className="header">
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
      </div>
      { config && <Config /> }
    </>
  )
}

export default Header;
