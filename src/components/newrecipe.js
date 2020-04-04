import React, { Component } from 'react';
import { Container, Row, Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import '../css/recipe.css';
import axios from 'axios';
import { SERVICE_URL } from '../utils.js';

/**
 * Create a new recipe
 * Contains a form to create a new recipe and POSTs it to our service.
 * @extends Component
 */
class NewRecipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe: {}
    }
  }

  async postNewRecipe(recipe) {
    try {
      const response = await axios.post(`${SERVICE_URL}/homepage/results/`, recipe); // change to an updated url
      const data = await response.json();
      return data;
    } catch(e) {
      console.log('Encountered an error posting a new recipe.');
      return {};
    }
  }

  render() {
    return(
      <Container>
        <Form>
          <FormGroup>
            <Label for="recipe-name">Recipe Name</Label>
            <Input name="recipe-name" id="recipe-name" placeholder="Enter the name of your recipe" />
          </FormGroup>
          <FormGroup>
            <Label for="ingredients">Ingredients</Label>
            <Input name="ingredient-one" id="ingredient-one" placeholder="Quantity + ingredient" />
            <Input  name="ingredient-two" id="ingredient-two" placeholder="Quantity + ingredient" />
            <Input name="ingredient-three" id="ingredient-three" placeholder="Quantity + ingredient" />
          </FormGroup>
          <FormGroup>
            <Label for="instructions">Instructions</Label>
            <Input type="textarea" name="instructions" id="instructions" placeholder="Type out the instructions for your recipe in paragraphs." />
          </FormGroup>
          <Button>Submit</Button>
        </Form>
      </Container>
    )
  }
}

export default NewRecipe;
