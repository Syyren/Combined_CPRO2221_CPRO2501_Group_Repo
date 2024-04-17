import Layout from "../components/Layout";
import { useAuth } from "../context/AuthContext";
import AchievementList from "../components/achievements/AchievementList";
import FriendsList from "../components/friends/FriendsList";

export default function Profile() {
  const { currentUser } = useAuth();
  const username = currentUser.username;
  return (
    <Layout>
        <h2 className="display-4 mt-5 mb-4">{username}'s Profile</h2>
        <div className="d-flex mt-5 align-itmes-center justify-content-evenly">
            <div className="">
                <div>
                    <AchievementList />
                </div>
            </div>

        {/* Friends List */}
            <div className="col-md-4 mb-3">
                <div className="card h-100 shadow-sm">
                    <div className="card-body">
                        <h5 className="card-title">My Friends</h5>
                        <FriendsList />
                    </div>
                </div>
            </div>
        </div>
    </Layout>
  );
}
