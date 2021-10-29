import styled from 'styled-components';
import { Link } from "react-router-dom";

const NavElement = styled(Link)`
    width: 12%;
    min-width: 155px;
    text-align: center;
    text-decoration: none;
    color: white;
    &:hover {
        cursor: pointer;
    }
`;

const NavBar = styled.div`
    min-width: 100%;
    min-height: 10%;
    display: flex;
    justify-content: space-between;
    background-color: rgb(128, 200, 0);

`;

export default function Nav(){
    
    return (
        <NavBar>
            <NavElement to="/">
                Project Gallery
            </NavElement>
            <NavElement to="/profile">
                Profile
            </NavElement>
        </NavBar>
    );
}