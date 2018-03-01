import React from 'react'
import styled from 'styled-components'
import { Classes, Button, Popover, Position, Tag, Spinner } from '@blueprintjs/core'

import OtherBooks from './components/otherBooks'

const Container = styled.article`
  padding-bottom: 5px;
`

const Img = styled.img`
  object-fit: contain;
  padding-right: 10px;
  height: 100%;
`

const Result = ({ book, data, loading }) => {
  // check item exists
  const item = data && data.items && data.items.length && data.items[0]
  if (!item) {
    return (
      <div className='d-flex justify-content-between'>
        <div>
          <span className='small'>{book.title}</span>
        </div>
        <div>{loading ? <Spinner className={Classes.SMALL} /> : 'No results'}</div>
      </div>
    )
  }

  const isbn13 = item && item.volumeInfo.industryIdentifiers
    .filter(isbn => isbn.type === 'ISBN_13')[0]
  const thumbnail = item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.thumbnail
  const hasOtherResult = data.items.length > 1

  return (
    <Container className='d-flex justify-content-between'>
      <div className='d-flex justify-content-start'>
        <Img src={thumbnail} width={64} />
        <div>
          <p className='pr small'>
            <div>{item.volumeInfo.title}, <em>{item.volumeInfo.authors.join(', ')}</em></div>
            <div>{item.volumeInfo.categories && item.volumeInfo.categories.map(category => <Tag>{category}</Tag>)}</div>
          </p>
          <p>
            {
              isbn13
                ? <span>ISBN <strong>{isbn13.identifier}</strong></span>
                : <span>{!loading && 'No ISBN found'}</span>
            }
          </p>
        </div>
      </div>
      {
        hasOtherResult && (
          <div>
            <Popover
              content={<OtherBooks items={data.items.slice(1)} />}
              position={Position.BOTTOM_RIGHT}
              modifiers={{
                preventOverflow: { enabled: false },
                flip: { enabled: false }
              }}
            >
              <Button rightIcon='caret-down'>Other results</Button>
            </Popover>
          </div>
        )
      }
    </Container>
  )
}

export default Result
