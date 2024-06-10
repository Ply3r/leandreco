import { useContext } from "react";
import gameContext from "../provider/GameContext"

const Suggestion = ({ word }) => {
  const { setWord } = useContext(gameContext);

  const enterNewWord = () => {
    setWord(word.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""));
  }

  return (
    <div onClick={ enterNewWord } className="word-suggestion">
      { word }
    </div>
  )
}

export default Suggestion;
