import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { getPlayerById } from "../../controllers/PlayerController";
import { Card, Container, Row, Col, Alert, Spinner } from "react-bootstrap";

/**
 * Component for displaying a list of friends associated with the current user.
 * @returns {React.Component} A component that renders a list of friends, or relevant messages based on the loading state or errors.
 */
function FriendsList() {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentUser } = useAuth();

  useEffect(() => {
    loadFriends();
  }, [currentUser]);

  /**
   * Loads the details of the friends of the current user.
   */
  const loadFriends = async () => {
    if (currentUser && currentUser.userId) {
      try {
        setLoading(true);
        const player = await getPlayerById(currentUser.userId);
        if (player && player.friends && player.friends.length > 0) {
          const friendsDetails = await Promise.all(
            player.friends.map((id) => getPlayerById(id))
          );
          setFriends(friendsDetails);
        } else {
          setFriends([]);
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching friends' details:", err);
        setError("Failed to load data.");
        setLoading(false);
      }
    } else {
      setError("Please log in to view friends list.");
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" />
      </Container>
    );
  }

  if (error) {
    return (
      <Alert variant="danger" className="mt-3">
        {error}
      </Alert>
    );
  }

  return (
    <Container className="mt-3">
      {friends.length > 0 ? (
        friends.map((friend) => (
          <Row key={friend.id} className="mb-3">
            <Col>
              <Card style={{ width: "100%" }}>
                <Card.Body>
                  <Card.Title>{friend.username}</Card.Title>
                  {/* Removed the remove button */}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        ))
      ) : (
        <p>No friends to show.</p>
      )}
    </Container>
  );
}

export default FriendsList;
