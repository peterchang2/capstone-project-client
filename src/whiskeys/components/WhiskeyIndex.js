import React, { Component } from 'react'
import { whiskeysIndex } from '../api'
import { Link, withRouter } from 'react-router-dom'
import messages from '../messages'
import './whiskeyIndex.scss'

class WhiskeyIndex extends Component {
  constructor (props) {
    super(props)
    this.state = {
      whiskeys: [],
      user: props.user
    }
  }

  componentDidMount() {
    const { flash } = this.props
    whiskeysIndex(this.state)
      .then(res => res.ok ? res : new Error())
      .then(res => res.json())
      .then(data => this.setState({ whiskeys: data.whiskeys }))
      .then(() => flash(messages.getAllWhiskeysSuccess, 'flash-success'))
      .catch(() => console.error('BIG TIME ERROR'))
  }

  render () {
    if (this.state.whiskeys.length == 0) {
      return <p className='pop-up'>Loading all the delicious whiskeys...</p>
    }

    const whiskeys = this.state.whiskeys.map(whiskey => {
      return(
        <tbody key={whiskey.id}>
          <tr>
            <td className='whiskey-td'><Link key={whiskey.id} to={`whiskeys/${whiskey.id}`}>{whiskey.name}</Link></td>
            <td className='whiskey-td'><Link key={whiskey.id} to={`whiskeys/${whiskey.id}`}>{whiskey.meta_critic}</Link></td>
            <td className='whiskey-td'><Link key={whiskey.id} to={`whiskeys/${whiskey.id}`}>{whiskey.country}</Link></td>
          </tr>
        </tbody>
      )
    })

    return (
      <React.Fragment>
        <h1 className='whiskey-header'>Whiskey</h1>
        <table className="table table-hover table-responsive whiskey-list">
          <thead>
            <tr>
              <th className='whiskey-th' scope="col">Name</th>
              <th className='whiskey-th' scope="col">Score</th>
              <th className='whiskey-th' scope="col">Place of Origin</th>
            </tr>
          </thead>
          {whiskeys}
        </table>
      </React.Fragment>
    )
  }
}

export default withRouter(WhiskeyIndex)
