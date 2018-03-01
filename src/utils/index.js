import axios from 'axios'

export const parseLine = (line) => {
  const parts = line.split('::').map(part => (part || '').trim())
  return { title: parts[0], author: parts[1] }
}

export const parseBooks = (text) => {
  const lines = text.split('\n').map(parseLine)
  return lines.filter(book => !!book.title)
}

export const search = (title, author = null) => {
  const titleParam = `intitle:${title}`
  const authorParam = `inauthor:${author}`
  const publisherParam = `inpublisher:Walker`

  const q = [titleParam, publisherParam]
  if (author) q.push(authorParam)

  return axios.get('https://www.googleapis.com/books/v1/volumes/', {
    params: {
      q: q.join('+'),
      orderBy: 'relevance',
      maxResults: 6
    }
  })
    .then(res => res.data)
}
