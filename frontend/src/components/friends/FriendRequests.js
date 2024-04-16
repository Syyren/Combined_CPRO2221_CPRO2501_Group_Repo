import React, { useEffect, useState } from "react";
import {
  getFriendRequestsByUserId,
  acceptFriendRequest,
  denyFriendRequest,
  deleteFriendRequest,
} from "../../controllers/FriendController";
import { useAuth } from "../../context/AuthContext";

function FriendRequests() {
  const { currentUser } = useAuth();
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  console.log(requests);

  useEffect(() => {
    if (!currentUser) {
      setError("Please log in to view friend requests.");
      setLoading(false);
      return;
    }

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

    fetchRequests();
  }, [currentUser]);

  const handleAccept = async (requestId) => {
    try {
      console.log(requestId);
      const updatedRequest = await acceptFriendRequest(requestId);
      setRequests(requests.filter((request) => request.id !== requestId));
      console.log("Friend request accepted:", updatedRequest);
    } catch (error) {
      console.error("Error accepting friend request:", error);
    }
  };

  const handleDeny = async (requestId) => {
    try {
      const updatedRequest = await denyFriendRequest(requestId);
      setRequests(requests.filter((request) => request.id !== requestId));
      console.log("Friend request denied:", updatedRequest);
    } catch (error) {
      console.error("Error denying friend request:", error);
    }
  };

  const handleDelete = async (requestId) => {
    try {
      const response = await deleteFriendRequest(requestId);
      setRequests(requests.filter((request) => request.id !== requestId));
      console.log("Friend request deleted:", response);
    } catch (error) {
      console.error("Error deleting friend request:", error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!currentUser) return <div>{error || "Unauthorized"}</div>;

  return (
    <div className="card">
      <div className="card-header">Friend Requests</div>
      <ul className="list-group list-group-flush">
        {requests.length > 0 ? (
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
          <li className="list-group-item">No friend requests available.</li>
        )}
      </ul>
    </div>
  );
}

export default FriendRequests;
