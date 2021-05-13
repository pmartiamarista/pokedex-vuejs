<template>
  <div>
    <Grid
      v-if="!isHeaderTabsLoading"
      :gridData="{ ...pokemonByType, list: filteredList }"
    />
  </div>
</template>

<script>
import Grid from '../components/Grid'
import { POKEMONS_BY_TYPE_QUERY } from '../graphql/queries'
import { createNamespacedHelpers } from 'vuex'
import apolloProvider from '../vue-apollo'
import { fetchStatus } from '../utils/constants'
import { filterByKey } from '../utils/utils'

const {
  mapState,
  mapMutations,
  mapActions,
  mapGetters,
} = createNamespacedHelpers('layout')

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
    ...mapState(['search']),
    filteredList() {
      if (this.search) {
        return filterByKey(this.pokemonByType.list, 'name', this.search)
      } else {
        return this.pokemonByType.list
      }
    },
  },
  methods: {
    ...mapMutations(['setTabs', 'cleanTabs']),
    ...mapActions(['fetchTabs']),
    fakeRequest(list) {
      return new Promise((resolve) => setTimeout(() => resolve(list), 0))
    },
  },
  watch: {
    selectedTabData: {
      handler() {
        const list = this.selectedTabData.pokemons?.nodes
          .map(({ pokemon }) => pokemon)
          .sort((a, b) => a.id - b.id)
        this.pokemonByType = {
          ...initialState,
          status: fetchStatus.fetching,
        }
        this.fakeRequest(list).then(
          (list) =>
            (this.pokemonByType = {
              ...initialState,
              list,
              status: fetchStatus.done,
            }),
        )
      },
      deep: true,
      immediate: true,
    },
  },
  created() {
    this.fetchTabs({
      query: POKEMONS_BY_TYPE_QUERY,
      apollo: apolloProvider.clients.pokeapi,
      changeResponse: ({ types }) => types,
    })
  },
  destroyed() {
    this.cleanTabs()
  },
}
</script>
