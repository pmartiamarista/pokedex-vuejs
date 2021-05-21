<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on, attrs }">
      <v-chip
        v-bind="attrs"
        v-on="on"
        :color="typeColor"
        :small="!isMobile"
        pill
        dense
        v-text="type"
        style="text-transform: capitalize; font-weight: 500; opacity: 0.8;"
      />
    </template>
    <span v-text="type" style="text-transform: capitalize;" />
  </v-tooltip>
</template>
<script>
import { pokemonTypeColor } from "../utils/constants";
export default {
  name: "TypeChip",
  props: {
    type: {
      type: String,
      default: () => ` `,
    },
  },
  computed: {
    isMobile() {
      return this.$vuetify.breakpoint.xs;
    },
    typeColor() {
      return pokemonTypeColor[this.type]?.color || "grey lighten-4";
    },
  },
};
</script>
