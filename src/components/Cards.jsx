import { useContext } from "react";
import gameContext from "../provider/GameContext"
import Card from "./Card";

const Cards = () => {
  const { cards, actualCard } = useContext(gameContext);
  
  const renderCards = () => {
    const elements = cards.map((value, index) => (
      <Card value={ value } index={ index } active={ index === actualCard }/>
    ))
    
    return elements
  }


  return (
    <div className="all-cards-container">
      { renderCards() }
    </div>
  )
}

export default Cards;
