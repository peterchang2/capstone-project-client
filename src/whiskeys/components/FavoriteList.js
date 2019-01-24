import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { favoritesIndex } from '../api'
import apiUrl from '../../apiConfig'
import messages from '../messages'
import './favoriteList.scss'

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
    const { flash } = this.props
    favoritesIndex(this.state)
      .then(res => res.ok ? res : new Error())
      .then(res => res.json())
      .then(data => this.setState({ favorites: data.favorites }))
      // .then(() => flash(messages.getAllFavoritesSuccess, 'flash-success'))
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
      return <p className='pop-up'>Empty Favorites, Browse the Whiskey List To Find What You Like</p>
    }

    const favorites = this.state.favorites.map(favorite => {
      return(
        <tbody key={favorite.id}>
          <tr>
            <td className='favorite-td'><Link to={`favorites/${favorite.id}`}>{favorite.whiskey.name}</Link></td>
            <td className='favorite-td'>{favorite.whiskey.meta_critic}</td>
            <td className='favorite-td'>
              <span className="user-score-text badge badge-pill badge-warning badge-lg">{favorite.user_score}</span>
            </td>
            <td className='favorite-td'>{favorite.whiskey.country}</td>
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
              <th className='favorite-th' scope="col">Name</th>
              <th className='favorite-th' scope="col">Meta Critic</th>
              <th className='favorite-th' scope='col'>User Score</th>
              <th className='favorite-th' scope="col">Place of Origin</th>
            </tr>
          </thead>
          {favorites}
        </table>
      </React.Fragment>
    )
  }
}

export default withRouter(FavoriteList)
