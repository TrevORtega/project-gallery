import styled from 'styled-components';
import { Navbar, Container, Nav} from 'react-bootstrap/';

const StyledNavbar = styled(Navbar)`
   min-height: 5vh; 
`;

// Check bootstrap Nav/Navbar docs to change Nav settings
const DefaultNav = () => {
    return (
        <StyledNavbar bg="primary" variant="dark" sticky='top'>
            <Container fluid={true}>
                <Navbar.Brand href="/">Project Gallery</Navbar.Brand>
                    <Nav className="justify-content-center">
                        <Nav.Link href="/profile">Profile</Nav.Link>
                    </Nav>
            </Container>
        </StyledNavbar>
    )
}

export default DefaultNav; 
