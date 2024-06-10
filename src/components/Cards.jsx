import { useContext } from "react";
import gameContext from "../provider/GameContext"
import Card from "./Card";

const Cards = () => {
  const { cards, actualCard } = useContext(gameContext);
  
  return (
    <div className="all-cards-container">
      { cards.map((value, index) => (
        <Card value={ value } index={ index } active={ index === actualCard }/>
      )) }
    </div>
  )
}

export default Cards;
