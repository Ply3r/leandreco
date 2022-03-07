import { useContext, useEffect, useState } from 'react';
import gameContext from '../provider/GameContext';
import local from '../utils/localStorage.js';
import { ImCross } from 'react-icons/im';
import { FcApproval } from 'react-icons/fc';
import Acertos from './Acertos';

const Status = () => {
  const { gameOptions } = useContext(gameContext);
  const [active, setActive] = useState(false);
  const [userInfo, setUserInfo] = useState();

  const getUserInfo = () => {
    const user = local.getPlayer();
    setUserInfo(user);
  }

  useEffect(() => {
    getUserInfo();
    setActive(gameOptions.gameOver);
  }, [gameOptions])

  return active && (
    <div className="status">
      <div className="status-header">
        <div
          className="status-close"
          onClick={ () => setActive(false) }
        >
          <ImCross />
        </div>
      </div>
      <div className="status-info-container">
        <div className="status-message">
          <div className={`status-icon ${gameOptions.gameStatus === 'winner' ? 'icon-approve' : 'icon-disapprove' }`}>
            { gameOptions.gameStatus === 'winner' ? <FcApproval /> : <ImCross /> }
          </div>
          <h2>{ gameOptions.gameStatus === 'winner' ? 'Mandou Bem!' : 'Boa sorte na próxima!' }</h2>
          <h3>
            A palavra era
            <span>{ gameOptions.rigthAnswer.toUpperCase() }</span>
          </h3>
        </div>
        <div className='status-infos'>
          <h2>Estatística</h2>
          <h3>Vezes jogadas: <span>{ userInfo.vezesJogadas }</span></h3>
          <h3>Sequencia: <span>{ userInfo.sequenciaVitorias }</span></h3>
          <h3>Maior sequencia: <span>{ userInfo.maiorSequencia }</span></h3>
          <Acertos userInfo={ userInfo } />
        </div>
      </div>
    </div>
  )
};

export default Status;
