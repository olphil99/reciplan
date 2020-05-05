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
      console.log('Encountered an error searching for recipes.');
      console.log(e.toString());
      return {};
    }
  }

  render() {
    return(
      <Container>
        <Label for="search-input">Search</Label>
        <Row>
          <Col md="8">
            <Input name="search-input" id="search-input" placeholder="Search for a recipe" style={{width: '98%'}} required />
          </Col>
          <Col md="4">
            <Button onClick={this.runSearch} color="success" style={{position:'absolute', bottom: 0}}>Search</Button>
          </Col>
        </Row>
        <Row>
          <div id="res">
          </div>
        </Row>
      </Container>
    )
  }
}

export default Search;
