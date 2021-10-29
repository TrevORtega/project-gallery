import logo from './logo.svg';
import Nav from './components/nav/Nav.js';
import Profile from './pages/profile/Profile.js';
import styled from 'styled-components'

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

//<img src={logo} className="App-logo" alt="logo" />

const StyledApp = styled.div`
  background-color: #282c34;
  min-height: 100%;
  min-width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: calc(10px + 2vmin);
  color: white;
`;


function App() {
  return (
    <div className="App">
      <StyledApp className="container">
        <Nav className="nav"/>
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
