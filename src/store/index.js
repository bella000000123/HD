import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    pusher: {},
    article: {},
    match: {},
    bjList: [],
    matchList: []
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
    setBjList(state, list) {
      state.bjList = list
    },
    setMatchList(state, list) {
      state.matchList = list
    }
  },
  actions: {
    handleScoreList({ commit, state }, item) {
      const oldBjList = [...state.bjList]
      const oldMatchList = [...state.matchList]

      if (item && item.type !== 'init') {
        let isIn = false
        if (item && item.data_type === 'baijia') {
          oldBjList.forEach((oldListItem, index, arr) => {
            if (Number(oldListItem.match_id) === Number(item.match_id)) {
              isIn = true
              arr.splice(index, 1, item)
            }
          })
          commit('setBjList', [...oldBjList])
        } else if (item && item.data_type === 'match') {
          oldMatchList.map((oldListItem, index, arr) => {
            if (Number(oldListItem.match_id) === Number(item.match_id)) {
              isIn = true
              arr.splice(index, 1, item)
            }
          })
          commit('setBjList', [...oldMatchList])
        }

        if (!isIn) {
          if (item && item.data_type === 'baijia') {
            const newList = [...oldBjList, item]
            commit('setBjList', newList)
          } else if (item && item.data_type === 'match') {
            const newList = [...oldMatchList, item]
            commit('setMatchList', newList)
          }
        }
      }
    }
  },
  modules: {}
})
