import React, { Component } from 'react';
import { Container, Row, Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import '../css/recipe.css';
import axios from 'axios';
import UserProfile, { SERVICE_URL } from '../utils.js';
import NotLoggedIn from './notloggedin.js';

/**
 * Displays the search results for recipe search.
 * @extends Component
 */
class MyRecipes extends Component {
  constructor(props) {
    super(props);
    let userObj = null;
    if (UserProfile.isLoggedIn()) {
      userObj = UserProfile.getUserObject();
    }
    this.state = {
      user: userObj,
      loggedIn: (userObj !== null),
      my_recipes: [<h1>TEdsdsfadfsafds</h1>,<h1>vffv</h1>]
    }
    this.edit = this.edit.bind(this);
    this.delete = this.delete.bind(this);
  }

  async edit(e) {
    console.log(e.target.name);
  }

  async delete(e) {
    console.log(e.target.name);
    axios.delete(`${SERVICE_URL}/myRecipes/`, { data: {recipe_id: e.target.name }})
    this.getUserRecipes();
  }

  async getUserRecipes() {
    if (this.state.loggedIn) {
      let jsonedUser = {params: {username: this.state.user.username}};
      try {
        const response = await axios.get(`${SERVICE_URL}/myRecipes/`, jsonedUser);
        const data = await response;
        var dat = JSON.parse(JSON.parse(data['data'])['recipe_list']);
        let t = [];
        for (var i = 0; i < dat.length; i++) {
          t.push(<div key={dat[i]['recipe_id']}><Button key={dat[i]['recipe_id'] + 'edit'} onClick={this.edit} name={dat[i]['recipe_id']} color="success" className="edit">Edit</Button><Button key={dat[i]['recipe_id'] + 'delete'} onClick={this.delete} name={dat[i]['recipe_id']} color="danger" className="delete">Delete</Button>{dat[i]['name']}{dat[i]['recipe_id']}</div>);
        }
        console.log(t);
        this.setState({ my_recipes: t });
        return data;
      } catch(e) {
        console.log('Encountered an error searching for recipes.');
        console.log(e.toString());
        return {};
      }
    }
  }

  componentDidMount() {
    this.getUserRecipes();
  }

  render() {
    return(
      <Container>
        <h1> My Recipes </h1>
          {this.state.my_recipes.map(child => child)}
      </Container>
    )
  }
}

export default MyRecipes;
