<template>
  <v-card
    v-if="$apollo.queries.pokemon.loading"
    class="mx-auto"
    max-width="360"
  >
    <v-list-item three-line>
      <v-list-item-content>
        <div class="overline mb-0">#{{ item.id }}</div>
        <v-list-item-title class="headline mb-1 pokemon-name">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <span v-bind="attrs" v-on="on" v-text="item.name" />
            </template>
            <span v-text="item.name" class="pokemon-name" />
          </v-tooltip>
        </v-list-item-title>
      </v-list-item-content>

      <v-list-item-avatar size="75" color="grey lighten-5" rounded />
    </v-list-item>
    <v-card-text class="py-0">
      <v-row class="ma-0 text-center">
        <v-col class="pa-0">
          <TypeChip />
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-btn text color="secondary" @click="reveal = true">More</v-btn>
    </v-card-actions>
  </v-card>

  <div v-else-if="$apollo.queries.pokemon.error">Error</div>

  <v-card v-else class="mx-auto" max-width="360">
    <v-list-item three-line>
      <v-list-item-content>
        <div class="overline mb-0">#{{ item.id }}</div>
        <v-list-item-title class="headline mb-1 pokemon-name">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <span v-bind="attrs" v-on="on" v-text="item.name" />
            </template>
            <span v-text="item.name" class="pokemon-name" />
          </v-tooltip>
        </v-list-item-title>
      </v-list-item-content>

      <v-list-item-avatar size="75" color="grey lighten-4" rounded>
        <v-img
          contain
          :src="
            (pokemon.sprites && pokemon.sprites.front_default) ||
            require('../assets/Unown.png')
          "
          :lazy-src="
            (pokemon.sprites && pokemon.sprites.front_default) ||
            require('../assets/Unown.png')
          "
          max-width="75"
          max-height="75"
        >
          <template v-slot:placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular indeterminate color="primary" />
            </v-row>
          </template>
        </v-img>
      </v-list-item-avatar>
    </v-list-item>
    <v-card-text class="py-0">
      <v-row class="ma-0 text-center">
        <v-col v-for="{ name } in pokemon.types" :key="name" class="pa-0">
          <TypeChip :type="name" />
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-btn text color="secondary" @click="reveal = true">More</v-btn>
    </v-card-actions>
    <v-expand-transition>
      <v-card
        v-if="reveal"
        class="transition-fast-in-fast-out v-card--reveal"
        style="height: 100%;"
      >
        <v-card-text class="pb-0"></v-card-text>
        <v-card-actions class="pt-0">
          <v-btn text color="secondary" @click="reveal = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-expand-transition>
  </v-card>
</template>

<script>
import { POKEMON_BY_NAME } from '../graphql/queries'
import { getTypes, getStats } from '../utils/utils'
import TypeChip from './TypeChip.vue'

export default {
  name: 'GridTile',
  components: { TypeChip },
  props: {
    item: { type: Object, default: () => {} },
  },
  data: () => ({
    reveal: false,
    pokemon: '',
  }),
  apollo: {
    pokemon: {
      query: POKEMON_BY_NAME,
      variables() {
        return { name: String(this.item.name).trim() }
      },
      fetchPolicy: 'cache-and-network',
      nextFetchPolicy: 'cache-only',
      update: ({ pokemon }) => ({
        ...pokemon,
        stats: getStats(pokemon.stats),
        types: getTypes(pokemon.types),
      }),
    },
  },
}
</script>

<style scoped>
.v-card--reveal {
  bottom: 0;
  opacity: 1 !important;
  position: absolute;
  width: 100%;
}
.pokemon-name {
  text-transform: capitalize;
}
</style>
