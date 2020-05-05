import React, { Component } from 'react';
import { Container, Row, Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
// import '../css/cart.css';
import axios from 'axios';
import UserProfile, { SERVICE_URL } from '../utils.js';
import NotLoggedIn from './notloggedin.js';
import NewRecipe from './newrecipe.js';

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
    let userObj = null;
    if (UserProfile.isLoggedIn()) {
      userObj = UserProfile.getUserObject();
    }
    this.state = {
      user: userObj,
      loggedIn: (userObj !== null),
      pictureURL: '',
      recipe: {},
      ingredientRows: [<Input name="ingredient-0" id="ingredient-0" placeholder="Quantity + ingredient" key="ingredient-0" required />],
      username: userObj.username,
      my_recipes: [<h1>TEdsdsfadfsafds</h1>,<h1>vffv</h1>],
      ingredients: []
    }
    this.removeFromCart = this.removeFromCart.bind(this);

  }

  async removeFromCart(e) {
    var jsonToQuery = { username: this.state.user.username, recipe: e.target.name};
    axios.delete(`${SERVICE_URL}/cart/`, { data: jsonToQuery})
    this.getUserCart();
  }

  async getUserCart() {
    console.log('gettingUsercart');
    if (this.state.loggedIn) {
      let jsonedUser = {params: {username: this.state.user.username}};
      try {
        const response = await axios.get(`${SERVICE_URL}/cart/`, jsonedUser);
        const data = await response;
        var dat = JSON.parse(data['data'])['cartItems'];
        //var dat = JSON.parse(data['data']);
        //console.log(data.toString());
        //var dat = JSON.parse(data);
        console.log(dat.length);
        let t = [];
        let ing = [];
        for (var i = 0; i < dat.length; i++) {
          var curr_ing = dat[i]['ingredients'].split(',');
          for (var j = 0; j < curr_ing.length; j++) {
            ing.push(<div key={curr_ing[j] + Math.floor(Math.random() * 1000).toString()}>{curr_ing[j]}</div>);
          }
          t.push(<div key={dat[i]['recipe_id']}><Button key={dat[i]['recipe_id'] + 'remove'} name={dat[i]['recipe_id']} onClick={this.removeFromCart} color="danger">Remove</Button>{dat[i]['name']}</div>);
        }
        console.log(t);
        this.setState({ my_recipes: t });
        this.setState({ ingredients: ing });
        return data;
      } catch(e) {
        console.log('Encountered an error searching for recipes.');
        console.log(e.toString());
        return {};
      }
    }
  }

  componentDidMount() {
    this.getUserCart();
  }

  render() {
    return(
      <Container>
        <Row>
          <Col md="12">
            <h1> Ingredients </h1>
            {this.state.ingredients.map(child => child)}
            <h1> My Cart </h1>
            {this.state.my_recipes.map(child => child)}
          </Col>
        </Row>
      </Container>
    )
  }
}

export default Cart;
