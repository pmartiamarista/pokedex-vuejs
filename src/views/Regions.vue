<template>
  <div>
    <Grid v-if="!isHeaderTabsLoading" :gridData="pokemonByRegion" />
  </div>
</template>

<script>
import Grid from '../components/Grid'
import { REGIONS_QUERY, POKEMONS_BY_REGION_QUERY } from '../graphql/queries'
import { createNamespacedHelpers } from 'vuex'
import apolloProvider from '../vue-apollo'
import { fetchStatus } from '../utils/constants'

const { mapMutations, mapActions, mapGetters } = createNamespacedHelpers(
  'layout',
)

const initialState = { status: fetchStatus.idle, list: [], error: null }

export default {
  components: { Grid },
  name: 'Regions',
  data: () => ({
    pokemonByRegion: {
      status: fetchStatus.idle,
      list: [],
      error: null,
    },
  }),
  computed: {
    ...mapGetters(['selectedTabData', 'isHeaderTabsLoading']),
  },
  methods: {
    ...mapMutations(['setTabs', 'cleanTabs']),
    ...mapActions(['fetchTabs']),
    async fetchPokemonsByRegion(id) {
      try {
        this.pokemonByRegion = {
          ...initialState,
          status: fetchStatus.fetching,
        }
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
    },
  },
  created() {
    this.fetchTabs({
      query: REGIONS_QUERY,
      apollo: apolloProvider.defaultClient.query,
      changeResponse: ({ regions }) =>
        regions.results.map((region, index) => ({ id: index + 1, ...region })),
    })
  },
  destroyed() {
    this.cleanTabs()
  },
}
</script>
