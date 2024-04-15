import React, { useState, useEffect } from "react";
// import images to use. I import them so that react knows to include them when we compile and build this project
import maxwellHeadImg from "../../images/tictactoe/maxwell_head.png";
import kiwiHeadImg from "../../images/tictactoe/kiwi_head.png";
import bobaHeadImg from "../../images/tictactoe/boba_head.png";
import hyperBobaHeadImg from "../../images/tictactoe/hyperBoba_head.png";
import tenleyHeadImg from "../../images/tictactoe/tenley_head.png";
import monaHeadImg from "../../images/tictactoe/mona_head.png";
import alvanHeadImg from "../../images/tictactoe/alvanNee_head.png";
import happyBobaHeadImg from "../../images/tictactoe/happyBoba_head.png";
import odinHeadImg from "../../images/tictactoe/odin_head.png";

import maxwellPawImg from "../../images/tictactoe/maxwell_paw.png";
import martinPawImg from "../../images/tictactoe/martin_paw.png";
import michellePawImg from "../../images/tictactoe/michelle_paw.png";
import azazPawImg from "../../images/tictactoe/azazMerchant_paw.png";
import alvanPawImg from "../../images/tictactoe/alvanNee_paw.png";
import bobaPawImg from "../../images/tictactoe/boba_paw.png";
import tenleyPawImg from "../../images/tictactoe/tenley_paw.png";
import monaPawImg from "../../images/tictactoe/mona_paw.png";
import odinPawImg from "../../images/tictactoe/odin_paw.png";
import blank from "../../images/tictactoe/blank.png";

// Authorization, for integration with other features
const authUserName = "john_doe";
const authPassword = "password123";
const preAuthToken = btoa(`${authUserName}:${authPassword}`);
const authToken = `Basic ${preAuthToken}`;

