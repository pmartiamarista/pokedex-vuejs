<template>
  <PageWrapper>
    <Grid
      v-show="showGrid"
      :gridData="{ ...pokemonByRegion, list: filteredList }"
      :tile="GridTile"
    />
  </PageWrapper>
</template>

<script>
import Grid from '../components/Grid'
import GridTile from '../components/GridTile'
import { REGIONS_QUERY, POKEMONS_BY_REGION_QUERY } from '../graphql/queries'
import { createNamespacedHelpers } from 'vuex'
import apolloProvider from '../vue-apollo'
import { fetchStatus, initialState } from '../utils/constants'
import { filterByKey } from '../utils/utils'
import PageWrapper from '../components/PageWrapper.vue'

const { mapActions, mapGetters, mapState } = createNamespacedHelpers('layout')

export default {
  components: { Grid, PageWrapper },
  name: 'Regions',
  data: () => ({
    pokemonByRegion: {
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
          filterByKey(this.pokemonByRegion.list, 'name', this.search) || []
        this.setBadgeCount(filtered.length)
        return filtered
      } else {
        const list = this.pokemonByRegion.list || []
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
    tabsFetch() {
      this.fetchTabs({
        query: REGIONS_QUERY,
        apollo: apolloProvider.clients.pokeapi,
        changeResponse: ({ regions }) => regions,
      })
    },
    async fetchPokemonsByRegion(id) {
      this.pokemonByRegion = {
        ...initialState,
        status: fetchStatus.fetching,
      }
      try {
        const { data } = await apolloProvider.clients.pokeapi.query({
          query: POKEMONS_BY_REGION_QUERY,
          variables: { id },
        })
        this.pokemonByRegion = {
          ...initialState,
          list: data.pokemon_v2_generation[0].pokemon_species.list.sort(
            (a, b) => a.id - b.id,
          ),
          status: fetchStatus.done,
        }
      } catch (error) {
        this.pokemonByRegion = {
          ...initialState,
          status: fetchStatus.error,
        }
      }
    },
  },
  watch: {
    selectedTabData: {
      handler({ id }) {
        this.fetchPokemonsByRegion(id)
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
