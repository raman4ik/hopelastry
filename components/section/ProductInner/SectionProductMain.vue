<template>
  <div>
    <div class="product-page__product">
      <div class="product__left-side">
        <img
          ref="productImgPcRef"
          :src="images"
          :alt="name"
        />
      </div>
      <div class="product__right-side">
        <div class="product__right-side__title">
          <AnimatedTextWords :string="name" />
        </div>
        <div class="product__right-side__category">
          <AnimatedTextWords :string="category" :delay="0.2" />
        </div>
        <div class="product__right-side__price">
          <AnimatedTextWords :string="`${price}$`" :delay="0.4" />
        </div>
        <div class="product__right-side__description">
          <AnimatedTextLines
            :delay="0.6"
            :string="description"
          />
        </div>
        <div class="product__right-side__button">
          <button v-if="!isBuy" @click="handleCookie">Купити</button>
          <NuxtLink to="/basket" v-else>В корзину</NuxtLink>
        </div>
      </div>
    </div>

    <div class="product-page__phone">
      <div class="product-page__title">
        <AnimatedTextWords :string="name" />
      </div>

      <div class="product-page__category">
        <AnimatedTextWords :string="category" :delay="0.2" />
      </div>

      <img
        ref="productImgRef"
        :src="images"
        alt="pshin"
      />

      <div class="product-page__description">
        <AnimatedTextLines
          :delay="0.6"
          :string="description"
        />
      </div>

      <div class="product-page__pay-container">
        <AnimatedTextWords string="444$" :delay="0.4" />
        <button v-if="!isBuy" @click="handleCookie">Купити</button>
        <NuxtLink v-else @click="handleCookie" to="/basket">В корзині</NuxtLink>
      </div>


    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { onMounted, ref, useContext } from '@nuxtjs/composition-api'
import AnimatedTextWords from "~/components/animated/AnimatedTextWords.vue";

export default defineComponent({
  components: {AnimatedTextWords},
  props: {
    product: {
      type: Object,
      required: true,
      default: () => ({})
    }
  },
  setup({product}) {
    const productImgRef = ref(null)
    const productImgPcRef = ref(null)
    const isBuy = ref(false)
    // @ts-ignore
    const { $gsap, store, $cookies } = useContext()

    const {images, name, category, description, price, _id} = product

    const handleCookie = () => {
      isBuy.value = true
      $cookies.set(`Products`, store.state.products)
      store.dispatch('addProductToStore', {title: name, image: images, price, category, id: _id})
    }

    onMounted(() => {
      if(store.state.products.find((item: any) => item.id === _id)) {
        isBuy.value = true
      }
      setTimeout(() => {
        $gsap.to(productImgRef.value, {
          translateX: 0,
          duration: 1,
          opacity: 1,
          delay: 0.2
        })
      }, 200)
      setTimeout(() => {
        $gsap.to(productImgPcRef.value, {
          translateX: 0,
          duration: 1,
          opacity: 1,
          delay: 0.2
        })
      }, 100)
    })

    return {
      productImgRef,
      productImgPcRef,
      images, name, category, description, price,
      handleCookie,
      isBuy
    }
  }
})
</script>

<style lang="scss" scoped>
.product-page__product {
  margin: 0 auto;
  max-width: 1400px;
  display: none;

  @media (min-width: 1024px) {
    display: flex;
  }

  .product__left-side {
    width: 50%;

    img {
      transform: translateX(-20px);
      opacity: 0;
    }
  }

  .product__right-side {
    width: 50%;
    padding-left: 20px;
    @media (min-width: 1440px) {
      padding-top: 50px;
    }

    &__title {
      .words {
        font-size: 48px;
        font-family: var(--font-monument-grotesk);
        color: var(--color-black);
      }
    }

    &__category {
      .words {
        font-size: 18px;
        font-family: var(--font-monument-grotesk);
        color: var(--color-black);
        opacity: 0.5;
      }
    }

    &__price {
      .words {
        font-size: 28px;
        font-family: var(--font-monument-grotesk);
        color: var(--color-black);
        font-weight: 500;
      }
    }

    &__description {
      .lines {
        font-size: 16px;
        font-family: var(--font-monument-grotesk);
        color: var(--color-black);
        font-weight: 500;
        padding-right: 10px;

        @media (min-width: 1440px) {
          font-size: 18px;
        }
      }
    }

    &__button {
      margin-top: 20px;

      button {
        background: #151515;
        border-radius: 50px;
        border: 1px solid black;
        outline: none;
        color: var(--color-white);
        font-family: var(--font-monument-grotesk);
        font-size: 24px;
        padding: 10px 20px;
        transition: all 0.3s;

        &:hover {
          background: none;
          color: var(--color-black);
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
}

.product-page__phone {
  width: 100%;
  margin: 0 auto;
  padding: 0 20px;

  @media (min-width: 768px) {
    max-width: 768px;
  }

  @media (min-width: 1024px) {
    display: none;
  }

  .product-page__title {
    .words {
      max-width: 200px;
      color: var(--color-black);
      font-size: 32px;
      font-family: var(--font-monument-grotesk);
      line-height: 100.6%;
    }
  }

  .product-page__category {
    .words {
      color: var(--color-black);
      opacity: 0.4;
      font-family: var(--font-monument-grotesk);
      font-size: 18px;
    }
  }

  img {
    @media (min-width: 768px) {
      max-height: 600px;
      margin: 0 auto;
    }
  }

  .product-page__description {
    margin-top: 10px;
    .words {
      color: var(--color-black);
      font-size: 16px;
      line-height: 100.6%;

      @media (min-width: 768px) {
        font-size: 18px;
      }
    }
  }

  .product-page__pay-container {
    display: flex;
    margin-top: 20px;
    justify-content: space-between;
    align-items: center;

    .words {
      color: var(--color-black);
      font-size: 24px;
      font-family: var(--font-monument-grotesk);
    }

    button {
      border-radius: 50px;
      border: 1px solid black;
      padding: 10px 20px;
      background: #151515;
      font-size: 24px;
      color: var(--color-white);
      font-family: var(--font-monument-grotesk);
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
