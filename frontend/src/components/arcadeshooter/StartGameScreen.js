const StartGameScreen = ({ onStart }) => (
  <div className="start-screen">
    <h1>Welcome to Arcade Shooter!</h1>
    <button onClick={onStart}>Play</button>
  </div>
);

export default StartGameScreen;
