import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'
import { Plugin } from '@nuxt/types'
import Scrollbar from 'smooth-scrollbar'

interface GsapType {
  fromTo(
    targets: gsap.TweenTarget,
    fromVars: gsap.TweenVars,
    toVars: gsap.TweenVars
  ): gsap.core.Tween
  from(targets: gsap.TweenTarget, vars: gsap.TweenVars): gsap.core.Tween
  to(targets: gsap.TweenTarget, vars: gsap.TweenVars): gsap.core.Tween
  set(targets: gsap.TweenTarget, vars: gsap.TweenVars): gsap.core.Tween
  timeline(vars?: gsap.TimelineVars): gsap.core.Timeline
  utils: {
    selector(scope: Element | object | string | null): gsap.utils.SelectorFunc
  }
}

declare module 'vue/types/vue' {
  // this.$myInjectedFunction inside Vue components
  interface Vue {
    $ScrollTrigger: {
      create(vars: ScrollTrigger.StaticVars): ScrollTrigger
    }
    $gsap: GsapType
  }
}

declare module '@nuxt/types' {
  // nuxtContext.app.$myInjectedFunction inside asyncData, fetch, plugins, middleware, nuxtServerInit
  interface NuxtAppOptions {
    $ScrollTrigger: {
      create(vars: ScrollTrigger.StaticVars): ScrollTrigger
    }
    $gsap: GsapType
  }
  // nuxtContext.$myInjectedFunction
  interface Context {
    $ScrollTrigger: {
      create(vars: ScrollTrigger.StaticVars): ScrollTrigger
      refresh(vars: ScrollTrigger.ScrollFunc): ScrollTrigger
    }
    $gsap: GsapType
  }
}

const myPlugin: Plugin = (_, inject) => {
  gsap.registerPlugin(ScrollTrigger)
  gsap.registerPlugin(MotionPathPlugin)

  inject('gsap', gsap)
  inject('ScrollTrigger', ScrollTrigger)
}

export default myPlugin
