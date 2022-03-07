const fs = require('fs');

const createPalavrasJson = () => {
  const palavras = fs.readFileSync('./data/data.txt', 'utf-8');
  const palavrasArray = palavras.split('\n');

  const onlyPopularWords = palavrasArray.filter((data) => {
    const [_word, popularity] = data.split(',');

    return +popularity > 100000
  })

  const words = onlyPopularWords.map((data) => {
    const [word] = data.split(',');
    
    return word
  })

  fs.writeFileSync('./data/palavras.json', JSON.stringify(words))
}

const separateByLength = (length) => {
  const palavras = fs.readFileSync('./data/palavras.json', 'utf-8')
  const arrayPalavras = JSON.parse(palavras);
  const newArray = arrayPalavras.filter((palavra) => palavra.length === length);
  
  fs.writeFileSync(`./data/length-${length}.json`, JSON.stringify(newArray));
}

const getRandomWord = (length) => {
  const word = fs.readFileSync(`./data/length-${length}.json`, 'utf-8');
  const array = JSON.parse(word);

  const randomNumber = Math.round(Math.random() * array.length);
  const randomWord = array[randomNumber];

  return randomWord;
}

const checkWord = (word, length) => {
  const words = fs.readFileSync(`./data/length-${length}.json`, 'utf-8');
  const arrayWords = JSON.parse(words);
  const lowerCase = word.toLowerCase();

  const isValid = arrayWords.some((word) => {
    const withoutAcent = word.normalize("NFD").replace(/[\u0300-\u036f]/g, "")

    return withoutAcent === lowerCase;
  });

  return isValid;
}

module.exports = { getRandomWord, checkWord }