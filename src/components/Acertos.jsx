import ProgressBar from "./ProgressBar";
import { FaSkull } from 'react-icons/fa';

const Acertos = ({ userInfo }) => {
  const arrayAcertos = Object.entries(userInfo.acertos);

  const elements = arrayAcertos.map(([key, value]) => {
    const percentage = value ?  (value * 100 ) / userInfo.vezesJogadas : 0

    return (
      <div key={ `acerto-n${key}` } className="acerto">
        <span>{ +key !== 7 ? key : <FaSkull /> }</span>
        <ProgressBar 
          wrong={ +key === 7 } 
          percentage={ percentage } 
          value={ value } 
        />
      </div>
    )
  })

  return (
    <div className="acerto-container">
      { elements }
    </div>
  );
};

export default Acertos;
