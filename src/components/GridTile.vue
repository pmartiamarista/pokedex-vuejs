<template>
  <div @focus="(event) => console.log(event, item.id)">
    <v-skeleton-loader
      class="mx-auto"
      max-width="300"
      type="card"
      v-if="$apollo.queries.pokemon.loading"
    />

    <div v-else-if="$apollo.queries.pokemon.error">Error</div>

    <v-card class="mx-auto" max-width="360" v-else>
      <v-col
        :class="`grey ${
          $vuetify.theme.dark ? 'darken-2' : 'lighten-4'
        } pa-0 ma-0`"
        style="border-radius: 4px 4px 0 0;"
      >
        <v-img
          contain
          :aspect-ratio="4 / 3"
          :src="showImage"
          :lazy-src="showImage"
        >
          <v-expand-transition>
            <v-col
              v-if="details"
              :class="`grey ${
                $vuetify.theme.dark ? 'darken-2' : 'lighten-4'
              } d-flex transition-fast-in-fast-out v-card--reveal`"
              style="height: 100%; border-radius: 4px 4px 0 0;"
            >
              <v-col>
                <v-row>
                  <span style="font-weight: 500;">
                    Height:
                  </span>
                  <span style="font-weight: 400;">
                    {{ pokemon.height }}
                  </span>
                </v-row>
                <v-row>
                  <span style="font-weight: 500;">
                    Weight:
                  </span>
                  <span style="font-weight: 400;">
                    {{ pokemon.weight }}
                  </span>
                </v-row>
                <v-row v-for="{ name, base_stat } in pokemon.stats" :key="name">
                  <span style="font-weight: 500; text-transform: capitalize;">
                    {{ name }}:
                  </span>
                  <span style="font-weight: 400;">
                    {{ base_stat }}
                  </span>
                </v-row>
              </v-col>
            </v-col>
          </v-expand-transition>
        </v-img>
      </v-col>
      <v-card-text class="pt-1" style="position: relative;">
        <div style="position: absolute; top: -16px; right: 16px;">
          <FabButtons :buttons="tileOptions" />
        </div>
        <h4 class="font-weight-bold subtitle mb-0">#{{ pokemon.id }}</h4>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <h1
              v-bind="attrs"
              v-on="on"
              class="font-weight-dark title mb-0 pokemon-name"
              v-text="pokemon.name"
            />
          </template>
          <span v-text="item.name" class="pokemon-name" />
        </v-tooltip>
        <v-row class="ma-1 text-center">
          <v-col v-for="{ name } in pokemon.types" :key="name" class="pa-0">
            <TypeChip :type="name" />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { POKEMON_BY_NAME } from '../graphql/queries'
import { getTypes, getStats } from '../utils/utils'
import TypeChip from './TypeChip.vue'
import FabButtons from './FabButtons'

export default {
  name: 'GridTile',
  components: { TypeChip, FabButtons },
  props: {
    item: { type: Object, default: () => {} },
  },
  data: () => ({
    reveal: false,
    pokemon: '',
    image: {
      shiny: false,
      front: true,
    },
    details: false,
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

  computed: {
    showShiny() {
      return this.image.shiny ? 'shiny' : 'default'
    },
    showSide() {
      return this.image.front ? 'front' : 'back'
    },
    showImage() {
      return (
        (this.pokemon.sprites &&
          this.pokemon.sprites[`${this.showSide}_${this.showShiny}`]) ||
        require('../assets/Unown.png')
      )
    },
    imageOptions() {
      return [
        {
          action: () => (this.image.shiny = !this.image.shiny),
          color: 'purple',
          icon: this.image.shiny
            ? 'mdi-star-four-points'
            : 'mdi-star-four-points-outline',
          tooltip: {
            active: true,
            text: 'Shiny',
          },
        },
        {
          action: () => (this.image.front = !this.image.front),
          color: 'pink',
          icon: this.image.front
            ? 'mdi-axis-z-rotate-counterclockwise'
            : 'mdi-axis-z-rotate-clockwise',
          tooltip: {
            active: true,
            text: 'Rotate',
          },
        },
      ]
    },
    infoDetailsOption() {
      return [
        {
          action: () => (this.details = !this.details),
          color: 'magenta',
          icon: this.details ? 'mdi-view-list' : 'mdi-view-list-outline',
          tooltip: {
            active: true,
            text: this.details ? 'Close info' : 'More info',
          },
        },
      ]
    },
    tileOptions() {
      return this.details
        ? this.infoDetailsOption
        : [...this.infoDetailsOption, ...this.imageOptions]
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
