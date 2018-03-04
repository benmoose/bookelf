import React from 'react'
import classnames from 'classnames'
import { Classes, TextArea, Callout, Card, Toaster, Position, Intent } from '@blueprintjs/core'
import debounce from 'lodash.debounce'

import Result from './components/result'

import { parseBooks, search } from '../../utils'

const toaster = Toaster.create({ position: Position.RIGHT_TOP })

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
    this.showToast = this.showToast.bind(this)
    this.getSearchResults = debounce(this.getSearchResults.bind(this), 1500)
  }

  showToast (message, icon = 'tick') {
    toaster.show({
      message,
      icon,
      intent: Intent.NONE
    })
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
    return (
      <React.Fragment>
        <Callout
          icon='info-sign'
          className='mb'
        >
          <div className='d-flex justify-content-between'>
            <span>One book title one per line <code>title [:: author]</code></span>
            <span className='pt-text-muted'>Only <a href='http://www.walker.co.uk/'>Walker</a> books are searched</span>
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
                      requestShowToast={this.showToast}
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
