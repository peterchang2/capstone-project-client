import React, {Component} from 'react'
import {withRouter} from 'react-router'
import {whiskeyShow} from '../api'
import {Link, Redirect, Route} from 'react-router-dom'
import './whiskeyShow.scss'

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
        <div className="card text-white bg-secondary mb-3">
          <div className="whiskey-card-header card-header">{name}</div>
          <div className="whiskey-description card-body">
            <p className="card-text">Country: {country}</p>
            <p className="card-text">Review: {meta_critic}</p>
            <p className="card-text">Cost: {cost}</p>
            <p className="card-text">Type: {whiskey_type}</p>
            <p className="card-text">Class: {whiskey_class}</p>
          </div>
        </div>
        <button className='btn btn-warning m-1'><Link to='/whiskeys'>Back</Link></button>
        <button className='btn btn-dark m-1'><Link to='/whiskeys/favorites'>Add to Faves</Link></button>
        <button className='btn btn-dark m-1'><Link to='/whiskeys/wishes'>Add to Wishes</Link></button>
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

}

export default withRouter(WhiskeyShow)
