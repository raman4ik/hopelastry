<template>
  <div class="wrapper-home">
    <div v-if="preloaderHidden" class="wrapper">
      <HomeSectionMain />
      <HomeSectionInfo />
      <HomeSectionProduct :products="products" :handleFilterItems="handleFilterItems" :currentCategory="filterRef" />
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, inject, ref, useAsync, useContext, useFetch} from '@nuxtjs/composition-api'
import HomeSectionMain from '~/components/section/HomeSection/HomeSectionMain.vue'
import HomeSectionInfo from '~/components/section/HomeSection/HomeSectionInfo.vue'
import HomeSectionProduct from '~/components/section/HomeSection/HomeSectionProduct.vue'

export default defineComponent({
  name: 'HomePage',
  components: { HomeSectionProduct, HomeSectionInfo, HomeSectionMain },
  setup() {
    const {$axios} = useContext()
    const products =  ref([])
    const filterRef = ref('all')
    const fetching = ref(true)

    const preloaderHidden = inject('preloaderHidden')

    const handleFilterItems = async(slug: string) => {
      if(slug === filterRef.value) return
      if (slug !== 'all') {
        filterRef.value = slug
        await $axios.get(`/products/${slug}`)
          .then(res => products.value = res.data)
      }
      if(slug === 'all') {
        filterRef.value = slug
        await $axios.get('/products')
          .then(res => products.value = res.data.products)
      }
    }

    useFetch(async() => {
      fetching.value = true
      const results = await $axios.get('/products')
      products.value = results.data.products
      fetching.value = false
    })


    return { preloaderHidden, products, handleFilterItems, filterRef, fetching }
  },
  head: {}
})
</script>
