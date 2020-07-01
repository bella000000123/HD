import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    pusher: {},
    article: {},
    match: {},
    newMatchItem: {}
  },
  mutations: {
    choosePusher(state, pusher) {
      state.pusher = pusher
    },
    chooseArticle(state, article) {
      state.article = article
    },
    chooseMatch(state, match) {
      state.match = match
    },
    setNewMatchItem(state, item) {
      state.newMatchItem = item
    }
  },
  actions: {
    handleNewMatchItem({ commit }, item) {
      if (item && item.message) {
        item.message = JSON.parse(item.message)
      }
      if (item && item.type !== 'init') {
        if (item.data_type === 'match') {
          commit('setNewMatchItem', item)
        }
      }
    }
  },
  modules: {}
})
