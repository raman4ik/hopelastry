<template>
  <div class="cart-items-pc">
    <img
      :src="image"
      :alt="title"
    />

    <div class="cart-items-pc__info">
      <span class="cart-items-pc__info-title">{{title}}</span>
      <span class="cart-items-pc__info-category">{{category}}</span>
      <div class="cart-items-pc__info-price">
        <span>${{ currentPrice }}</span>
        <div>
          <span class="minus" @click="handleCountMinus">-</span>
          <span class="count">{{count}}</span>
          <span class="plus" @click="handleCountPlus">+</span>
        </div>
      </div>
    </div>

    <span class="delete" @click="updDeleteProduct">
      <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M31.3355 9.4769L32.5233 10.6647L10.6648 32.5215L9.47705 31.3345L31.3355 9.4769Z" fill="#151515" fill-opacity="0.6"/>
        <path d="M10.6648 9.4769L32.5233 31.3337L31.3355 32.5223L9.47705 10.6655L10.6648 9.4769Z" fill="#151515" fill-opacity="0.6"/>
      </svg>
    </span>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "@vue/composition-api";
import {ref, useContext} from "@nuxtjs/composition-api";

export default defineComponent({
  props: {
    image: {
      type: String,
      default: '',
      required: true
    },
    title: {
      type: String,
      default: '',
      required: true
    },
    category: {
      type: String,
      default: '',
      required: true
    },
    price: {
      type: Number,
      default: 0,
      required: true
    },
    id: {
      type: String,
      default: '',
      required: true
    },
    deleteProduct: {
      type: Function,
      required: true
    },
    handleTotalPricePlus: {
      type: Function,
      required: true
    },
    handleTotalPriceMinus: {
      type: Function,
      required: true
    },
  },

  setup({deleteProduct, id, price, handleTotalPricePlus, handleTotalPriceMinus}) {
    const count = ref(1)
    // @ts-ignore
    const updDeleteProduct = () => deleteProduct(id, currentPrice.value)
    const handleCountPlus = () => {
      count.value++
      currentPrice.value += price
      // @ts-ignore
      handleTotalPricePlus(price)
    }
    const currentPrice = ref(price)

    const handleCountMinus = () => {
      if(count.value === 1) return
      count.value--
      currentPrice.value -= price
      // @ts-ignore
      handleTotalPriceMinus(price)
    }

    return {updDeleteProduct, count, handleCountPlus, handleCountMinus, currentPrice}
  }
})
</script>

<style lang="scss" scoped>
.cart-items-pc {
  position: relative;
  display: flex;
  border-top: 1px dashed #989898;
  margin-top: 7px;
  padding-top: 7px;
  width: 100%;

  img {
    width: 40%;
  }

  &__info {
    display: flex;
    flex-direction: column;

    &-title {
      color: var(--color-black);
      font-size: 14px;
      padding-top: 5px;
      max-width: 74px;
      line-height: 100.6%;

      @media (min-width: 1440px) {
        max-width: 120px;
      }
    }

    &-category {
      color: var(--color-black);
      font-size: 12px;
      opacity: 0.5;
    }

    &-price {
      display: flex;
      align-content: center;
      margin-top: 10px;
      span {
        color: var(--color-black);
        font-size: 14px;
        opacity: 0.5;
        line-height: 100.6%;
      }
      div {
        margin-left: 15px;
        align-content: center;
        display: flex;

        .minus,
        .plus {
          cursor: pointer;
        }

        .count {
          margin: 0 5px;
        }
      }
    }
  }
  .delete {
    position: absolute;
    right: -5px;
    top: -5px;
    color: #151515;
    cursor: pointer;
    transform: scale(0.5);
  }
}
</style>
