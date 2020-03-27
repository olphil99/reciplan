import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import '../css/home.css';
import axios from 'axios';
const API_URL = "http://localhost:8000/api/students/";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ret: {}
    }
  }

  componentDidMount() {
    axios.get(API_URL)
    .then(res => {
      this.setState({ ret: res.date });
    })
    .catch(err => console.log(err));
  }

  render() {
    return(
      <Container>
        {JSON.parse(this.state.ret)}
      </Container>
    )
  }
}

export default Home;
