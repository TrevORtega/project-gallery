import logo from './logo.svg';
import DefaultNav from './components/nav/Nav.js';
import Profile from './pages/profile/Profile.js';
import styled from 'styled-components'

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";




const StyledApp = styled.div`
  height: 100vh;
  width: 100vw;
`;

// CSS for main element here
const StyledMainContainer = styled.div`
  text-align: center;
`;

function App() {
  return (
    <StyledApp>
      <DefaultNav/>
      <StyledMainContainer className="container">
        <h3>
          Find Projects from Developers around the World! 
        </h3>
      </StyledMainContainer>
    </StyledApp>
  );
}

function RouterApp(){
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <App />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
        </Switch>
      </div>
    </Router>
)};

export default RouterApp;
