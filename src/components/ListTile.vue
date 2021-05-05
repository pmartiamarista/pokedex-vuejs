<template>
  <v-card>
    <v-card-title class="pokemon-name" v-text="item.name"/>
    <v-card-text>
    </v-card-text>
    <v-card-actions>
      <v-btn text color="teal accent-4" @click="reveal = true">
        Learn More
      </v-btn>
    </v-card-actions>
    <v-expand-transition>
      <v-card
        v-if="reveal"
        class="transition-fast-in-fast-out v-card--reveal"
        style="height: 100%"
      >
        <v-card-text class="pb-0">
        </v-card-text>
        <v-card-actions class="pt-0">
          <v-btn text color="teal accent-4" @click="reveal = false">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-expand-transition>
  </v-card>
</template>

<script>
export default {
  name: "ListTile",
  props: {
    item: { type: Object, default: () => {} },
  },
  data: () => ({
    reveal: false,
  }),
};
</script>


<style>
.v-card--reveal {
  bottom: 0;
  opacity: 1 !important;
  position: absolute;
  width: 100%;
}
.pokemon-name{
  text-transform: capitalize;
}
</style>