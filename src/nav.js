import styled from 'styled-components'

const SignUpLogIn = styled.div`
    padding-right: 10px;
    padding-left: 10px;

    &:hover {
        cursor: pointer;
    }
`;
const Logo = styled.div`
    padding-left: 10px;
    padding-right: 10px;

    &:hover {
        cursor: pointer;
    }
`;

const NavBar = styled.div`
    width: 100%;
    height: 20%;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    background-color: rgb(128, 200, 0);

`;

export default function Nav(){
    
    return (
        <NavBar>
            <Logo>Project Gallery</Logo>
            <SignUpLogIn>Sign Up</SignUpLogIn>
        </NavBar>
    );
}