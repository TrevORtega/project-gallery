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
import { github } from 'react-code-blocks';

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

export const GitProjects = ({defaults}) => {
    const [profileData, setProfileData] = useState({...defaults});
    const [githubName, setGithubName] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);


    const submitFunc = e => {
        e.preventDefault();
        setIsSubmitted(true);
    }

    const changeHandler = (name, e) => {
        setProfileData({...profileData, [github]: e.target.value});
    }


    if (isSubmitted) {
        return <SaveProfile profileData={profileData} />;
    }

    return ( 

        <ContentContainer>
        <MainContainer fluid={true}>
            <DefaultNav />
            <Row className="justify-content-center p-3">
                <Col md="8">
                    <h3>What is your Github Username?</h3>
                <Form onChange={e => changeHandler('github', e)} onSubmit={submitFunc} value={profileData.github}>
                    <Stack direction="horizontal">
                        <Form.Control type="text" name="search" size="lg" placeholder="Github User Name"/>
                        <Button size="lg" variant="outline-light" type="submit">Submit</Button>
                    </Stack>
                    </Form>
                </Col>
            </Row>
        </MainContainer>
    </ContentContainer> 
    );
      
};