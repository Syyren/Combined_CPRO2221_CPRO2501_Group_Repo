import TictactoeGame from "./tictactoeGame";
import React, { useState, useEffect } from "react";

import { useAuth } from "../../context/AuthContext";

import { getAllPlayers } from "../../controllers/PlayerController";

// Authorization, for integration with other features
const authUserName = "john_doe";
const authPassword = "password123";
const preAuthToken = btoa(`${authUserName}:${authPassword}`);
const authToken = `Basic ${preAuthToken}`;

export default function TictactoeMenu() {
  //console.log("Loading tictactoe");
  // the game to display on the right
  const [displayTictactoeGame, setDisplayTictactoeGame] = useState(
    <TictactoeGame />
  );
  const [usersIdsList, setUsersIdsList] = useState([]);
  const [recomendedUsers, setRecomendedUsers] = useState();
  // Get current userId
  var { currentUser } = useAuth();
  useEffect(() => {
    // Get list of all users
    getAllPlayers()
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((res) => {
        console.log(res);
      });
  }, []);
  // Get a list of all ongoing games the current user is participating in
  // and compile a list of opponents in active games against this user
  var allOpponents = [];
  const [currentGames, setCurrentGames] = useState([]);
  useEffect(() => {
    //console.log(currentUser)
    if (currentUser) {
      fetch("http://localhost:8090/tictactoe/games/" + currentUser.username, {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
          Authorization: authToken,
        },
      })
        .then((res) => res.json())
        .then((data) => setCurrentGames(data));
    }
  }, [displayTictactoeGame, currentUser]);
  //console.log(currentGames);
  // take the list of current games and make it into clickable buttons
  if (currentGames.constructor === Array) {
    var displayGames = currentGames.map((currentGame) => {
      // determine which player in the currently selected game is the opponent
      var opponent = [currentGame.player1, currentGame.player2].filter(
        (e) => e !== currentUser.username
      )[0];
      // get whether it's the user's turn in the current game:
      var buttonClass = "btn btn-warning";
      var buttonAdditionalText = "It's their turn";
      if (currentGame.lastPlayerMoved !== currentUser.username) {
        buttonClass = "btn btn-success";
        buttonAdditionalText = "It's your turn";
      }
      // add the opponent to the list being compiled
      allOpponents.push(opponent);
      // return the button for this game
      return (
        <li key={currentGame.id}>
          <button
            className={buttonClass}
            // When this button is clicked, load the game with this id
            onClick={() => {
              setDisplayTictactoeGame(
                <TictactoeGame
                  gameId={currentGame.id}
                  currentPlayer={currentUser.username}
                  callback={function (updatedGame) {
                    console.log(updatedGame);
                    console.log(updatedGame.id);
                    fetch(
                      "http://localhost:8090/tictactoe/checkWinner/" +
                        updatedGame.id,
                      { headers: { Authorization: authToken } }
                    )
                      .then((res) => res.text())
                      .then((data) => {
                        console.log(data);
                        if (data == null) {
                          setDisplayTictactoeGame(
                            <TictactoeGame
                              gameId={updatedGame.id}
                              currentPlayer={currentUser.username}
                            />
                          );
                        } else if (data === updatedGame.player1) {
                          fetch(
                            "http://localhost:8090/tictactoe/delete/" +
                              updatedGame.id,
                            {
                              method: "DELETE",
                              headers: { Authorization: authToken },
                            }
                          );
                          fetch(
                            "http://localhost:8090/scores/tictactoe/update/" +
                              updatedGame.player1 +
                              "?deltaScore=" +
                              10 +
                              "&conclusion=WINNER",
                            {
                              method: "PUT",
                              headers: { Authorization: authToken },
                            }
                          );
                          fetch(
                            "http://localhost:8090/scores/tictactoe/update/" +
                              updatedGame.player2 +
                              "?deltaScore=" +
                              -10 +
                              "&conclusion=LOSER",
                            {
                              method: "PUT",
                              headers: { Authorization: authToken },
                            }
                          );
                          setDisplayTictactoeGame(<TictactoeGame />);
                        } else if (data === updatedGame.player2) {
                          fetch(
                            "http://localhost:8090/tictactoe/delete/" +
                              updatedGame.id,
                            {
                              method: "DELETE",
                              headers: { Authorization: authToken },
                            }
                          );
                          fetch(
                            "http://localhost:8090/scores/tictactoe/update/" +
                              updatedGame.player1 +
                              "?deltaScore=" +
                              -10 +
                              "&conclusion=LOSER",
                            {
                              method: "PUT",
                              headers: { Authorization: authToken },
                            }
                          );
                          fetch(
                            "http://localhost:8090/scores/tictactoe/update/" +
                              updatedGame.player2 +
                              "?deltaScore=" +
                              10 +
                              "&conclusion=WINNER",
                            {
                              method: "PUT",
                              headers: { Authorization: authToken },
                            }
                          );
                          setDisplayTictactoeGame(<TictactoeGame />);
                        } else if (data === "draw") {
                          fetch(
                            "http://localhost:8090/tictactoe/delete/" +
                              updatedGame.id,
                            {
                              method: "DELETE",
                              headers: { Authorization: authToken },
                            }
                          );
                          fetch(
                            "http://localhost:8090/scores/tictactoe/update/" +
                              updatedGame.player1 +
                              "?deltaScore=" +
                              0 +
                              "&conclusion=DRAW",
                            {
                              method: "PUT",
                              headers: { Authorization: authToken },
                            }
                          );
                          fetch(
                            "http://localhost:8090/scores/tictactoe/update/" +
                              updatedGame.player2 +
                              "?deltaScore=" +
                              0 +
                              "&conclusion=DRAW",
                            {
                              method: "PUT",
                              headers: { Authorization: authToken },
                            }
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

  useEffect(() => {
    // remove current user and current opponents from list and scramble it, then get just the top 10
    var tempUsersIdsList = shuffleArray(
      usersIdsList.filter(
        (e) => e !== currentUser.username && !allOpponents.includes(e)
      )
    ).slice(0, Math.min(10, usersIdsList.length - 1));
    //console.log(usersIdsList);
    if (tempUsersIdsList.constructor === Array) {
      setRecomendedUsers(
        tempUsersIdsList.map((userId) => {
          return (
            <li key={userId}>
              <button
                className="btn btn-primary"
                // When this button is clicked, create a new game in the database, then load it
                onClick={async function () {
                  await fetch("http://localhost:8090/tictactoe/save", {
                    method: "POST",
                    mode: "cors",
                    cache: "no-cache",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: authToken,
                    },
                    body: JSON.stringify({
                      player1: currentUser.username,
                      player2: userId,
                    }),
                  })
                    .then((res) => res.json())
                    .then((data) => {
                      var tempId = data.id;

                      setDisplayTictactoeGame(
                        <TictactoeGame
                          gameId={tempId}
                          currentPlayer={currentUser.username}
                          callback={function (updatedGame) {
                            setDisplayTictactoeGame(
                              <TictactoeGame
                                gameId={updatedGame.id}
                                currentPlayer={currentUser.username}
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
        })
      );
    }
  }, [usersIdsList]);
  // Finalize display
  return (
    <div className="row row-cols-2">
      <div className="col-md-4">
        <h2>Current Games:</h2>
        <ul className="gap-3">{displayGames}</ul>
        <h2>Recomended opponents:</h2>
        <ul className="gap-3">{recomendedUsers}</ul>
      </div>
      <div className="col-md-8">{displayTictactoeGame}</div>
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
