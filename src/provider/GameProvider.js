import { useEffect, useState } from 'react';
import gameContext from './GameContext';
import local from '../utils/localStorage.js';
import data from '../data';

const GameProvider = ({ children }) => {
  const [gameOptions, setGameOptions] = useState({
    gameOver: false,
    gameStatus: '',
    length: 5,
    rigthAnswer: ''
  })
  const [word, setWord] = useState('');
  const [actualCard, setActualCard] = useState(0);
  const [cards, setCards] = useState([]);

  const createCards = () => {
    const cardsArray = new Array(6).fill(new Array(gameOptions.length).fill({
      letter: '',
      hasOne: false,
      rigth: false,
      wrong: false
    }));

    setGameOptions({
      ...gameOptions,
      gameOver: false,
      gameStatus: '',
      rigthAnswer: data.getRandomWord(gameOptions.length)
    });
    
    setWord('');
    setActualCard(0);
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
    const { rigthAnswer } = gameOptions;
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
      local.handleRigth({ position: actualCard + 1 });
      setGameOptions({ ...gameOptions, gameStatus: 'winner', gameOver: true });
    }

    const newCards = cards.map((value, index) => index === actualCard ? teste : value)
    setCards(newCards);

    return allCorrect;
  }

  const enter = () => {
    const cardsLength = cards.length;
    const newIndex = actualCard + 1;

    const winner = verifyWords();
    if (winner) return;

    if (newIndex > cardsLength - 1) {
      local.handleWrong();
      setGameOptions({ ...gameOptions, gameStatus: 'loser', gameOver: true });
      return;
    }

    if (!gameOptions.gameOver) {
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

  useEffect(() => {
    // Update
    createCards();
  }, [gameOptions.length])

  const value = {
    word,
    actualCard,
    cards,
    gameOptions,
    enter,
    setWord,
    setActualCard,
    createCards,
    setGameOptions
  }

  return (
    <gameContext.Provider value={ value }>
      { children }
    </gameContext.Provider>
  )
}

export default GameProvider;
