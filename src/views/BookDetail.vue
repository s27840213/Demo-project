<template lang="pug">
  div(class="root")
    div(class="container-detail")
      div(class="book-detail")
        span(class='book-detail__type') 價格
        button(class="btn btn-calc" @click="minus('price')") -
        div(class="book-detail__amount") {{detail.price}}
        button(class="btn btn-calc" @click="plus('price')") +
      div(class="book-detail")
        span(class='book-detail__type') 數量
        button(class="btn btn-calc" @click="minus('count')") -
        div(class="book-detail__amount") {{detail.count}}
        button(class="btn btn-calc" @click="plus('count')") +
    button(class="btn btn-confirm" @click="updateBookDetail()") 確認修改
</template>

<script>
import apis from '@/apis'
import { gsap } from 'gsap'

export default {
  data () {
    return {
      id: null,
      detail: {
        price: 0,
        count: 0
      }
    }
  },
  created () {
    this.getId()
    this.getBookDetail(this.id)
  },
  watch: {
    $route (to, from) {
      this.getId()
      this.getBookDetail(this.id)
    }
  },
  methods: {
    getId () {
      this.id = this.$route.params.bookId
    },
    async getBookDetail (id) {
      const { data } = await apis.getBookDetail(id)
      Object.assign(this.detail, data)
    },
    async patchBookDetail ({ commit }, { id, price, count }) {
      try {
        const { data } = await apis.patchBookDetail(id, { price, count })
        Object.assign(this.detail, data)
      } catch (error) {
        console.log(error)
      }
    },
    plus (target) {
      this.detail[target]++
    },
    minus (target) {
      if (this.detail[target] > 0) {
        this.detail[target]--
      }
    },
    updateBookDetail () {
      this.patchBookDetail({
        id: this.id,
        price: this.detail.price,
        count: this.detail.count
      })
      this.showMsg()
    },
    showMsg () {
      const msg = document.querySelector('.message')
      gsap.to(msg, {
        duration: 0.7,
        opacity: 1
      })
      setTimeout(() => {
        gsap.to(msg, {
          duration: 0.2,
          opacity: 0
        })
      }, 1000)
    }
  }
}
</script>

<style lang="scss">
.root {
  width: clamp(300px, 100%, 800px);
  justify-self: center;
  display: grid;
  grid-template-columns: 1fr auto;
  background-color: setColor(secondary);
  box-shadow: 0px 4px 10px darken(setColor(secondary), 20);
  color: white;
  border-radius: 5px;
  padding: 40px clamp(10px, 5vw, 40px);
  box-sizing: border-box;
  @include mobileStyle() {
    grid-template-rows: auto auto;
    grid-template-columns: auto;
    justify-content: center;
  }
}
.container-detail {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr;

  row-gap: 20px;
}
.book-detail {
  display: flex;
  align-items: center;
  @include mobileStyle() {
    justify-content: center;
    &:nth-child(2) {
      margin-bottom: 20px;
    }
  }
  &__type {
    font-size: 24px;
    font-weight: bold;
    color: setColor(yellow);
    @media screen and (max-width: 400px) {
      font-size: 16px;
    }
  }
  &__amount {
    width: 100px;
    padding: 3px 10px;
    border: 2px solid setColor(yellow);
    border-radius: 3px;
    text-align: right;
    line-height: 200%;
    color: setColor(yellow);
    @media screen and (max-width: 400px) {
      width: 80px;
    }
  }
}
.btn {
  border: none;
  border-radius: 5px;
  background-color: setColor(yellow);
  color: setColor(primary);
  font-weight: bold;
  transition: 0.3s;
  cursor: pointer;
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0px 2px 10px darken(setColor(primary), 50);
  }
  &:active {
    transform: translateY(0px) scaleY(0.95);
  }
  &-calc {
    margin: 0px 15px;
    padding: 5px 5px;
    font-size: 24px;
    width: 40px;
    @media screen and (max-width: 400px) {
      margin: 0px 5px;
      font-size: 16px;
    }
  }
  &-confirm {
    padding: 10px 20px;
    font-size: 18px;
    align-self: flex-end;
  }
  @media screen and (max-width: 400px) {
    font-size: 14px;
  }
}
</style>
