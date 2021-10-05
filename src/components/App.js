import React from "react";
import { connect } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import { fetchPosts } from '../actions/posts'
import './App.css';
import { Home, Navbar, Login } from './';
import Page404 from "./Page404"; //Not found page


class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchPosts());
  }

  render() {
    const { posts } = this.props;

    console.log("props: ", this.props);
    return (
      <Router>
        <Navbar />
        <div className="App">
          {/* <PostsList posts={posts} /> */}
          <Switch>
            <Route exact path='/'>
              <Home posts={posts} />
            </Route>
            <Route exact path='/login'>
              <Login />
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
