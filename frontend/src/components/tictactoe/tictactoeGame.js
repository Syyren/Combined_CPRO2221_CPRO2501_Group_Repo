import React, { useState, useEffect } from "react";
import maxwellHeadImg from "../../images/tictactoe/maxwell_head.png";
import kiwiHeadImg from "../../images/tictactoe/kiwi_head.png";
import bobaHeadImg from "../../images/tictactoe/boba_head.png";
import maxwellPawImg from "../../images/tictactoe/maxwell_paw.png";

export default function TictactoeGame(props) {
  // Some variables. gameTitle is what's displayed at the top of the page. currentGame holds all the info of the current game.
  // boardState is the list of 9 segments that a Tic Tac Toe board is made of, and which players have played in there.
  // boardDisplay is the JSX that will be displayed in those 9 segments
  var gameTitle = <h1>Awaiting Game Selection</h1>;
  const [currentGame, setCurrentGame] = useState();
  const [boardDisplay, setBoardDisplay] = useState([]);
  const [boardState, setBoardState] = useState([]);
  // This runs and refreshes whenever the variables declared AFTER the function changes.
  useEffect(() => {
    // This checks if a game was selected, and passed as a prop ie <TictactoeGame gameId = "Joel_Kaden" />
    if (props.gameId) {
      // Get the actual data about the game
      fetch("http://localhost:8090/tictactoe/game/" + props.gameId, {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then((data) => {
          // Store the game data for use later
          setCurrentGame(data);
          setBoardState(data.boardState);
          // A list/array of images to display if player1 selected that segment
          var X = [
            <div style={{ textAlign: "center", width: "70%" }}>
              <img
                src={maxwellHeadImg}
                alt="(X) Maxwell the cat's face"
                style={{ width: "100%" }}
              ></img>
              <p style={{ fontSize: "0.6em" }}>
                Maxwell
                <br /> Image source: Travis Boblin
              </p>
            </div>,
            <div style={{ textAlign: "center", width: "70%" }}>
              <img
                src={bobaHeadImg}
                alt="(X) Boba the cat's face"
                style={{ width: "100%" }}
              ></img>
              <p style={{ fontSize: "0.6em" }}>
                Boba
                <br /> Image source: Ryan
              </p>
            </div>,
            <div style={{ textAlign: "center", width: "70%" }}>
              <img
                src={kiwiHeadImg}
                alt="(X) Kiwi the cat's face"
                style={{ width: "100%" }}
              ></img>
              <p style={{ fontSize: "0.6em" }}>
                Kiwi
                <br /> Image source: Samantha Lysons
              </p>
            </div>,
            "X",
            "X",
            "X",
            "X",
            "X",
            "X",
          ];
          // A list/array of images to display if player2 selected that segment
          var O = [
            <div style={{ textAlign: "center", width: "70%" }}>
              <img
                src={maxwellPawImg}
                alt="(O) Maxwell the cat's paw"
                style={{ width: "100%" }}
              ></img>
              <p style={{ fontSize: "0.6em" }}>
                Maxwell,
                <br /> Image source: Travis Boblin
              </p>
            </div>,
            "O",
            "O",
            "O",
            "O",
            "O",
            "O",
            "O",
            "O",
          ];
          // set up the boardDisplay variable with a list of images or buttons to display given the current board state
          setBoardDisplay(
            boardState.map((division, i) => {
              return (
                <div style={{ position: "absolute" }}>
                  {division === data.player1 ? (
                    // Player 1 played here, so get the JSX from the X list
                    X[i]
                  ) : division === data.player2 ? (
                    // Player 2 played here, so get the JSX from the Y list
                    O[i]
                  ) : (
                    // No player has played here, so display a button
                    <button></button>
                  )}
                </div>
              );
            })
          );
        });
    } else {
      // No game has been selected, so display an empty board
      setBoardState([null, null, null, null, null, null, null, null, null]);
      setBoardDisplay(
        boardState.map((data, i) => {
          return <div style={{ position: "absolute" }}></div>;
        })
      );
    }
    // The following list is of the deps for this react useEffect(); it will only run this subfunction when one of these variables changes
  }, [currentGame, props, boardState]);
  // Make sure to display the correct title
  if (currentGame) {
    gameTitle = (
      <h1>
        Game between {currentGame.player1} and {currentGame.player2}
      </h1>
    );
  } else {
  }
  // Avoid magic numbers, this controls how tall the tictactoe board is by making the height a percentage of the width
  var divHeight = "25%";
  return (
    <div>
      {" "}
      {gameTitle}
      <div class="container">
        <div class="row">
          <div
            class="col-4"
            style={{
              paddingBottom: divHeight,
              borderBottom: "solid black 5px",
              borderRight: "solid black 5px",
            }}
          >
            {boardDisplay[0]}
          </div>
          <div
            class="col-4"
            style={{
              paddingBottom: divHeight,
              borderBottom: "solid black 5px",
              borderRight: "solid black 5px",
              borderLeft: "solid black 5px",
            }}
          >
            {boardDisplay[1]}
          </div>
          <div
            class="col-4"
            style={{
              paddingBottom: divHeight,
              borderBottom: "solid black 5px",
              borderLeft: "solid black 5px",
            }}
          >
            {boardDisplay[2]}
          </div>
        </div>

        <div class="row">
          <div
            class="col-4"
            style={{
              paddingBottom: divHeight,
              borderTop: "solid black 5px",
              borderBottom: "solid black 5px",
              borderRight: "solid black 5px",
            }}
          >
            {boardDisplay[3]}
          </div>
          <div
            class="col-4"
            style={{
              paddingBottom: divHeight,
              borderTop: "solid black 5px",
              borderBottom: "solid black 5px",
              borderRight: "solid black 5px",
              borderLeft: "solid black 5px",
            }}
          >
            {boardDisplay[4]}
          </div>
          <div
            class="col-4"
            style={{
              paddingBottom: divHeight,
              borderTop: "solid black 5px",
              borderBottom: "solid black 5px",
              borderLeft: "solid black 5px",
            }}
          >
            {boardDisplay[5]}
          </div>
        </div>

        <div class="row">
          <div
            class="col-4"
            style={{
              paddingBottom: divHeight,
              borderTop: "solid black 5px",
              borderRight: "solid black 5px",
            }}
          >
            {boardDisplay[6]}
          </div>
          <div
            class="col-4"
            style={{
              paddingBottom: divHeight,
              borderTop: "solid black 5px",
              borderRight: "solid black 5px",
              borderLeft: "solid black 5px",
            }}
          >
            {boardDisplay[7]}
          </div>
          <div
            class="col-4"
            style={{
              paddingBottom: divHeight,
              borderTop: "solid black 5px",
              borderLeft: "solid black 5px",
            }}
          >
            {boardDisplay[8]}
          </div>
        </div>
      </div>
    </div>
  );
}
