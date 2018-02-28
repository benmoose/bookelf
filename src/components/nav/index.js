import React from 'react'
import { Alignment, Navbar, NavbarGroup, NavbarHeading, NavbarDivider } from '@blueprintjs/core'

const Nav = () => {
  return (
    <Navbar>
      <NavbarGroup align={Alignment.LEFT}>
        <NavbarHeading>BookELF</NavbarHeading>
        <NavbarDivider />
        <span>Powered by Google Books</span>
      </NavbarGroup>
    </Navbar>
  )
}

export default Nav
