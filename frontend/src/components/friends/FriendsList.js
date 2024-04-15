import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { getPlayerById } from "../../controllers/PlayerController";

function FriendsList() {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchFriendsDetails = async (friendsIds) => {
      try {
        const friendsPromises = friendsIds.map((id) => getPlayerById(id));
        const friendsDetails = await Promise.all(friendsPromises);
        setFriends(friendsDetails); // Store details of each friend
        setLoading(false);
      } catch (err) {
        console.error("Error fetching friends' details:", err);
        setError("Failed to load friends' details.");
        setLoading(false);
      }
    };

    if (currentUser && currentUser.userId) {
      setLoading(true);
      getPlayerById(currentUser.userId)
        .then((player) => {
          if (player.friends && player.friends.length > 0) {
            fetchFriendsDetails(player.friends);
          } else {
            setFriends([]); // No friends to show
            setLoading(false);
          }
        })
        .catch((err) => {
          console.error("Error fetching user details:", err);
          setError("Failed to load user details.");
          setLoading(false);
        });
    } else {
      setError("Please log in to view friends list.");
      setLoading(false);
    }
  }, [currentUser]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mt-3">
      <h5 className="mb-4">Friends List</h5>
      <div className="row">
        {friends.length > 0 ? (
          friends.map((friend) => (
            <div key={friend.id} className="col-md-4 mb-3">
              <div className="card">
                <div className="card-body">
                  <h6 className="card-title">{friend.username}</h6>
                </div>
              </div>
            </div>
          ))
        ) : (
          <>
            <p>No friends to show</p>
            <p>Well...</p>
            <p>Lonely yet?</p>
            <p>:(</p>
          </>
        )}
      </div>
    </div>
  );
}

export default FriendsList;
