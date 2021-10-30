import styled from 'styled-components';
import { Row } from 'react-bootstrap';

import { DefaultNav } from '../../components/nav/Nav';
import { ContentContainer, MainContainer } from '../../components/theme/mainTheme';

// CSS for main component for profile page here
const StyledProfile = styled.div`
    text-align: center;
`;

export const Profile = () => {
    return (
        <MainContainer>
            <Row>
                <DefaultNav />
            </Row>
            <ContentContainer>
                <StyledProfile>Random Profile</StyledProfile>
            </ContentContainer>
        </MainContainer>
            
    );
}