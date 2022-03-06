const Card = ({ value, index, active }) => {
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
    </div>
  ));

  return (
    <div className="card-container">
      { elements }
    </div>
  )
}

export default Card;