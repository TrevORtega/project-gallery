import { Container, Row } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown'


export const Snippets = () => {
    const mkdown = `#Code`;
    return (
        <Container fluid>
            <Row>Code</Row>
            <Row>
                <ReactMarkdown children={mkdown}/>
            </Row>
        </Container>
    );
}