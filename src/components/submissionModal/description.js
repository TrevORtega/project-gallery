import { useState } from "react";
import { Form, Button } from "react-bootstrap";


export const Description = ({ pages, modalValues, setModalValues }) => {
    const [formValues, setFormValues] = useState({
        name: modalValues.name,
        description: modalValues.description,
        sourceLink: modalValues.sourceLink
    })
    const [isSubmitted, setIsSubmitted] = useState(false);
    const Page = pages[modalValues.state];

    const validSubmit = formValues.name === '' || formValues.description === '';

    const setValues = (e) => {
        e.preventDefault();
        setFormValues({...formValues, [e.target.name]: e.target.value});
    }

    const submitFunc = (e) => {
        e.preventDefault();
        setModalValues({
            ...modalValues,
            ...formValues,
            state: modalValues.state+1});
        setIsSubmitted(true);
    }
    return ( 
        <>
            {isSubmitted ? 
                <Page 
                    pages={pages}
                    modalValues={modalValues}
                    setModalValues={setModalValues}
                /> 
            : (
                <Form onChange={setValues}>
                    <Form.Group className="mb-3" >
                        <Form.Label>Project Name</Form.Label>
                        <Form.Control 
                            name="name" 
                            as="textarea" 
                            required 
                            isInvalid={formValues.name === ''} 
                            placeholder="Decentralized AI Blockchain Discussion Forum" />
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label>Project Description</Form.Label>
                        <Form.Control 
                            name="description" 
                            required 
                            isInvalid={formValues.description === ''} 
                            as="textarea" 
                            rows={5} 
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label>Source Code Link</Form.Label>
                        <Form.Control 
                            name="sourceLink" 
                            placeholder="https://github.com/trevortega/project-gallery"
                            as="textarea" 
                            rows={1} 
                        />
                    </Form.Group>
                    <Button size="md" disabled={validSubmit} onClick={submitFunc}>
                        Next
                    </Button>
                </Form>
            )}
        </>
    );
}