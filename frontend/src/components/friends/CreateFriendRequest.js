import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { createFriendRequest } from "../../controllers/FriendController";
import {
  getPlayerByUsername,
  getUserIdByUsername,
} from "../../controllers/PlayerController";

function CreateFriendRequest() {
  const { currentUser } = useAuth();
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState(null);
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!username) {
      setError("Please enter a username to search.");
      return;
    }
    try {
      const foundUser = await getPlayerByUsername(username);
      const foundUserId = await getUserIdByUsername(username);
      setUser(foundUser);
      setUserId(foundUserId);
      setError("");
    } catch (err) {
      setError("User not found.");
      setUser(null);
    }
  };

  const handleSendFriendRequest = async () => {
    if (user && currentUser) {
      try {
        const friendRequest = {
          fromUserId: currentUser.userId,
          toUserId: userId,
        };
        const response = await createFriendRequest(friendRequest);
        alert("Friend request sent successfully!");
        setError("");
      } catch (error) {
        console.error("Error sending friend request:", error);
        setError("Failed to send friend request.");
      }
    } else {
      setError("Both current user and selected user must be defined.");
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Send Friend Request</h5>
        <form onSubmit={handleSearch}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
            />
            <button type="submit" className="btn btn-primary mt-2">
              Search
            </button>
          </div>
        </form>
        {user && (
          <div className="card mt-3">
            <div className="card-body">
              <p>Username: {user.username}</p>
              <button
                onClick={handleSendFriendRequest}
                className="btn btn-success"
              >
                Send Friend Request
              </button>
            </div>
          </div>
        )}
        {error && <div className="alert alert-danger mt-2">{error}</div>}
      </div>
    </div>
  );
}

export default CreateFriendRequest;
