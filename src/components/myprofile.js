import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
// import '../css/profile.css';
import axios from 'axios';
import { SERVICE_URL } from '../utils.js';

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
    this.state = {

    }
  }

  render() {
    return(
      <Container>

      </Container>
    )
  }
}

export default MyProfile;
