import styled from 'styled-components';
import { Row, FloatingLabel, Form, Button, Stack } from 'react-bootstrap';

import { DefaultNav } from '../../components/nav/Nav';
import { ContentContainer, MainContainer } from '../../components/theme/mainTheme';

// CSS for main component for profile page here
const StyledLoginForm = styled(Form)`
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

export const Login = ({ setCookies }) => {
    
    const changeHandler = e => {
        e.preventDefault();

        if (e.target.name === "password")
            e.target.value = new Array(e.target.value.length + 1).join(' '); 
        else if (e.target.name === "recruiter"){
            e.target.name = "isRecruiter";
            e.target.value = e.target.value === "on";
            setCookies(e.target.name, e.target.value);
        }
        else{
            setCookies(e.target.name, e.target.value);
        }
    }
    const submitHandler = e => {
        e.preventDefault();
    }
    return (
        <MainContainer>
            <Row>
                <DefaultNav profile={true} />
            </Row>
            <StyledContentContainer>
                <StyledLoginForm onChange={changeHandler} onSubmit={submitHandler}>
                    <Stack gap={3}>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Email address"
                        >
                            <Form.Control name="email" type="email" placeholder="name@example.com" />
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingUsername" label="Username">
                            <Form.Control name="username" type="username" placeholder="Username" />
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingPassword" label="Password">
                            <Form.Control name="password" type="password" placeholder="Password" />
                        </FloatingLabel>
                        <Form.Check name="recruiter" type="checkbox" style={{textAlign: 'left'}} label="Are you a recruiter?"/>
                        <Button type="submit" size="md">
                            Submit
                        </Button>
                    </Stack>
                </StyledLoginForm>
            </StyledContentContainer>
        </MainContainer>
    );
}
