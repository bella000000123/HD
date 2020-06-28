import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    pusher: {},
    article: {},
    match: {},
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
  },
  actions: {},
  modules: {},
});
