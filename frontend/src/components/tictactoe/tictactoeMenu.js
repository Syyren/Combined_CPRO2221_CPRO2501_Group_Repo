import TictactoeGame from "./tictactoeGame";

// Fake data, in reality we would get this from the users backend branch
let fakeUsersList = [
  "Joel",
  "Annette",
  "Ryan",
  "Bergen",
  "Kaden",
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

let fakeCurrentUser = "Joel";

export default function TictactoeMenu() {
  // the game to display on the right
  let displayTictactoeGame = <TictactoeGame />;
  // Get current userId; replace with API call when login feature done
  var currentUserId = fakeCurrentUser;
  // Get list of all users; replace with API call when login feature done
  var usersIdsList = fakeUsersList;
  // Get a list of all ongoing games the current user is participating in
  // and compile a list of opponents in active games against this user
  var allOpponents = [];
  var getCurrentGames = async function () {
    var response = await fetch(
      "http://localhost:8090/tictactoe/games/" + currentUserId
    );
    return response;
  };
  var currentGames = getCurrentGames();
  console.log("current games:" + currentGames);
  currentGames.map((currentGame) => {
    // determine which player in the currently selected game is the opponent
    var opponent = [currentGame.player1, currentGame.player2].filter(
      (e) => e !== currentUserId
    )[0];
    // get whether it's the user's turn in the current game:
    var buttonClass = "btn btn-warning";
    if (currentGame.lastPlayerMove === currentUserId) {
      buttonClass = "btn btn-success";
    }
    // add the opponent to the list being compiled
    allOpponents.push(opponent);
    // return the button for this game
    return (
      <li value={currentGame.id}>
        <button
          class={buttonClass}
          // When this button is clicked, load the game with this id
          onClick={
            (displayTictactoeGame = <tictactoeGame gameId={currentGame.id} />)
          }
        >
          Ongoing game against {opponent}
        </button>
      </li>
    );
  });

  // remove current user and current opponents from list and scramble it, then get just the top 10
  usersIdsList = shuffleArray(
    usersIdsList.filter((e) => e !== currentUserId && !allOpponents.includes(e))
  ).slice(0, Math.min(10, usersIdsList.length - 1));
  var recomendedUsers = usersIdsList.map((userId) => {
    return (
      <li value={userId}>
        <button
          class="btn btn-primary"
          // When this button is clicked, create a new game in the database, then load it
          onClick={async function () {
            var tempId = await fetch("http://localhost:8090/tictactoe/save", {
              method: "POST",
              mode: "cors",
              cache: "no-cache",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                player1: currentUserId,
                player2: userId,
              }),
            }).id;
            displayTictactoeGame = <tictactoeGame gameId={tempId} />;
          }}
        >
          Start game against {userId}
        </button>
      </li>
    );
  });
  // Finalize display
  return (
    <div class="row row-cols-2">
      <div class="col-md-4">
        <h2>Current Games:</h2>
        <ul class="gap-3">{currentGames}</ul>
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
}
