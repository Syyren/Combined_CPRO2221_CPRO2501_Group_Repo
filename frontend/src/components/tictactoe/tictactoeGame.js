import React, { useState, useEffect } from "react";

export default function TictactoeGame(props) {
  var gameTitle = <h1>Awaiting Game Selection</h1>;
  const [currentGame, setCurrentGame] = useState();
  const [boardDisplay, setBoardDisplay] = useState([]);
  const [boardState, setBoardState] = useState([]);
  useEffect(() => {
    if (props.gameId) {
      fetch("http://localhost:8090/tictactoe/game/" + props.gameId, {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then((data) => {
          setCurrentGame(data);
          setBoardState(data.boardState);
          var X = ["X", "X", "X", "X", "X", "X", "X", "X", "X"];
          var O = ["O", "O", "O", "O", "O", "O", "O", "O", "O"];
          setBoardDisplay(
            boardState.map((division, i) => {
              return (
                <div style={{ position: "absolute" }}>
                  {division == data.player1 ? (
                    X[i]
                  ) : division == data.player2 ? (
                    O[i]
                  ) : (
                    <button></button>
                  )}
                </div>
              );
            })
          );
        });
    } else {
      setBoardState([null, null, null, null, null, null, null, null, null]);
      setBoardDisplay(
        boardState.map((data, i) => {
          return (
            <div>
              {data} {i}
            </div>
          );
        })
      );
    }
  }, [currentGame, props]);
  if (currentGame) {
    gameTitle = (
      <h1>
        Game between {currentGame.player1} and {currentGame.player2}
      </h1>
    );
  } else {
  }
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
