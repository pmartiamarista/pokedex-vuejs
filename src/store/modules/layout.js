const initialState = {
  tabs: [],
  loading: true,
  selectedTab: 0,
  tabDataList: [],
  search: '',
}

export default {
  namespaced: true,
  state: { ...initialState },
  getters: {
    isHeaderTabsLoading: (state) => state.loading,
    hasTabs: (state) => state.tabs.length > 0,
    selectedTabData: (state) => state.tabs[state.selectedTab] || { id: 1 },
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
    setSearch(state, payload) {
      state.search = payload
    },
    cleanTabs(state) {
      Object.assign(state, initialState)
    },
  },
  actions: {
    async fetchTabs(
      { commit },
      { query, apollo, changeResponse = (response) => response },
    ) {
      try {
        commit('setLoading', true)
        const { data } = await apollo.query({
          query,
        })
        commit('setTabs', changeResponse(data))
      } catch (error) {
        console.log(error)
      } finally {
        commit('setLoading', false)
      }
    },
  },
}
