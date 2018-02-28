import React from 'react'
import Nav from './components/nav'
import Search from './components/search'

import './app.css'
import './bootstrap-grid.css'
import '@blueprintjs/core/lib/css/blueprint.css'
import '@blueprintjs/icons/lib/css/blueprint-icons.css'

const App = () => {
  return (
    <React.Fragment>
      <Nav />
      <div className='container-fluid pt'>
        <Search />
      </div>
    </React.Fragment>
  )
}

export default App
