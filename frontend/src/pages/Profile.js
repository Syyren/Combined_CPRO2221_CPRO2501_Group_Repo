import Layout from "../components/Layout";
import { useAuth } from "../context/AuthContext";
import AchievementList from "../components/achievements/AchievementList";

export default function Profile() {
    const { currentUser } = useAuth();
    const username = currentUser.username;
    return (
    <Layout>
        <div className="mt-5">
            <h2 className="display-4 mb-4">{username}'s Profile</h2>
            <div>
                <AchievementList />
            </div>
        </div>
    </Layout>
  );
}
