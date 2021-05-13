<template>
  <PageWrapper>
    <Grid
      v-if="showGrid"
      :gridData="{ ...pokemonByRegion, list: filteredList }"
    />
  </PageWrapper>
</template>

<script>
import Grid from '../components/Grid'
import { REGIONS_QUERY, POKEMONS_BY_REGION_QUERY } from '../graphql/queries'
import { createNamespacedHelpers } from 'vuex'
import apolloProvider from '../vue-apollo'
import { fetchStatus } from '../utils/constants'
import { filterByKey } from '../utils/utils'
import PageWrapper from '../components/PageWrapper.vue'

const { mapActions, mapGetters, mapState } = createNamespacedHelpers('layout')

const initialState = { status: fetchStatus.idle, list: [], error: null }

export default {
  components: { Grid, PageWrapper },
  name: 'Regions',
  data: () => ({
    pokemonByRegion: {
      status: fetchStatus.idle,
      list: [],
      error: null,
    },
  }),
  computed: {
    ...mapGetters(['selectedTabData']),
    ...mapState(['search', 'isTabBarLoading']),
    filteredList() {
      if (this.search) {
        return filterByKey(this.pokemonByRegion.list, 'name', this.search)
      } else {
        return this.pokemonByRegion.list
      }
    },
    showGrid() {
      return this.isTabBarLoading === fetchStatus.done
    },
  },
  methods: {
    ...mapActions(['fetchTabs', 'resetTabs']),
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
    this.fetchTabs({
      query: REGIONS_QUERY,
      apollo: apolloProvider.defaultClient,
      changeResponse: ({ regions }) =>
        regions.results.map((region, index) => ({ id: index + 1, ...region })),
    })
  },
  destroyed() {
    this.resetTabs()
  },
}
</script>
