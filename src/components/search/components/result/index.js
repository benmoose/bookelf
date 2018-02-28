import React from 'react'

const Result = ({ book, data, loading }) => {
  const item = data && data.items && data.items.length && data.items[0]
  const isbn13 = item && item.volumeInfo.industryIdentifiers
    .filter(isbn => isbn.type === 'ISBN_13')[0]
  return (
    <p>
      <span className='pr small'>{book.title}</span>
      {
        item && isbn13
          ? (
            <span>
              ISBN 13
              <strong>{' '}{isbn13}</strong>
            </span>
          )
          : <span>{!loading && 'No results'}</span>
      }
    </p>
  )
}

export default Result
