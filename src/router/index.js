import Vue from 'vue'
import VueRouter from 'vue-router'
import BookList from '../views/BookList.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/books'
  },
  {
    path: '/books',
    name: 'BookList',
    component: BookList
  },
  {
    path: '/books/:bookId',
    name: 'BookDetail',

    component: () => import('../views/BookDetail.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
