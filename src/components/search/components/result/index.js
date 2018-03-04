import React from 'react'
import styled from 'styled-components'
import classnames from 'classnames'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { Classes, Button, Popover, Position, Tag, Spinner, Tooltip } from '@blueprintjs/core'

import Placeholder from '../../../../static/not-found.svg'
import OtherBooks from './components/otherBooks'

const Container = styled.article`
  margin-bottom: 15px;
`

const Img = styled.img`
  object-fit: contain;
  width: 64px;
`

const Right = styled.div`
  flex-shrink: 0;
`

const BookMeta = styled.div`
  padding: 0 15px;
`

const BookMetaTitle = styled.h6`
  display: inline;
`

const BookMetaTitleContainer = styled.div`
  margin-bottom: 5px;
  padding-bottom: 5px;
  border-bottom: 1px solid #f6f7f8;
`

const Result = ({ book, data, loading, requestShowToast }) => {
  // check item exists
  const item = data && data.items && data.items.length && data.items[0]
  if (!item) {
    return (
      <div className='d-flex justify-content-between'>
        <div>
          <span className='pt-text-muted'>{book.title}</span>
        </div>
        <div>{loading ? <Spinner className={Classes.SMALL} /> : 'No results'}</div>
      </div>
    )
  }

  const isbn13 = item && item.volumeInfo.industryIdentifiers
    .filter(isbn => isbn.type === 'ISBN_13')[0]
  const thumbnail = item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.thumbnail
  const hasOtherResult = data.items.length > 1

  const showCopiedToast = () => requestShowToast('ISBN Copied')

  return (
    <Container className='d-flex justify-content-between'>
      <div className='d-flex justify-content-start'>
        <div>
          <Img src={thumbnail || Placeholder} />
        </div>
        <BookMeta>
          <BookMetaTitleContainer>
            <div>
              <BookMetaTitle>{item.volumeInfo.title}</BookMetaTitle>, <em>{item.volumeInfo.authors.join(', ')}</em>
            </div>
            <div>{item.volumeInfo.categories && item.volumeInfo.categories.map(category => (
              <Tag key={category}>{category}</Tag>
            ))}</div>
          </BookMetaTitleContainer>
          <CopyToClipboard text={isbn13 ? isbn13.identifier : ''}>
            <div>
              {
                isbn13
                  ? (
                    <Tooltip
                      hoverOpenDelay={100}
                      content='Click to copy ISBN'
                      position={Position.RIGHT}
                    >
                      <Button
                        className={classnames(Classes.MINIMAL, Classes.SMALL)}
                        onClick={showCopiedToast}
                      >ISBN {isbn13.identifier}
                      </Button>
                    </Tooltip>
                  )
                  : <span>{!loading && 'No ISBN found'}</span>
              }
            </div>
          </CopyToClipboard>
        </BookMeta>
      </div>
      {
        hasOtherResult && (
          <Right>
            <Popover
              content={(
                <OtherBooks
                  items={data.items.slice(1)}
                  requestShowToast={requestShowToast}
                />
              )}
              position={Position.BOTTOM_RIGHT}
              modifiers={{
                preventOverflow: { enabled: false },
                flip: { enabled: false }
              }}
            >
              <Button
                rightIcon='caret-down'
                className={Classes.SMALL}
              >Other results</Button>
            </Popover>
          </Right>
        )
      }
    </Container>
  )
}

export default Result
