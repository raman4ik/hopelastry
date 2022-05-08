import Vue from 'vue'
import animejs from 'animejs'
import { Plugin } from '@nuxt/types'

Vue.directive('anime', (el, binding) => {
  animejs({ targets: el, ...binding.value })

  if (binding.modifiers.set) {
    animejs.set(el, { ...binding.value })
  }
})

declare module 'vue/types/vue' {
  // this.$myInjectedFunction inside Vue components
  interface Vue {
    $anime(params: animejs.AnimeParams): animejs.AnimeInstance
  }
}

declare module '@nuxt/types' {
  // nuxtContext.app.$myInjectedFunction inside asyncData, fetch, plugins, middleware, nuxtServerInit
  interface NuxtAppOptions {
    $anime(params: animejs.AnimeParams): animejs.AnimeInstance
  }
  // nuxtContext.$myInjectedFunction
  interface Context {
    $anime(params: animejs.AnimeParams): animejs.AnimeInstance
  }
}

const myPlugin: Plugin = (_, inject) => {
  inject('anime', animejs)
}

export default myPlugin
