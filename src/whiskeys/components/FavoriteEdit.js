import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { favoriteShow } from '../api'
import { Link, Redirect, Route } from 'react-router-dom'
import apiUrl from '../../apiConfig'
import messages from '../messages'


class FavoriteEdit extends Component {
  constructor (props) {
    super(props)
    this.state = {
      favorite: {
        user_score:''
      },
      user: props.user,
      notFound: false,
      id: '',
      created: false,
      deleted: false,
      updated: false
    }
  }

  componentDidMount () {
    const id = this.props.match.params.id
    favoriteShow(this.state, id)
      .then(res => res.ok ? res : new Error())
      .then(res => res.json())
      .then(data => this.setState( { favorite: data.favorite, id: id, created: true } ))
      .catch(() => this.setState({notFound: true}))
  }

  handleDelete = event => {
    const { flash } = this.props
    event.preventDefault()
    const options = {
      method: 'DELETE',
      headers: {
        'Authorization': `Token token=${this.state.user.token}`
      }
    }
    fetch(`${apiUrl}/favorites/${this.state.favorite.id}`, options)
      .then(res => res.ok ? res : new Error())
      .then(() => this.setState({ deleted: true }))
      .then(() => flash(messages.deleteSuccess, 'flash-success'))
      .catch(() => flash(messages.deleteFailure, 'flash-error'))
  }

  handleChange = event => {
    const editedUserScore = { ...this.state.favorite, [event.target.id]: event.target.value }
    this.setState({ favorite: editedUserScore })
  }

  handleUpdate = event => {
    const { flash } = this.props
    event.preventDefault()
    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token token=${this.state.user.token}`
      },
      body: JSON.stringify({
        favorite: this.state.favorite
      })
    }
    fetch(`${apiUrl}/favorites/${this.state.favorite.id}`, options)
      .then(res => res.ok ? res : new Error())
      .then(() => this.setState({ updated: true }))
      .then(() => flash(messages.user_scoreUpdate, 'flash-success'))
      .catch(() => flash(messages.updateFailure, 'flash-error'))
  }


  render () {

    if(this.state.deleted === true) {
      return <Redirect to='/favorites' />
    } else if (this.state.updated === true) {
      return <Redirect to='/favorites' />
    } else if (this.state.created === true) {
      const favorite = this.state.favorite.whiskey
      return (
        <React.Fragment>
          <div className="card text-white bg-secondary mb-3">
            <div className="whiskey-card-header card-header">{favorite.name}</div>
            <div className="whiskey-description card-body">
              <p className="card-text">Place of Origin: {favorite.country}</p>
              <p className="card-text">Cost: {favorite.cost}</p>
              <p className="card-text">Meta-Critic: {favorite.meta_critic}</p>
              <p className="card-text">User-Score: {this.state.favorite.user_score}</p>
            </div>
            <form onSubmit={this.handleUpdate}>
              <label>Score:</label>
              <select id="user_score" onChange={this.handleChange}>
                <option name='-' value='-' className="dropdown-item" onChange={this.handleChange}>-</option>
                <option name='0' value='0' className="dropdown-item" onChange={this.handleChange}>0</option>
                <option name='1' value='1' className="dropdown-item" onChange={this.handleChange}>1</option>
                <option name='2' value='2' className="dropdown-item" onChange={this.handleChange}>2</option>
                <option name='3' value='3' className="dropdown-item" onChange={this.handleChange}>3</option>
                <option name='4' value='4' className="dropdown-item" onChange={this.handleChange}>4</option>
                <option name='5' value='5' className="dropdown-item" onChange={this.handleChange}>5</option>
                <option name='6' value='6' className="dropdown-item" onChange={this.handleChange}>6</option>
                <option name='7' value='7' className="dropdown-item" onChange={this.handleChange}>7</option>
                <option name='8' value='8' className="dropdown-item" onChange={this.handleChange}>8</option>
                <option name='9' value='9' className="dropdown-item" onChange={this.handleChange}>9</option>
                <option name='10' value='10' className="dropdown-item" onChange={this.handleChange}>10</option>
              </select>
              <button className='btn btn-danger m-1' data-id={favorite.id} type='submit'>Update</button>
              <button className='btn btn-warning m-1'><Link to='/favorites'>Back</Link></button>
              <button className='btn btn-danger' data-id={favorite.id} onClick={this.handleDelete}>Delete</button>
            </form>
          </div>
          <small className='block'><strong>MetaCritic</strong> score refers to average normalized score of all reviewers who have reported on that whiskiy.</small>
          <small className='block'>
            <strong>$$</strong> for whiskies between $25~$40 USD |
            <strong> $$$</strong> for whiskies between $40-$55 USD |
            <strong> $$$$</strong> for whiskies between $55~$95 USD |
            <strong> $$$$$</strong> for whiskies between $95~$225 USD |
            <strong> $$$$$+</strong> refers to all whiskies greater than $225 USD
          </small>
        </React.Fragment>
      )
    }

    return (
      <React.Fragment>

      </React.Fragment>
    )
  }
}

export default withRouter(FavoriteEdit)
