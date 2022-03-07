import { useEffect, useState } from 'react';
import gameContext from './GameContext';
import local from '../utils/localStorage.js';
import data from '../data';

const GameProvider = ({ children }) => {
  const [gameStatus, setGameStatus] = useState('')
  const [rigthAnswer, setRigthAnswer] = useState('');
  const [word, setWord] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [actualCard, setActualCard] = useState(0);
  const [cards, setCards] = useState([]);

  const createCards = () => {
    const cardsArray = new Array(6).fill(new Array(5).fill({
      letter: '',
      hasOne: false,
      rigth: false,
      wrong: false
    }));

    setGameOver(false);

    setRigthAnswer(data.getRandomWord(5))
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
    const answerWithouAcents = rigthAnswer.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    
    const newArray = letters.map((letter, index) => {
      const regex = new RegExp(letter, 'gmi');
      const rigth = letter.toLowerCase() === answerWithouAcents[index];
      const hasOne = regex.test(answerWithouAcents);
      const wrong = !hasOne;

      return { 
        letter: rigth ? rigthAnswer[index].toUpperCase() : letter, 
        hasOne, 
        rigth,
        wrong
      }
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
      setGameStatus('winner')
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
      setGameStatus('loser')
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
    rigthAnswer,
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
