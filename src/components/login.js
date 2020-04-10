import React, { Component } from 'react';
import { Container, Row, Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';
// import '../css/profile.css';
import axios from 'axios';
import { SERVICE_URL, UserProfile } from '../utils.js';

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
      userid: '',
      password: '',
      bio: ''
    }
    this.validateNewUser = this.validateNewUser.bind(this);
    this.postUser = this.postUser.bind(this);
  }

  async postUser(user) {
    try {
      const response = await axios.post(`${SERVICE_URL}/results/`, user); // change to an updated url
      const data = await response.json();
      return data;
    } catch(e) {
      console.log('Encountered an error posting a new user.');
      return {};
    }
  }

  // build the json from the form values and validate them
  async validateNewUser(event) {
    event.preventDefault();
    let form = event.target;
    console.log(form['userid'].value);
    // get the password
    let userJson = {
      creatorId: 'makingNewLogin',
      userid: form['userid'].value,
      password: form['password'].value,
      bio: form['bio'].value
    };
    let response = this.postUser(userJson);
    // this.props.history.push('/search')
  }

  render() {
    return(
      <Container>
        <Form onSubmit={this.validateNewUser}>
          <FormGroup>
            <Row>
              <Col sm="9">
                <Label for="userid">New Username</Label>
                <Input name="userid" id="userid" placeholder="Enter new Username" style={{width: '98%'}} required />
              </Col>
            </Row>
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input name="password" id="password" placeholder="Enter Password" style={{width: '98%'}} required />
          </FormGroup>
          <FormGroup>
            <Label for="bio">Bio</Label>
            <Input name="bio" id="bio" placeholder="Enter Bio" style={{width: '98%'}} required />
          </FormGroup>
          <Row>
            <Col sm="12">
              <Button style={{width:'98%'}}>Submit</Button>
            </Col>
          </Row>
        </Form>
      </Container>
    )
  }
}

export default Login;
