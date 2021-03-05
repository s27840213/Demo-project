<template lang="pug">
  div(id="app")
    div(class="container")
      router-link(v-for="(book,index) in bookList"
        :key="`book-${index}`"
        :to="`/books/${book.id}`"
        tag="div" class="book-card"
        :style="{'background-color': selected == book.id ? 'red' : 'transparent'}")
        img(class="book-card__img" :src="book.image")
        span(class="book-card__name") {{book.name}}
    router-view.
</template>

<script>

import { mapActions, mapGetters } from 'vuex'
export default {
  data () {
    return {
      selected: null
    }
  },
  created () {
    this.getBookList()
  },
  computed: {
    ...mapGetters({
      bookList: 'getBooks'
    })
  },
  watch: {
    $route () {
      this.selected = this.$route.params.bookId
    }
  },
  methods: {
    ...mapActions({
      getBookList: 'getBookList'
    })
  }
}
</script>

<style lang="scss">
#app {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding: 40px
    clamp(20px, calc((100vw - 1200px) / 2), calc((100vw - 1200px) / 2));
  box-sizing: border-box;
}

.container {
  display: flex;
  flex-wrap: nowrap;
  border: 1px solid #dadada;
  padding: 10px;
  width: 100%;
}

.book-card {
  width: 300px;
  display: grid;
  grid-template-rows: 1fr auto;
  grid-template-columns: 1fr;
  justify-items: center;
  align-items: center;
  border: 1px solid #dadada;
  box-sizing: border-box;
  padding: 10px;
  &__img {
    width: 100%;
  }
}
</style>
