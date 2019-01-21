import React, {Component} from 'react'
import {withRouter} from 'react-router'
import {whiskeyShow} from '../api'
import {Link, Redirect, Route} from 'react-router-dom'


class WhiskeyShow extends Component {
  constructor (props) {
    super(props)

    this.state = {
      whiskey: [],
      user: props.user,
      notFound: false,
      id: ''
    }
  }

  componentDidMount () {
    const id = this.props.match.params.id
    whiskeyShow(this.state, id)
      .then(res => res.ok ? res : new Error())
      .then(res => res.json())
      .then(data => this.setState( { whiskey: data.whiskey } ))
      .then(data => this.setState( { id: id } ))
      .catch(() => this.setState({notFound: true}))
  }

  render () {
    const { whiskey, notFound } = this.state

    if(notFound) {
      return <Redirect to='/whiskeys' />
    }

    const { name, country, cost, whiskey_type, whiskey_class, meta_critic } = whiskey
    return (
      <React.Fragment>
        <h3>{name}</h3>
        <p>Country: {country}</p>
        <p>Review: {meta_critic}</p>
        <p>Cost: {cost}</p>
        <p>Type: {whiskey_type}</p>
        <p>Class: {whiskey_class}</p>
        <ul>
          <p>Legend</p>
          <li>$ is for whiskies less than $25 USD</li>
          <li>$$ for whiskies between $25~$40 USD</li>
          <li>$$$ for whiskies between $40-$55 USD</li>
          <li>$$$$ for whiskies between $55~$95 USD</li>
          <li>$$$$$ for whiskies between $95~$225 USD</li>
          <li>$$$$$+ refers to all whiskies greater than $225 USD</li>
        </ul>
        <button className='btn btn-warning m-1'><Link to='/whiskeys'>Back</Link></button>
        <button className='btn btn-dark m-1'><Link to='/whiskeys/favorites'>Faves</Link></button>
        <button className='btn btn-dark m-1'><Link to='/whiskeys/wishes'>Wishes</Link></button>
      </React.Fragment>
    )
  }

}

export default withRouter(WhiskeyShow)
