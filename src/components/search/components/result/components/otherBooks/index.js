import React from 'react'
import styled from 'styled-components'
import { CopyToClipboard } from 'react-copy-to-clipboard'

const Container = styled.div`
  padding: 15px;
`

const HelpText = styled.small`
  margin-top: 15px;
  display: block;
`

const OtherBooks = ({ items, requestShowToast }) => {
  const showCopiedToast = () => requestShowToast('ISBN Copied')

  return (
    <Container style={{ maxWidth: '600px' }}>
      <table className='pt-html-table pt-html-table-striped pt-interactive pt-small'>
        <thead>
          <tr>
            <th>Title</th>
            <th>ISBN</th>
          </tr>
        </thead>
        <tbody>
          {
            // ignore the first one (already have it)
            items.map((item) => {
              const isbn = item.volumeInfo.industryIdentifiers &&
                item.volumeInfo.industryIdentifiers
                  .filter(isbn => isbn.type === 'ISBN_13')[0]
              return (
                <CopyToClipboard key={item.id} text={isbn ? isbn.identifier : ''}>
                  <tr onClick={showCopiedToast}>
                    <td>{item.volumeInfo.title}</td>
                    <td>{isbn ? isbn.identifier : 'Not found'}</td>
                  </tr>
                </CopyToClipboard>
              )
            })
          }
        </tbody>
      </table>
      <HelpText>Click on a row to copy ISBN</HelpText>
    </Container>
  )
}

export default OtherBooks
