import { BrowserRouter, Routes, Route } from "react-router-dom"; //importing the react router dom to set my routes
import About from "./pages/About";
import Home from "./pages/Home";
import NoPage from "./pages/NoPage";
import LeaderboardTest from "./pages/LeaderboardTest"; //importing each of my pages
import AchievementTest from "./pages/AchievementTest";
import Hangman from "./pages/games/Hangman";
import TictactoeMenu from "./components/tictactoe/tictactoeMenu";
import Login from "./components/registration/Login";
import PlayerRegistration from "./components/registration/PlayerRegistration";

export default function App() {
  //setting the app routes
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />{" "}
          {/* Setting a second home path for clean routing */}
          <Route path="/about" element={<About />} />
          <Route path="/leaderboard" element={<LeaderboardTest />} />
          <Route path="*" element={<NoPage />} />{" "}
          {/* All undefined routes will raise the 404 page here */}
          <Route path="/achievements" element={<AchievementTest />} />
          <Route path="/games/hangman" element={<Hangman />} />
          <Route path="/games/tictactoe" element={<TictactoeMenu />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<PlayerRegistration />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
