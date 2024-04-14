const ArcadeShooterFooter = ({ onQuit, onPause }) => (
  <footer className="d-flex justify-content-end bg-light p-3">
    <button onClick={onQuit} className="btn btn-danger mr-2">
      Quit Game
    </button>
    <button onClick={onPause} className="btn btn-secondary">
      Pause/Resume Game
    </button>
  </footer>
);

export default ArcadeShooterFooter;
