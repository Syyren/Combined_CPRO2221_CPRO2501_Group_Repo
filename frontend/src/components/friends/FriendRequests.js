import React, { useEffect, useState } from "react";
import {
  getFriendRequestsByUserId,
  acceptFriendRequest,
  denyFriendRequest,
  deleteFriendRequest,
} from "../../controllers/FriendController";
import { useAuth } from "../../context/AuthContext";

/**
 * Component to display friend requests for the current user.
 */
function FriendRequests() {
  const { currentUser } = useAuth(); // Current user context
  const [requests, setRequests] = useState([]); // State for friend requests
  const [error, setError] = useState(null); // Error state
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch friend requests when component mounts or currentUser changes
  useEffect(() => {
    // Fetches friend requests for the current user
    const fetchRequests = async () => {
      setLoading(true);
      try {
        const data = await getFriendRequestsByUserId(currentUser.userId);
        setRequests(data);
      } catch (err) {
        console.error("Failed to fetch friend requests:", err);
        setError("Failed to load friend requests.");
      }
      setLoading(false);
    };

    // Check if currentUser exists and fetch friend requests
    if (currentUser) {
      fetchRequests();
    } else {
      setError("Please log in to view friend requests.");
      setLoading(false);
    }
  }, [currentUser]);

  // Handles accepting a friend request
  const handleAccept = async (requestId) => {
    try {
      await acceptFriendRequest(requestId);
      setRequests(requests.filter((request) => request.id !== requestId));
    } catch (error) {
      console.error("Error accepting friend request:", error);
    }
  };

  // Handles denying a friend request
  const handleDeny = async (requestId) => {
    try {
      await denyFriendRequest(requestId);
      setRequests(requests.filter((request) => request.id !== requestId));
    } catch (error) {
      console.error("Error denying friend request:", error);
    }
  };

  // Handles deleting a friend request
  const handleDelete = async (requestId) => {
    try {
      await deleteFriendRequest(requestId);
      setRequests(requests.filter((request) => request.id !== requestId));
    } catch (error) {
      console.error("Error deleting friend request:", error);
    }
  };

  // Render loading state
  if (loading) return <div>Loading...</div>;
  // Render error or unauthorized state if currentUser is null
  if (!currentUser) return <div>{error || "Unauthorized"}</div>;

  // Render friend requests list
  return (
    <div className="card">
      <div className="card-header">Friend Requests</div>
      <ul className="list-group list-group-flush">
        {requests.length > 0 ? (
          // Render each friend request as a list item
          requests.map((request) => (
            <li
              key={request.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              {request.fromUserId}
              <div>
                <button
                  className="btn btn-success btn-sm me-2"
                  onClick={() => handleAccept(request.id)}
                >
                  Accept
                </button>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => handleDeny(request.id)}
                >
                  Deny
                </button>
              </div>
            </li>
          ))
        ) : (
          // Render message when no friend requests are available
          <li className="list-group-item">No friend requests available.</li>
        )}
      </ul>
    </div>
  );
}

export default FriendRequests;
