import styled from 'styled-components';
import { DefaultNav } from '../../components/nav/Nav';
import { ContentContainer, MainContainer } from '../../components/theme/mainTheme';
import Button from 'react-bootstrap/Button';
import { Row, Col, Form, Stack } from 'react-bootstrap';

import { useParams } from 'react-router';
import { LoadProfile, SaveProfile } from './ProfileApi';
import { useEffect, useState } from 'react';

const StyledForm = styled(Form)``;

export const EditProfile = () => {
    const [data, setData] = useState(null);
    const { profileName } = useParams();
    LoadProfile({username: profileName, setData});

    /*
        Case 1: Currentling loading profile from api (data is null) -> Show Loading component
        Case 2: Error in loading profile (doesn't exist) -> show editing form with empty strings 
        Case 3: Profile loaded -> Show editing form with current profile data
    */
    let Display = null;
    if (data) {
        if ('ERR' in data || 'error' in data){
            const defaults = {
                username: profileName,
                experience: '',
                about: '',
                education: '',
                github: ''
            }
            Display = () => ( <EditProfileForm defaults={defaults} /> );
        } 
        else{
            Display = () => ( <EditProfileForm defaults={data} /> );
        }
    }
    else{
        Display = () => <p>Loading...</p>;
    }

    return <Display />; 
};

const EditProfileForm = ({ defaults }) => {
    const [profileData, setProfileData] = useState({...defaults});
    const [isSubmitted, setIsSubmitted] = useState(false);

    const changeHandler = (name, e) => {
        setProfileData({...profileData, [name]: e.target.value});
    }
    const submitHandler = e => {
        e.preventDefault();

        setIsSubmitted(true); 
    }

    if (isSubmitted)
        return <SaveProfile profileData={profileData} />;


    /*
        All changes get saved into profileData via a custom changeHandler for that form.
        On submit, all current data in profileData gets given to saveProfile to be sent to 
        be saved to file
    */
    
    return ( 
        <ContentContainer>
            <MainContainer fluid={true}>
                <DefaultNav />
                <StyledForm onSubmit={submitHandler}> 
                    <Stack>
                        <Row className="justify-content-center p-3">
                            <Col md="8">
                                <h3>About</h3>
                                    <Form.Control 
                                        name="about" 
                                        as="textarea"
                                        rows="5" 
                                        onChange={e => changeHandler('about', e)}
                                        value={profileData.about}
                                    >
                                    </Form.Control>
                            </Col>
                        </Row>

                        <Row className="justify-content-center p-3">
                            <Col md="8">
                                <h3>Experience</h3>
                                    <Form.Control 
                                        name="experience" 
                                        as="textarea" 
                                        rows="5" 
                                        onChange={e => changeHandler('experience', e)}
                                        value={profileData.experience}
                                    >
                                    </Form.Control>
                            </Col>
                        </Row>

                        <Row className="justify-content-center p-3">
                            <Col md="8">
                                <h3>Education</h3>
                                    <Form.Control 
                                        name="education" 
                                        as="textarea" 
                                        rows="5"
                                        onChange={e => changeHandler('education', e)}
                                        value={profileData.education}
                                    >
                                    </Form.Control>
                                <Button 
                                    type="submit" 
                                    variant="outline-light" 
                                    size="sm" 
                                    disabled={Object.values(profileData)?.filter(x => x?.length === 0) > 0}
                                >
                                    Submit
                                </Button>
                            </Col>
                        </Row>

                    </Stack>
                </StyledForm>
            </MainContainer>
        </ContentContainer>
    ) 
};
