import logo from './logo.svg';
import Nav from './Nav.js';
import Profile from './Profile.js';
import styled from 'styled-components'

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

//<img src={logo} className="App-logo" alt="logo" />

const StyledApp = styled.div`
  background-color: #282c34;
  min-height: 100vh;
  min-width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: calc(10px + 2vmin);
  color: white;
`;


function App() {
  return (
    <div className="App">
      <StyledApp>
        <Nav />
        <h3>
          Find Projects from Developers around the World! 
        </h3>
      </StyledApp>
    </div>
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
