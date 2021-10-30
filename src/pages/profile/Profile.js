import styled from 'styled-components';
import DefaultNav from '../../components/nav/Nav';

// CSS for main component for profile page here
const StyledProfile = styled.div`
    text-align: center;
`;


const Profile = () => {
    return (
        <>
            <DefaultNav />
            <StyledProfile>Random Profile</StyledProfile>
        </>
            
    );
}

export default Profile