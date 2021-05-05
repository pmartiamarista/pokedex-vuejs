<template>
  <v-col>
    <div v-if="$apollo.queries.list.loading">
      <v-progress-linear color="primary" indeterminate rounded height="10" />
    </div>
    <div v-else-if="$apollo.queries.list.error">Error</div>
    <div v-else>
    </div>
  </v-col>
</template>

<script>
import { POKEMON_PER_GEN_QUERY } from "../graphql/queries";
import ListTile from "../components/ListTile";

export default {
  name: "List",
  components: {
  },
  props: {
    gen: { type: Number, default: 1 },
  },
  data: () => ({
    list: [],
    ListTile,
  }),
  apollo: {
    list: {
      query: POKEMON_PER_GEN_QUERY,
      variables() {
        return { id: parseInt(this.gen) };
      },
      fetchPolicy: "cache-and-network",
      update: (data) => {
        const list = data.pokemon_v2_generation[0].pokemon_species.list
          .sort((a, b) => a.id - b.id)
          .map((pokemon) => ({
            ...pokemon,
            renderComponent: ListTile,
            width: 300,
            height: 300,
          }));
        return list;
      },
    },
  },
  methods: {
    getGridGap() {
      return 10;
    },
    getColumnCount(elementWidth, gridGap) {
      console.log(gridGap);
      return Math.floor((elementWidth + 10) / (300 + 10));
    },
    getWindowMargin(windowHeight) {
      return Math.round(windowHeight * 1.5);
    },
    getItemRatioHeight(height, width, columnWidth) {
      console.log({ height, width, columnWidth });
      return 1;
    },
  },
};
</script>
