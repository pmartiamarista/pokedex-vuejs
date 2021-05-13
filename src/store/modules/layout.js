import { fetchStatus } from '../../utils/constants'

const initialState = {
  tabs: [],
  isTabBarLoading: fetchStatus.idle,
  selectedTab: 0,
  tabDataList: [],
  search: '',
}

export default {
  namespaced: true,
  state: { ...initialState },
  getters: {
    hasTabs: (state) => state.tabs.length > 0,
    selectedTabData: (state) => state.tabs[state.selectedTab] || { id: 1 },
  },
  mutations: {
    SET_TABS(state, payload) {
      state.tabs = payload
    },
    SET_SELECTED_TAB(state, payload) {
      state.selectedTab = payload
    },
    SET_LOADING(state, payload) {
      state.isTabBarLoading = payload
    },
    SET_SEARCH(state, payload) {
      state.search = payload
    },
    RESET_TABS(state) {
      Object.assign(state, initialState)
    },
  },
  actions: {
    async fetchTabs(
      { commit },
      { query, apollo, changeResponse = (response) => response },
    ) {
      commit('SET_LOADING', fetchStatus.fetching)
      try {
        const { data } = await apollo.query({
          query,
        })
        commit('SET_TABS', changeResponse(data))
        commit('SET_LOADING', fetchStatus.done)
      } catch (error) {
        commit('SET_LOADING', fetchStatus.error)
      }
    },
    setSearch({ commit }, payload) {
      commit('SET_SEARCH', payload)
    },
    setSelectedTab({ commit }, payload) {
      commit('SET_SELECTED_TAB', payload)
    },
    resetTabs({ commit }, payload) {
      commit('RESET_TABS', payload)
    },
  },
}
