import React from 'react'
import classnames from 'classnames'
import { Classes, TextArea, Callout, Card } from '@blueprintjs/core'
import debounce from 'lodash.debounce'

import Result from './components/result'

import { parseBooks, search } from '../../utils'

class Search extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      value: '',
      books: [],
      cachedBooks: [],
      data: [],
      loading: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.getSearchResults = debounce(this.getSearchResults.bind(this), 1500)
  }

  handleChange (e) {
    this.setState({
      value: e.target.value,
      books: parseBooks(e.target.value),
      loading: true
    }, () => {
      const books = parseBooks(this.state.value)
      this.getSearchResults(books)
    })
  }

  getSearchResults (books) {
    Promise.all(
      books.map((book, i) => search(book.title, book.author))
    )
      .then(data => this.setState({
        data,
        cachedBooks: books,
        loading: false
      }))
      .catch(() => this.setState({ loading: false }))
  }

  render () {
    console.log(this.state)
    return (
      <React.Fragment>
        <Callout
          icon='info-sign'
          className='mb'
        >
          <div className='d-flex justify-content-between'>
            <span>One book per line please :)</span>
            <span className='small'>Only walker books are searched</span>
          </div>
        </Callout>

        <div className='row'>
          <div className='col-6'>
            <TextArea
              large
              value={this.state.value}
              onChange={this.handleChange}
              className={Classes.FILL}
              style={{ height: '300px' }}
            />
          </div>
          <div className={classnames('col-6', { loading: this.state.loading })}>
            <Card className='h-100'>
              {
                this.state.books.map((book, i) => {
                  const data = this.state.data[i]
                  return (
                    <Result
                      key={i}
                      book={book}
                      data={data}
                      loading={this.state.loading}
                    />
                  )
                })
              }
            </Card>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default Search
