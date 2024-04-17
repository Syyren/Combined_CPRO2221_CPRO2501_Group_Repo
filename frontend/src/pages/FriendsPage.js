import React from "react";
import FriendsList from "../components/friends/FriendsList";
import FriendRequests from "../components/friends/FriendRequests";
import CreateFriendRequest from "../components/friends/CreateFriendRequest";
import Layout from "../components/Layout";

/**
 * Component representing the friends page which includes sections for managing and creating friend requests.
 * @returns {React.Component} A component that renders the friends page with three sections: pending friend requests, friends list, and the ability to send a friend request.
 */
function FriendsPage() {
  return (
    <Layout>
      <div className="container mt-3">
        <div className="row">
          {/* Friend Requests */}
          <div className="col-md-4 mb-3">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">Pending Friend Requests</h5>
                <FriendRequests />
              </div>
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

          {/* Create Friend Request */}
          <div className="col-md-4 mb-3">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">Send a Friend Request</h5>
                <CreateFriendRequest />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default FriendsPage;
