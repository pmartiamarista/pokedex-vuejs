<template>
  <v-app>
    <Header :handleDrawer="handleDrawer" />
    <v-navigation-drawer v-model="drawer" absolute temporary>
      <DrawerMenu :routes="getRoutesMenu" />
    </v-navigation-drawer>
    <v-main class="overflow-y-auto grey lighten-2">
      <v-container fluid>
        <transition name="fade">
          <router-view />
        </transition>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import DrawerMenu from "./components/DrawerMenu.vue";
import Header from "./components/Header.vue";
export default {
  components: { Header, DrawerMenu },
  data: () => ({ drawer: null }),
  methods: {
    handleDrawer() {
      this.drawer = !this.drawer;
    },
  },
  computed: {
    getRoutesMenu() {
      return this.$router.options.routes;
    },
  },
};
</script>
