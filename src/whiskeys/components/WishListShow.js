import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { wishListShow } from '../api'
import { Link, Redirect, Route } from 'react-router-dom'
import apiUrl from '../../apiConfig'
import messages from '../messages'

class WishListShow extends Component {
  constructor (props) {
    super(props)
    this.state = {
      wish: [],
      user: props.user,
      notFound: false,
      id: '',
      created: false,
      deleted: false
    }
  }

  componentDidMount () {
    const id = this.props.match.params.id
    wishListShow(this.state, id)
      .then(res => res.ok ? res : new Error())
      .then(res => res.json())
      .then(data => this.setState( { wish: data.wish, id: id, created: true } ))
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
    fetch(`${apiUrl}/wishes/${this.state.wish.id}`, options)
      .then(res => res.ok ? res : new Error())
      .then(() => this.setState({ deleted: true }))
      .then(() => flash(messages.deleteSuccess, 'flash-success'))
      .catch(() => flash(messages.deleteFailure, 'flash-error'))
  }

  render () {

    if(this.state.deleted === true) {
      return <Redirect to='/wishes' />
    } else if (this.state.created === true) {
      const wish = this.state.wish.whiskey
      return (
        <React.Fragment>
          <div className="card text-white bg-secondary mb-3">
            <div className="whiskey-card-header card-header">{wish.name}</div>
            <div className="whiskey-description card-body">
              <p className="card-text">Place of Origin: {wish.country}</p>
              <p className="card-text">Cost: {wish.cost}</p>
              <p className="card-text">Meta-Critic: {wish.meta_critic}</p>
              <p className="card-text">User-Score: {this.state.wish.user_score}</p>
            </div>
          </div>
          <button className='btn btn-danger' data-id={wish.id} onClick={this.handleDelete}>Delete</button>

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

export default withRouter(WishListShow)
