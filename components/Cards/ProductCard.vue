<template>
  <div ref="cardRef" class="product-card">
    <NuxtLink :to="`/products/${id}`">
      <img
        :src="image"
        :alt="title"
      />
      <h3>{{title}}</h3>
      <span>{{price}}₴</span>
    </NuxtLink>
    <div>
      <button v-if="!isBuy" @click="handleCookie()">Купити</button>
      <NuxtLink v-else to="/basket">В корзині</NuxtLink>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import {onMounted, ref, useContext, useFetch} from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    image: {
      type: String,
      default: ''
    },
    id: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    },
    price: {
      type: Number,
      default: 0
    },
    category: {
      type: String,
      default: ''
    }
  },

  setup({title, image, price, id, category}) {
    const { store } = useContext()
   // @ts-ignore
    const { $gsap, $ScrollTrigger, $axios, $cookies } = useContext()

    const cardRef = ref(null)
    const isBuy = ref(false)

    const handleCookie = () => {
      isBuy.value = true
      store.dispatch('addProductToStore', {title, image, price, category, id})
      $cookies.set(`Products`, store.state.products)
    }

    onMounted(() => {
      setTimeout(() => {
        if(store.state.products.find((item: any) => item.id === id)) {
          isBuy.value = true
        }
      }, 200)
    })

    onMounted(() => {
      setTimeout(() => {
        $ScrollTrigger.create({
          trigger: cardRef.value,
          start: 'center bottom',
          onEnter() {
            $gsap.to(cardRef.value, {
              translateX: 0,
              opacity: 1,
              duration: 0.5,
              ease: 'back.out(1.7)'
            })
          }
        })
      }, 200)
    })

    return {
      cardRef,
      handleCookie,
      isBuy
    }
  }
})
</script>

<style lang="scss" scoped>
.product-card {
  max-width: 300px;
  position: relative;
  background-color: #fff;
  padding: 20px;
  min-height: 400px;
  border-radius: 15px;
  cursor: pointer;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
  margin: 10px 20px;
  text-align: left;
  transition: all 0.3s ease-in;
  transform: translateX(-20px);
  opacity: 0;
  overflow: hidden;

  @media (min-width: 1024px) {
    max-width: 250px;
    min-height: 350px;
  }

  @media (min-width: 1440px) {
    min-width: 350px;
    min-height: 450px;
  }

  &:hover {
    img {
      transform: scale(1.1);
    }
  }

  img {
    width: 100%;
    max-height: 300px;
    object-fit: cover;
    transition: transform 0.3s;
  }

  h3 {
    font-family: var(--font-monument-grotesk);
    color: var(--color-black);
    font-size: 18px;
    line-height: 100.6%;
    font-weight: 400;
    opacity: 0.8;
    margin: 5px 0 0 0;

    @media (min-width: 1024px) {
      font-size: 14px;
    }

    @media (min-width: 1440px) {
      font-size: 20px;
      font-weight: 600;
    }
  }

  span {
    font-family: var(--font-monument-grotesk);
    color: var(--color-black);
    font-size: 16px;
    line-height: 100.6%;
    margin-bottom: 41px;

    @media (min-width: 1440px) {
      font-size: 18px;
    }
  }

  div {
    position: absolute;
    right: 15px;
    bottom: 15px;

    @media (min-width: 1024px) {
      right: 10px;
    }

    @media (min-width: 1440px) {
      right: 20px;
    }

    button {
      background: #151515;
      outline: none;
      border: none;
      color: var(--color-white);
      font-size: 18px;
      padding: 10px 15px;
      font-family: var(--font-monument-grotesk);
      border-radius: 10px;
      transition: all 0.3s;

      &:hover {
        background: none;
        border: 1px solid #151515;
        color: var(--color-black);
      }

      @media (min-width: 1024px) {
        font-size: 14px;
      }

      @media (min-width: 1440px) {
        font-size: 18px;
        font-weight: 600;
      }
    }

    a {
      background-color: #151515;
      color: var(--color-white);
      font-size: 18px;
      padding: 10px 15px;
      font-family: var(--font-monument-grotesk);
      border-radius: 10px;
      transition: all 0.3s;
      position: relative;
      bottom: 5px;
      left: 0;

      &:hover {
        background: none;
        border: 1px solid #151515;
        color: var(--color-black);
      }

      @media (min-width: 1024px) {
        font-size: 14px;
      }

      @media (min-width: 1440px) {
        font-size: 18px;
        font-weight: 600;
      }
    }
  }
}
</style>
