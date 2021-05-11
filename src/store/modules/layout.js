import apolloProvider from '../../vue-apollo'

const initialState = {
  tabs: [],
  loading: true,
  selectedTab: 0,
}

export default {
  namespaced: true,
  state: {
    ...initialState,
  },
  getters: {
    isHeaderTabsLoading: (state) => state.loading,
    hasTabs: (state) => state.tabs.length > 0,
    selectedTabData: (state) => state.tabs[state.selectedTab],
  },
  mutations: {
    setTabs(state, payload) {
      state.tabs = payload
    },
    setSelectedTab(state, payload) {
      state.selectedTab = payload
    },
    setLoading(state, payload) {
      state.loading = payload
    },
    cleanTabs(state) {
      Object.assign(state, initialState)
    },
  },
  actions: {
    async fetchTabs(
      { commit },
      { query, changeResponse = (response) => response },
    ) {
      try {
        commit('setLoading', true)
        const { data } = await apolloProvider.defaultClient.query({
          query,
        })
        commit('setTabs', changeResponse(data));
      } catch (error) {
        console.log(error)
      } finally {
        commit('setLoading', false)
      }
    },
  },
}
