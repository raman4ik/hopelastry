<template>
  <div class="cart-items">
    <div class="cart-items-phone">
      <div class="cart-items__container">
        <img
          :src="image"
          :alt="title"
        />
        <div class="cart-items__info">
          <span class="cart-items__info-title">{{ title }}</span>
          <span class="cart-items__info-category">{{ category }}</span>
          <span class="cart-items__info-price">${{ currentPrice }}</span>
        </div>
        <div class="cart-items__count">
          <span class="cart-items__count-minus" @click="handleCountMinus">-</span>
          <span class="cart-items__count-number">{{count}}</span>
          <span class="cart-items__count-plus" @click="handleCountPlus">+</span>
        </div>
        <div ref="deleteProductRef" @click="updDeleteProduct" class="cart-items__delete">
          <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M31.3355 9.4769L32.5233 10.6647L10.6648 32.5215L9.47705 31.3345L31.3355 9.4769Z" fill="#151515" fill-opacity="0.6"/>
            <path d="M10.6648 9.4769L32.5233 31.3337L31.3355 32.5223L9.47705 10.6655L10.6648 9.4769Z" fill="#151515" fill-opacity="0.6"/>
          </svg>
        </div>
      </div>
    </div>
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
.cart-items {
  display: flex;
  padding: 0 10px;
  margin: 10px 0;
  .cart-items-phone {
    width: 100%;
    background-color: #fafafa;
    border-radius: 15px;
    position: relative;

    .cart-items__container {
      display: flex;
      align-items: center;
      img {
        width: 30%;
      }

      .cart-items__info {
        display: flex;
        flex-direction: column;
        text-align: left;
        padding-bottom: 20px;
        max-width: 150px;

        @media (min-width: 768px) {
          padding-bottom: 80px;
          max-width: 300px;
        }
        &-title {
          color: var(--color-black);
          font-size: 16px;
          font-family: var(--font-monument-grotesk);

          @media (min-width: 768px) {
            font-size: 24px;
            line-height: 100.6%;
          }
        }

        &-category {
          color: var(--color-black);
          opacity: 0.4;
          font-size: 14px;
          @media (min-width: 768px) {
            font-size: 18px;
            margin: 5px 0;
          }
        }

        &-price {
          color: var(--color-black);
          font-size: 14px;
          font-family: var(--font-monument-grotesk);
          @media (min-width: 768px) {
            font-size: 18px;
          }
        }
      }

      .cart-items__count {
        display: flex;
        align-items: center;
        position: absolute;
        right: 5%;
        &-minus {
          color: var(--color-black);
          line-height: 100.6%;

          @media (min-width: 768px) {
            font-size: 24px;
            line-height: 100.6%;
          }
        }
        &-number {
          color: var(--color-black);
          font-size: 16px;
          line-height: 100.6%;
          margin: 0 10px;

          @media (min-width: 768px) {
            font-size: 22px;
            line-height: 100.6%;
          }
        }
        &-plus {
          color: var(--color-black);
          line-height: 100.6%;

          @media (min-width: 768px) {
            font-size: 24px;
            line-height: 100.6%;
          }
        }
      }

      .cart-items__delete {
        position: absolute;
        right: -10px;
        top: -5px;
        color: #151515;
        transform: scale(0.4);
      }
    }
  }
}
</style>
