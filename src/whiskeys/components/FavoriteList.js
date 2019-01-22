import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { favoritesIndex } from '../api'
import apiUrl from '../../apiConfig'

class FavoriteList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      favorites: [],
      id: '',
      user: props.user,
      deleted: false
    }
  }

  componentDidMount () {
    favoritesIndex(this.state)
      .then(res => res.ok ? res : new Error())
      .then(res => res.json())
      .then(data => this.setState({ favorites: data.favorites }))
      .catch(() => console.error('BIG TIME ERROR'))
  }

  handleDelete = event => {
    const options = {
      method: 'DELETE'
    }
    const id = event.currentTarget.dataset.id
    fetch(`${apiUrl}/favorites/${id}`, options)
      .then(res => res.ok ? res : new Error())
      .then(() => this.setState({deleted: true}))
      .catch(console.error)
  }

  render () {
    if (this.state.favorites.length == 0) {
      return <p>Loading all the delicious favorites...</p>
    }

    const favorites = this.state.favorites.map(favorite => {
      return(
        <tbody key={favorite.id}>
          <tr>
            <td>{favorite.whiskey.name}</td>
            <td>{favorite.whiskey.meta_critic}</td>
            <td>{favorite.whiskey.country}</td>
            <td><button className='btn btn-danger' data-id ={favorite.id} onClick={this.handleDelete}>Delete</button></td>
          </tr>
        </tbody>
      )
    })
    return (
      <React.Fragment>
        <h1 className='favorite-header'>My Favorites</h1>
        <table className="table table-hover table-responsive favorite-list">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Score</th>
              <th scope="col">Place of Origin</th>
              <th scope='col'>Delete</th>
            </tr>
          </thead>
          {favorites}
        </table>
      </React.Fragment>
    )
  }
}

export default withRouter(FavoriteList)
