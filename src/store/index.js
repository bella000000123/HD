import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    pusher: {},
    article: {},
    match: {},
    newMatchItem: {},
    newBaijia: {},
    hiddenList: [],
    saveList: [],
    topList: [],
    allLen: '',
    isLogin: false,
    userInfo: {}
  },
  mutations: {
    choosePusher(state, pusher) {
      state.pusher = pusher;
    },
    chooseArticle(state, article) {
      state.article = article;
    },
    chooseMatch(state, match) {
      state.match = match;
    },
    chooseHiddenList(state, item) {
      state.hiddenList = item;
    },
    chooseSaveList(state, item) {
      state.saveList = item;
    },
    setAllLen(state, item) {
      state.allLen = item;
    },
    setNewMatchItem(state, item) {
      if (item.message) {
        item.message = JSON.parse(item.message);
        state.newMatchItem = item;
      }
    },
    setNewBaijiaItem(state, item) {
      if (item.message) {
        item.message = JSON.parse(item.message);
        state.newBaijia = item.message;
      }
    },
    setTop(state, item) {
      let index = state.topList.findIndex(i => {
        return i.id == item.id;
      });
      if (index == -1) {
        state.topList.unshift(Object.assign(item, { top: true }));
      } else {
        state.topList.splice(index, 1);
      }
    },
    setLogin(state, item) {
      state.isLogin = item;
    },
    setUserinfo(state, item) {
      state.userInfo = item;
    }
  },
  actions: {
    // handleNewMatchItem({ commit }, item) {
    //   if (item && item.message) {
    //     item.message = JSON.parse(item.message)
    //   }
    //   if (item && item.type !== 'init') {
    //     if (item.data_type === 'match') {
    //       commit('setNewMatchItem', item)
    //       console.log(item)
    //     }
    //   }
    // }
  },
  modules: {}
});
