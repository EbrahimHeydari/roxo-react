import React, { Component } from 'react';
import Post from '../../components/post/Post';
import FullPost from '../../components/fullPost/FullPost';
import NewPost from '../../components/newPost/NewPost';
import axios from '../../axios';
import './Blog.css';

class Blog extends Component {

  state = {
    posts: [],
    selectedPostId: null,
    error: false
  }

  componentDidMount = () => {
    axios.get('/posts')
      .then(response => {
        const posts = response.data.slice(0, 4)
        const updatedPosts = posts.map(post => {
          return {
            ...post,
            author: 'Ali'
          }
        })
        this.setState({ posts: updatedPosts })
      })
      .catch(error => {
        this.setState({ error: true })
      })
  }

  postSelectedHandler = (id) => {
    this.setState({ selectedPostId: id })
  }

  render() {
    let posts = <p style={{color: 'red'}}>Something went wrong</p>
    if (!this.state.error)
      posts = this.state.posts.map(post => {
        return <Post key={post.id} title={post.title} author={post.author}
          clicked={() => this.postSelectedHandler(post.id)} />
      })
    return (
      <div>
        <section className="Posts">
          {posts}
        </section>
        <section>
          <FullPost id={this.state.selectedPostId} />
        </section>
        <section>
          <NewPost />
        </section>
      </div>
    )
  }
}

export default Blog;