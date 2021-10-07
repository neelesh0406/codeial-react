import React from "react";
import { connect } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import { fetchPosts } from '../actions/posts'
import './App.css';
import { Home, Navbar, Login, Signup } from './';
import Page404 from "./Page404"; //Not found page
import * as jwtDecode from 'jwt-decode';


class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchPosts());

    const token = localStorage.getItem('token');  //If the token is there we will store the user's info in state

    if (token) {
      const user = jwtDecode(token);   //jwt-decode package to get the info from token
    }
  }

  render() {
    const { posts } = this.props;

    console.log("props: ", this.props);
    return (
      <Router>
        <Navbar />
        <div className="App">
          <Switch>
            <Route exact path='/'>
              <Home posts={posts} />
            </Route>
            <Route exact path='/login'>
              <Login />
            </Route>
            <Route exact path='/signup'>
              <Signup />
            </Route>
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
    posts: state.posts
  };
}

export default connect(mapStateToProps)(App);
