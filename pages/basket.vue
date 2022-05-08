<template>
  <div class="basket-con">
    <div class="basket phone">

      <template v-if="isModal">
        <ModalOrder :handleShowModal="handleShowModal"/>
      </template>

      <div class="basket__title">
        <AnimatedTextWords string="Корзина" />
      </div>
      <div v-if="products.length >= 1" class="product-container">
        <template v-for="product in products">
          <CartItems
            :key="product.id"
            :handle-total-price-minus="handleTotalPriceMinus"
            :handle-total-price-plus="handleTotalPricePlus"
            :title="product.title"
            :price="product.price"
            :image="product.image"
            :category="product.category"
            :id="product.id"
            :delete-product="deleteProduct" />
        </template>
      </div>
      <div v-else class="product-container">
        <span>Корзина пуста</span>
      </div>

      <div class="basket__info">
        <div class="basket__info-price">
          <span class="title">Всього до сплати</span>
          <span class="price">${{totalPrice}}</span>
        </div>
        <div class="basket__info-btn">
          <button :disabled="!totalPrice" @click="isModal = true" :class="{disabled: !totalPrice}">ЗАМОВИТИ</button>
        </div>
      </div>
    </div>

    <div class="basket-pc">
      <div class="basket-pc__title">
        <AnimatedTextWords string="Корзина" />
      </div>
      <div class="basket-pc__form">
        <form>
          <div class="name">
            <div>
              <span>Імя*</span>
              <input type="text" required />
            </div>
            <div>
              <span>Фамілія*</span>
              <input type="text" required />
            </div>
          </div>
          <div class="number">
            <span>Номер Телефона*</span>
            <input type="text" required />
          </div>
          <div class="address">
            <div>
              <span>Місто*</span>
              <input type="text" required />
            </div>
            <div>
              <span>Країна*</span>
              <input type="text" required />
            </div>
          </div>
          <div class="code">
            <span>Код*</span>
            <input type="text" required />
          </div>
          <div class="button-con">
            <button :disabled="!totalPrice" :class="{disabled: !totalPrice}">Замовити</button>
            <button>Скасувати</button>
          </div>
        </form>
      </div>
      <div class="basket-pc__order">
        <div class="basket-pc__order-container">
          <div class="basket-pc__order-container-title">
            <span>Ваше Замовлення</span>
          </div>

          <div class="basket-pc__order-container-products">
            <template v-for="product in products">
              <CartItemsPc
                :key="product.id"
                :handle-total-price-minus="handleTotalPriceMinus"
                :handle-total-price-plus="handleTotalPricePlus"
                :title="product.title"
                :price="product.price"
                :image="product.image"
                :category="product.category"
                :id="product.id"
                :delete-product="deleteProduct" />
            </template>
          </div>

          <div class="basket-pc__order-container-price">
            <span>Всього</span>
            <span>${{totalPrice}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AnimatedTextWords from '@/components/animated/AnimatedTextWords'
import CartItems from '@/components/section/Basket/CartItems'
import CartItemsPc from "@/components/section/Basket/CartItemsPc";
import {onMounted, reactive, ref, toRefs, useContext, watch} from "@nuxtjs/composition-api";
import ModalOrder from "@/components/modal/ModalOrder";
export default {
  components: {ModalOrder, CartItemsPc, CartItems, AnimatedTextWords },

  setup() {
    const { store, $cookies } = useContext()
    const products = ref([])
    const totalPrice = ref()
    const isModal = ref(false)

    onMounted(() => {
      setTimeout(() => {
        products.value = store.state.products
      }, 100)
      setTimeout(() => {
        totalPrice.value = products.value.reduce((accumulator, currentValue) => {
          return accumulator + currentValue.price
        }, 0)
      }, 200)
    })

    function handleShowModal() {
      isModal.value = false
    }

    function deleteProduct(id, price) {
      store.dispatch('deleteProduct', id)
      products.value = store.state.products
      $cookies.set('Products', store.state.products)
      totalPrice.value -= price
    }

    function handleTotalPricePlus(currentPrice) {
      totalPrice.value += currentPrice
    }

    function handleTotalPriceMinus(currentPrice) {
      totalPrice.value -= currentPrice
    }

    return {
      products,
      deleteProduct,
      totalPrice,handleTotalPricePlus, handleTotalPriceMinus,
      isModal,
      handleShowModal
    }
  }
}
</script>

<style lang="scss" scoped>
.basket-con {
  height: 100vh;
  background-color: #fff;
  width: 100%;

  .basket {
    width: 100%;
    height: 100%;

    @media (min-width: 1024px) {
      display: none;
    }

    &__title {
      text-align: center;
      padding-top: 50px;

      .words {
        font-size: 38px;
        font-family: var(--font-monument-grotesk);
        color: var(--color-black);

        @media (min-width: 768px) {
          font-size: 44px;
        }
      }
    }

    .product-container {
      min-height: 60%;
      max-height: 60%;
      overflow-y: scroll;
      border-radius: 15px;

      @media (min-width: 768px) {
        min-height: 69%;
        max-height: 69%;
      }

      span {
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 40%;
        color: #151515;
        font-size: 24px;
        left: calc(50% - 79px);
      }
    }

    .basket__info {
      border-top: 2px dashed #ecece0;
      margin-top: 20px;
      display: flex;
      justify-content: space-between;
      padding: 30px 10px 0 10px;
      align-items: center;

      &-price {
        display: flex;
        flex-direction: column;
        text-align: left;

        .title {
          color: var(--color-black);
          font-size: 18px;
          font-family: var(--font-monument-grotesk);

          @media (min-width: 768px) {
            font-size: 24px;
            line-height: 100.6%;
          }
        }

        .price {
          color: var(--color-black);
          font-size: 16px;
          font-family: var(--font-monument-grotesk);

          @media (min-width: 768px) {
            font-size: 22px;
            padding-top: 10px;
            line-height: 100.6%;
          }
        }
      }

      &-btn {
        button {
          background-color: #151515;
          border-radius: 50px;
          outline: none;
          border: none;
          color: var(--color-white);
          font-size: 18px;
          padding: 15px;
          transition: all 0.3s;

          @media (min-width: 768px) {
            font-size: 24px;
          }

          &.disabled {
            opacity: 0.5;
          }
        }
      }
    }
  }

  .basket-pc {
    display: none;
    padding: 150px 40px 30px 40px;
    align-items: center;
    @media (min-width: 1024px) {
      display: flex;
    }
    @media (min-width: 1920px) {
      max-width: 1400px;
      margin: 0 auto;
    }

    &__title {
      display: none;
      position: absolute;
      top: 20px;
      left: calc(50% - 72px);

      @media (min-width: 1024px) {
        display: block;
      }

      @media (min-width: 1440px) {
        font-size: 48px;
        left: calc(50% - 92px);
      }

      @media (min-width: 1920px) {
        font-size: 58px;
        left: calc(50% - 102px);
      }

      .words {
        font-size: 38px;
        color: var(--color-black);

        @media (min-width: 1440px) {
          font-size: 48px;
        }

        @media (min-width: 1920px) {
          font-size: 58px;
        }
      }
    }

    &__form {
      width: 70%;
      display: flex;
      justify-content: flex-start;
      form {
        width: 100%;

        div {
          display: flex;
          flex-direction: row;
        }
        input {
          width: 100%;
          border: 1px solid #151515;
          outline: none;
          border-radius: 4px;
          padding: 5px 10px;
          font-size: 20px;
          color: var(--color-black);

          &:focus {
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
          }
        }

        .name {
          div {
            display: flex;
            flex-direction: column;
            width: 100%;
            &:first-child {
              margin-right: 20px;
            }

            span {
              font-size: 16px;
              color: var(--color-black);
              padding: 0 5px;
            }
          }
        }

        .number {
          display: flex;
          flex-direction: column;
          width: 100%;
          margin: 15px 0;

          span {
            font-size: 16px;
            color: var(--color-black);
            padding: 0 5px;
          }
        }

        .address {
          div {
            display: flex;
            flex-direction: column;
            width: 100%;
            &:first-child {
              margin-right: 20px;
            }

            span {
              font-size: 16px;
              color: var(--color-black);
              padding: 0 5px;
            }
          }
        }

        .code {
          display: flex;
          flex-direction: column;
          width: 100%;
          margin: 15px 0;

          span {
            font-size: 16px;
            color: var(--color-black);
            padding: 0 5px;
          }
        }

        .button-con {
          button {
            color: var(--color-black);
            font-family: var(--font-monument-grotesk);
            outline: none;
            border: none;
            font-size: 22px;
            background: none;
            transition: all 0.3s;
            &:first-child {
              border: 1px solid black;
              background-color: var(--color-black);
              color: var(--color-white);
              padding: 10px 40px;
              margin-right: 10px;
            }
            &.disabled {
              opacity: 0.5;
            }
          }
        }
      }
    }

    &__order {
      width: 30%;
      max-height: 400px;

      &-container {
        box-shadow: 0 0 5px;
        border-radius: 15px;
        margin-left: 50px;
        padding: 0 20px;
        &-title {
          font-size: 22px;
          color: var(--color-black);
          padding: 15px 0;
          line-height: 100.6%;
        }

        &-products {
          max-height: 250px;
          min-height: 250px;
          overflow-y: scroll;

          &::-webkit-scrollbar {
            width: 1px;
          }

          &::-webkit-scrollbar-track {
            background: #d0d0d0;
          }

          &::-webkit-scrollbar-thumb {
            background: #888;
          }

          &::-webkit-scrollbar-thumb:hover {
            background: #555;
          }
        }

        &-price {
          margin-top: 30px;
          padding-bottom: 15px;
          display: flex;
          justify-content: space-between;

          span {
            color: var(--color-black);
            font-size: 24px;
            font-family: var(--font-monument-grotesk);
          }
        }
      }
    }
  }
}
</style>
