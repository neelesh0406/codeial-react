import React from "react";
import { connect } from "react-redux";

import { fetchPosts } from '../actions/posts'
import './App.css';
import { PostsList, Navbar } from './';

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchPosts());
  }

  render() {
    const { posts } = this.props;

    console.log("props: ", this.props);
    return (
      <>
        <Navbar />
        <div className="App">
          <PostsList posts={posts} />
        </div>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts
  };
}

export default connect(mapStateToProps)(App);
