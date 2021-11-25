import styled from 'styled-components';
import { DefaultNav } from '../../components/nav/Nav';
import { ContentContainer, MainContainer } from '../../components/theme/mainTheme';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import { Row, Col } from 'react-bootstrap';
import { SubmissionModal } from '../../components/submissionModal/SubmissionModal';


const StyledText = styled.p`
    background-color: red;
`;

export const edit = () => {

    return ( 
        <ContentContainer>
            <MainContainer fluid={true}>
                <DefaultNav />
                <Row className="justify-content-center p-3">
                    <Col md="8">
                        <h3>About</h3>
                        <Form.Group>
                            <Form.Control className="" as="textarea" rows="5" id="" name="" ></Form.Control>
                            <Button type="Submit" variant="primary" size="sm" onClick>Submit</Button>
                        </Form.Group>
                    </Col>
                </Row>


                <Row className="justify-content-center p-3">
                    <Col md="8">
                        <h3>Experience</h3>
                        <Form.Group>
                            <Form.Control className="" as="textarea" rows="5" id="" name="" ></Form.Control>
                        </Form.Group>
                        <Button type="Submit" variant="primary" size="sm" onClick>Submit</Button>
                    </Col>
                </Row>
                <Row className="justify-content-center p-3">
                    <Col md="8">
                        <h3>Education</h3>
                        <Form.Group>
                            <Form.Control className="" as="textarea" rows="5" id="" name="" ></Form.Control>
                        </Form.Group>
                        <Button type="Submit" variant="primary" size="sm" onClick>Submit</Button>
                    </Col>
                </Row>
                
                <Row className="justify-content-center">
                    <Col md="8">
                    <h3>Projects</h3>
                    <Button type="Submit" variant="primary" size="sm" onClick>Add Project</Button>
                    </Col>
                </Row>
            </MainContainer>
        </ContentContainer>
    ) 
};

