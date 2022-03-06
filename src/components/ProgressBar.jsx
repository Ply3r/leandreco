const ProgressBar = ({ percentage, value, wrong }) => (
  <div className="progress-bar">
    <div 
      className={`progress ${wrong ? 'progress-wrong' : ''}`}
      style={ { 'width': `${percentage}%`} }
    >
      { value ? value : '' }
    </div>
  </div>
);

export default ProgressBar;
