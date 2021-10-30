import { Row } from 'react-bootstrap';

import { DefaultNav } from "../../components/nav/Nav";
import { ContentContainer, MainContainer } from '../../components/theme/mainTheme';

export const NoPage = () => {
    return (
        <MainContainer>
            <Row>
                <DefaultNav />
            </Row>
            <ContentContainer>
                <p style={{textAlign: 'center'}}>
                    This page does not exist :(
                </p>
            </ContentContainer>
        </MainContainer>
            
    );
}
