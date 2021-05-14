import { fetchStatus } from '../../utils/constants'

const initialState = {
  tabs: [],
  isTabBarLoading: fetchStatus.idle,
  selectedTab: 0,
  tabDataList: [],
  search: '',
  badgeCount: 0,
}

export default {
  namespaced: true,
  state: { ...initialState },
  getters: {
    hasTabs: (state) => state.tabs.length > 0,
    selectedTabData: (state) => state.tabs[state.selectedTab] || { id: 1 },
  },
  mutations: {
    FETCH_TABS_INIT(state) {
      Object.assign(state, {
        ...initialState,
        isTabBarLoading: fetchStatus.fetching,
      })
    },
    FETCH_TABS_SUCCESS(state, payload) {
      Object.assign(state, { tabs: payload, isTabBarLoading: fetchStatus.done })
    },
    FETCH_TABS_FAILED(state) {
      Object.assign(state, {
        ...initialState,
        isTabBarLoading: fetchStatus.error,
      })
    },
    SET_SELECTED_TAB(state, payload) {
      state.selectedTab = payload
    },
    SET_LOADING(state, payload) {
      state.loading = payload
    },
    SET_SEARCH(state, payload) {
      state.search = payload
    },
    SET_BADGE_COUNT(state, payload) {
      state.badgeCount = payload
    },
    RESET_TABS(state) {
      Object.assign(state, { ...initialState })
    },
  },
  actions: {
    async fetchTabs(
      { commit },
      { query, apollo, changeResponse = (response) => response },
    ) {
      commit('FETCH_TABS_INIT')
      try {
        const { data } = await apollo.query({
          query,
        })
        commit('FETCH_TABS_SUCCESS', changeResponse(data))
      } catch (error) {
        commit('FETCH_TABS_FAILED', fetchStatus.error)
      }
    },
    async setTabs({ commit }, payload) {
      commit('FETCH_TABS_SUCCESS', payload)
    },
    setSearch({ commit }, payload) {
      commit('SET_SEARCH', payload)
    },
    setSelectedTab({ commit }, payload) {
      commit('SET_SELECTED_TAB', payload)
    },
    setBadgeCount({ commit }, payload) {
      commit('SET_BADGE_COUNT', payload)
    },
    resetTabs({ commit }, payload) {
      commit('RESET_TABS', payload)
    },
  },
}
