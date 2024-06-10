import Suggestion from "./Suggestion";
import { useContext } from "react";
import gameContext from "../provider/GameContext"

const Suggestions = () => {
  const { mode, suggestions } = useContext(gameContext);

  return (
    <>
      { mode === 'solver' && (
        <div className="word-suggestions-container">
          <h2>Sugestões</h2>
          <div className="words-suggestions">
            { suggestions.map((word) => (
              <Suggestion word={word} />
            )) }
          </div>
        </div>
      ) }
    </>
  )
}

export default Suggestions;
