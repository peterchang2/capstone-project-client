import React, { Component } from 'react'
import { whiskeysIndex } from '../api'
import { Link, withRouter } from 'react-router-dom'
import messages from '../messages'
import './whiskeyIndex.scss'
import MUIDataTable from 'mui-datatables'


class WhiskeyIndex extends Component {
  constructor (props) {
    super(props)
    this.state = {
      whiskeys: [],
      user: props.user,
      searchText: ''
    }
  }

  componentDidMount() {
    const { flash } = this.props
    whiskeysIndex(this.state)
      .then(res => res.ok ? res : new Error())
      .then(res => res.json())
      .then(data => this.setState({ whiskeys: data.whiskeys }))
      .then(() => flash(messages.getAllWhiskeysSuccess, 'flash-success'))
      .catch(() => flash(messages.getAllFailure, 'flash-error'))
  }


  render () {
    if (this.state.whiskeys.length == 0) {
      return <p className='pop-up'>Loading all the delicious whiskeys...</p>
    }

    const columns = ['View', 'Name', 'Meta Critic', 'Country', 'Whiskey Type']

    const options = {
      responsive: 'scroll',
      selectableRows: false,
      filter: false
    }

    let data = {}
    const whiskeyData = this.state.whiskeys.map(alcohol => {
      return (
        data = [
          <Link key={alcohol.id} to={`whiskeys/${alcohol.id}`}>Click Here</Link>,
          alcohol.name,
          alcohol.meta_critic,
          alcohol.country,
          alcohol.whiskey_type
        ]
      )
    })

    return (
      <MUIDataTable
        title={'All The Whiskeys'}
        data={whiskeyData}
        columns={columns}
        options={options}
      />
    )

  }
}

export default withRouter(WhiskeyIndex)
