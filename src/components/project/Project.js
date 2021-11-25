import { useState } from "react";
import { Row, Col, Button, Accordion, Carousel, Stack } from "react-bootstrap";
import styled from "styled-components";
import { CodeBlock } from "../submissionModal/snippets";

import { SaveProject, FileListToUrlList, FileToUrl } from "./ProjectApi";

const DescriptionAccordion = ({description}) => {
    return (
        <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
                <Accordion.Header>Description</Accordion.Header>
                <Accordion.Body>
                    {description}
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
}

const ImageAccordianWithDemo = ({imageUrls, videoUrl=null}) => {
    const [index, setIndex] = useState(0);
    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    }

    if (typeof(imageUrls) === 'object'){
            imageUrls = FileListToUrlList(imageUrls);
            videoUrl = videoUrl && FileToUrl(videoUrl);

    }
    return (
        <Carousel 
            activeIndex={index} 
            onSelect={handleSelect}
            interval={null}
        >
            {imageUrls.map((url, i) => (
                <Carousel.Item key={i}> 
                    <img
                        className="d-block w-100" 
                        src={url}
                        alt={`Project Screenshot Number ${i}`}
                    />
                </Carousel.Item>
            ))}
            {videoUrl ? (
                <Carousel.Item>
                    <video
                        type="video/mp4"
                        alt="Video Screenshot"
                        src={videoUrl}
                    />
                </Carousel.Item>

            ) : <></>
            }
        </Carousel>
    );
}

const SnippetBlocks = ({code, language}) => {
    return (
        <Row>
            {code.map((snip, i) => (
                <Col>
                    <CodeBlock 
                        key={i}
                        code={snip}
                        language={language[i]}
                    />
                </Col>
            ))}
        </Row>
    );
}

const StyledSnippetBlocks = styled(SnippetBlocks)`
    overflow-x: scroll;
`;

export const Project = ({ modalValues }) => {
    const { 
        name, 
        description, 
        sourceLink, 
        imageUrls, 
        videoUrl, 
        code, 
        language 
    } = modalValues;
    return (
        <Stack>
            <h1>{name}</h1>
            <DescriptionAccordion 
                description={description}
            /> 
            <a>{sourceLink}</a>
            <ImageAccordianWithDemo 
                imageUrls={imageUrls}
                videoUrl={videoUrl}
            />
            <StyledSnippetBlocks
                code={code}
                language={language}
            />
        </Stack>
    );
}

export const NewProject = ({ pages, modalValues, setModalValues }) => {
    const [goBack, setGoBack] = useState(false);
    const Page = pages[modalValues.state-1];
    

    const saveFunc = () => {
        const status = SaveProject(modalValues);
        console.log(['Error', 'Good', 'Nothing'][status+1])
    }

    const backFunc = () => {
        setGoBack(true);
    }
    return (
        <>
            {goBack ? ( 
                <Page 
                    pages={pages}
                    modalValues={modalValues}
                    setModalValues={setModalValues}
                /> 
            ) : (
                <> 
                    <Project 
                        modalValues={modalValues}
                    />
                    <Button onClick={backFunc}>
                        Back
                    </Button>
                    <Button onClick={saveFunc}>
                        Finish
                    </Button>
                </>
        )}
    </>
    );
} 