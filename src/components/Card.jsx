import { useContext } from "react";
import gameContext from "../provider/GameContext"

const Card = ({ value, index, active }) => {
  const { 
    mode, 
    actualCard, 
    updateSolver
  } = useContext(gameContext);

  const elements = value.map(({ letter, rigth, hasOne, wrong }, i) => (
    <div 
      className={ `
        card
        ${active ? 'active' : ''}
        ${rigth ? 'rigth': ''}
        ${!rigth && hasOne ? 'hasOne' : ''}
        ${wrong ? 'wrong' : ''}
      ` }
      key={`Card ${index} - ${letter}${i}` } 
    >
      <h1>{ letter }</h1>
      { (mode === 'solver' && index < actualCard) && (
        <div className="solver-card-value-container">
          <div className="solver-card solver-rigth" onClick={() => updateSolver(index, letter, i, 'rigth')}></div>
          <div className="solver-card solver-hasOne" onClick={() => updateSolver(index, letter, i, 'hasOne')}></div>
          <div className="solver-card solver-wrong" onClick={() => updateSolver(index, letter, i, 'wrong')}></div>
        </div>
      ) }
    </div>
  ));

  return (
    <div className="card-container">
      { elements }
    </div>
  )
}

export default Card;