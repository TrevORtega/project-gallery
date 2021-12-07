import styled from 'styled-components'
import { Row, Form, Button, Stack} from 'react-bootstrap/';
import { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import { DefaultNav } from './components/nav/Nav.js';
import { DynamicProfile } from './pages/profile/Profile.js';
import { SearchResults } from './pages/searchResults/SearchResults.js'
import { NoPage } from './pages/noPage/NoPage.js'
import { EditProfile } from './pages/profile/EditProfile.js';
import { MainContainer, ContentContainer } from './components/theme/mainTheme.js';
import { Login } from './pages/login/Login.js';
import { useCookies } from 'react-cookie';
import { SavedProject } from './components/project/Project.js';
import { GitProjects } from './pages/profile/gitProject.js';

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: white;
  margin-top: 20vh;
  margin-bottom: 30vh;
`;

const StyledMainText = styled.h3`

`;

const Grid = ({ submitFunc }) => {
  return (
    <MainContainer fluid={true}>
      <Row lg={true}>
        <DefaultNav />
      </Row>
      <ContentContainer lg={true}>
        <StyledForm onSubmit={submitFunc}>
          <StyledMainText>Find Coding Projects from Developers Around the World!</StyledMainText>
          <Form.Group>
            <Stack direction="horizontal">
              <Form.Control type="text" name="search" size="lg" placeholder="React Web Applications..."/>
              <Button size="lg" type="submit">Submit</Button>
            </Stack>
          </Form.Group>
        </StyledForm>
      </ContentContainer>
    </MainContainer>
  )
}


const App = () => {
  const [submitQuery, setSubmitQuery] = useState('');
  
  const onFormSubmit = e => {
    e.preventDefault()
    const formData = new FormData(e.target);
    const formDataObj = Object.fromEntries(formData.entries());
    return setSubmitQuery(formDataObj.search);
  }
  const validSubmit = submitQuery !== '';
  return ( 
    validSubmit ? 
      <SearchResults query={submitQuery} />
      :
      <Grid submitFunc={onFormSubmit} />
  );
    
}

function RouterApp(){
  const [cookies, setCookies] = useCookies();

  if (!cookies?.username) {
    return <Login /> 
  }

  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={App} />

          {/*<Route exact path="/profile" component={Profile} />*/}
          <Route exact path="/profile/:profileName" component={DynamicProfile} />
          <Route path="/profile/:profileName/edit" component={EditProfile} />
          <Route path="/profile/:profileName/findGit" component={GitProjects} />
          <Route path="/project/:projectId" component={SavedProject} />

          <Route exact path="/search" component={SearchResults} />

          <Route path="*" component={NoPage} />
        </Switch>
      </div>
    </Router>
)};

export default RouterApp;
