<template>
  <div>
    <Grid v-if="!isHeaderTabsLoading" :gridData="pokemonByType" />
  </div>
</template>

<script>
import Grid from '../components/Grid'
import { POKEMONS_BY_TYPE_QUERY } from '../graphql/queries'
import { createNamespacedHelpers } from 'vuex'
import apolloProvider from '../vue-apollo'
import { fetchStatus } from '../utils/constants'

const { mapMutations, mapActions, mapGetters } = createNamespacedHelpers(
  'layout',
)

const initialState = { status: fetchStatus.idle, list: [], error: null }

export default {
  components: { Grid },
  name: 'Types',
  data: () => ({
    pokemonByType: {
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
  },
  watch: {
    selectedTabData: {
      handler() {
        this.pokemonByType = {
          ...initialState,
          list: this.selectedTabData.pokemons?.nodes
            .map(({ pokemon }) => pokemon)
            .sort((a, b) => a.id - b.id),
          status: fetchStatus.done,
        }
      },
      deep: true,
    },
  },
  created() {
    this.fetchTabs({
      query: POKEMONS_BY_TYPE_QUERY,
      apollo: apolloProvider.clients.pokeapi.query,
      changeResponse: ({ types }) => types,
    })
  },
  destroyed() {
    this.cleanTabs()
  },
}
</script>
