import length5 from './length-5.json';

const getRandomWord = () => {
  const array = length5;

  const randomNumber = Math.round(Math.random() * array.length);
  const randomWord = array[randomNumber];

  return randomWord;
}

const checkWord = (word) => {
  const arrayWords = length5;
  const lowerCase = word.toLowerCase();

  const isValid = arrayWords.some((word) => {
    const withoutAcent = word.normalize("NFD").replace(/[\u0300-\u036f]/g, "")

    return withoutAcent === lowerCase;
  });

  return isValid;
}

const functions = { getRandomWord, checkWord }
export default functions;