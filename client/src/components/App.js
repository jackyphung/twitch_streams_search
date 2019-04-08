import React, { Component } from 'react';
import history from 'History';
import { Switch, Route } from 'react-router-dom';
import 'assets/css/App.css';
import 'assets/css/Colors.css';
import 'assets/css/General.css';
import 'assets/css/Users.css';
import { ContentBody, NavBar, NavSection, NavLink, Link } from 'Layout';
import { Home, NotFound } from 'Pages';
import { LoginButton } from 'Sections';


import { UserAuthSubscriber } from 'services';

function debounce(a,b,c){var d,e;return function(){function h(){d=null,c||(e=a.apply(f,g))}var f=this,g=arguments;return clearTimeout(d),d=setTimeout(h,b),c&&!d&&(e=a.apply(f,g)),e}}

class App extends Component {
  componentDidMount() { }
  
  state = {
    username: ""
  }

  onChange = debounce(username => {
    this.setState({
      username: username.trim()
    });
  }, 1000)

  render() {
    return (
      <UserAuthSubscriber>
        { auth => (
          <div className="App">
            <ContentBody>
          
              <NavBar className="twitch-purple">
                <NavSection align="left">
                  <Link Url="https://twitch.tv/"><img src="/assets/images/Twitch_White_RGB.png" style={{ position: "absolute", top: "50%", transform: "translateY(-50%)", left: "10px", maxHeight: "28px", width: "auto" }}/></Link>
                  <input className="twitch-dark" style={{ marginLeft: "100px" }} type="text" placeholder="Search Twitch Streamer" onKeyUp={e => { this.onChange(e.target.value) }}/>
                </NavSection>
              </NavBar>
              
              <Switch>
                <Route exact path="/" render={(props) => <Home {...props} username={this.state.username}/>}/>  
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