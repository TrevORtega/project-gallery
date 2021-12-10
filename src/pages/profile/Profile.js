import styled from 'styled-components';
import { Row, Button, Stack } from 'react-bootstrap';
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

// Styling for the option buttons on the bottom of page
const ButtonContainer = styled(Stack)`
    margin-top: 2vh;
    display: flex;
    justify-content: center;
`;

// Give buttons some space on the left and right
const StyledButton = styled(Button)`
    margin: 0 0 5px 5px;
`;

const pStyles = {
    color: '#fff',
    'paddingLeft': '40px',
    'textAlign': 'left',
    'paddingBottom': '40px'
};

const Profile = ({ username, about, experience, education, showDetails=false, github=''}) => {
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
                    <a className="git" href={`https://github.com/${profile.github}`}>
                        {profile.github ? `Github: ${profile.github}` : ''}
                    </a>
                </div>
            </div>
            {showDetails ? (
                <>
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
                </>
            ) : null}
            <h2>Projects</h2>
            <div className="projContainer">
                <SearchResultsProfileProjects username={username} />
            </div>
        </>
    );
}

const ProfileContent = ({ profileData, setModalMode }) => {
    const [cookies, setCookies] = useCookies();
    const profileName = profileData.username;
    const username = cookies.username; 
    const isRecruiter = cookies.isRecruiter;

    const profileIsCurUser = username === profileName;
    const showDetails = profileIsCurUser || isRecruiter; 
    /*
        Profile data gets loaded into a Profile component. We only show editing options
        if the user is logged into an account with the same name as the profile name in 
        the profile data.
    */
    return (
        <ContentContainer>
            <StyledProfile>
                <Profile {...profileData} showDetails={showDetails} />    
                {profileIsCurUser ? 
                    (
                        <ButtonContainer direction="horizontal">
                            <StyledButton size='sm' variant='outline-light' onClick={() => setModalMode(true)}>
                            New Project
                            </StyledButton>
                            <p></p>
                            <StyledButton size='sm' variant='outline-light' href={window.location.href + '/edit'} >
                                Edit Profile
                            </StyledButton>
                            <p></p>
                            <StyledButton size='sm' variant='outline-light' href={window.location.href + '/findGit'} >
                                Add Github
                            </StyledButton>
                        </ButtonContainer>
                    ) : <></>
                }
            </StyledProfile>
        </ContentContainer>
    );
}


export const MainProfilePage = ({ profileData }) => {
    const [modalMode, setModalMode] = useState(false);

    /*
        We show the profile unless the 'New Project' button is selected. In which
        case we enter the project submission portal (modalMode). This is a little 
        inconsistent since we redirect to other pages for all other editing options
        (SubmissionModal was made before backend api was finished).
    */
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
    
    /*
        Case 1: Currentling loading profile from api (data is null) -> Show Loading component
        Case 2: Error in loading profile (doesn't exist) -> 
            allow user to create / edit their profile or if it's a random profile show profile doesn't exist
        Case 3: Profile loaded -> Show Profile
    */
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
