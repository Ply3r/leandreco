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
  const [mode, setMode] = useState('game');
  const [suggestions, setSuggestions] = useState([]);
  const [solverData, setSolverData] = useState([]);

  const getSuggestions = () => {
    const words = data.getWords(gameOptions.length);

    const suggestions = words.filter((word) => {
      word = word.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

      return solverData.every((rule) => {
        if (rule.wrong) return !word.includes(rule.letter);

        return rule.exists_in.every((position) => word[position] === rule.letter) && 
               (word.includes(rule.letter) && rule.not_in.every((position) => word[position] !== rule.letter));
      })
    })

    setSuggestions(suggestions);
  }

  const updateSolver = (cardIndex, letter, position, solverValue) => {
    letter = letter.toLowerCase();
    updateCard(cardIndex, position, solverValue);
    const newSolverData = [...solverData];
    const solverLetter = newSolverData.find((solver) => solver.letter === letter);

    if (!solverLetter) {
      const exists_in = solverValue === 'rigth' ? [position] : [];
      const not_in = solverValue === 'hasOne' ? [position] : [];

      newSolverData.push({
        letter: letter,
        exists_in,
        not_in,
        wrong: solverValue === 'wrong'
      })

      return setSolverData(newSolverData);
    }

    solverLetter.exists_in = solverLetter.exists_in.filter((p) => p !== position);
    solverLetter.not_in = solverLetter.not_in.filter((p) => p !== position);
    solverLetter.wrong = solverValue === 'wrong';

    if (solverValue === 'rigth') solverLetter.exists_in.push(position);
    if (solverValue === 'hasOne') solverLetter.not_in.push(position);

    setSolverData(newSolverData);
  }

  const updateCard = (index, position, cardValue) => {
    const newCards = [...cards];
    newCards[index][position].wrong = false;
    newCards[index][position].rigth = false;
    newCards[index][position].hasOne = false;
    newCards[index][position][cardValue] = true;
    setCards(newCards);
  }

  const createCards = (isSolver=false) => {
    const cardsArray = new Array(6).fill(new Array(gameOptions.length).fill({
      letter: '',
      hasOne: false,
      rigth: false,
      wrong: false
    }));

    const rigthAnswer = isSolver ? '' : data.getRandomWord(gameOptions.length);

    setGameOptions({
      ...gameOptions,
      gameOver: false,
      gameStatus: '',
      rigthAnswer
    });
    
    setWord('');
    setActualCard(0);
    setCards(cardsArray);
    setSolverData([]);
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
      if (mode === 'solver') {
        const newSolverData = [...solverData];

        word.split('').forEach((letter) => {
          if (solverData.some((solver) => solver.letter === letter.toLowerCase())) return;

          newSolverData.push({
            exists_in: [],
            not_in: [],
            letter: letter.toLowerCase(),
            wrong: true
          });
        })

        setSolverData(newSolverData);
      }
      
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

  useEffect(getSuggestions, [solverData])

  const value = {
    word,
    actualCard,
    cards,
    updateSolver,
    setCards,
    gameOptions,
    enter,
    setWord,
    setActualCard,
    createCards,
    setGameOptions,
    mode,
    setMode,
    solverData,
    setSolverData,
    suggestions
  }

  return (
    <gameContext.Provider value={ value }>
      { children }
    </gameContext.Provider>
  )
}

export default GameProvider;
