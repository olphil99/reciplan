import React, { Component } from 'react';
import { Container, Row, Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import '../css/recipe.css';
import axios from 'axios';
import { SERVICE_URL } from '../utils.js';

/**
 * Displays the search results for recipe search.
 * @extends Component
 */
class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      returnedRecipeNames: []
    }
  }

  async runSearch() {
    var search = document.getElementById('search-input').value;
    //console.log(search);
    let jsonedSearch = {params: {searchVal: search}};
    try {
      const response = await axios.get(`${SERVICE_URL}/results/`, jsonedSearch);
      const data = await response;
      var dat = data.searchResults;
      var currHTML = '<table style="width:100%">';
      for (var i = 0; i < dat.length; i++) {
        currHTML += '<tr>' + dat[i].recipeName + '</tr>';
      }
      currHTML += '</table>';
      document.getElementById('res').innerHTML = currHTML
      return data;
    } catch(e) {
      console.log('Encountered an error searching for recipes.');
      return {};
    }
  }

  async validateRecipe(event) {
    event.preventDefault();
  }

  render() {
    return(
      <Container>
        <Label for="search-input">Recipe Name</Label>
        <Input name="search-input" id="search-input" placeholder="Search for a recipe" style={{width: '98%'}} required />
        <Button onClick={this.runSearch} color="success" style={{position:'absolute', bottom: 0}}>Search</Button>
        <div id="res">
        </div>
      </Container>
    )
  }
}

export default Search;
