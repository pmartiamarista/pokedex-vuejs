<template>
  <v-col class="pa-0">
    <v-container fluid v-if="gridData.status === fetchStatus.fetching">
      <v-row>
        <v-col v-for="n in 50" :key="n" cols="12" sm="6" md="4" lg="3" xl="2">
          <v-skeleton-loader type="image" />
        </v-col>
      </v-row>
    </v-container>
    <div v-else-if="gridData.error === fetchStatus.error">Error</div>
    <v-container fluid v-else>
      <v-row>
        <GridTile
          v-for="pokemon in getItems"
          :key="pokemon.id"
          :item="pokemon"
        />
      </v-row>
    </v-container>
  </v-col>
</template>

<script>
import GridTile from './GridTile.vue'
import { fetchStatus } from '../utils/constants'

export default {
  name: 'Grid',
  components: { GridTile },
  props: { gridData: { type: Object, default: () => {} } },
  data: () => ({
    itemsPerPage: 15,
    fetchStatus,
  }),
  computed: {
    getItems() {
      return this.gridData.loading ? 3 : this.gridData.list
    },
  },
}
</script>
