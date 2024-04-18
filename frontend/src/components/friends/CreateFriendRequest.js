import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { createFriendRequest } from "../../controllers/FriendController";
import {
  getPlayerByUsername,
  getUserIdByUsername,
} from "../../controllers/PlayerController";
import {
  Card,
  Form,
  Button,
  InputGroup,
  FormControl,
  Alert,
} from "react-bootstrap";

/**
 * Component for creating and sending friend requests.
 * @returns {React.Component} A component that allows users to search for other users by username and send friend requests.
 */
function CreateFriendRequest() {
  const { currentUser } = useAuth();
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState(null);
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  /**
   * Handles the search operation to find a user by username.
   * @param {Object} e - The event object from the form submission.
   */
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

  /**
   * Handles the action of sending a friend request to another user.
   */
  const handleSendFriendRequest = async () => {
    if (user && currentUser) {
      try {
        const friendRequest = {
          fromUserId: currentUser.userId,
          toUserId: userId,
        };
        await createFriendRequest(friendRequest);
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
    <Card className="mt-3">
      <Card.Body>
        <Card.Title>Search for a Friend</Card.Title>
        <Form onSubmit={handleSearch}>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Enter username"
              aria-label="Enter username"
              aria-describedby="basic-addon2"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Button variant="outline-primary" type="submit">
              Search
            </Button>
          </InputGroup>
        </Form>
        {user && (
          <Card className="mt-3">
            <Card.Body>
              <Card.Text>Username: {user.username}</Card.Text>
              <Button onClick={handleSendFriendRequest} variant="success">
                Send Friend Request
              </Button>
            </Card.Body>
          </Card>
        )}
        {error && <Alert variant="danger">{error}</Alert>}
      </Card.Body>
    </Card>
  );
}

export default CreateFriendRequest;
