import Layout from "../components/Layout";
import CoolCatLogo from "../images/home/coolcatlogo.png";
import CoolCatImage from "../images/home/TheCoolCat.jpg";
import FrogSpin from "../images/home/frog-spin-frog.gif";
import { useAuth } from "../context/AuthContext";

export default function Home() {

  const { currentUser } = useAuth();
  let text = 'Ready to play? Sign up today!';

  if (currentUser) { text = `Let's play ${currentUser.username}!`;}

  return (
    <Layout>
      <div className="homePageContainer d-flex flex-column align-items-center justidy-content-center mt-5">
        <h2 className="display-4 mb-4">Welcome to <img className="homeLogo" src={CoolCatLogo} alt="coolcatgames.com"></img></h2>
        <div className="card contentWrap">
          <img src={CoolCatImage} alt="a cat staring at the sky" className="card-img-top"></img>
          <div className="card-body">
            <h2 className="card-title display-4 mb-2">Why join up?</h2>
            <p className="card-text">Because we're your one stop shop for all kinds of cool cat games!</p>
            <p className="card-text">{text}</p>
            <div className="d-flex justify-content-evenly">
              <img src={FrogSpin} alt="a spinning frog"></img>
              <img src={FrogSpin} alt="a spinning frog"></img>
              <img src={FrogSpin} alt="a spinning frog"></img>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
