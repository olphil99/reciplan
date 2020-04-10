import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import '../css/login.css';

/**
 * This component appears when a user is not logged into the application.
 * It will suggest signing in and redirect to /login.
 *
 * Props: message - the message our parent wants us to print out
 * @extends Component
 */
class NotLoggedIn extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <Container>
        <div id='not-logged-in'>
          <span>You're not logged in!</span><br />
          <span>{this.props.message}</span>
        </div>
      </Container>
    )
  }
}

export default NotLoggedIn;
