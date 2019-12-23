import React from "react";
import {Router, Switch, Route, Redirect} from "react-router-dom";
import { connect } from 'react-redux'
import { history } from '../js/helpers';
import { alertActions, userActions } from '../js/actions';
import "../styles/app.scss";

import ProtectedRoute from '../Components/ProtectedRoute';
import Navbar from '../Components/Navbar';
import Signup from '../Components/Signup';
import Login from '../Components/Login';
import RecipeList from '../Components/RecipeList';
import AuthenticatedUserRecipes from '../Components/AuthenticatedUserRecipes';
import RecipeDetail from '../Components/RecipeDetail';
import CreateRecipe from '../Components/CreateRecipe';
import Account from '../Components/Account';

class App extends React.Component {
  
  componentDidMount() {
    console.log(process.env.REACT_APP_LOGIN_URI);
    history.listen((location, action) => {
      this.props.clearAlerts();
    });
    this.getAuthenticatedUserData();
  }
  getAuthenticatedUserData() {
    if(this.props.loggedIn) {
      this.props.authenticatedUser();
    }
  }
  render() {
    console.log(this.props);
    return (
         <Router history= {history}>
            <Navbar/>
            <div className="container p-0">
              <Switch>
                {/*<Route exact path="/" component={Home}/>*/}
                <Route exact path="/signup" component={Signup}/>
                <Route exact path="/login" component={Login}/>
                <Route exact path="/recipes" render={(props) =><RecipeList key="1" {...props} pageTitle="All Recipes"/>} />
                <Route exact path="/user/my-recipes" component={AuthenticatedUserRecipes} />} />
                <Route exact path="/:recipeName-recipe/:recipeId" render={(props) =><RecipeDetail {...props}/>} />
                <ProtectedRoute exact path="/create-recipe" loggedIn={this.props.loggedIn} component={CreateRecipe}/>
                {/*<Route exact path="/create-recipe" component={CreateRecipe}/> */}
                <ProtectedRoute exact path="/user/account" loggedIn={this.props.loggedIn} component={Account}/>
                <Redirect from = '//' to ={{pathname: '/recipes'}}/>

              </Switch>
            </div>
         </Router>
    )
  }
}

function mapState(state) {
  const { loggedIn } = state.authentication;
  return { loggedIn };
}

const actionCreators = {
  clearAlerts: alertActions.clear,
  authenticatedUser: userActions.authenticatedUser
};
export default connect(mapState, actionCreators)(App);