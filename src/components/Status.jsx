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
  const [percentage, setPercentage] = useState(0)

  const getUserInfo = () => {
    const user = local.getPlayer();
    setUserInfo(user);
  }

  const getPercentage = () => {
    const acertosArray = Object.entries(userInfo.acertos)
    const vezesAcertadas = acertosArray.reduce((acc, [key, value]) => {
      if (+key === 7) return acc;
      return acc + value
    }, 0)

    const hold = vezesAcertadas ?  (vezesAcertadas * 100 ) / userInfo.vezesJogadas : 0
    setPercentage(Math.round(hold))
  }

  useEffect(() => {
    getUserInfo();
    setActive(gameOptions.gameOver);
  }, [gameOptions])

  useEffect(() => {
    userInfo && getPercentage();
  }, [userInfo])

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
          <div className='status-game-infos'>
            <div>
              <h3>{ userInfo.vezesJogadas }</h3>
              <h4>Vezes jogadas</h4>
            </div>
            <div>
              <h3>{ percentage + '%' }</h3>
              <h4>Porcentagem de vitória</h4>
            </div>
            <div>
              <h3>{ userInfo.sequenciaVitorias }</h3>
              <h4>Sequencia</h4>
            </div>
            <div>
              <h3>{ userInfo.maiorSequencia }</h3>
              <h4>Maior sequencia</h4>
            </div>
          </div>
          <Acertos userInfo={ userInfo } />
        </div>
      </div>
    </div>
  )
};

export default Status;
