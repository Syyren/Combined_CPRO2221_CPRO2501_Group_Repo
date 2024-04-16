import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import Leaderboard from "./leaderboard/Leaderboard";

//This method allows me to easily make a layout for the games page to follow
const Layout = ({ children }) => {
    const { currentUser } = useAuth();
    return ( //within the 'main' section, the page is rendered
    <div className="d-flex justify-content-center align-items-center mt-5">
        <div className="gameContainer">
            <div className="game">
                <main role="main" className="pb-3">
                    { children }
                </main>
            </div>
            {currentUser === null ? (
                <div className="align-items-center justify-content-center tex-center">
                    <p>
                        <Link className="link-offset-2 link-underline link-underline-opacity-0" to="/login">Sign in</Link> to See the Leaderboard!
                    </p>
                </div>
                ) : (
                <div className="leaderboard">
                    <Leaderboard />
                </div>)}
        </div>
    </div>)
}

export default Layout