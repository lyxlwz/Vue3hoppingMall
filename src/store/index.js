import { createStore } from 'vuex'

const store = createStore({
  state() {
    return {
      count: 0,
    }
  },
  getters: {
    totalPrice(state) {
      return state.count * 98.8;
    },
  },
  mutations: {
    increment(state, payload) {
      // payload 是传过来的参数
      state.count += payload;
    },
  },
  actions: {
    asyncAdd(store, payload) {
      // payload 是传过来的参数
      setTimeout(() => {
        // store.commit('increment', 10)
        store.commit('increment', payload)
      }, 1000)
    },
  },
})

// 3.导出store
export default store;