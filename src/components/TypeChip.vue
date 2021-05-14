<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on, attrs }">
      <v-chip
        v-bind="attrs"
        v-on="on"
        :color="typeColor"
        small
        dense
        v-text="type"
        style="text-transform: capitalize; font-weight: 500; opacity: 0.75;"
      />
    </template>
    <span v-text="type" style="text-transform: capitalize;" />
  </v-tooltip>
</template>
<script>
import { pokemonTypeColor } from '../utils/constants'
export default {
  name: 'TypeChip',
  props: {
    type: String,
    default: () => ` `,
  },
  computed: {
    typeColor() {
      return pokemonTypeColor[this.type]?.color || 'grey lighten-4'
    },
  },
}
</script>
