const Doubts = () => (
  <div className="doubts">
    <h2>Como Jogar?</h2>
    <p>
      Esse é um jogo de adivinhação,
      tente encontrar a palavra correta em 6 tentativas,
      a cada palavra enviada é dada uma dica se você esta perto ou não
    </p>
    <img alt="tentativa-1" src="https://i.ibb.co/xMxB45t/image-2.png" />
    <p>
      As letras <span className="doubts-span rigth">P</span> e <span className="doubts-span rigth">A</span> ficaram verde 
      pois você acertou as letras e elas estão na posição correta.
    </p>
    <p>
      A letra <span className="doubts-span hasOne">O</span> ficou amarela pois você acertou a letra 
      mas ela não esta na posição correta.
    </p>
    <p>
      As letras <span className="doubts-span wrong">R</span> e <span className="doubts-span wrong">S</span> ficaram pretas pois elas 
      não existem na palavra correta.
    </p>
  </div>
)

export default Doubts
