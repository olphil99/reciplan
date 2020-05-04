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
      my_recipes: []
    }
  }

  async getUserRecipes() {
    if (this.state.loggedIn) {
      let jsonedUser = {params: {username: this.state.user.username}};
      try {
        const response = await axios.get(`${SERVICE_URL}/myRecipes/`, jsonedUser);
        const data = await response;
        var dat = JSON.parse(JSON.parse(data['data'])['recipe_list']);
        console.log(dat);
        var currHTML = '<table style="width:100%">';
        for (var i = 0; i < dat.length; i++) {
          currHTML += '<tr><td>' + dat[i]['name'] + '</td><td>' + dat[i]['recipe_id'] + '</td></tr>';
          console.log(dat[i]['name']);
        }
        currHTML += '</table>';
        document.getElementById('res').innerHTML = currHTML
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

  async runSearch() {
    var search = document.getElementById('search-input').value;
    //console.log(search);
    let jsonedSearch = {params: {searchVal: search}};
    try {
      const response = await axios.get(`${SERVICE_URL}/results/`, jsonedSearch);
      const data = await response;
      var dat = JSON.parse(JSON.parse(data['data'])['searchResults']);
      console.log(dat);
      var currHTML = '<table style="width:100%">';
      for (var i = 0; i < dat.length; i++) {
        currHTML += '<tr><td>' + dat[i]['recipeName'] + '</td></tr>';
        console.log(dat[i]['recipeName']);
      }
      currHTML += '</table>';
      document.getElementById('res').innerHTML = currHTML
      return data;
    } catch(e) {
      console.log('Encountered an error showing recipes.');
      console.log(e.toString());
      return {};
    }
  }

  render() {
    return(
      <Container>
        <h1> My Recipes </h1>
        <div id="res">
        </div>
      </Container>
    )
  }
}

export default MyRecipes;
