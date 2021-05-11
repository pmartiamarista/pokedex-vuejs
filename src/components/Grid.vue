<template>
  <v-col class="pa-0">
    <div v-if="gridData.error">Error</div>
    <v-col v-else class="pa-0">
      <v-container fluid>
        <v-data-iterator
          :loading="gridData.status === fetchStatus.fetching"
          :items="gridData.list"
          :items-per-page.sync="itemsPerPage"
          options.sync=""
        >
          <template v-slot:loading>
            <v-progress-linear
              color="primary"
              indeterminate
              rounded
              height="10"
            />
          </template>
          <template v-slot:default="props">
            <v-row>
              <v-col
                v-for="{ name } in props.items"
                :key="name"
                cols="12"
                sm="6"
                md="4"
                lg="3"
              >
                <GridTile :name="name" />
              </v-col>
            </v-row>
          </template>
        </v-data-iterator>
      </v-container>
    </v-col>
  </v-col>
</template>

<script>
import GridTile from './GridTile.vue'
import { fetchStatus } from '../utils/constants'

export default {
  name: 'Grid',
  components: { GridTile },
  props: ['gridData'],
  data: () => ({
    itemsPerPage: 15,
    fetchStatus,
  }),
}
</script>
