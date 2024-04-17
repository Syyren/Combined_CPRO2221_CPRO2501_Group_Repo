import axios from "axios";

// Base URL for the friend requests API
const BASE_URL = "http://localhost:8090/api/friend-requests"; // Change to your actual API URL

// Function to create a new friend request
export const createFriendRequest = async (friendRequest) => {
  try {
    const response = await axios.post(`${BASE_URL}`, friendRequest);
    return response.data;
  } catch (error) {
    console.error("Failed to create friend request:", error);
    throw error;
  }
};

// Function to retrieve all friend requests for a specific user
export const getFriendRequestsByUserId = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Failed to retrieve friend requests:", error);
    throw error;
  }
};

// Function to accept a friend request
export const acceptFriendRequest = async (requestId) => {
  try {
    const response = await axios.put(`${BASE_URL}/${requestId}/accept`);
    return response.data;
  } catch (error) {
    console.error("Failed to accept friend request:", error);
    throw error;
  }
};

// Function to deny a friend request
export const denyFriendRequest = async (requestId) => {
  try {
    const response = await axios.put(`${BASE_URL}/${requestId}/deny`);
    return response.data;
  } catch (error) {
    console.error("Failed to deny friend request:", error);
    throw error;
  }
};

// Function to delete a friend request
export const deleteFriendRequest = async (requestId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${requestId}`);
    return response.data;
  } catch (error) {
    console.error("Failed to delete friend request:", error);
    throw error;
  }
};
