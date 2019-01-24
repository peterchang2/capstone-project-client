import React, { Component } from 'react'
import { Link, withRouter, Redirect } from 'react-router-dom'
import { wishesIndex } from '../api'
import apiUrl from '../../apiConfig'
import messages from '../messages'
import axios from 'axios'
import './wishList.scss'

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
    const { flash } = this.props
    const id = this.props.match.params.id
    wishesIndex(this.state)
      .then(res => res.ok ? res : new Error())
      .then(res => res.json())
      .then(data => this.setState({ wishes: data.wishes }))
      // .then(() => flash(messages.getAllWishListSuccess, 'flash-success'))
      .catch(() => flash(messages.getAllFailure, 'flash-error'))
  }

  // handleDelete = event => {
  //   const { flash } = this.props
  //   const options = {
  //     method: 'DELETE',
  //     headers: {'Authorization': `Token token=${this.state.user.token}`}
  //   }
  //   const id = event.currentTarget.dataset.id
  //   fetch(`${apiUrl}/wishes/${id}`, options)
  //     .then(res => res.ok ? res : new Error())
  //     .then(() => this.setState({ deleted: true }))
  //     .then(() => flash(messages.deleteSuccess, 'flash-success'))
  //     .then(() => this.props.history.push('/wishes'))
  //     .catch(console.error)
  // }


  render () {
    if (this.state.wishes.length == 0) {
      return <p className='pop-up'>No More Wish List items</p>
    }

    

    const wishes = this.state.wishes.map(wish => {
      return(
        <tbody key={wish.id}>
          <tr>
            <td className='wishes-td'><Link to={`wishes/${wish.id}`}>{wish.whiskey.name}</Link></td>
            <td className='wishes-td'>{wish.whiskey.meta_critic}</td>
            <td className='wishes-td'>{wish.whiskey.country}</td>
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
              <th className='wishes-th' scope="col">Name</th>
              <th className='wishes-th' scope="col">Score</th>
              <th className='wishes-th' scope="col">Place of Origin</th>
            </tr>
          </thead>
          {wishes}
        </table>
      </React.Fragment>
    )
  }
}

export default withRouter(WishList)