export default function TictactoeGame(props) {
  // Some variables. gameTitle is what's displayed at the top of the page. currentGame holds all the info of the current game.
  // boardState is the list of 9 segments that a Tic Tac Toe board is made of, and which players have played in there.
  // boardDisplay is the JSX that will be displayed in those 9 segments
  const [gameTitle, setGameTitle] = useState(<h1>Awaiting Game Selection</h1>);
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
        headers: {
          "Content-Type": "application/json",
          Authorization: authToken,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          // Store the game data for use later
          setCurrentGame(data);
          setBoardState(data.boardState);
          setGameTitle(
            <h1>
              Game between {data.player1} and {data.player2}
            </h1>
          );
          // A list/array of images to display if player1 selected that segment
          var X = [
            <div style={{ textAlign: "center", width: "70%" }}>
              <img
                src={maxwellHeadImg}
                alt="(X) Maxwell the cat's face"
                style={{ width: "100%" }}
              ></img>
              <p style={{ fontSize: "0.6em" }}>
                Maxwell (X)
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
                Boba (X)
                <br /> Image source: Ryan McGrandle
              </p>
            </div>,
            <div style={{ textAlign: "center", width: "70%" }}>
              <img
                src={kiwiHeadImg}
                alt="(X) Kiwi the cat's face"
                style={{ width: "100%" }}
              ></img>
              <p style={{ fontSize: "0.6em" }}>
                Kiwi (X)
                <br /> Image source: Samantha Lysons
              </p>
            </div>,
            <div style={{ textAlign: "center", width: "70%" }}>
              <img
                src={monaHeadImg}
                alt="(X) Mona the cat's face"
                style={{ width: "100%" }}
              ></img>
              <p style={{ fontSize: "0.6em" }}>
                Mona (X)
                <br /> Image source: Travis Boblin
              </p>
            </div>,
            <div style={{ textAlign: "center", width: "70%" }}>
              <img
                src={alvanHeadImg}
                alt="(X) Anonymous cat's face"
                style={{ width: "100%" }}
              ></img>
              <p style={{ fontSize: "0.6em" }}>
                Anonymous (X)
                <br /> Image source: Alvan Nee/Unsplash
              </p>
            </div>,
            <div style={{ textAlign: "center", width: "70%" }}>
              <img
                src={tenleyHeadImg}
                alt="(X) Tenley the cat's face"
                style={{ width: "100%" }}
              ></img>
              <p style={{ fontSize: "0.6em" }}>
                Tenley (X)
                <br /> Image source: Travis Boblin
              </p>
            </div>,
            <div style={{ textAlign: "center", width: "70%" }}>
              <img
                src={happyBobaHeadImg}
                alt="(X) Boba the cat's face"
                style={{ width: "100%" }}
              ></img>
              <p style={{ fontSize: "0.6em" }}>
                Boba (X)
                <br /> Image source: Ryan McGrandle
              </p>
            </div>,
            <div style={{ textAlign: "center", width: "70%" }}>
              <img
                src={odinHeadImg}
                alt="(X) Odin the cat's face"
                style={{ width: "100%" }}
              ></img>
              <p style={{ fontSize: "0.6em" }}>
                Odin (X)
                <br /> Image source: Samantha Lysons
              </p>
            </div>,
            <div style={{ textAlign: "center", width: "70%" }}>
              <img
                src={hyperBobaHeadImg}
                alt="(X) Boba the cat's face"
                style={{ width: "100%" }}
              ></img>
              <p style={{ fontSize: "0.6em" }}>
                Boba (X)
                <br /> Image source: Ryan McGrandle
              </p>
            </div>,
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
                Maxwell (O)
                <br /> Image source: Travis Boblin
              </p>
            </div>,
            <div style={{ textAlign: "center", width: "70%" }}>
              <img
                src={odinPawImg}
                alt="(O) Odin the cat's paw"
                style={{ width: "100%" }}
              ></img>
              <p style={{ fontSize: "0.6em" }}>
                Odin (O)
                <br /> Image source: Samantha Lysons
              </p>
            </div>,
            <div style={{ textAlign: "center", width: "70%" }}>
              <img
                src={azazPawImg}
                alt="(O) an anonymous cat's paw"
                style={{ width: "100%" }}
              ></img>
              <p style={{ fontSize: "0.6em" }}>
                Anonymous (O)
                <br />
                Image source: Azaz Merchant/Unsplash
              </p>
            </div>,
            <div style={{ textAlign: "center", width: "70%" }}>
              <img
                src={alvanPawImg}
                alt="(X) Anonymous cat's paw"
                style={{ width: "100%" }}
              ></img>
              <p style={{ fontSize: "0.6em" }}>
                Anonymous (O)
                <br /> Image source: Alvan Nee/Unsplash
              </p>
            </div>,
            <div style={{ textAlign: "center", width: "70%" }}>
              <img
                src={tenleyPawImg}
                alt="(O) Tenley the cat's paw"
                style={{ width: "100%" }}
              ></img>
              <p style={{ fontSize: "0.6em" }}>
                Tenley (O)
                <br /> Image source: Travis Boblin
              </p>
            </div>,
            <div style={{ textAlign: "center", width: "70%" }}>
              <img
                src={michellePawImg}
                alt="(O) an anonymous cat's paw"
                style={{ width: "100%" }}
              ></img>
              <p style={{ fontSize: "0.6em" }}>
                Anonymous (O)
                <br />
                Image source: Michelle Calderon/Unsplash
              </p>
            </div>,
            <div style={{ textAlign: "center", width: "70%" }}>
              <img
                src={bobaPawImg}
                alt="(X) Boba the cat's paw"
                style={{ width: "100%" }}
              ></img>
              <p style={{ fontSize: "0.6em" }}>
                Boba (O)
                <br /> Image source: Ryan McGrandle
              </p>
            </div>,
            <div style={{ textAlign: "center", width: "70%" }}>
              <img
                src={martinPawImg}
                alt="(O) an anonymous cat's paw"
                style={{ width: "100%" }}
              ></img>
              <p style={{ fontSize: "0.6em" }}>
                Anonymous (O)
                <br />
                Image source: Martin Ruegner/Getty Images
              </p>
            </div>,
            <div style={{ textAlign: "center", width: "70%" }}>
              <img
                src={monaPawImg}
                alt="(O) Mona the cat's paw"
                style={{ width: "100%" }}
              ></img>
              <p style={{ fontSize: "0.6em" }}>
                Mona (O)
                <br /> Image source: Travis Boblin
              </p>
            </div>,
          ];
          // set up the boardDisplay variable with a list of images or buttons to display given the current board state
          if (boardState) {
            if (boardState.constructor === Array) {
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
                        <button
                          style={{ width: "100%", height: "100%" }}
                          onClick={async function () {
                            // When the button is clicked, try to put the player's turn
                            await fetch(
                              "http://localhost:8090/tictactoe/update/" +
                                props.gameId +
                                "?playerId=" +
                                props.currentPlayer +
                                "&position=" +
                                i,
                              {
                                method: "PUT",
                                mode: "cors",
                                cache: "no-cache",
                              }
                            )
                              .then((res) => res.json())
                              .then((data) => {
                                // Store the game data for use later
                                setCurrentGame(data);
                                // Let the parent element know a move has been made
                                if (props.callback) {
                                  props.callback(currentGame);
                                }
                              });
                          }}
                        >
                          <img
                            src={blank}
                            alt="blank space for making button larger"
                            style={{ width: "80%", height: "80%" }}
                          ></img>
                        </button>
                      )}
                    </div>
                  );
                })
              );
            }
          }
        });
    } else {
      // No game has been selected, so display an empty board
      setBoardState([null, null, null, null, null, null, null, null, null]);
      if (boardState) {
        if (boardState.constructor === Array) {
          setBoardDisplay(
            boardState.map((data, i) => {
              return <div style={{ position: "absolute" }}></div>;
            })
          );
        }
      }
    }
    // The following list is of the deps for this react useEffect(); it will only run this subfunction when one of these variables changes
  }, [currentGame, props]);

  //   useEffect(async () => {
  //     if (currentGame) {
  //       // Check if the game is over
  //       await fetch(
  //         "http://localhost:8090/tictactoe/checkWinner/" +
  //           props.gameId
  //       )
  //         .then((res) => res.json())
  //         .then((data) => {
  //           setCurrentGame(null);
  //           console.log(data);
  //         });
  //     }
  //   }, [boardDisplay]);

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
