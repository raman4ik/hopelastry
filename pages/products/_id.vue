<template>
  <div v-if="preloaderHidden && !fetching" class="product-page">
    <SectionProductMain :product="product" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import {inject, onMounted, ref, useContext, useFetch} from '@nuxtjs/composition-api'
import AnimatedTextWords from '~/components/animated/AnimatedTextWords.vue'
import SectionProductMain from '~/components/section/ProductInner/SectionProductMain.vue'
import SectionOtherProducts from '~/components/section/ProductInner/SectionOtherProducts.vue'

export default defineComponent({
  components: { SectionOtherProducts, SectionProductMain, AnimatedTextWords },
  setup() {
    const {$axios} = useContext()
    const preloaderHidden = inject('preloaderHidden')
    const product = ref({})
    const fetching = ref(false)

    const show = () => {}

    useFetch(async ({$route}) => {
      fetching.value = true
      await $axios.get(`/product/${$route.params.id}`)
        .then(res => product.value = res.data.product)
        // .then(res => console.log(res))
      fetching.value = false
    })

    return { show, preloaderHidden, product, fetching }
  }
})
</script>

<style lang="scss" scoped>
.product-page {
  position: relative;
  background-color: #fff;
  padding-top: 5%;
  padding-bottom: 20px;
  min-height: 100vh;

  @media (min-width: 768px) {
    padding-top: 50px;
  }

  .other-products-wrapper {
    margin-top: 30px;
  }
}
</style>
