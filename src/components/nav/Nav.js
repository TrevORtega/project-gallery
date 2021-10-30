import styled from 'styled-components';
import { Navbar, Container, Nav} from 'react-bootstrap/';

// Check bootstrap Nav/Navbar docs to change Nav settings
const DefaultNav = () => {
    return (
        <Navbar bg="primary" variant="dark" sticky='top'>
            <Container>
            <Navbar.Brand href="/">Project Gallery</Navbar.Brand>
                <Nav className="justify-content-center">
                <Nav.Link href="/profile">Profile</Nav.Link>
            </Nav>
            </Container>
        </Navbar>
    )
}

export default DefaultNav; 
