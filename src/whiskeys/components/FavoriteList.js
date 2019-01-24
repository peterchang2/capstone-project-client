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
      deleted: false,
      updated: false
    }
  }

  componentDidMount () {
    favoritesIndex(this.state)
      .then(res => res.ok ? res : new Error())
      .then(res => res.json())
      .then(data => this.setState({ favorites: data.favorites }))
      .catch(() => console.error('BIG TIME ERROR'))
  }

  // handleDelete = event => {
  //   event.preventDefault()
  //   const options = {
  //     method: 'DELETE',
  //     headers: {
  //       'Authorization': `Token token=${this.state.user.token}`
  //     }
  //   }
  //   const id = event.currentTarget.dataset.id
  //   fetch(`${apiUrl}/favorites/${id}`, options)
  //     .then(res => res.ok ? res : new Error())
  //     .then(() => this.setState({ deleted: true }))
  //     .catch(console.error)
  // }

  // handleChange = (event) => {
  //   const editedUserScore = { ...this.state.favorites, [event.target.name]: event.target.value }
  //   this.setState({ favorites: editedUserScore })
  // }
  //
  // handleUpdate = event => {
  //   event.preventDefault()
  //   const options = {
  //     method: 'PATCH',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Authorization': `Token token=${this.state.user.token}`
  //     },
  //     body: JSON.stringify({
  //       favorites: this.state.favorites
  //     })
  //   }
  //   const id = event.currentTarget.dataset.id
  //   fetch(`${apiUrl}/favorites/${id}`, options)
  //     .then(res => res.ok ? res : new Error())
  //     .then(() => this.setState({ updated: true }))
  //     .catch(console.error)
  // }

  // <td><button className='btn btn-danger' data-id ={favorite.id} onClick={this.handleDelete}>Delete</button></td>


  render () {
    if (this.state.favorites.length == 0) {
      return <p>Loading all the delicious favorites...</p>
    }

    const favorites = this.state.favorites.map(favorite => {
      return(
        <tbody key={favorite.id}>
          <tr>
            <td><Link to={`favorites/${favorite.id}`}>{favorite.whiskey.name}</Link></td>
            <td>{favorite.whiskey.meta_critic}</td>
            <td>
              <span className="badge badge-pill badge-warning">{favorite.user_score}</span>
            </td>
            <td>{favorite.whiskey.country}</td>
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
              <th scope="col">Meta Critic</th>
              <th scope='col'>User Score</th>
              <th scope="col">Place of Origin</th>
            </tr>
          </thead>
          {favorites}
        </table>
      </React.Fragment>
    )
  }
}

export default withRouter(FavoriteList)
