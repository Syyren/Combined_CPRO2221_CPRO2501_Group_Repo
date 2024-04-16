import Layout from "../components/Layout";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
    const { currentUser } = useAuth();
    const username = currentUser.username;
    return (
    <Layout>
        <div className="homePageContainer mt-5">
            <h2 className="display-4 mb-4">Profile</h2>
            <div className="card">
                <p>Hello {username}.</p>
            </div>
        </div>
    </Layout>
  );
}
