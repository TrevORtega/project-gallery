import { useState } from "react";
import styled from "styled-components";

import { ContentContainer } from "../theme/mainTheme";

import { Description } from "./description";
import { Snippets } from "./snippets";
import { SystemDesign } from "./systemDesign";
import { Visuals } from "./visuals";

const StyledModalContainer = styled.div`
    max-width: 40vw;
    min-width: 300px;
    padding-top: 5vh;
    padding-bottom: 20px;
    margin: 20vh 10vw 30vh 10vw;
    background-color: rgb(255, 255, 255);
    border-width: 0.4rem;
    border-radius: 8px;
`;

const StyledContentContainer = styled(ContentContainer)`
    dispaly: flex;
    flex-align: column;
    justify-content: center;
`;


export const SubmissionModal = () => {
    const [modalValues, setModalValues] = useState({
        state: 0,
        name: '',
        description: '',
        imageUrls: [],
        videoUrl: [],
        codeSnippets: [],
        diagramSetup: {}
    });

    const { modalState } = modalValues;
    const createProject = () => {
        console.log(modalValues);
    }
    if (modalState > 3){
        createProject();
    }

    const pages = [Description, Visuals, Snippets, SystemDesign];
    return (
        <StyledContentContainer>
            <StyledModalContainer>
               <Description 
                    pages={pages}
                    modalValues={modalValues}
                    setModalValues={setModalValues}
                /> 
            </StyledModalContainer>
        </StyledContentContainer>
    );
}