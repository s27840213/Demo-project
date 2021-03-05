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
    div(class="btn btn-confirm" @click="updateBookDetail()") 確認修改
</template>

<script>
import apis from '@/apis'
import { mapActions } from 'vuex'
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
    ...mapActions({
      patchBookDetail: 'patchBookDetail'
    }),
    getId () {
      this.id = this.$route.params.bookId
    },
    async getBookDetail (id) {
      const { data } = await apis.getBookDetail(id)
      console.log(data)
      this.detail = data
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
    }
  }
}
</script>

<style lang="scss">
.root {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr auto;
  border: 1px solid #dadada;
  padding: 40px 80px;
  margin-top: 50px;
  box-sizing: border-box;
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
  &__type {
    font-size: 24px;
    font-weight: bold;
  }
  &__amount {
    width: 100px;
    padding: 5px 10px;
    border: 1px solid #dadada;
    text-align: right;
    line-height: 200%;
  }
}
.btn {
  border: 1px solid #dadada;
  border-radius: 5px;
  cursor: pointer;
  &-calc {
    margin: 0px 25px;
    padding: 5px 5px;
    font-size: 24px;
  }
  &-confirm {
    padding: 10px 20px;
    font-size: 18px;
    align-self: flex-end;
  }
}
</style>
