<template>
  <div>
    <div v-if="$apollo.queries.generations.loading">
      <v-progress-linear color="primary" indeterminate rounded height="10" />
    </div>
    <div v-else-if="$apollo.queries.error">Error</div>
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
              <v-tab
                v-for="gen in generations"
                :key="gen.id"
                v-text="`Generation ${gen.id}`"
              />
            </v-tabs>
          </v-card>
        </v-col>
        <v-col class="px-1">
          <v-card flat rounded elevation="2">
            <List :gen="selectedGen + 1" :key="`gen-list-${selectedGen + 1}`" />
          </v-card>
        </v-col>
      </v-col>
    </div>
  </div>
</template>

<script>
import List from "../components/List.vue";
import { GENERATIONS_QUERY } from "../graphql/queries";

export default {
  components: { List },
  name: "Home",
  data: () => ({
    generations: null,
    selectedGen: 0,
  }),
  apollo: {
    generations: { query: GENERATIONS_QUERY, fetchPolicy: "cache-and-network" },
  },
};
</script>
