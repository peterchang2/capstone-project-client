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

        <tbody key={whiskey.id}>
          <tr>
            <td>  <Link to={`whiskeys/${whiskey.id}`}>{whiskey.name}</Link></td>
            <td>{whiskey.meta_critic}</td>
            <td>{whiskey.country}</td>
          </tr>
        </tbody>        
      )
    })

    return (
      <React.Fragment>
        <h1 className='whiskey-header'>Whiskey</h1>
        <table className="table-hover table-responsive whiskey-list">
          <table className='table'>
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Score</th>
                <th scope="col">Place of Origin</th>
              </tr>
            </thead>
            {whiskeys}
          </table>
        </table>
      </React.Fragment>
    )
  }
}

export default withRouter(WhiskeyIndex)
