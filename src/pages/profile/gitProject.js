import styled from 'styled-components';
import { DefaultNav } from '../../components/nav/Nav';
import { ContentContainer, MainContainer } from '../../components/theme/mainTheme';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import { Row, Col, Stack } from 'react-bootstrap';
//import { SubmissionModal } from '../../components/submissionModal/SubmissionModal';
import { SearchResults } from '../../pages/searchResults/SearchResults.js';
import { useState } from "react";
import { LoadProfile, SaveProfile } from './ProfileApi';

const StyledText = styled.p`
    background-color: red;
`;


const ShowBar = ({ submitFunc }) => {
    return(
        <ContentContainer>
            <MainContainer fluid={true}>
                <DefaultNav />
                <Row className="justify-content-center p-3">
                    <Col md="8">
                        <h3>What is your Github Username?</h3>
                    <Form.Group>
                        <Stack direction="horizontal">
                            <Form.Control type="text" name="search" size="lg" placeholder="Github User Name"/>
                            <Button size="lg" variant="outline-light" type="submit">Submit</Button>
                        </Stack>
                        </Form.Group>
                    </Col>
                </Row>
            </MainContainer>
        </ContentContainer>
    )
}

export const GitProjects = () => {

    const [submitQuery, setSubmitQuery] = useState('');
  
    const onFormSubmit = e => {
      e.preventDefault()
      const formData = new FormData(e.target);
      const formDataObj = Object.fromEntries(formData.entries());
      return setSubmitQuery(formDataObj.search);
    }
    const validSubmit = submitQuery !== '';
    console.log()
    return ( 
      validSubmit ? 
        <SearchResults query={submitQuery} />
        :
        <ShowBar submitFunc={onFormSubmit} />
    );
      
};