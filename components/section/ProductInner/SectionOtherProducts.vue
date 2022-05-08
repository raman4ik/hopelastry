<template>
  <div class="other-products">
    <div class="other-products__title">
      <AnimatedTextWords string="Похожие Товары" />

      <div class="other-products__container">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
    </div>
  </div>
</template>

<script>
import AnimatedTextWords from '@/components/animated/AnimatedTextWords'
import ProductCard from '@/components/Cards/ProductCard'
export default {
  components: { ProductCard, AnimatedTextWords }
}
</script>

<style lang="scss" scoped>
.other-products {
  position: relative;
  margin: 0 auto;
  text-align: center;
  max-width: 768px;
  padding-bottom: 50px;

  @media (min-width: 1024px) {
    max-width: 1440px;
  }

  &__title {
    .words {
      color: var(--color-black);
      font-size: 38px;
      font-family: var(--font-monument-grotesk);

      @media (min-width: 768px) {
        font-size: 44px;
      }

      @media (min-width: 1024px) {
        font-size: 50px;
      }

      @media (min-width: 1920px) {
        font-size: 58px;
      }
    }
  }

  &__container {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    @media (min-width: 768px) {
      flex-direction: row;
      flex-wrap: wrap;
    }
  }
}
</style>
