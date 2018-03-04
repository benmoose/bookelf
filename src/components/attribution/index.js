import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  font-size: 10px;
  padding: 15px;
  z-index: 1;
`

const Attribution = () => {
  return (
    <Container className='pt-text-muted'>
      Elf icon made by{' '}
      <a href='http://www.freepik.com' title='Freepik' target='_blank' rel='noopener noreferrer'>Freepik</a>{' '}
      from{' '}
      <a href='https://www.flaticon.com/' title='Flaticon' target='_blank' rel='noopener noreferrer'>www.flaticon.com</a>{' '}
      is licensed by{' '}
      <a href='http://creativecommons.org/licenses/by/3.0/' title='Creative Commons BY 3.0' target='_blank' rel='noopener noreferrer'>CC 3.0 BY</a>
    </Container>
  )
}

export default Attribution
