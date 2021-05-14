<template>
  <PageWrapper>
    <Grid
      v-show="showGrid"
      :gridData="{ ...pokemonByType, list: filteredList }"
      :tile="GridTile"
    />
  </PageWrapper>
</template>

<script>
import Grid from '../components/Grid'
import GridTile from '../components/GridTile'
import { POKEMONS_BY_TYPE_QUERY } from '../graphql/queries'
import { createNamespacedHelpers } from 'vuex'
import apolloProvider from '../vue-apollo'
import { fetchStatus, initialState } from '../utils/constants'
import { filterByKey } from '../utils/utils'
import PageWrapper from '../components/PageWrapper.vue'

const { mapState, mapActions, mapGetters } = createNamespacedHelpers('layout')

export default {
  components: { Grid, PageWrapper },
  name: 'Types',
  data: () => ({
    pokemonByType: {
      status: fetchStatus.idle,
      list: [],
      error: null,
    },
    GridTile,
  }),
  computed: {
    ...mapGetters(['selectedTabData']),
    ...mapState(['search', 'isTabBarLoading']),
    filteredList() {
      if (this.search) {
        const filtered =
          filterByKey(this.pokemonByType.list, 'name', this.search) || []
        this.setBadgeCount(filtered.length)
        return filtered
      } else {
        const list = this.pokemonByType.list || []
        this.setBadgeCount(list.length)
        return list
      }
    },
    showGrid() {
      return this.isTabBarLoading === fetchStatus.done
    },
  },
  methods: {
    ...mapActions(['fetchTabs', 'resetTabs', 'setBadgeCount']),
    changeApiResponse(response) {
      return response?.nodes
        .map(({ pokemon }) => pokemon)
        .sort((a, b) => a.id - b.id)
    },
    tabsFetch() {
      this.fetchTabs({
        query: POKEMONS_BY_TYPE_QUERY,
        apollo: apolloProvider.clients.pokeapi,
        changeResponse: ({ types }) => types,
      })
    },
    async fakeRequest(pokemonList) {
      const promise = new Promise((resolve) =>
        setTimeout(() => resolve(pokemonList), 25),
      )
      this.pokemonByType = {
        ...initialState,
        status: fetchStatus.fetching,
      }
      try {
        const response = await promise
        this.pokemonByType = {
          ...initialState,
          list: this.changeApiResponse(response),
          status: fetchStatus.done,
        }
      } catch (error) {
        this.pokemonByType = {
          ...initialState,
          status: fetchStatus.error,
        }
      }
    },
  },
  watch: {
    selectedTabData: {
      handler({ pokemons }) {
        this.fakeRequest(pokemons)
      },
      deep: true,
      immediate: true,
    },
  },
  created() {
    this.tabsFetch()
  },
  beforeDestroy() {
    this.resetTabs()
  },
}
</script>
