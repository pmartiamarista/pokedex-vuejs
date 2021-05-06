<template>
  <div>
    <div v-if="$apollo.queries.regions.loading">
      <v-progress-linear color="primary" indeterminate rounded height="10" />
    </div>
    <div v-else-if="$apollo.queries.regions.error">Error</div>
    <div v-else>
      <v-col class="pa-0">
        <v-col class="pa-0">
          <v-card>
            <v-tabs
              v-model="selectedGen"
              background-color="primary"
              center-active
              dark
              fixed-tabs
              next-icon="mdi-arrow-right-bold-circle-outline"
              prev-icon="mdi-arrow-left-bold-circle-outline"
              show-arrows
            >
              <v-tab v-for="{ name } in regions" :key="name" v-text="name" />
            </v-tabs>
          </v-card>
        </v-col>
        <v-col class="px-1">
          <v-card flat rounded elevation="2">
            <ListView :gen="selectedGen + 1" />
          </v-card>
        </v-col>
      </v-col>
    </div>
  </div>
</template>

<script>
import ListView from "./ListView.vue";
import { REGIONS_QUERY } from "../graphql/queries";

export default {
  components: { ListView },
  name: "Home",
  data: () => ({
    regions: null,
    selectedGen: 0,
  }),
  apollo: {
    regions: {
      query: REGIONS_QUERY,
      fetchPolicy: "cache-and-network",
      nextFetchPolicy: "cache-only",
      update: ({ regions }) =>
        regions.results.map((region, index) => ({ id: index + 1, ...region })),
    },
  },
};
</script>
