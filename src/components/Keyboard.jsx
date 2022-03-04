import { useContext, useState } from "react"
import gameContext from "../provider/GameContext";
import { RiDeleteBack2Line } from 'react-icons/ri';
import axios from "axios";

const Keyboard = () => {
  const [error, setError] = useState(false)
  const { word, setWord, cards, enter, gameOver } = useContext(gameContext);

  const handleChange = (letter) => {
    const newWord = word + letter;
    if (newWord.length > 5) return;
   
    setWord(newWord);
  }

  const erase = () => {
    const newWord = word.slice(0, -1);

    setWord(newWord)
  }

  const submit = async () => {
    const isCorrect = await axios.get(`https://significado.herokuapp.com/${word}`)
      .then(() => true)
      .catch(() => false)

    if (isCorrect) {
      enter();
      return;
    }

    setError(true);
    setTimeout(() => {
      setError(false);
    }, 5000)
  }

  const createKeys = (string) => {
    const array = string.split('')
    const elements = array.map((letter) => {
      
      const rigth = cards.some((value) => {
        const someRigth = value.some(({ letter: currLetter, rigth }) => letter === currLetter && rigth)

        return someRigth;
      });

      const hasOne = cards.some((value) => {
        const someRigth = value.some(({ letter: currLetter, hasOne }) => letter === currLetter && hasOne)

        return someRigth;
      });

      return (
        <button
          className={ `
            keyboard-bot
            ${rigth ? 'rigth': ''}
            ${!rigth && hasOne ? 'hasOne' : ''}
          ` }
          type="button"
          disabled={ word.length === 5 || gameOver }
          onClick={ () => handleChange(letter) }
        >
          { letter }
        </button>
      )
    })

    return elements;
  }

  return (
    <>
    { error && <p className="wrong-word">Palavra incorreta</p> }
    <div className="keyboard">
      <div>
        { createKeys('QWERTYUIOP') }
      </div>
      <div className="keyboard-row-2">
        <div>
          { createKeys('ASDFGHJKL') }
        </div>
        <button
          className="keyboard-bot"
          disabled={ gameOver }
          onClick={ erase }
        >
          <RiDeleteBack2Line />
        </button>
      </div>
      <div className="keyboard-row-3">
        <div>
          { createKeys('ZXCVBNM') }
        </div>
        <button
          style={ { 'width': '150px' } }
          className="keyboard-bot enter"
          disabled={ word.length !== 5 || gameOver }
          onClick={ submit }
        >
          ENTER
        </button>
      </div>
    </div>
    </>
  )
}

export default Keyboard;