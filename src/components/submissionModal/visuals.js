import { useState } from "react";
import { Button, Form, Stack } from "react-bootstrap"

const fileListHasImageFiles = (fileList) => {
    return (fileList?.length > 0 &&  
        Array.from(fileList)?.map(x => x.name.toLowerCase())
            .reduce(x => {
                return (
                    x.endsWith('jpg') 
                    || x.endsWith('png')
                    || x.endsWith('jpeg')
                );
            }).length > 0
    )
}


export const Visuals = ({ pages, modalValues, setModalValues }) => {
    const [formValues, setFormValues] = useState({
        ...modalValues
    })
    const [isSubmitted, setIsSubmitted] = useState(false);
    const Page = pages[modalValues.state];

    // FileList should contain jpg and png files
    const validScreenshots =  fileListHasImageFiles(formValues.imageUrls); 
    
    // Video should be an mp4 file
    const validVideo = formValues.videoUrl?.name?.endsWith('.mp4');
    const validSubmit = validScreenshots || validVideo;

    const setValues = (e) => {
        e.preventDefault();
        const values = e.target.name === 'imageUrls' ? e.target.files : e.target.files[0]; 
        setFormValues({...formValues, [e.target.name]: values});
    }

    const submitFunc = (e) => {
        e.preventDefault();
        setModalValues({
            ...formValues,
            state: modalValues.state+1
        });
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
                <Form.Group controlId="formFileMultiple" className="mb-3" >
                    <Stack gap={3}>
                        <Form.Label>Upload at least one Project Screenshot</Form.Label>
                        <Form.Control 
                            name="imageUrls"
                            type="file" 
                            required 
                            isInvalid={!validScreenshots} 
                            isValid={validScreenshots} 
                            multiple 
                            onChange={setValues}
                        />
                        <Form.Label>Demo Video</Form.Label>
                        <Form.Control 
                            name="videoUrls"
                            type="file" 
                            isInvalid={!validVideo}
                            isValid={validVideo}
                            onChange={setValues}
                        />

                        <Button size="md" disabled={!validSubmit} onClick={submitFunc}>
                            Next
                        </Button> 

                    </Stack>
                </Form.Group> 
            )}
        </>
    );
}