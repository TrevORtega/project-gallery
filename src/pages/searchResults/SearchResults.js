import styled from 'styled-components';
import { Row } from 'react-bootstrap';

import { DefaultNav } from '../../components/nav/Nav';
import { ContentContainer, MainContainer } from '../../components/theme/mainTheme';

const StyledSearchResultsContainer = styled.div`
    text-align: center;
`;

export const SearchResults = ({ query }) => {
    
    return (
        <MainContainer>
            <Row>
                <DefaultNav />
            </Row>
            <ContentContainer>
                <StyledSearchResultsContainer>
                   {"Search Results for: " + query} 
                </StyledSearchResultsContainer>
            </ContentContainer>
        </MainContainer>
            
    );
}