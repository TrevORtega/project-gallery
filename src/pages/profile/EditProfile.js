import styled from 'styled-components';
import { DefaultNav } from '../../components/nav/Nav';
import { ContentContainer, MainContainer } from '../../components/theme/mainTheme';


const StyledText = styled.p`
    background-color: red;
`;

export const edit = () => {

    return ( 
        <ContentContainer>
            <MainContainer>
                <DefaultNav />
                <StyledText>"Hello"</StyledText>
            </MainContainer>
        </ContentContainer>
    ) 
};
