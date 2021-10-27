import styled from 'styled-components';
import Nav from './Nav';

const StyledProfile = styled.div`
    background-color: #282c34;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: calc(10px + 2vmin);
    color: white;
`;


const Profile = () => {
    return (
        <StyledProfile>
            <Nav />
            Random Guy
        </StyledProfile>
    );
}

export default Profile