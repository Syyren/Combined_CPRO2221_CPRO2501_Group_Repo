import React, { useEffect, useState } from "react";
import {
  getFriendRequestsByUserId,
  acceptFriendRequest,
  denyFriendRequest,
} from "../../controllers/FriendController";
import { getPlayerById } from "../../controllers/PlayerController";
import { useAuth } from "../../context/AuthContext";
import { Card, Button, ListGroup, Spinner, Alert } from "react-bootstrap";

/**
 * Component for displaying and managing incoming friend requests.
 * @returns {React.Component} A component that renders friend requests with options to accept or deny each.
 */
function FriendRequests() {
  const { currentUser } = useAuth();
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      if (currentUser) {
        setLoading(true);
        try {
          const requestsData = await getFriendRequestsByUserId(
            currentUser.userId
          );
          const userDetailsPromises = requestsData.map((request) =>
            getPlayerById(request.fromUserId).then((user) => ({
              ...request,
              fromUsername: user.username,
            }))
          );
          const requestsWithUserDetails = await Promise.all(
            userDetailsPromises
          );
          setRequests(requestsWithUserDetails);
        } catch (err) {
          console.error("Failed to fetch friend requests:", err);
          setError("Failed to load friend requests.");
        }
        setLoading(false);
      } else {
        setError("Please log in to view friend requests.");
        setLoading(false);
      }
    };

    fetchRequests();
  }, [currentUser]);

  /**
   * Handles accepting a friend request.
   * @param {string} requestId - The ID of the friend request to accept.
   */
  const handleAccept = async (requestId) => {
    try {
      await acceptFriendRequest(requestId);
      setRequests((prevRequests) =>
        prevRequests.filter((request) => request.id !== requestId)
      );
    } catch (error) {
      console.error("Error accepting friend request:", error);
    }
  };

  /**
   * Handles denying a friend request.
   * @param {string} requestId - The ID of the friend request to deny.
   */
  const handleDeny = async (requestId) => {
    try {
      await denyFriendRequest(requestId);
      setRequests((prevRequests) =>
        prevRequests.filter((request) => request.id !== requestId)
      );
    } catch (error) {
      console.error("Error denying friend request:", error);
    }
  };

  if (loading)
    return <Spinner animation="border" className="text-center mt-5" />;
  if (error)
    return (
      <Alert variant="danger" className="mt-3">
        {error}
      </Alert>
    );

  return (
    <Card className="mt-3">
      <Card.Header>Friend Requests</Card.Header>
      <ListGroup variant="flush">
        {requests.length > 0 ? (
          requests.map((request) => (
            <ListGroup.Item
              key={request.id}
              className="d-flex justify-content-between align-items-center"
            >
              Request from: {request.fromUsername}
              <div>
                <Button
                  variant="success"
                  size="sm"
                  className="me-2"
                  onClick={() => handleAccept(request.id)}
                >
                  Accept
                </Button>
                <Button
                  variant="warning"
                  size="sm"
                  className="me-2"
                  onClick={() => handleDeny(request.id)}
                >
                  Deny
                </Button>
              </div>
            </ListGroup.Item>
          ))
        ) : (
          <ListGroup.Item>No friend requests available.</ListGroup.Item>
        )}
      </ListGroup>
    </Card>
  );
}

export default FriendRequests;
