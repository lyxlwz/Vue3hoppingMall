import { createStore } from 'vuex'

const store = createStore({
  state() {
    return {
      count: 0,
      isFullScreen: false,
      buyCarts: [],
    }
  },
  getters: {
    totalPrice(state) {
      return state.buyCarts.reduce((pre, now, list) => {
        return pre + now.price * now.num;
      }, 0)
    },
  },
  mutations: {
    increment(state, payload) {
      // payload 是传过来的参数
      state.count += payload;
    },
    setFullScreen(state, payload) {
      state.isFullScreen = payload
    },
    addBuyCarts(state, payload) {
      state.buyCarts.push(payload);
    },
    addBuyCartsNum(state, payload) {
      state.buyCarts[payload].num++;
    },
    minusBuyCartsNum(state, payload) {
      state.buyCarts[payload].num--;
      if (state.buyCarts[payload].num == 0) {
        state.buyCarts.splice(payload, 1);
      }
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