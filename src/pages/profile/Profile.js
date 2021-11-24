import styled from 'styled-components';
import { Row, Button } from 'react-bootstrap';
import { useState } from 'react';

import { DefaultNav } from '../../components/nav/Nav';
import { ContentContainer, MainContainer } from '../../components/theme/mainTheme';
import { SubmissionModal } from '../../components/submissionModal/SubmissionModal';
import stock from '../../images/default_photo.jpg'

// CSS for main component for profile page here
const StyledProfile = styled.div`
    text-align: center; 
    img.rounded-corners {
    	border-radius: 30px;
    }
    h1 {
    color: #fff;
    }

    h3 {
    padding-left: 40px;
    text-align: left;
    color: #fff;
    }
    
    p {
        text-align: left;
    }

    .container {
    margin: 20px 0px 0px 20px;
    overflow: auto;
    }

    .thumb {
    float: right;
    }

    .thumb img {
    display: block;
    }

    .content {
    float: left;
    margin-top: 60px;
    }
`;

const DefaultProfile = () => {
    const [profile, setUseProfile] = useState({
        name: 'DefaultUser',
        about: 'I\'m a CS student looking to get a job',
        experience: 'N/A',
        education: 'Sophomore at WWU',
        projects: []
    });

    return (
        <>
            <div class="container">
                <div class = "content">
                    <h1>Hi! I'm DefaultUser</h1>
                </div>
                <div class="thumb">
                    <img src = {stock} height = "200" width = "200" class = "rounded-corners" alt="default avatar" />
                </div>
            </div>
            <h3>About</h3>
            <p>{profile.name}</p>
            <h3>Experience</h3>
            <p>{profile.about}</p>
            <h3>Education</h3>
            <p>{profile.education}</p>
            <h3>Projects</h3>
            <p>{profile.projects}</p>
        </>
    );
}

const ProfileContent = ({ setModalMode }) => {
    return (
        <ContentContainer>
            <StyledProfile>
                <DefaultProfile />    
                <Button size='sm' onClick={() => setModalMode(true)}>
                    New Project
                </Button>
                <Button size='sm' href="/profile/edit" >
                    Edit Profile
                </Button>
                <Button size='sm' href="/profile/findGit" >
                    Add Github
                </Button>
            </StyledProfile>
        </ContentContainer>
    );
}


export const Profile = () => {
    const [modalMode, setModalMode] = useState(false);

    return (
        <MainContainer>
            <Row>
                <DefaultNav />
            </Row>
            {modalMode ? <SubmissionModal />
                : <ProfileContent setModalMode={setModalMode}/>}
        </MainContainer>
    );
}
