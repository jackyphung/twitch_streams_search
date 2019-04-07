/*
Component
LoginModal
*/
import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, FormGroup } from 'Layout';
import './LoginModal.css';

import { UserAuthSubscriber } from 'services';

class LoginModal extends Component {
  constructor(props) {
    super(props);
  }

  state = { 
    username: "",
    password: ""
  }

  componentDidMount() { }

  static getDerivedStateFromProps(nextProps, prevState) {
    let state = { };
    if (prevState) {
      for (let key in nextProps) {
        if (prevState.hasOwnProperty(key)) {
          if (nextProps[key] !== prevState[key])
            state[key] = nextProps[key];
        }
      }
    }
    
    return state;
  }

  handleSignIn(event, auth) {
    event.preventDefault();
    auth.login(this.state.username, this.state.password);
  }

  render() {
    const { id, className, children, style, auth, show, toggle } = this.props;
    const { username, password } = this.state;
    return (
      <Modal id={"login-modal"} show={show} toggle={toggle}>
        <form method="POST">
          <ModalHeader>
            <h2>Sign in to ArtXperience</h2>
          </ModalHeader>
          
          <ModalBody className="d-flex">
            <FormGroup id="username-input">
              <label>Username or Email Address</label>
              <input id="username" name="username" type="text" onChange={(e) => { this.setState({ username: e.target.value }) }}/>
            </FormGroup>
            <FormGroup id="password-input">
              <label>Password</label>
              <input id="password" name="password" type="password" onChange={(e) => { this.setState({ password: e.target.value }) }}/>
              {/*<ForgotPassword/>*/}
            </FormGroup>
          </ModalBody>
          
          <ModalFooter>
            <button className="sign-in" type="submit" onClick={(e) => { this.handleSignIn(e, auth); }}>Sign In</button>
          </ModalFooter>
        </form>
      </Modal>
    );
  }
}

export { LoginModal };