import React, { Component } from 'react';
import history from 'History';
import { Switch, Route } from 'react-router-dom';
import 'assets/css/App.css';
import 'assets/css/General.css';
import 'assets/css/Users.css';
import { ContentBody, NavBar, NavSection, NavLink } from 'Layout';
import { Home, NotFound} from 'Pages';
import { LoginButton } from 'Sections';


import { UserAuthSubscriber } from 'services';

class App extends Component {
  componentDidMount() { }
  
  render() {
    return (
      <UserAuthSubscriber>
        { auth => (
          <div className="App">
            <ContentBody>
          
              <NavBar>
                <NavSection align="left">
                  
                </NavSection>
              </NavBar>
              
              <Switch>
                <Route exact path="/" component={Home}/>  
                <Route path="*" component={NotFound} />
              </Switch>
            </ContentBody>
          </div>
        )}
      </UserAuthSubscriber>
    );
  }
}

export default App;