import React from "react";

/**
 * Footer component for the Arcade Shooter game, containing controls information and game action buttons.
 *
 * @param {Function} onQuit - Callback function to handle quitting the game.
 * @param {Function} onPause - Callback function to handle pausing or resuming the game.
 */
const ArcadeShooterFooter = ({ onQuit, onPause }) => {
  return (
    <footer className="d-flex justify-content-between align-items-center bg-primary p-3">
      <div className="card" style={{ maxWidth: "400px" }}>
        <div className="card-body">
          <h5 className="card-title">Controls</h5>
          <table className="table table-sm table-borderless">
            <tbody>
              <tr>
                <td>
                  <kbd>←</kbd>
                </td>
                <td>Move Left</td>
              </tr>
              <tr>
                <td>
                  <kbd>→</kbd>
                </td>
                <td>Move Right</td>
              </tr>
              <tr>
                <td>
                  <kbd>Space</kbd>
                </td>
                <td>Shoot</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <button onClick={onQuit} className="btn btn-danger mx-2">
          Quit Game
        </button>
        <button onClick={onPause} className="btn btn-secondary">
          Pause/Resume Game
        </button>
      </div>
    </footer>
  );
};

export default ArcadeShooterFooter;
