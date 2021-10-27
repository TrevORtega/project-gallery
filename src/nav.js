import styled from 'styled-components';
import { Link } from "react-router-dom";

const NavElement = styled(Link)`
    padding-right: 10px;
    padding-left: 10px;

    text-decoration: none;
    color: white;
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
            <NavElement to="/">
                Project Gallery
            </NavElement>
            <NavElement to="/profile">
                Profile
            </NavElement>
        </NavBar>
    );
}