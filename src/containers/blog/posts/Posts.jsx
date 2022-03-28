import React, { Component } from 'react';
import Post from '../../../components/post/Post';
import axios from '../../../axios';
import './Posts.css';

class Posts extends Component {

  state = {
    posts: []
  }

  componentDidMount = () => {
    console.log(this.props)
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
        console.log(error)
      })
  }

  postSelectedHandler = (id) => {
    this.props.history.push('/' + id)
  }

  render() {
    let posts = <p style={{ color: 'red' }}>Something went wrong</p>
    if (!this.state.error)
      posts = this.state.posts.map(post => {
        return <Post key={post.id}
          title={post.title}
          author={post.author}
          clicked={() => this.postSelectedHandler(post.id)} />
      })

    return (
      <div>
        <section className="Posts" >
          {posts}
        </section>
      </div>
    )
  }
}

export default Posts;