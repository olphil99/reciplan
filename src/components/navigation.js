import React, { Component } from 'react';
import { NavLink as Link } from 'react-router-dom';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import '../css/navigation.css';

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <div>
        <Navbar id="my-navigation" color="light" light expand="md">
          <NavbarBrand href="/">Reciplan</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink href="/leaderboard/">Leaderboard</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/search/">Find Recipes</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/myrecipes/">My Recipes</NavLink>
              </NavItem>  
              <NavItem>
                <NavLink href="/newrecipe/">Upload</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/profile/">MyProfile</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/cart/"><FontAwesomeIcon icon={faShoppingCart} /></NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/login/" id="login-btn">Log In</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default Navigation;
