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
      recipe: {},
      ingredientRows: []
    }
    this.validateRecipe = this.validateRecipe.bind(this);
    this.postNewRecipe = this.postNewRecipe.bind(this);
    this.addIngredients = this.addIngredients.bind(this);
    this.addPicture = this.addPicture.bind(this);
  }

  async postNewRecipe(recipe) {
    try {
      const response = await axios.post(`${SERVICE_URL}/results/`, recipe); // change to an updated url
      const data = await response.json();
      return data;
    } catch(e) {
      console.log('Encountered an error posting a new recipe.');
      return {};
    }
  }

  validateRecipe(event) {
    // if any
  }

  addIngredients() {
    let t = this.state.ingredientRows;
    let id = `ingredient-${t.lenght}`;
    t.push(<Input name={id} id={id} placeholder="Quantity + ingredient" key={id} required />);
    this.setState({ ingredientRows: t });
  }

  addPicture() {

  }

  render() {
    console.log(this.state.ingredientRows && this.state.ingredientRows[0])
    return(
      <Container>
        <Form>
          <FormGroup>
            <Row>
              <Col sm="3">
                <div className="insert-picture" onClick={this.addPicture}>
                  <a href="/"/>
                  Insert Picture
                </div>
              </Col>
              <Col sm="9">
                <Label for="recipe-name">Recipe Name</Label>
                <Input name="recipe-name" id="recipe-name" placeholder="Enter the name of your recipe" style={{width: '98%'}} required />
              </Col>
            </Row>
          </FormGroup>
          <FormGroup>
            <Label for="ingredients">Ingredients</Label>
            <Row>
              <Col sm="11" style={{paddingRight: 0}}>
                <Input name="ingredient-one" id="ingredient-one" placeholder="Quantity + ingredient" key="ingredient-one" required />
                {this.state.ingredientRows.map(child => child)}
              </Col>
              <Col className="no-padding">
                <Button onClick={this.addIngredients} color="success" style={{position:'absolute', bottom: 0}}>+</Button>
              </Col>
            </Row>
          </FormGroup>
          <FormGroup>
            <Label for="instructions">Instructions</Label>
            <Input type="textarea" name="instructions" id="instructions" placeholder="Type out the instructions for your recipe in paragraphs." style={{width: '98%'}} required />
          </FormGroup>
          <Row>
            <Col sm="12">
              <Button style={{width:'98%'}} onSubmit={this.validateRecipe}>Submit</Button>
            </Col>
          </Row>
        </Form>
      </Container>
    )
  }
}

export default NewRecipe;
