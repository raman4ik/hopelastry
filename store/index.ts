// eslint-disable-next-line import/named
import { ActionTree, MutationTree } from 'vuex'

export const state = () => ({
  loader: true,
  products: []
})

export type RootState = ReturnType<typeof state>
export type RootStateKeys = keyof RootState

export const mutations: MutationTree<RootState> = {
  CHANGE_LOADER_STATUS: (state, status) => {
    state.loader = status
  },
  ADD_PRODUCTS_TO_STORE: (state, product: any) => {
    // @ts-ignore
    const isMatch = state.products.find(item => item.id == product.id)
    if(!isMatch) {
      // @ts-ignore
      state.products.push(product)
    }
  },

  SAVED_PRODUCTS: (state, products) => {
    if(products) {
      state.products = products.productsCart
    }
  },

  DELETE_PRODUCT: (state, id: string) => {
    // @ts-ignore
    console.log(id)
    // @ts-ignore
    const newArray = state.products.filter(item => item.id !== id)
    state.products = newArray
  },

  DELETE_ALL_PRODUCT: (state) => {
    // @ts-ignore
    state.products = []
  },

  CHANGE_PRODUCTS_PLUS_STACK: (state, payload) => {
    // @ts-ignore
    const productIndex = state.products.findIndex(res => res.id === payload.id)
    // @ts-ignore
    state.products[productIndex].stack++
  },
  CHANGE_PRODUCTS_MINUS_STACK: (state, payload) => {
    // @ts-ignore
    const productIndex = state.products.findIndex(res => res.id === payload.id)
    // @ts-ignore
    if(state.products[productIndex.stack <= 0]) return
    // @ts-ignore
    state.products[productIndex].stack--
  },

  CHANGE_PRODUCTS_STACK: (state) => {
    // @ts-ignore
    state.products.forEach(res => res.stack = 1)
  }
}

export const actions: ActionTree<RootState, RootState> = {
  async changeLoaderStatus({ commit }, status) {
    if (!status) {
      await new Promise((resolve) => setTimeout(resolve, 1000))
    }
    commit('CHANGE_LOADER_STATUS', status)
  },

  addProductToStore({ commit }, product) {
    commit('ADD_PRODUCTS_TO_STORE', product)
  },

  deleteProduct({ commit }, id) {
    commit('DELETE_PRODUCT', id)
  },

  deleteAllProduct({ commit }) {
    commit('DELETE_ALL_PRODUCT')
  },

  savedProducts({ commit }, payload) {
    commit('SAVED_PRODUCTS', payload)
  },
  changeProductPlusStack({commit}, payload) {
    commit('CHANGE_PRODUCTS_PLUS_STACK', payload)
  },
  changeProductMinusStack({commit}, payload) {
    commit('CHANGE_PRODUCTS_MINUS_STACK', payload)
  },
  changeProductStack({commit}) {
    commit('CHANGE_PRODUCTS_STACK')
  }
}
