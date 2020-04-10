import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
// import '../css/profile.css';
import axios from 'axios';
import UserProfile, { SERVICE_URL } from '../utils.js';
import NotLoggedIn from './notloggedin.js';

/**
 * Edit user profile
 * @extends Component
 */
class EditProfile extends Component {
  constructor(props) {
    super(props);
    let userObj = null;
    if (UserProfile.isLoggedIn()) {
      userObj = UserProfile.getUserObject();
    }
    this.state = {
      user: userObj,
      loggedIn: (userObj !== null)
    }
  }

  render() {
    const {user, loggedIn} = this.state;
    let loginBtn = {};
    if (!loggedIn) {
      return(
        <Container>
          <NotLoggedIn message='In order to view your profile, please log in or sign up for our application.' children={[loginBtn]} />
        </Container>
      );
    } else {
      return(
        <Container>
          logged in
        </Container>
      )
    }
  }
}

export default EditProfile;
