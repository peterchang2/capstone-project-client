import React, { Component } from 'react'
import {Link, withRouter, Redirect } from 'react-router-dom'
import { wishesIndex } from '../api'
import apiUrl from '../../apiConfig'

class WishList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      wishes: [],
      id: '',
      user: props.user,
      deleted: false
    }
  }

  componentDidMount () {
    const id = this.props.match.params.id
    wishesIndex(this.state)
      .then(res => res.ok ? res : new Error())
      .then(res => res.json())
      .then(data => this.setState({ wishes: data.wishes }))
      .catch(() => console.error('BIG TIME ERROR'))
  }

  handleDelete = event => {
    const options = {
      method: 'DELETE'
    }
    const id = event.currentTarget.dataset.id
    fetch(`${apiUrl}/wishes/${id}`, options)
      .then(res => res.ok ? res : new Error())
      .then(() => this.setState({deleted: true}))
      .catch(console.error)
  }

  render () {
    if (this.state.wishes.length == 0) {
      return <p>Wish List Loading...</p>
    }

    const wishes = this.state.wishes.map(wish => {
      return(
        <tbody key={wish.id}>
          <tr>
            <td>{wish.whiskey.name}</td>
            <td>{wish.whiskey.meta_critic}</td>
            <td>{wish.whiskey.country}</td>
            <td><button className='btn btn-danger' data-id ={wish.id} onClick={this.handleDelete}>Delete</button></td>
          </tr>
        </tbody>
      )
    })
    return (
      <React.Fragment>
        <h1 className='wish-header'>My Wish List</h1>
        <table className="table table-hover table-responsive wish-list">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Score</th>
              <th scope="col">Place of Origin</th>
              <th scope='col'>Delete</th>
            </tr>
          </thead>
          {wishes}
        </table>
      </React.Fragment>
    )
  }
}

export default withRouter(WishList)
