import axios from 'axios'

export const parseLine = (line) => {
  const parts = line.split('::').map(part => (part || '').trim())
  return { title: parts[0], author: parts[1] }
}

export const parseBooks = (text) => {
  const lines = text.split('\n').map(parseLine)
  return lines.filter(book => !!book.title)
}

export const search = (title, author) => {
  const authorParam = author && `+inauthor:${author}`
  return axios.get('https://www.googleapis.com/books/v1/volumes/', {
    params: {
      key: process.env.REACT_APP_GOOGLE_API_KEY,
      q: `intitle:${title}+inpublisher:Walker${authorParam}`
    }
  })
    .then(res => res.data)
}
