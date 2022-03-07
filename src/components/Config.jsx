import { useContext, useState } from "react";
import gameContext from '../provider/GameContext';

const Config = () => {
  const [length, setLength] = useState(5);
  const { gameOptions, setGameOptions } = useContext(gameContext)

  const submit = () => {
    setGameOptions({ ...gameOptions, length: +length });
  }

  return (
    <div className="config">
      <label>
        Tamanho da palavra:
        <select
          value={ length }
          onChange={ ({ target: { value } }) => setLength(value) }
        >
          { 
            [4, 5, 6, 7].map((num) => (
             <option value={ num } >{ num }</option>
            )) 
          }
        </select>
      </label>
      <button
        onClick={ submit }
      >
        Salvar
      </button>
    </div>
  )
}

export default Config;
