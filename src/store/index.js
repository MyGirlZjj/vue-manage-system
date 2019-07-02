import Vue from 'vue'
import Vuex from 'vuex'
import ypxxStore from './modules/ypxxStore'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        ypxxStore
    },
    // getters
})

export default store