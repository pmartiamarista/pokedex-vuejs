<template>
  <v-col cols="12" sm="6" md="4" lg="3" xl="2" class="ma-0">
    <v-card v-if="$apollo.queries.pokemon.loading">
      <v-col class="pa-0">
        <v-list-item three-line>
          <v-list-item-content>
            <div class="overline mb-0">#{{ item.id }}</div>
            <v-list-item-title
              class="headline mb-1 pokemon-name"
              v-text="item.name"
            />
          </v-list-item-content>
        </v-list-item>
        <v-card-actions>
          <v-btn text color="secondary" @click="() => null">More</v-btn>
        </v-card-actions>
      </v-col>
    </v-card>

    <div v-else-if="$apollo.queries.pokemon.error">Error</div>

    <v-card v-else>
      <v-list-item three-line>
        <v-list-item-content>
          <div class="overline mb-0">#{{ item.id }}</div>
          <v-list-item-title
            class="headline mb-1 pokemon-name"
            v-text="item.name"
          />
          <!-- <v-list-item-subtitle
            >Greyhound divisely hello coldly fonwderfully</v-list-item-subtitle
          > -->
        </v-list-item-content>
        <v-img
          :src="
            (pokemon.sprites && pokemon.sprites.front_default) ||
            require('../assets/Unown.png')
          "
          :lazy-src="
            (pokemon.sprites && pokemon.sprites.front_default) ||
            require('../assets/Unown.png')
          "
          max-width="80"
          max-height="80"
        >
          <template v-slot:placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular indeterminate color="primary" />
            </v-row>
          </template>
        </v-img>
      </v-list-item>
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
  </v-col>
</template>

<script>
import { POKEMON_BY_NAME } from '../graphql/queries'
import { getTypes, getStats } from '../utils/utils'

export default {
  name: 'GridTile',
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

<style>
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
