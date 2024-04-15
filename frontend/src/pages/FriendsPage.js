import React from "react";
import FriendsList from "../components/friends/FriendsList";
import FriendRequests from "../components/friends/FriendRequests";
import CreateFriendRequest from "../components/friends/CreateFriendRequest";
import Layout from "../components/Layout";

function FriendsPage() {
  return (
    <Layout>
      <div className="container mt-3">
        <div className="row">
          <div className="col-md-4">
            <FriendRequests />
          </div>
          <div className="col-md-4">
            <FriendsList />
          </div>
          <div className="col-md-4">
            <CreateFriendRequest />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default FriendsPage;
