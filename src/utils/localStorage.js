const createPlayer = () => {
  const player = {
    acertos: {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0
    },
    vezesJogadas: 0,
    maiorSequencia: 0,
    sequenciaVitorias: 0
  }

  localStorage.setItem('player', JSON.stringify(player))
  return player;
};

const getPlayer = () => {
  let player = localStorage.getItem('player');

  if (!player) {
    player = createPlayer()
    return player;
  }

  return JSON.parse(player);
};

const handleRigth = ({ position }) => {
  const player = getPlayer();

  const {
    acertos,
    vezesJogadas,
    sequenciaVitorias,
    maiorSequencia,
  } = player;

  const newAcertos = { ...acertos, [position]: acertos[position] + 1 }
  const newVezesJogadas = vezesJogadas + 1
  const newSequencia = sequenciaVitorias + 1
  const newMaiorSequencia = newSequencia > maiorSequencia ? newSequencia : maiorSequencia

  const newPlayer = {
    acertos: newAcertos,
    vezesJogadas: newVezesJogadas,
    sequenciaVitorias: newSequencia,
    maiorSequencia: newMaiorSequencia
  }

  localStorage.setItem('player', JSON.stringify(newPlayer))
}

const handleWrong = () => {
  const player = getPlayer();

  const {
    acertos,
    vezesJogadas,
    sequenciaVitorias,
    maiorSequencia,
  } = player;

  const newVezesJogadas = vezesJogadas + 1
  const newPlayer = {
    acertos,
    vezesJogadas: newVezesJogadas,
    sequenciaVitorias,
    maiorSequencia
  }

  localStorage.setItem('player', JSON.stringify(newPlayer))
}

export default { handleRigth, handleWrong };
