import { useEffect, useState } from 'react';
import gameContext from './GameContext';
import { Word } from '@andsfonseca/palavras-pt-br';
import local from '../utils/localStorage.js';

const GameProvider = ({ children }) => {
  const [gameStatus, setGameStatus] = useState('')
  const [gameOver, setGameOver] = useState(false);
  const [rigthAnswer, setRigthAnswer] = useState('');
  const [word, setWord] = useState('');
  const [actualCard, setActualCard] = useState(0);
  const [cards, setCards] = useState([]);

  const createCards = () => {
    const cardsArray = new Array(6).fill(new Array(5).fill({
      letter: '',
      hasOne: false,
      rigth: false,
    }));

    setGameOver(false);

    setRigthAnswer(Word.getRandomWord(5, true))
    setCards(cardsArray);
  }

  const modifyActualCard = () => {
    const arrayWord = word.split('');
    const actualArray = cards[actualCard];

    const newArray = actualArray.map(({ letter, ...fields }, index) => ({ 
      ...fields,
      letter: arrayWord[index] ? arrayWord[index] : '',
    }))

    const newCards = cards.map((value, index) => index === actualCard ? newArray : value)
    setCards(newCards);
  }

  const verifyWords = () => {
    const letters = word.split('');
    
    const newArray = letters.map((letter, index) => {
      const regex = new RegExp(letter, 'gmi');
      const rigth = letter.toLowerCase() === rigthAnswer[index];
      const hasOne = regex.test(rigthAnswer);

      return { letter, hasOne, rigth }
    });

    const teste = newArray.map((value, index) => {
      const regex = new RegExp(value.letter, 'gmi');
      const oneLetter = rigthAnswer.match(regex);

      const isNotUnique = newArray
        .find(({ letter, rigth }, newArrayIndex) => newArrayIndex !== index && value.letter === letter && rigth);

      if (isNotUnique && (oneLetter && oneLetter.length === 1)) {
        if (!value.rigth) return { ...value, hasOne: false }
      }

      return value;
    });

    const allCorrect = teste.every(({ rigth }) => rigth)
    if (allCorrect) {
      local.handleRigth({ position: actualCard + 1 })
      setGameOver(true)
    }

    const newCards = cards.map((value, index) => index === actualCard ? teste : value)
    setCards(newCards);
  }

  const enter = () => {
    const cardsLength = cards.length;
    const newIndex = actualCard + 1;

    verifyWords();
    if (newIndex > cardsLength - 1) {
      local.handleWrong();
      setGameOver(true);
      return;
    }

    if (!gameOver) {
      setActualCard(newIndex);
      setWord('');
    };
  }

  useEffect(() => {
    // Mount
    createCards();
  }, [])

  useEffect(() => {
    // Update
    cards.length && modifyActualCard();
  }, [word])

  const value = {
    word,
    actualCard,
    cards,
    gameOver,
    gameStatus,
    enter,
    setWord,
    setActualCard
  }

  return (
    <gameContext.Provider value={ value }>
      { children }
    </gameContext.Provider>
  )
}

export default GameProvider;
