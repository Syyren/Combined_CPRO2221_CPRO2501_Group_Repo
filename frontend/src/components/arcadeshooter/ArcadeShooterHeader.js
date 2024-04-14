const ArcadeShooterHeader = ({ lives, level, score }) => (
  <header className="d-flex justify-content-between align-items-center bg-primary text-white p-3">
    <h1 className="h3">Arcade Shooter</h1>
    <div>Lives: {lives}</div>
    <div>Level: {level}</div>
    <div>Score: {score}</div>
  </header>
);

export default ArcadeShooterHeader;
