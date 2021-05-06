<template>
  <div>
    <v-card v-if="$apollo.queries.pokemon.loading">
      <v-col class="pa-0">
        <v-list-item three-line>
          <v-list-item-content>
            <div class="overline mb-0">
              <v-skeleton-loader v-if="true" max-width="50" type="text" />
            </div>
            <v-list-item-title class="headline mb-1 pokemon-name">
              <v-skeleton-loader v-if="true" max-width="200" type="heading"
            /></v-list-item-title>
            <v-list-item-subtitle
              ><v-skeleton-loader v-if="true" max-width="50" type="sentences"
            /></v-list-item-subtitle>
          </v-list-item-content>
          <v-skeleton-loader v-if="true" max-width="150" type="avatar" />
        </v-list-item>
        <v-card-actions>
          <v-skeleton-loader v-if="true" max-width="200" type="text" />
        </v-card-actions>
      </v-col>
    </v-card>

    <div v-else-if="$apollo.queries.pokemon.error">Error</div>

    <v-card v-else>
      <v-list-item three-line>
        <v-list-item-content>
          <div class="overline mb-0">#{{ pokemon.id }}</div>
          <v-list-item-title
            class="headline mb-1 pokemon-name"
            v-text="pokemon.name"
          />
          <!-- <v-list-item-subtitle
            >Greyhound divisely hello coldly fonwderfully</v-list-item-subtitle
          > -->
        </v-list-item-content>
        <v-img
          :src="pokemon.sprites.front_default"
          :lazy-src="pokemon.sprites.front_default"
          max-width="120"
          max-height="120"
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
          style="height: 100%"
        >
          <v-card-text class="pb-0"> </v-card-text>
          <v-card-actions class="pt-0">
            <v-btn text color="secondary" @click="reveal = false">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-expand-transition>
    </v-card>
  </div>
</template>

<script>
import { POKEMON_BY_NAME } from "../graphql/queries";

export default {
  name: "GridTile",
  props: {
    name: { type: String, default: "" },
  },
  data: () => ({
    reveal: false,
    pokemon: "",
  }),
  apollo: {
    pokemon: {
      query: POKEMON_BY_NAME,
      variables() {
        return { name: String(this.name).trim() };
      },
      fetchPolicy: "cache-and-network",
      nextFetchPolicy: "cache-only",
      update: ({ pokemon }) => {
        console.log(pokemon);
        return pokemon;
      },
    },
  },
};
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