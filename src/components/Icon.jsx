import { useState } from "react"

const Icons = ({ callback, Icone, description}) => {
  const [active, setActive] = useState(false);

  return (
    <div
      className="icon"
      onClick={ callback }
      onMouseEnter={ () => setActive(true) }
      onMouseLeave={ () => setActive(false) }
    >
      <Icone />
      { active && <p className="icon-desc">{ description }</p> }
    </div>
  )
}

export default Icons;
