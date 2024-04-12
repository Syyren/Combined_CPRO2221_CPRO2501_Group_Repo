import { Link } from "react-router-dom";

//This method allows me to easily make a layout for the games page to follow
const Layout = ({ children }) => {
  return ( //within the 'main' section, the page is rendered
    <>
        <div className="container">
            <ul>
                <li>
                    <Link className="nav-link" to="/run-cat">
                        Run Cat!
                    </Link>
                </li>
            </ul>
            <main role="main" className="pb-3">
                { children }
            </main>
        </div>
    </>
  )
}

export default Layout