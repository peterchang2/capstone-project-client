import React, { Component } from 'react'
import { whiskeysIndex } from '../api'
// import apiUrl from '../../apiConfig'
import { Link, withRouter } from 'react-router-dom'
import './whiskeyIndex.scss'

class WhiskeyIndex extends Component {

  constructor (props) {
    super(props)
    // console.log(props)
    this.state = {
      whiskeys: [],
      user: props.user
    }
  }

  componentDidMount() {
    whiskeysIndex(this.state)
      .then(res => res.ok ? res : new Error())
      .then(res => res.json())
      .then(data => this.setState({ whiskeys: data.whiskeys }))
      .catch(() => console.error('BIG TIME ERROR'))
  }

  // for later
  // <div key={whiskey.id}>
  //   <Link to={`/whiskeys/${whiskey.id}/show`}></Link>
  // </div>

  render () {
    if (this.state.whiskeys.length == 0) {
      return <p>Loading all the delicious whiskeys...</p>
    }

    const whiskeys = this.state.whiskeys.map(whiskey => {
      return(
        <li className='whiskey-list-items' key={whiskey.id}>
          <Link to={`whiskeys/${whiskey.id}`}>
            {whiskey.name} | {whiskey.country}
          </Link>
        </li>
      )
    })

    return (
      <React.Fragment>
        <h1>Whiskey</h1>
        <ul className='whiskey-list'>{whiskeys}</ul>
      </React.Fragment>
    )
  }
}

export default withRouter(WhiskeyIndex)
