import React from 'react'
import { Classes, TextArea, Callout } from '@blueprintjs/core'
import debounce from 'lodash.debounce'

import { parseBooks, search } from '../../utils'

class Search extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      books: '',
      data: [],
      loading: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.getSearchResults = this.getSearchResults.bind(this)
  }

  handleChange (e) {
    this.setState({ books: e.target.value })
    const books = parseBooks(e.target.value)
    const _search = debounce(this.getSearchResults, 2000)
    _search(books)
  }

  getSearchResults (books) {
    this.setState({ loading: true })
    Promise.all(books.map((book, i) => search(book.title, book.author)))
      .then(data => this.setState({ data, loading: false }))
  }

  render () {
    return (
      <React.Fragment>
        <Callout className='mb d-flex justify-content-between'>
          <span>
            {
              this.state.loading ? 'Loading...' : 'One book per line please :)'
            }
          </span>
          <span className='small'>Only walker books are searched</span>
        </Callout>
        <div className='row'>
          <div className='col-6'>
            <TextArea
              large
              onChange={this.handleChange}
              className={Classes.FILL}
              style={{ minHeight: '400px' }}
            />
          </div>
          <div className='col-6'>
            {
              this.state.data.map(data => {
                const items = data.items
                if (!items) return <p>No results</p>
                const isbn13 = items[0].volumeInfo.industryIdentifiers
                  .filter(isbn => isbn.type === 'ISBN_13')[0]
                return (
                  <p>
                    <span className='pr small'>{items[0].volumeInfo.title}</span>
                    <span><strong>ISBN13 {isbn13 && isbn13.identifier}</strong></span>
                  </p>
                )
              })
            }
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default Search
