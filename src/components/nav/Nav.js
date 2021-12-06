import styled from 'styled-components';
import { Nav, Navbar, Container, NavDropdown} from 'react-bootstrap/';
import { useCookies } from 'react-cookie';

const StyledNavbar = styled(Navbar)`
   min-height: 5vh;

   > .container-fluid {
    padding-right: 5vw;
   }
`;
const StyledNavDropdown = styled(NavDropdown)`

    > a {
        color: rgba(255,255,255,.55);
    }
    > a:hover {
        rgba(128, 128, 255, 0.5)
    }
`;


// Check bootstrap Nav/Navbar docs to change Nav settings
export const DefaultNav = () => {
    const [cookies, setCookie, removeCookie] = useCookies();
    const profile = cookies?.username;
    const logOut = () => {
        removeCookie('username', { path: '/' });
    }
    return (
        <StyledNavbar bg="primary" variant="dark" sticky='top'>
            <Container fluid={true}>
                <Navbar.Brand href="/">Project Gallery</Navbar.Brand>
                    {profile ? 
                            <StyledNavDropdown title="Profile" id="nav-dropdown">
                                <NavDropdown.Item href={"/profile/" + profile}>Profile</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item as="button" onClick={logOut}>Log out</NavDropdown.Item>
                            </StyledNavDropdown>
                        :
                            <Nav className="justify-content-center">
                                <Nav.Link href="/">Login</Nav.Link>
                            </Nav> 
                    }
            </Container>
        </StyledNavbar>
    )
}
