import length4 from './length-4.json';
import length5 from './length-5.json';
import length6 from './length-6.json';
import length7 from './length-7.json';

const words = {
  4: length4,
  5: length5,
  6: length6,
  7: length7
}

const getRandomWord = (length) => {
  const array = words[length];

  const randomNumber = Math.round(Math.random() * array.length);
  const randomWord = array[randomNumber];

  return randomWord;
}

const checkWord = (word, length) => {
  const arrayWords = words[length];
  const lowerCase = word.toLowerCase();

  const isValid = arrayWords.some((word) => {
    const withoutAcent = word.normalize("NFD").replace(/[\u0300-\u036f]/g, "")

    return withoutAcent === lowerCase;
  });

  return isValid;
}

const functions = { getRandomWord, checkWord }
export default functions;