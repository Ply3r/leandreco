import linkedinIcon from '../img/linkedin.png';
import githubIcon from '../img/github.png';

const Info = () => {
  return (
    <div className="doubts">
      <h2>Informações</h2>
      <p>
        Esse é um jogo no estilo Wordle, peguei como inspiração o <a href="https://term.ooo/">Termo</a>, 
        <a href="https://www.gabtoschi.com/letreco/">Letreco</a> e o proprio <a href="https://www.nytimes.com/games/wordle/index.html">Wordle</a>, tive como objetivo ao fazer esse projeto entender 
        e aprender como funciona esse estilo de jogo, Eu utilizei os dados do repositório <a href="https://github.com/fserb/pt-br">pt-br</a> 
        que tem a licença MIT.
      </p>
      <p>
        Esse jogo não salva suas informações em nenhum servidor 
        elas ficam salvas somente nos dados do seu navegador
      </p>
      <h3>Meus contatos</h3>
      <div>
        <a href="https://github.com/Ply3r"><img alt="github icon" src={ githubIcon }/></a>
        <a href="https://www.linkedin.com/in/leandro-henrique-soares/"><img alt="linkedin icon" src={ linkedinIcon } /></a>
      </div>
    </div>
  )
}

export default Info;
