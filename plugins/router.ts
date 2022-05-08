import { Context } from '@nuxt/types'
import VueRouter from 'vue-router'

const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export default ({ app, $Scrollbar, store }: Context) => {
  ;(app.router as VueRouter).beforeEach(async (to, from, next) => {
    store.dispatch('changeLoaderStatus', true)

    await sleep(1500)

    next()
  })
  ;(app.router as VueRouter).afterEach(() => {
    store.dispatch('changeLoaderStatus', false)
    const scroller = document.querySelector('.scroller')
    // @ts-ignore
    const scrollbar = $Scrollbar.get(scroller)

    scrollbar?.scrollTo(0, 0)
  })
}
