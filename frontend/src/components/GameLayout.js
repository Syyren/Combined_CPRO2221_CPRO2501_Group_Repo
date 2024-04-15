import { Link } from "react-router-dom";

//This method allows me to easily make a layout for the games page to follow
const Layout = ({ children }) => {
  return ( //within the 'main' section, the page is rendered
    <>
        <div className="container">
            <div className="d-flex align-items-center justify-content-center text-center mb-3">
                <p className="me-2 mb-0">
                    Our Games:
                </p>
                <div className="me-2">
                    <Link className="nav-link" to="/games/run-cat">
                        Run Cat!
                    </Link>
                </div>
                <div className="me-2">
                    <Link className="nav-link" to="/games/hangman">
                        Hangman
                    </Link>
                </div>
                <div className="me-2">
                    <Link className="nav-link" to="/games/tictactoe">
                        Tic-Tac-Toe
                    </Link>
                </div>
                <div className="me-2">
                    <Link className="nav-link" to="/games/canine-invaders">
                        Canine Invaders
                    </Link>
                </div>
            </div>
            <main role="main" className="pb-3">
                { children }
            </main>
        </div>
    </>
  )
}

export default Layout