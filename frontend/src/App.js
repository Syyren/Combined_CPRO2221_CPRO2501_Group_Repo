import { BrowserRouter, Routes, Route} from 'react-router-dom' //importing the react router dom to set my routes
import About from './pages/About'
import Home from './pages/Home'
import AchievementTest from './pages/AchievementTest'
import Hangman from './pages/games/Hangman'
import NoPage from './pages/NoPage' //importing each of my pages

export default function App() { //setting the app routes
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={ <Home /> } />
          <Route path="/home" element={ <Home /> } /> {/* Setting a second home path for clean routing */}
          <Route path="/about" element={ <About /> } />
          <Route path="/achievements" element={ <AchievementTest /> } />
          <Route path="/games/hangman" element={ <Hangman /> } />
          <Route path="*" element={ <NoPage /> } /> {/* All undefined routes will raise the 404 page here */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}