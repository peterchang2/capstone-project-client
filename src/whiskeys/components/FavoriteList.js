import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { favoriteIndex } from '../api'



class FavoriteList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      favorites: [],
      user: props.user
    }
  }

  componentDidMount () {
    favoriteIndex(this.state)
      .then(res => res.ok ? res : new Error())
      .then(res => res.json())
      .then(data => this.setState({ favorites: data.favorites }))
      .then(data => console.log(data))
      .catch(() => console.error('BIG TIME ERROR'))
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
            </tr>
          </thead>
          {favorites}
        </table>
      </React.Fragment>
    )
  }
}

export default withRouter(FavoriteList)
