import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { useState } from "react";
import "./Header.css";
const Header = () => {
  let [text, setText] = useState("");
  return (
    <Navbar
      expand="lg"
      className="bg-success p-2"
    >
      <Container className="cont1">
        <Nav>
          <Nav.Link>React Sample Crud-Ops</Nav.Link>
        </Nav>
        <Nav className="justify-content-end">
          <Nav.Link
            as={Link}
            to="/"
          >
            Home
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="add-person"
          >
            Add Person
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="show-person"
          >
            Show Users
          </Nav.Link>
        </Nav>
        {/* </Navbar.Collapse> */}
      </Container>
    </Navbar>
  );
};

export default Header;
