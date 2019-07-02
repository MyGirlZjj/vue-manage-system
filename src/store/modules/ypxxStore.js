// initial state
// shape: [{ id, quantity }]
const state = {
    items: [],
    checkoutStatus: null
  }
  
  // getters
const getters = {
    cartYpxx: (state, getters, rootState) => {
      return state.items.map(({ id, bianma, pinming, guige, pihao, youxiaoqi, danwei, danjia, shengchanchangjia, pizhunwenhao }) => {
        const ypxx = rootState.ypxx.all.find(product => product.id === id)
        return {
            id: ypxx.id,
            bianma: ypxx.bianma,
            pinming: ypxx.pinming,
            guige: ypxx.guige,
            pihao: ypxx.pihao,
            youxiaoqi: ypxx.youxiaoqi,
            danwei: ypxx.danwei,
            danjia: ypxx.danjia,
            shengchanchangjia: ypxx.shengchanchangjia,
            pizhunwenhao: ypxx.pizhunwenhao,
            quantity
        }
      })
    },
  
    cartTotalPrice: (state, getters) => {
      return getters.cartYpxx.reduce((total, product) => {
        return total + ypxx.danjia * ypxx.quantity
      }, 0)
    }
}
  
  // actions
const actions = {
    checkout ({ commit, state }, products) {
        const savedCartItems = [...state.items]
        commit('setCheckoutStatus', null)
         // empty cart
        commit('setCartItems', { items: [] })
         //调用后台接口，清空购物车
        shop.buyProducts(
            products,
            () => commit('setCheckoutStatus', 'successful'),
            () => {
                commit('setCheckoutStatus', 'failed')
                // rollback to the cart saved before sending the request
                commit('setCartItems', { items: savedCartItems })
            }
        )
    },
  
    addProductToCart ({ state, commit }, ypxx) {
      commit('setCheckoutStatus', null)
    //   if (product.inventory > 0) {
        const cartItem = state.items.find(item => item.id === ypxx.id)
        if (!cartItem) {
          commit('pushYpxxToCart', { id: product.id })
        } else {
          commit('incrementItemQuantity', cartItem)
        }
        // remove 1 item from stock
        commit('products/decrementProductInventory', { id: product.id }, { root: true })
    //   }
    }
}
  
  // mutations
const mutations = {
    pushYpxxToCart (state, { id }) {
      state.items.push({
        id,
        quantity: 1
      })
    },
  
    incrementItemQuantity (state, { id }) {
      const cartItem = state.items.find(item => item.id === id)
      cartItem.quantity++
    },
  
    setCartItems (state, { items }) {
      state.items = items
    },
  
    setCheckoutStatus (state, status) {
      state.checkoutStatus = status
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}