import Vue from 'vue'
import Vuex from 'vuex'
import apis from '@/apis'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    books: []
  },
  getters: {
    getBooks ({ books }) {
      return books
    }
  },
  mutations: {
    SET_Books: (state, books) => {
      state.books = [...books]
    },
    UPDATE_Book: (state, data, index) => {
      Object.assign(state.books[index], data)
    }
  },
  actions: {
    async getBookList ({ commit }) {
      const { data } = await apis.getBookList()
      commit('SET_Books', data)
    }
  },
  modules: {
  }
})
