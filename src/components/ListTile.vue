<template>
  <div>
    <v-list-item :key="item">
      <v-list-item-action>
        <v-btn fab small depressed color="primary"> </v-btn>
      </v-list-item-action>

      <v-list-item-content>
        <v-list-item-title>
          <strong class="pokemon-name">{{ item.name }}</strong>
        </v-list-item-title>
      </v-list-item-content>

      <v-list-item-action>
        <v-icon small> mdi-open-in-new </v-icon>
      </v-list-item-action>
    </v-list-item>

    <v-divider></v-divider>
  </div>
</template>

<script>
export default {
  name: "GridTile",
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
.pokemon-name {
  text-transform: capitalize;
}
</style>