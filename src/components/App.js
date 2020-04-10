import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import UserProfile from '../utils.js';
import Home from './home.js';
import NewRecipe from './newrecipe.js';
import Navigation from './navigation.js';
import SearchResults from './searchresults.js';
import MyProfile from './myprofile.js';
import Cart from './cart.js';
import Login from './login.js';
import NewUser from './newuser.js';

class App extends Component {
  constructor(props) {
    super(props);
    // let forceLogin = false;
    // if (!UserProfile.isLoggedIn()) {
    //   forceLogin = true;
    // }
    // this.state = { forceLogin: forceLogin };
    this.redirect = this.redirect.bind(this);
  }

  redirect() {
    this.setState({ forceLogin: false });
  }

  render() {
    return (
      <Router>
        {/*{this.state.forceLogin ? <Login redirect={this.redirect} /> : null}*/}
        <React.Fragment>
          <Navigation />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/newrecipe" component={NewRecipe} />
            <Route path="/results" component={SearchResults} />
            <Route path="/profile" component={MyProfile} />
            <Route path="/cart" component={Cart} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={NewUser} />
          </Switch>
        </React.Fragment>
      </Router>
    );
  }
}

export default App;
