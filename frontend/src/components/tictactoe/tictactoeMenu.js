import TictactoeGame from "./tictactoeGame";
import React, { useState, useEffect } from "react";

// Fake data, in reality we would get this from the users backend branch
let fakeUsersList = [
  "Joel",
  "Annette",
  "Ryan",
  "Bergen",
  "Kaden",
  "Kayden",
  "Travis",
  "Mohammed",
  "Travis2",
  "Greg",
  "SpidersGoerg",
  "Rohit",
  "Webster",
  "Watson",
  "Mario",
  "Luigi",
  "IAmGroot",
  "Mordenkainen",
  "Kermit",
  "Murphy",
  "xXILikeFeetXx",
  "420forL1fe",
];

let fakeCurrentUser = "Kaden";

export default function TictactoeMenu() {
  //console.log("Loading tictactoe");
  // the game to display on the right
  const [displayTictactoeGame, setDisplayTictactoeGame] = useState(
    <TictactoeGame />
  );
  // Get current userId; replace with API call when login feature done
  var currentUserId = fakeCurrentUser;
  // Get list of all users; replace with API call when login feature done
  var usersIdsList = fakeUsersList;
  // Get a list of all ongoing games the current user is participating in
  // and compile a list of opponents in active games against this user
  var allOpponents = [];
  const [currentGames, setCurrentGames] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8090/tictactoe/games/" + currentUserId, {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => setCurrentGames(data));
  }, [displayTictactoeGame, currentUserId]);
  //console.log(currentGames);
  // take the list of current games and make it into clickable buttons
  if (currentGames.constructor === Array) {
    var displayGames = currentGames.map((currentGame) => {
      // determine which player in the currently selected game is the opponent
      var opponent = [currentGame.player1, currentGame.player2].filter(
        (e) => e !== currentUserId
      )[0];
      // get whether it's the user's turn in the current game:
      var buttonClass = "btn btn-warning";
      var buttonAdditionalText = "It's their turn";
      if (currentGame.lastPlayerMoved !== currentUserId) {
        buttonClass = "btn btn-success";
        buttonAdditionalText = "It's your turn";
      }
      // add the opponent to the list being compiled
      allOpponents.push(opponent);
      // return the button for this game
      return (
        <li key={currentGame.id}>
          <button
            class={buttonClass}
            // When this button is clicked, load the game with this id
            onClick={() => {
              setDisplayTictactoeGame(
                <TictactoeGame
                  gameId={currentGame.id}
                  currentPlayer={currentUserId}
                  callback={function (updatedGame) {
                    console.log(updatedGame);
                    console.log(updatedGame.id);
                    fetch(
                      "http://localhost:8090/tictactoe/checkWinner/" +
                        updatedGame.id
                    )
                      .then((res) => res.text())
                      .then((data) => {
                        console.log(data);
                        if (data == null) {
                          setDisplayTictactoeGame(
                            <TictactoeGame
                              gameId={updatedGame.id}
                              currentPlayer={currentUserId}
                            />
                          );
                        } else if (data === updatedGame.player1) {
                          fetch(
                            "http://localhost:8090/tictactoe/delete/" +
                              updatedGame.id,
                            { method: "DELETE" }
                          );
                          fetch(
                            "http://localhost:8090/scores/tictactoe/update/" +
                              updatedGame.player1 +
                              "?deltascore=" +
                              10 +
                              "&conclusion=WINNER",
                            { method: "PUT" }
                          );
                          fetch(
                            "http://localhost:8090/scores/tictactoe/update/" +
                              updatedGame.player2 +
                              "?deltascore=" +
                              -10 +
                              "&conclusion=LOSER",
                            { method: "PUT" }
                          );
                          setDisplayTictactoeGame(<TictactoeGame />);
                        } else if (data === updatedGame.player2) {
                          fetch(
                            "http://localhost:8090/tictactoe/delete/" +
                              updatedGame.id,
                            { method: "DELETE" }
                          );
                          fetch(
                            "http://localhost:8090/scores/tictactoe/update/" +
                              updatedGame.player1 +
                              "?deltascore=" +
                              -10 +
                              "&conclusion=LOSER",
                            { method: "PUT" }
                          );
                          fetch(
                            "http://localhost:8090/scores/tictactoe/update/" +
                              updatedGame.player2 +
                              "?deltascore=" +
                              10 +
                              "&conclusion=WINNER",
                            { method: "PUT" }
                          );
                          setDisplayTictactoeGame(<TictactoeGame />);
                        } else if (data === "draw") {
                          fetch(
                            "http://localhost:8090/tictactoe/delete/" +
                              updatedGame.id,
                            { method: "DELETE" }
                          );
                          fetch(
                            "http://localhost:8090/scores/tictactoe/update/" +
                              updatedGame.player1 +
                              "?deltascore=" +
                              0 +
                              "&conclusion=DRAW",
                            { method: "PUT" }
                          );
                          fetch(
                            "http://localhost:8090/scores/tictactoe/update/" +
                              updatedGame.player2 +
                              "?deltascore=" +
                              0 +
                              "&conclusion=DRAW",
                            { method: "PUT" }
                          );
                          setDisplayTictactoeGame(<TictactoeGame />);
                        }
                      });
                  }}
                />
              );
            }}
          >
            Ongoing game against {opponent}
            <br />
            {buttonAdditionalText}
          </button>
        </li>
      );
    });
  }

  // remove current user and current opponents from list and scramble it, then get just the top 10
  usersIdsList = shuffleArray(
    usersIdsList.filter((e) => e !== currentUserId && !allOpponents.includes(e))
  ).slice(0, Math.min(10, usersIdsList.length - 1));
  //console.log(usersIdsList);
  if (usersIdsList.constructor === Array) {
    var recomendedUsers = usersIdsList.map((userId) => {
      return (
        <li key={userId}>
          <button
            class="btn btn-primary"
            // When this button is clicked, create a new game in the database, then load it
            onClick={async function () {
              await fetch("http://localhost:8090/tictactoe/save", {
                method: "POST",
                mode: "cors",
                cache: "no-cache",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  player1: currentUserId,
                  player2: userId,
                }),
              })
                .then((res) => res.json())
                .then((data) => {
                  var tempId = data.id;

                  setDisplayTictactoeGame(
                    <TictactoeGame
                      gameId={tempId}
                      currentPlayer={currentUserId}
                      callback={function (updatedGame) {
                        setDisplayTictactoeGame(
                          <TictactoeGame
                            gameId={updatedGame.id}
                            currentPlayer={currentUserId}
                          />
                        );
                      }}
                    />
                  );
                });
            }}
          >
            Start game against {userId}
          </button>
        </li>
      );
    });
  }
  // Finalize display
  return (
    <div class="row row-cols-2">
      <div class="col-md-4">
        <h2>Current Games:</h2>
        <ul class="gap-3">{displayGames}</ul>
        <h2>Recomended opponents:</h2>
        <ul class="gap-3">{recomendedUsers}</ul>
      </div>
      <div class="col-md-8">{displayTictactoeGame}</div>
    </div>
  );
}

// Durstenfield Shuffle
// Sourced from stackOverflow
// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}