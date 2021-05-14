<template>
  <v-container fluid>
    <v-row v-if="showLoading">
      <v-col v-for="n in 50" :key="n" cols="12" sm="6" md="4" lg="3" xl="2">
        <v-skeleton-loader type="image" max-height="300" />
      </v-col>
    </v-row>

    <div v-else-if="showError">Error</div>

    <v-row v-else>
      <v-col
        cols="12"
        sm="4"
        md="3"
        lg="3"
        xl="2"
        class="ma-0"
        v-for="item in getItems"
        :key="item.id"
      >
        <component :is="tile" :item="item" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { fetchStatus } from '../utils/constants'

export default {
  name: 'Grid',
  props: ['gridData', 'tile'],
  data: () => ({
    itemsPerPage: 15,
  }),
  computed: {
    getItems() {
      return this.gridData.loading ? 3 : this.gridData.list
    },
    showLoading() {
      return this.gridData.status === fetchStatus.fetching
    },
    showError() {
      return this.gridData.error === fetchStatus.error
    },
  },
}
</script>
