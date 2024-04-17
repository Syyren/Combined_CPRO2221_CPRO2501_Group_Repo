import { BrowserRouter, Routes, Route } from "react-router-dom"; //importing the react router dom to set my routes
import PrivateRoute from "./context/PrivateRoute";
import About from "./pages/About";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import NoPage from "./pages/NoPage";
import NoAccess from "./pages/NoAccess";
import LeaderboardTest from "./pages/LeaderboardPage"; //importing each of my pages
import AchievementTest from "./pages/AchievementTest";
import Hangman from "./pages/games/Hangman";
import Rooms from './pages/multiplayer/RoomView';
import HangmanMultiplayer from "./pages/multiplayer/HangmanMultiplayerPage";
import RunCat from "./pages/games/RunCat";
import Tictactoe from "./pages/games/TicTacToe";
import Login from "./components/registration/Login";
import Logout from "./pages/Logout";
import Friends from "./pages/FriendsPage";
import PlayerRegistration from "./components/registration/PlayerRegistration";
import ArcadeShooter from "./pages/games/ArcadeShooter";


export default function App() {
  //setting the app routes
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />{" "}
          {/* Setting a second home path for clean routing */}
          <Route path="/no-access" element={<NoAccess />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/profile"
            element={
              <PrivateRoute
                element={Profile}
                roles={["user"]}
                redirectPath="/no-access"
              />
            }
          />
          <Route
            path="/leaderboard"
            element={
              <PrivateRoute
                element={LeaderboardTest}
                roles={["user"]}
                redirectPath="/no-access"
              />
            }
          />
          <Route
            path="/friends"
            element={
              <PrivateRoute
                element={Friends}
                roles={["user"]}
                redirectPath="/no-access"
              />
            }
          />
          <Route path="*" element={<NoPage />} />{" "}
          {/* All undefined routes will raise the 404 page here */}
          <Route path="/achievements" element={<AchievementTest />} />
          <Route path="/room" element={<PrivateRoute
                element={Rooms}
                roles={["user"]}
                redirectPath="/no-access"
              />} />
          <Route path="/games/run-cat" element={<RunCat />} />
          <Route path="/games" element={<Games />} />
          <Route path="/games/hangman" element={<Hangman />} />

          <Route
            path="/games/hangman/:roomId"
            element={
              <PrivateRoute
                roles={["user"]}
                redirectPath="/room"
                element={HangmanMultiplayer}
              />
            }
          />


          <Route path="/games/canine-invaders" element={<ArcadeShooter />} />
          <Route path="/games/tictactoe" element={<Tictactoe />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/register" element={<PlayerRegistration />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
