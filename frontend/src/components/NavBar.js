import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useGame } from "../context/GameContext";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavDropdown } from "react-bootstrap";
import Image from "../images/home/coolcatlogo.png"
import "./NavBar.css";

export default function NavBar() {
  const { currentUser } = useAuth();
  const { setGame } = useGame();

  const handleGameSelect = (game) => {
    setGame(game);
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand as={Link} to="/home">
        <img src={Image} className="logo"></img>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/home">
            Home
          </Nav.Link>
          <NavDropdown title="Games" id="basic-nav-dropdown">
            <NavDropdown.Item>
              <Link
                onClick={() => handleGameSelect("canine_invaders")}
                className="link link-offset-2 link-underline link-underline-opacity-0"
                to="/games/canine-invaders"
              >
                Canine Invaders
              </Link>
            </NavDropdown.Item>
            <NavDropdown.Item>
              <Link
                onClick={() => handleGameSelect("cat-run")}
                className="link link-offset-2 link-underline link-underline-opacity-0"
                to="/games/cat-run"
              >
                Cat Run!
              </Link>
            </NavDropdown.Item>
            <NavDropdown.Item>
              <Link
                onClick={() => handleGameSelect("hangman")}
                className="link link-offset-2 link-underline link-underline-opacity-0"
                to="/games/hangman"
              >
                Hangman
              </Link>
            </NavDropdown.Item>
            <NavDropdown.Item>
              <Link
                onClick={() => handleGameSelect("tictactoe")}
                className="link link-offset-2 link-underline link-underline-opacity-0"
                to="/games/tictactoe"
              >
                Tic-Tac-Toe
              </Link>
            </NavDropdown.Item>
          </NavDropdown>
          <div className="d-flex align-items-center">
            {currentUser && (
              <>
                <Nav.Link as={Link} to="/profile">
                  Profile
                </Nav.Link>
                <Nav.Link as={Link} to="/friends">
                  Friends
                </Nav.Link>
              </>
            )}
          </div>
          <Nav.Link as={Link} to="/about">
            About
          </Nav.Link>
        </Nav>
        <Nav>
          <div className="d-flex align-items-center">
            {currentUser && (
              <Navbar.Text className="userWelcome px-3">
                Welcome, {currentUser.username}!
              </Navbar.Text>
            )}
          </div>
          {currentUser ? (
            <>
              <Nav.Link as={Link} to="/logout">
                Logout
              </Nav.Link>
            </>
          ) : (
            <>
              <Nav.Link as={Link} to="/login">
                Login
              </Nav.Link>
              <Nav.Link as={Link} to="/register">
                Register
              </Nav.Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
