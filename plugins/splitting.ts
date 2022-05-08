import Splitting from 'splitting'
import { Plugin } from '@nuxt/types'

declare module 'vue/types/vue' {
  // this.$myInjectedFunction inside Vue components
  interface Vue {
    $splitting(args: Splitting.SplittingArgs): Splitting.SplittingReturn[]
  }
}

declare module '@nuxt/types' {
  // nuxtContext.app.$myInjectedFunction inside asyncData, fetch, plugins, middleware, nuxtServerInit
  interface NuxtAppOptions {
    $splitting(args: Splitting.SplittingArgs): Splitting.SplittingReturn[]
  }
  // nuxtContext.$myInjectedFunction
  interface Context {
    $splitting(args: Splitting.SplittingArgs): Splitting.SplittingReturn[]
  }
}

const myPlugin: Plugin = (_, inject) => {
  inject('splitting', Splitting)
}

export default myPlugin
