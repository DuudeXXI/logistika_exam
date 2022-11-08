import { NavLink } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function NavBar({status}) {

    return (
      <Container>
        <Navbar bg="dark" expand="lg" variant="dark">
          <Container>
            <Navbar.Brand href="/">Example Logo</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
              {status === 2 || status === 3 || status === 4 ? <NavLink to="/" end className={ ({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Home</NavLink> : null}
              {status === 3 ? <NavLink to="/boxes" className={ ({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Dezes</NavLink> : null}
              {status === 3 ? <NavLink to="/containers" className={ ({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Containers</NavLink> : null}
              </Nav>
              <Nav>
                {status !== 1 ? <NavLink to="/logout" className="nav-link">Logout</NavLink> : null}
                {status === 1 ? <NavLink to="/register" className="nav-link">Register</NavLink> : null}
                {status === 1 ? <NavLink to="/login" className="nav-link">Login</NavLink> : null}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </Container>
    )
}

export default NavBar;