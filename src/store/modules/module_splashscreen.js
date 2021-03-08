export default {
  state: {
    splashscreen_visible: true,
  },
  mutations: {
    mutSetStatusSplashScreenVisible(state, paramsStatus) {
      state.splashscreen_visible = paramsStatus;
    },
  },
  actions: {
    actSetStatusSplashScreenVisible(context, paramsStatus) {
      context.commit("mutSetStatusSplashScreenVisible", paramsStatus);
    },
  },
  getters: {
    gettStatusSplashScreenVisible(state) {
      return state.splashscreen_visible;
    },
  },
};
