import React, { Component } from 'react'
import { whiskeysIndex } from '../api'
import apiUrl from '../../apiConfig'
import { Link, withRouter } from 'react-router-dom'


class WhiskeyIndex extends Component {

  constructor (props) {
    super(props)
    // console.log(props)
    this.state = {
      whiskeys: []
    }
  }

  componentDidMount() {
    fetch(`${apiUrl}/whiskeys`)
      .then(res => res.ok ? res : new Error())
      .then(res => res.json())
      .then(data => this.setState({ whiskeys: data }))
      .catch(() => console.error('BIG TIME ERROR'))
  }

  // for later
  // <div key={whiskey.id}>
  //   <Link to={`/whiskeys/${whiskey.id}/show`}></Link>
  // </div>

  render () {
    // if (this.state.whiskeys.length == 0) {
    //   return <p>Loading all the delicious whiskeys...</p>
    // }

    console.log(this.state.whiskeys)
    const whiskeys = this.state.whiskeys.forEach(whiskey => {
      {whiskey.name}
    })

    return (
      <React.Fragment>
        <h1>Whiskey</h1>
        {whiskeys}
      </React.Fragment>
    )
  }
}

export default withRouter(WhiskeyIndex)
