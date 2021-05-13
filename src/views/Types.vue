<template>
  <PageWrapper>
    <Grid
      v-if="showGrid"
      :gridData="{ ...pokemonByType, list: filteredList }"
    />
  </PageWrapper>
</template>

<script>
import Grid from '../components/Grid'
import { POKEMONS_BY_TYPE_QUERY } from '../graphql/queries'
import { createNamespacedHelpers } from 'vuex'
import apolloProvider from '../vue-apollo'
import { fetchStatus } from '../utils/constants'
import { filterByKey } from '../utils/utils'
import PageWrapper from '../components/PageWrapper.vue'

const { mapState, mapActions, mapGetters } = createNamespacedHelpers('layout')

const initialState = { status: fetchStatus.idle, list: [], error: null }

export default {
  components: { Grid, PageWrapper },
  name: 'Types',
  data: () => ({
    pokemonByType: {
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
        return filterByKey(this.pokemonByType.list, 'name', this.search)
      } else {
        return this.pokemonByType.list
      }
    },
    showGrid() {
      return this.isTabBarLoading === fetchStatus.done
    },
  },
  methods: {
    ...mapActions(['fetchTabs', 'resetTabs']),
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
    this.resetTabs()
  },
}
</script>
