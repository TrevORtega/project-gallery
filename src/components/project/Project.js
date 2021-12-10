import { useEffect, useState } from "react";
import { Card, Row, Col, Button, Accordion, Carousel, Stack } from "react-bootstrap";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { DefaultNav } from "../nav/Nav";
import { CodeBlock } from "../submissionModal/snippets";
import { ContentContainer, MainContainer } from "../theme/mainTheme";

import { SaveProject, FileListToUrlList, FileToUrl, LoadProject } from "./ProjectApi";

// Description section which can be closed on click (accordian style)
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

// Compenent to cycle through all imageUrlsl and videoUrls
const ImageCaroselWithDemo = ({imageUrls, videoUrl=null}) => {
    const [index, setIndex] = useState(0);
    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    }

    if (!Array.isArray(imageUrls)){
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
                        controls={true}
                    />
                </Carousel.Item>

            ) : null 
            }
        </Carousel>
    );
}

// Code snippets
const SnippetBlocks = ({code, language}) => {
    return (
        <Row>
            {code.map((snip, i) => (
                <Col>
                    <CodeBlock 
                        key={{i}}
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

// Actual content of full sized project
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
    const activeImageUrls = imageUrls//.map(x => URL.createObjectURL(
    //    x
    //));
    const activeVideoUrl = videoUrl// && URL.createObjectURL(videoUrl);
    return (
        <Stack>
            <h1>{name}</h1>
            <DescriptionAccordion 
                description={description}
            /> 
            <a href={sourceLink}>{sourceLink}</a>
            <ImageCaroselWithDemo 
                imageUrls={activeImageUrls}
                videoUrl={activeVideoUrl}
            />
            <StyledSnippetBlocks
                code={code}
                language={language}
            />
        </Stack>
    );
}

// Shows preview for created project via modalValues. 
// pages Component Array (from SubmissionModal) allows users to go back and edit things if 
// they don't like the preview 
export const NewProject = ({ pages, modalValues, setModalValues }) => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [goBack, setGoBack] = useState(false);
    const Page = pages[modalValues.state-1];
    

    const saveFunc = () => {
        setIsSubmitted(true);
    }

    const backFunc = () => {
        setModalValues({...modalValues, state: modalValues.state-1})
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
                {isSubmitted ? <SaveProject modalValues={modalValues} /> 
                : (
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
        )}
    </>
    );
} 

// Loads project in the full sized format for direct URL access
export const SavedProject = () => {
    const [data, setData] = useState(null);
    const { projectId } = useParams();
    LoadProject({id: projectId, setData});
    
    let Display = null;
    if (data) {
        if ('ERR' in data){
            Display = () => <p>Project Does Not Exist</p>;
        } 
        else{
            Display = () => {
                return (
                    <Project modalValues={data} />
                );
            }
        }
    }
    else{
        Display = () => <p>Loading...</p>;
    }

    return (
        <MainContainer>
            <Row>
                <DefaultNav />
            </Row>
            <ContentContainer>
                <Display />
            </ContentContainer>
        </MainContainer>
    );
}

// Loads a project in the "small" format for search results and profile pages
export const SavedProjectSmall = ({ id }) => {
    const [data, setData] = useState(null);
    LoadProject({id, setData});
    
    let Display = null;
    if (data) {
        if ('ERR' in data || 'error' in data){
            Display = () => <p>Project Does Not Exist</p>;
        } 
        else{
            Display = () => {
                return (
                    <Card style={{ width: '20rem', textAlign: 'center' }}>
                        <Card.Body>
                            <Card.Title>{data.name}</Card.Title>
                            <Card.Text>
                               {data.description} 
                            </Card.Text>
                            <Card.Link href={`/project/${id}`}>Gallery</Card.Link>
                            <Card.Link href={data.sourceLink}>Source</Card.Link>
                        </Card.Body>
                    </Card>
                );
            }
        }
    }
    else{
        Display = () => <p>Loading...</p>;
    }

    return <Display /> 
}