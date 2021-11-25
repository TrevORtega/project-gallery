//import styled from 'styled-components';
import { DefaultNav } from '../../components/nav/Nav';
import { ContentContainer, MainContainer } from '../../components/theme/mainTheme';
//import Form from 'react-bootstrap/Form'
//import Button from 'react-bootstrap/Button';
import { Row, Col, Stack } from 'react-bootstrap';
//import { SearchResults } from '../../pages/searchResults/SearchResults.js';


export const GitSearch = ({ submitFunc }) => {
    return(
        <ContentContainer>
            <MainContainer fluid={true}>
                <DefaultNav />
                <Row className="justify-content-center p-3">
                    Git Search Page
                </Row>
            </MainContainer>
        </ContentContainer>
    )
}