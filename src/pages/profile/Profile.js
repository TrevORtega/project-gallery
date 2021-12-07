import styled from 'styled-components';
import { Row, Button } from 'react-bootstrap';
import { useState } from 'react';
import { useParams } from "react-router-dom";
import { useCookies } from 'react-cookie';

import { DefaultNav } from '../../components/nav/Nav';
import { ContentContainer, MainContainer } from '../../components/theme/mainTheme';
import { SubmissionModal } from '../../components/submissionModal/SubmissionModal';
import { LoadProfile } from './ProfileApi';
import { SearchResultsProfileProjects } from '../searchResults/SearchResults';
import stock from '../../images/default_photo.jpg'

// CSS for main component for profile page here
const StyledProfile = styled.div`
    text-align: center; 
    img.rounded-corners {
    	border-radius: 30px;
    }
    h1 {
    color: #000;
    }

    h2 {
    padding-left: 40px;
    text-align: left;
    color: #fff;
    }

    h5 {
        color: #000;
        font: italic;
    }
    
    .git {
        font-size: 1.25em;
        color: black;
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
    padding-top: 50px;
    }

    .thumb img {
    display: block;
    }

    .content {
    float: left;
    margin-top: 60px;
    }

`;

const pStyles = {
    color: '#fff',
    'paddingLeft': '40px',
    'textAlign': 'left',
    'paddingBottom': '40px'
};

const Profile = ({ username, about, experience, education, github=''}) => {
    const [profile, setUseProfile] = useState({
        username,
        about,
        experience,
        education,
        github 
    });

    return (
        <>
            <div class="container">
                <div class = "content">
                    <h1 class = "display-1 fw-bolder">{`@${username}`}</h1>
                </div>
                <div class="thumb">
                    <img src = {stock} height = "200" width = "200" class = "rounded-corners"  alt="default avatar" />
                    <a className="git" href={`https://github.com/${profile.github}`}>{`Github: ${profile.github}`}</a>
                </div>
            </div>
            <h2>About</h2>
            <div class="container" className="w-50">
                <p style={pStyles}>{profile.about}</p>
            </div>
            
            <h2>Experience</h2>
            <div class="container" className="w-50">
                <p style={pStyles}>{profile.experience}</p>
            </div>
            <h2>Education</h2>
            <div class="container" className="w-50">
                <p style={pStyles}>{profile.education}</p>
            </div>
            <h2>Projects</h2>
            <div class="container" className="w-50">
                <SearchResultsProfileProjects username={username} />
            </div>
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
                        <Button size='sm' variant='outline-light' onClick={() => setModalMode(true)}>
                        New Project
                        </Button>
                        <p></p>
                        <Button size='sm' variant='outline-light' href={window.location.href + '/edit'} >
                            Edit Profile
                        </Button>
                        <p></p>
                        <Button size='sm' variant='outline-light' href={window.location.href + '/findGit'} >
                            Add Github
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
    const [cookies, setCookies] = useCookies();

    LoadProfile({username: profileName, setData});
    
    let Display = null;
    if (data) {
        if ('ERR' in data || 'error' in data ) {
            console.log(cookies.username, profileName);
            if (cookies.username === profileName){
                window.location.href = `/profile/${profileName}/edit`
            }
            else{
                Display = () => <p>Profile Does Not Exist</p>;
            }
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