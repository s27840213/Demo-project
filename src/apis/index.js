import Axios from 'axios'

const options = {
  baseURL: 'https://fe-interview-api.unnotech.com',
  headers: {
    'Content-Type': 'application/json'
  }
}

const axios = Axios.create(options)

export default {
  getBookList: () => axios('/books', {
    method: 'GET'
  }),
  getBookDetail: (id) => axios(`/profile/${id}`, {
    method: 'GET'
  }),
  patchBookDetail: (id, data) => axios(`/profile/${id}`, {
    method: 'PATCH',
    data: data
  })
}
