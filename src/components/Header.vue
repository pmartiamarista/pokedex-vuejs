<template>
  <v-app-bar app>
    <v-app-bar-nav-icon @click="handleDrawer"></v-app-bar-nav-icon>
    <v-toolbar-title>Pokédex</v-toolbar-title>
    <!-- <template v-slot:extension v-if="showTabs">
      <v-tabs
        center-active
        fixed-tabs
        next-icon="mdi-arrow-right-bold-circle-outline"
        prev-icon="mdi-arrow-left-bold-circle-outline"
        show-arrows
      >
        <v-tabs-slider color="yellow"></v-tabs-slider>
        <v-tab v-for="i in 30" :key="i" :href="'#tab-' + i">
          Item {{ i }}
        </v-tab>
      </v-tabs>
    </template> -->
  </v-app-bar>
</template>

<script>
export default {
  name: "Drawer",
  props: {
    routes: {
      type: Array,
      default: () => [],
    },
    handleDrawer: {
      type: Function,
      default: () => console.log("No action"),
    },
  },
  // computed: {
  //   showTabs() {
  //     return this.$route.meta.showTabs;
  //   },
  // },
};
</script>