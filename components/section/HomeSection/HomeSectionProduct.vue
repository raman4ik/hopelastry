<template>
  <div ref="homeProductRef" class="home-products">
    <div class="home-products__title">
      <AnimatedTextWords string="АЛКОГОЛЬНІ НАПОЇ" />
    </div>

    <div class="home-products__category">
      <ul>
        <li @click="handleFilterItems('all')" :class="{active: currentCategory === 'all'}">Все</li>
        <li @click="handleFilterItems('vodka')" :class="{active: currentCategory === 'vodka'}">Горілка</li>
        <li @click="handleFilterItems('cognac')" :class="{active: currentCategory === 'cognac'}">Коньяк</li>
        <li @click="handleFilterItems('rom')" :class="{active: currentCategory === 'rom'}">Ром</li>
      </ul>
    </div>

    <div class="home-products__category-phone">
      <div @click="isActive = !isActive" class="select">
        <span>{{ selectedCategory }}</span>
        <ArrowDown :is-active="isActive" />
      </div>
      <div class="option" :class="{active: isActive}">
        <span v-for="option in options.filter(item => item.name !== selectedCategory)" @click="handleSelectedCategory(option.name, option.category)">{{option.name}}</span>
      </div>
    </div>

    <div ref="wrapperRef" class="home-products__container">
      <template v-for="product in products">
        <div ref="productConRef" :key="product.id" class="product-con">
          <ProductCard :title="product.name" :description="product.description" :price="product.price" :image="product.images" :id="product._id" :category="product.category" />
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import { onMounted, ref, useContext, watch } from '@nuxtjs/composition-api'
import AnimatedTextWords from '@/components/animated/AnimatedTextWords'
import ProductCard from '~/components/Cards/ProductCard'
import ArrowDown from "~/components/Arrow/ArrowDown";

export default defineComponent({
  components: {ArrowDown, ProductCard, AnimatedTextWords },

  props: {
    products: {
      type: Array,
      required: true,
      default: () => ([])
    },
    handleFilterItems: {
      type: Function,
      default: () => {}
    },
    currentCategory: {
      type: String,
      default: ''
    }
  },

  setup({products, handleFilterItems}) {
    const { $gsap, $ScrollTrigger } = useContext()
    const options = ref([{name: 'Все', category: 'all', id: 1},  {name: 'Водка', category: 'vodka', id: 2}, {name: 'Коньяк', category: 'cognac', id: 3}, {name: 'Ром',category: 'rom', id: 4}])
    const selectedCategory = ref('Все')
    const isActive = ref(false)

    const handleSelectedCategory = (name, category) => {
      handleFilterItems(category)
      selectedCategory.value = name
      isActive.value = false
    }
    return {
      options,
      isActive,
      selectedCategory,
      handleSelectedCategory
    }
  }
})
</script>

<style lang="scss" scoped>
.home-products {
  position: relative;
  background-color: #f6f6f6;
  width: 100%;

  &__title {
    margin: 0 auto;
    text-align: center;
    padding-top: 40px;

    .words {
      color: var(--color-black);
      font-size: 36px;
      font-family: var(--font-monument-grotesk);
      line-height: 100.6%;

      @media (min-width: 768px) {
        font-size: 48px;
      }

      @media (min-width: 1440px) {
        font-size: 58px;
      }
    }
  }

  &__category-phone {
    display: flex;
    flex-direction: column;
    max-width: 388px;
    overflow: hidden;
    margin: 20px auto 0 auto;
    padding: 0 15px;
    .select {
      border: 1px solid black;
      padding: 5px 10px;
      font-size: 18px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      z-index: 10;
      background-color: #fff;
      &.active {
        border-bottom: none;
      }
      span {
        color: var(--color-black);
      }
    }

    .option {
      display: none;
      flex-direction: column;
      border: 1px solid black;
      border-top: none;
      transition: all 0.3s;
      background-color: #fff;
      &.active {
        display: flex;
      }
      span {
        color: var(--color-black);
        font-size: 16px;
        padding: 5px 10px;
        border-bottom: 1px solid black;
      }
    }
    @media (min-width: 768px) {
      display: none;
    }
  }

  &__category {
    width: 100%;
    display: none;
    justify-content: center;
    @media (min-width: 768px) {
      display: flex;
    }
    ul {
      display: flex;
      align-items: center;
      li {
        color: var(--color-black);
        font-size: 18px;
        font-family: var(--font-monument-grotesk);
        line-height: 100.6%;
        cursor: pointer;
        position: relative;
        text-align: right;
        margin: 0 10px;
        text-transform: uppercase;
        transition: all .3s;

        @media (min-width: 1024px) {
          font-size: 22px;
        }
        &::before {
          content: '';
          width: 0;
          height: 1px;
          bottom: -5px;
          background-color: #151515;
          position: absolute;
          transition: all 0.3s;
        }
        &:hover {
          &::before {
            content: '';
            width: 100%;
            height: 1px;
            bottom: -5px;
            background-color: #151515;
            position: absolute;
          }
        }

        &.active {
          border: 1px solid #151515;
          background: #151515;
          color: var(--color-white);
          padding: 5px 10px;

          &::before {
            content: '';
            display: none;
          }
        }
      }
    }
  }

  &__container {
    display: flex;
    justify-content: center;
    margin: 0 auto;
    max-width: 1400px;
    padding-bottom: 100px;
    flex-wrap: wrap;
    align-items: center;
    padding-top: 30px;
    z-index: 1000;

    @media (max-width: 1440px) {
      max-width: 1024px;
    }
  }
}
</style>
