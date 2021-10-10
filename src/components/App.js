import React from "react";
import { connect } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import { fetchPosts } from '../actions/posts'
import './App.css';
import { Home, Navbar, Login, Signup, Settings, UserProfile } from './';
import Page404 from "./Page404"; //Not found page
import jwtDecode from 'jwt-decode';
import { authenticateUser } from "../actions/auth";
import { getAuthTokenFromLocalStorage } from "../helpers/utils";


const PrivateRoute = (privateRouteProps) => {
  const { isLoggedin, path, component: Component } = privateRouteProps;

  return (
    <Route
      path={path}
      render={(props) => {
        return isLoggedin ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: {
                from: props.location,
              },
            }}
          />
        );
      }}
    />
  );
}

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchPosts());

    const token = getAuthTokenFromLocalStorage();  //If the token is there we will store the user's info in redux store

    if (token) {
      const user = jwtDecode(token);   //jwt-decode package to get the info from token

      this.props.dispatch(authenticateUser({
        email: user.email,
        _id: user._id,
        name: user.name
      }))
    }
  }

  render() {
    const { posts, auth } = this.props;

    return (
      <Router>
        <Navbar />
        <div className="App">
          <Switch>
            <Route exact path='/'>
              <Home posts={posts} />
            </Route>
            <Route exact path='/login' component={Login} />
            <Route exact path='/signup'>
              <Signup />
            </Route>
            <PrivateRoute exact path='/settings' component={Settings} isLoggedin={auth.isLoggedin} />
            <PrivateRoute exact path='/user/:userId' component={UserProfile} isLoggedin={auth.isLoggedin} />
            <Route>
              <Page404 />
            </Route>
          </Switch>
        </div>
      </Router>);
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts,
    auth: state.auth
  };
}

export default connect(mapStateToProps)(App);
