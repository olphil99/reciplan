import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
// import '../css/cart.css';
import axios from 'axios';
import { SERVICE_URL } from '../utils.js';

/**
 * Displays the recipes that our user has in the cart currently.
 * Has an option to build a grocery list based off of these recipes.
 *
 * This component makes a GET or PUT to the Cart API to display or update,
 * a GET on the Recipes API to retrieve the ingredients and other recipe info.
 * @extends Component
 */
class Cart extends Component {
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

export default Cart;
