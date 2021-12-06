import styled from 'styled-components';
import { Row, Button } from 'react-bootstrap';
import { useState } from 'react';
import { useParams } from "react-router-dom";

import { DefaultNav } from '../../components/nav/Nav';
import { ContentContainer, MainContainer } from '../../components/theme/mainTheme';
import { SubmissionModal } from '../../components/submissionModal/SubmissionModal';
import { LoadProfile } from './ProfileApi';
import stock from '../../images/default_photo.jpg'
import { useCookies } from 'react-cookie';

// CSS for main component for profile page here
const StyledProfile = styled.div`
    text-align: center; 
    img.rounded-corners {
    	border-radius: 30px;
    }
    h1 {
    color: #000;
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

const Profile = ({ username, about, experience, education }) => {
    const [profile, setUseProfile] = useState({
        username,
        about,
        experience,
        education 
    });
    const projects = [];

    return (
        <>
            <div class="container">
                <div class = "content">
                    <h1>{`@${username}`}</h1>
                </div>
                <div class="thumb">
                    <img src = {stock} height = "200" width = "200" class = "rounded-corners" alt="default avatar" />
                </div>
            </div>
            <h3>About</h3>
            <p>{profile.about}</p>
            <h3>Experience</h3>
            <p>{profile.experience}</p>
            <h3>Education</h3>
            <p>{profile.education}</p>
            <h3>Projects</h3>
            <p>{projects}</p>
        </>
    );
}

const ProfileContent = ({ profileData, setModalMode }) => {
    const [cookies, setCookies] = useCookies();
    const profileName = profileData.username;
    const username = cookies.username; 
    return (
        <ContentContainer>
            <StyledProfile>
                <Profile {...profileData} />    
                {username === profileName ? 
                    (
                        <>
                        <Button size='sm' onClick={() => setModalMode(true)}>
                        New Project
                        </Button>
                        <Button size='sm' href={window.location.href + '/edit'} >
                            Edit Profile
                        </Button>
                    </>
                    ) : <></>
                }
            </StyledProfile>
        </ContentContainer>
    );
}


export const MainProfilePage = ({ profileData }) => {
    const [modalMode, setModalMode] = useState(false);

    return (
        <MainContainer>
            <Row>
                <DefaultNav />
            </Row>
            {modalMode ? <SubmissionModal />
                : <ProfileContent profileData={profileData} setModalMode={setModalMode}/>}
        </MainContainer>
    );
}

export const DynamicProfile = () => {
    const [data, setData] = useState(null);
    const { profileName } = useParams();

    LoadProfile({username: profileName, setData});
    
    let Display = null;
    if (data) {
        console.log('data-to-display -> ', data);
        if ('ERR' in data || 'error' in data){
            Display = () => <p>Profile Does Not Exist</p>;
            //window.location.href = `/profile/${profileName}/edit`
        } 
        else{
            Display = () => <MainProfilePage profileData={data} />;
        }
    }
    else{
        Display = () => <p>Loading...</p>;
    }

    return <Display /> 
}