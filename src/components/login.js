import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
// import '../css/profile.css';
import axios from 'axios';
import UserProfile, { SERVICE_URL } from '../utils.js';

/**
 * This is the page that pops up when a user needs to log in.
 * It calls the 'redirect' prop to return the user to the application.
 *
 * This component makes a POST call to the API to log a user in,
 * and a POST call to create a new user.
 * @extends Component
 */
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return(
      <Container id="login-window">
        log
      </Container>
    )
  }
}

export default Login;
