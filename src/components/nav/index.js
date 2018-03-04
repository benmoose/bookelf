import React from 'react'
import styled from 'styled-components'
import Elf from '../../static/elf.svg'
import { Alignment, Navbar, NavbarGroup, NavbarHeading, NavbarDivider } from '@blueprintjs/core'

const Image = styled.img`
  padding: 10px 0;
  height: 100%;
`

const Nav = () => {
  return (
    <Navbar>
      <NavbarGroup align={Alignment.CENTER}>
        <Image src={Elf} />
        <NavbarHeading>BookELF</NavbarHeading>
        <NavbarDivider />
        <small>Powered by Google Books</small>
      </NavbarGroup>
    </Navbar>
  )
}

export default Nav
