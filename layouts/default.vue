<template>
  <div class="layout-default">
    <Header />
    <template>
      <div class="layout-default__container">
        <div class="scroller">
          <nuxt />
        </div>
      </div>
    </template>

    <Loader />

<!--    <PreLoader @onComplete="onPreloaderComplete" />-->
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  nextTick,
  onMounted,
  provide,
  ref,
  useContext,
  watch
} from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'Default',
  setup() {
    // @ts-ignore
    const { $cookies, route, $Scrollbar, $ScrollTrigger, store } = useContext()
    const preloaderHidden = ref(false)
    const showHeader = ref(true)
    const isCookieAccepted = ref($cookies.get('cookie-accept'))
    const loader = computed(() => {
      return store.state.loader
    })
    const layoutContainerRef = ref<HTMLElement | null>(null)
    const isHome = computed(() => {
      return route.value.name?.search('index') !== -1
    })

    provide('preloaderHidden', preloaderHidden)

    // const onPreloaderComplete = async () => {
    //   preloaderHidden.value = true
    //
    //   await nextTick()

      // const scroller = document.querySelector('.scroller')
      //
      // // @ts-ignore
      // const bodyScrollBar = $Scrollbar.init(scroller, {
      //   damping: 0.1,
      //   delegateTo: document
      // })
      //
      // // @ts-ignore
      // $ScrollTrigger.scrollerProxy('.scroller', {
      //   scrollTop(value: any) {
      //     if (arguments.length) {
      //       bodyScrollBar.scrollTop = value
      //     }
      //     return bodyScrollBar.scrollTop
      //   }
      // })
      //
      // // @ts-ignore
      // bodyScrollBar.addListener($ScrollTrigger.update)
      //
      // if (isHome.value) {
      //   bodyScrollBar.updatePluginOptions('myPlugin', { animateProcess: true })
      // }
      //
      // // @ts-ignore
      // $ScrollTrigger.defaults({ scroller })
    // }
    const light = computed(() => {
      return (
        route.value.name?.search('index') !== -1 ||
        route.value.name?.search('about') !== -1
      )
    })
    const headerDelay = computed(() => {
      if (route.value.name?.search('index') !== -1) {
        return 2
      } else if (route.value.name?.search('index') !== -1) {
        return 1
      } else {
        return 1
      }
    })
    const handleAccept = () => {
      $cookies.set('cookie-accept', true)
      isCookieAccepted.value = true
    }

    watch(loader, (currentValue) => {
      if (currentValue) {
        setTimeout(() => {
          showHeader.value = false
        }, 1500)
      } else {
        showHeader.value = true
      }
    })

    onMounted(() => {
      store.dispatch('changeLoaderStatus', false)
      // Fix for 100vh in mobile START
      const doc = document.documentElement
      const productsCart = $cookies.get('Products')

      const scroller = document.querySelector('.scroller')

      // @ts-ignore
      const bodyScrollBar = $Scrollbar.init(scroller, {
        damping: 0.1,
        delegateTo: document
      })

      // @ts-ignore
      $ScrollTrigger.scrollerProxy('.scroller', {
        scrollTop(value: any) {
          if (arguments.length) {
            bodyScrollBar.scrollTop = value
          }
          return bodyScrollBar.scrollTop
        }
      })

      // @ts-ignore
      bodyScrollBar.addListener($ScrollTrigger.update)

      if (isHome.value) {
        bodyScrollBar.updatePluginOptions('myPlugin', { animateProcess: true })
      }

      // @ts-ignore
      $ScrollTrigger.defaults({ scroller })

      if (productsCart) {
        store.dispatch('savedProducts', {productsCart})
      }

      doc.style.setProperty('--vh', window.innerHeight * 0.01 + 'px')
      // Fix for 100vh in mobile END
    })

    watch(route, (currentValue) => {
      const scroller = document.querySelector('.scroller')
      // @ts-ignore
      const scrollbar = $Scrollbar.get(scroller)

      if (currentValue.name?.search('index') !== -1) {
        scrollbar.updatePluginOptions('myPlugin', { animateProcess: true })
      } else {
        scrollbar.updatePluginOptions('myPlugin', { animateProcess: false })
      }
    })

    return {
      light,
      layoutContainerRef,
      isHome,
      loader,
      headerDelay,
      isCookieAccepted,
      handleAccept,
      preloaderHidden,
      route,
      showHeader
    }
  }
})
</script>

<style lang="scss" scoped>
.scroller {
  height: 100vh;
}
.layout-default {
  &__container {
    position: relative;
  }
}
</style>
