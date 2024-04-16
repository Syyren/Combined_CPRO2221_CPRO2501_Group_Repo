import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { getPlayerById } from "../../controllers/PlayerController";

/**
 * Component to display the list of friends for the current user.
 */
function FriendsList() {
  const [friends, setFriends] = useState([]); // State to store friends' details
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const { currentUser } = useAuth(); // Current user context

  // Fetches details of each friend when the component mounts or currentUser changes
  useEffect(() => {
    // Function to fetch details of each friend
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

    // Check if currentUser exists and fetch friends' details
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

  // Render loading state
  if (loading) return <div>Loading...</div>;
  // Render error state
  if (error) return <div>Error: {error}</div>;

  // Render friends list
  return (
    <div className="container mt-3">
      <h5 className="mb-4">Friends List</h5>
      <div className="row">
        {friends.length > 0 ? (
          // Render each friend as a card
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
          // Render message when no friends are available
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
