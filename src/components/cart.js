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
    this.edit = this.edit.bind(this);
    this.delete = this.delete.bind(this);
    this.addIngredients = this.addIngredients.bind(this);
    this.addPicture = this.addPicture.bind(this);

  }


  // build the json from the form values and validate them
  async validateRecipe(event) {
    event.preventDefault();
    let form = event.target;
    console.log(form['recipe-name'].value);
    // get the ingredients
    let ingredients = [];
    this.state.ingredientRows.map(child => {
      let ingredient = child.props.id;
      ingredient = document.getElementById(ingredient).value;
      ingredients.push(ingredient);
    })
    let recipeJson = {
      recipeId: this.state.current_recipe,
      recipeOwner: this.state.username,
      recipeTitle: form['recipe-name'].value,
      recipeIngredients: ingredients,
      recipeInstructions: form['instructions'].value,
      recipePictureURL: this.state.pictureURL
    };
    let response = this.modifyRecipe(recipeJson);
  }

  addIngredients() {
    let t = this.state.ingredientRows;
    let id = `ingredient-${t.length}`;
    t.push(<Input name={id} id={id} placeholder="Quantity + ingredient" key={id} required />);
    this.setState({ ingredientRows: t });
  }

  addPicture() {
    // add code that opens a window, uploads a file?, and stores url here
  }

  async edit(e) {
    console.log(e.target.name);
    this.setState({ current_recipe: e.target.name });
    let params = {params: {recipeID: e.target.name}}
    try {
        const response = await axios.get(`${SERVICE_URL}/recipe/`, params);
        const data = await response;
        console.log(data);
        var dat = JSON.parse(data['data']);
        console.log(dat);
        document.getElementById('recipe-name').value = dat.recipeTitle;
        document.getElementById('instructions').value = dat.recipeInstructions;
        var ingredients = dat.recipeIngredients.split(',');
        for (var i = 0; i < ingredients.length; i++) {
          var ingredient = ingredients[i].replace('[','').replace(']','').replace('\'','').replace('\'','').trim(); // May need to pay attention to this
          if (i != 0) {
            this.addIngredients();
          }
          document.getElementById('ingredient-' + i.toString()).value = ingredient;
        }
        return data;
      } catch(e) {
        console.log('Encountered an error searching for recipes.');
        console.log(e.toString());
        return {};
      }
  }

  async delete(e) {
    console.log(e.target.name);
    axios.delete(`${SERVICE_URL}/myRecipes/`, { data: {recipe_id: e.target.name }})
    this.getUserCart();
  }

  async getUserCart() {
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
            ing.push(<div key={curr_ing[j]}>{curr_ing[j]}</div>);
          }
          t.push(<div key={dat[i]['recipe_id']}>{dat[i]['name']}</div>);
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
