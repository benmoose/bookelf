import React from 'react'
import Nav from './components/nav'
import Search from './components/search'

import HttpsDialog from './components/httpsDialog'
import Attribution from './components/attribution'

import './app.css'
import './bootstrap-grid.css'
import '@blueprintjs/core/lib/css/blueprint.css'
import '@blueprintjs/icons/lib/css/blueprint-icons.css'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      dialogOpen: false
    }
    this.requestCloseDialog = this.requestCloseDialog.bind(this)
  }

  componentDidMount () {
    const isHttps = window.location.protocol === 'https' || window.location.protocol === 'https:'
    if (!isHttps) {
      this.setState({ dialogOpen: true })
    }
  }

  requestCloseDialog () {
    this.setState({ dialogOpen: false })
  }

  render () {
    return (
      <React.Fragment>
        <HttpsDialog
          open={this.state.dialogOpen}
          onClose={this.requestCloseDialog}
        />
        <Nav />
        <div className='container-fluid pt'>
          <Search />
        </div>
        <Attribution />
      </React.Fragment>
    )
  }
}

export default App
