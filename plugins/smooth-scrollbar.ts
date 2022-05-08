import Scrollbar, { ScrollbarPlugin } from 'smooth-scrollbar'
import { Plugin } from '@nuxt/types'

declare module 'vue/types/vue' {
  // this.$myInjectedFunction inside Vue components
  interface Vue {
    $Scrollbar(): any
  }
}

declare module '@nuxt/types' {
  // nuxtContext.app.$myInjectedFunction inside asyncData, fetch, plugins, middleware, nuxtServerInit
  interface NuxtAppOptions {
    $Scrollbar(): any
  }
  // nuxtContext.$myInjectedFunction
  interface Context {
    $Scrollbar(): any
  }
}

type Delta = {
  x: number
  y: number
}

class MyPlugin extends ScrollbarPlugin {
  static pluginName = 'myPlugin'

  static defaultOptions = {
    animateProcess: false
  }

  transformDelta(delta: Delta): Delta {
    return this.options.animateProcess ? { x: 0, y: 0 } : delta
  }
}

Scrollbar.use(MyPlugin)

const myPlugin: Plugin = (_, inject) => {
  inject('Scrollbar', Scrollbar)
}

export default myPlugin
