import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
// import '../css/profile.css';
import axios from 'axios';
import UserProfile, { SERVICE_URL } from '../utils.js';
import NotLoggedIn from './notloggedin.js';

/**
 * Displays user's profile and favorites, and allows them to update their info.
 *
 * This component makes a GET call to the API to retrieve the user & favorites information,
 * a PUT call when the user updates their info or favorites,
 * a DELETE call if the user chooses to deactivate.
 * @extends Component
 */
class MyProfile extends Component {
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

export default MyProfile;
