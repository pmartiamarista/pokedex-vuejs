<template>
  <v-app-bar app>
    <v-app-bar-nav-icon @click="handleDrawer"></v-app-bar-nav-icon>
    <v-toolbar-title>Pokédex</v-toolbar-title>
  </v-app-bar>
</template>

<script>

export default {
  name: "Drawer",
  props: {
    handleDrawer: {
      type: Function,
      default: () => console.log('No action'),
    },
  },
};
</script>