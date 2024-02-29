import NavBar from './NavBar'
import Footer from './Footer'

//This method allows me to easily make a layout for each page to follow
const Layout = ({ children }) => {
  return ( //within the 'main' section, the page is rendered
    <>
        <NavBar />
        <div class="container">
          <main role="main" class="pb-3">
            { children }
          </main>
        </div>
        <Footer />
    </>
  )
}

export default Layout