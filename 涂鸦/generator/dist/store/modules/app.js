import Cookies from 'js-cookie'
const store = {
  state: {
    list: []
  },
  mutations: {
    UPDATE_LIST: (state, list) => {
      state.list = list
    }
  },
  actions: {
    setList({ commit }, list) {
      commit('UPDATE_LIST', list)
    }
  }
}
export default store
