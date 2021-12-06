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
    
    let Display = null;
    if (data) {
        if ('ERR' in data || 'error' in data){
            const defaults = {
                username: profileName,
                experience: '',
                about: '',
                education: ''
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
                                    variant="primary" 
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
