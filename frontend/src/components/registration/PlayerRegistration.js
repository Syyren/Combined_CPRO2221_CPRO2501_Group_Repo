import React from "react";

import "./PlayerRegistration.css";
import axios from "axios";
import { useState } from "react";

function PlayerRegistration() {
  //setting usestates for player login
  const [firstName, setFirstName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function save(event) {
    event.preventDefault();
    try {
      await axios.post("http://localhost:8090/api/v1/player/save", {
        FirstName: firstName,
        email: email,
        password: password,
        username: username,
      });
      alert("Player Registation Successfully");
      setFirstName("");
      setEmail("");
      setPassword("");
      setUsername("");
    } catch (err) {
      alert("User Registration Failed");
    }
  }
  return (
    <div class="auth">
      <div class="container">
        <form>
          <h1> WELCOME TO COOL CAT GAMES</h1>
          <div class="form-group">
            <label>FirstName</label>
            <input
              type="text"
              class="form-control"
              placeholder="Enter FirstName"
              value={firstName}
              onChange={(event) => {
                setFirstName(event.target.value);
              }}
            />
          </div>
          <div class="form-group">
            <label>UserName</label>
            <input
              type="text"
              class="form-control"
              placeholder="Enter userName"
              value={username}
              onChange={(event) => {
                setUsername(event.target.value);
              }}
            />
          </div>
          <div class="form-group">
            <label>EMAIL</label>
            <input
              type="text"
              class="form-control"
              placeholder="Enter Email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
          </div>

          <div class="form-group">
            <label>Password</label>
            <input
              type="text"
              class="form-control"
              placeholder="Enter Password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
          </div>

          <button class="btn btn-primary mt-4" onClick={save}>
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default PlayerRegistration;
