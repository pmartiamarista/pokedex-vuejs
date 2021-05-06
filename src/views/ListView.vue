<template>
  <v-col class="pa-0">
    <div v-if="$apollo.queries.list.loading">
      <v-progress-linear color="primary" indeterminate rounded height="10" />
    </div>
    <div v-else-if="$apollo.queries.list.error">Error</div>
    <v-col v-else class="pa-0">
      <v-container fluid>
        <v-data-iterator
          :items="list"
          :items-per-page.sync="itemsPerPage"
          options.sync=""
        >
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
import { POKEMONS_BY_REGION_QUERY } from "../graphql/queries";
import ListTile from "../components/ListTile";
import GridTile from "../components/GridTile.vue";

export default {
  name: "List",
  components: { GridTile },
  props: {
    gen: { type: Number, default: 1 },
  },
  data: () => ({
    list: [],
    itemsPerPage: 15,
    ListTile,
  }),
  apollo: {
    list: {
      client: "pokeapi",
      query: POKEMONS_BY_REGION_QUERY,
      variables() {
        return { id: parseInt(this.gen) };
      },
      fetchPolicy: "cache-and-network",
      nextFetchPolicy: "cache-only",
      update: (data) => {
        const list = data.pokemon_v2_generation[0].pokemon_species.list.sort(
          (a, b) => a.id - b.id
        );
        return list;
      },
    },
  },
};
</script>
