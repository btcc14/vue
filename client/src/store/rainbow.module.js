import RainbowService from '../services/rainbow.service';

const initialState = {
  rainbows: [],
};

export const rainbow = {
  namespaced: true,
  state: initialState,
  actions: {
    rainbow({ commit }) {
      return RainbowService.getRainbows().then(
        response => {
          commit('rainbowSuccess', response);
          return Promise.resolve(response);
        },
        error => {
          commit('rainbowFailure');
          return Promise.reject(error);
        }
      );
    },
  },
  mutations: {
    rainbowSuccess(state, data) {
      state.rainbows = data;
    },
    rainbowFailure(state) {
      state.rainbows = [];
    },
  }
};
