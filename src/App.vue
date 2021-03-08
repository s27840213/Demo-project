<template lang="pug">
  div(id="app")
    div(class="container")
      div(class="container-books" @wheel.prevent="wheelEvt")
        router-link(v-for="(book,index) in currBookList"
          :key="`book-${index}`"
          :to="`/books/${book.id}`"
          :ref="'book'"
          tag="div"
          class="book-card"
          :class="selected == book.id ? 'book-card--selected' : ''")
          img(class="book-card__img" :src="book.image")
          span(class="book-card__name") {{book.name}}
      div(class="container-nav")
        div(v-for="i in navDotNum" class="nav-dot" @click="navEvent(i-1)" :style="{'opacity': i-1 === currPos ? 1 : 0.4}")
    transition(name="fade-in")
      router-view
    div(class="message")
      span 修改成功!
</template>

<script>

import { EventEmitter } from 'events'
import { mapActions, mapGetters } from 'vuex'
import TouchHandler from '@/utils/utils.js'
import { gsap } from 'gsap'

export default {
  data () {
    return {
      selected: null,
      currPos: 0,
      touchHandler: null,
      eventEmitter: null,
      tl: null
    }
  },
  created () {
    this.getBookList()
    this.eventEmitter = new EventEmitter()
  },
  mounted () {
    this.touchHandler = new TouchHandler('.container', this.eventEmitter)
    this.touchHandler.onSwipe('swipe', (direction) => {
      this.tl.restart()
      if (direction === 'right') {
        this.currPos = (this.currPos + 1) % this.navDotNum
      } else {
        this.currPos = ((this.currPos - 1) + this.navDotNum) % this.navDotNum
      }
    })
    this.touchHandler.registerTouchListener('.container')
  },
  updated () {
    if (this.tl === null) {
      if (document.querySelector('.book-card')) {
        this.tl = gsap.timeline()
        this.tl.from('.book-card', {
          duration: 0.7,
          opacity: 0,
          y: 50,
          stagger: {
            amount: 0.3
          }
        })
      }
    }
  },
  beforeDestroy () {
    this.touchHandler.unregisterTouchListener('.container')
  },
  computed: {
    ...mapGetters({
      bookList: 'getBooks'
    }),
    currBookList () {
      return this.bookList.slice(this.currPos * 3, this.currPos * 3 + 3)
    },
    navDotNum () {
      return Math.ceil(this.bookList.length / 3)
    },
    selectedStyle (id) {
      return this.selected === id ? 'selected' : ''
    }
  },
  watch: {
    $route () {
      this.selected = this.$route.params.bookId
    }
  },
  methods: {
    ...mapActions({
      getBookList: 'getBookList'
    }),
    navEvent (pos) {
      this.currPos = pos
    },
    wheelEvt (event) {
      if (event.deltaY > 0) {
        this.tl.restart()
        this.currPos = (this.currPos + 1) % this.navDotNum
      } else {
        this.tl.restart()
        this.currPos = ((this.currPos - 1) + this.navDotNum) % this.navDotNum
      }
    }
  }
}
</script>

<style lang="scss">
#app {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  box-sizing: border-box;
  padding: 20px calc((100vw - 1200px) / 2);
  margin: 30px;
}

.container {
  background: setColor(secondary);
  border-radius: 10px;
  box-shadow: 0px 4px 10px darken(setColor(secondary), 20);
  margin-bottom: 30px;
  &-books {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    overflow: hidden;
  }
  &-nav {
    display: flex;
    justify-content: center;
  }
}

.book-card {
  width: clamp(200px, 40vw, 250px);
  display: grid;
  grid-template-rows: 1fr auto;
  grid-template-columns: 1fr;
  justify-items: center;
  align-items: center;
  background: white;
  box-shadow: 0px 4px 10px darken(setColor(secondary), 20);
  border-radius: 5px;
  box-sizing: border-box;
  padding: 10px;
  margin: 20px;
  padding-bottom: 30px;
  text-align: center;
  position: relative;
  overflow: hidden;
  color: setColor(secondary);
  font-weight: bold;
  &::after {
    content: "";
    transition: 0.3s;
    position: absolute;
    bottom: 0px;
    left: 0px;
    width: 100%;
    height: 10px;
    transform: scaleX(0);
    transform-origin: left;
  }

  &__img {
    height: clamp(150px, 20vw, 250px);
  }
  &--selected {
    &::after {
      content: "";
      position: absolute;
      bottom: 0px;
      left: 0px;
      width: 100%;
      height: 10px;
      background-color: setColor(orange);
      transform: scaleX(1);
      transform-origin: right;
    }
  }
}

.nav-dot {
  @include size(10px);
  border-radius: 50%;
  margin: 5px;
  background-color: setColor(yellow);
  transition: opacity 0.2s;
}

.message {
  padding: 15px 0px 25px 0px;
  color: setColor(orange);
  font-weight: bold;
  opacity: 0;
  @include mobileStyle {
    font-size: 24px;
  }
}
.fade-in {
  &-enter-active {
    transition: transform 0.7s, opacity 0.7s;
  }
  &-leave-active {
    transition: transform 0.7s, opacity 0.7s;
  }
  &-enter {
    opacity: 0;
    transform: translate3d(0, 50px, 0);
  }
  &-leave-to {
    transform: translate3d(0, 50px, 0);
    opacity: 0;
  }
}
</style>
