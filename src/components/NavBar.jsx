import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBook,
  faRightFromBracket,
  faRightToBracket,
  faUser
} from '@fortawesome/free-solid-svg-icons';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const NavBar = ({ isLogged, handleLogout }) => {
  return (
    <Navbar bg="primary" expand="lg" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/books">
          UNIVERSO LIBROS
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/books">
              <FontAwesomeIcon icon={faBook} className="me-2" />
              <span>Libros</span>
            </Nav.Link>
            <NavDropdown title="Mi cuenta" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/account">
                <FontAwesomeIcon icon={faUser} className="me-2" />
                <span>Mi perfil</span>
              </NavDropdown.Item>
              <NavDropdown.Divider />
              {isLogged ? (
                <NavDropdown.Item onClick={handleLogout} as={Link} to="/login">
                  <FontAwesomeIcon icon={faRightFromBracket} className="me-2" />
                  <span>Cerrar sesion</span>
                </NavDropdown.Item>
              ) : (
                <NavDropdown.Item as={Link} to="/login">
                  <FontAwesomeIcon icon={faRightToBracket} className="me-2" />
                  <span>Iniciar sesion</span>
                </NavDropdown.Item>
              )}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
