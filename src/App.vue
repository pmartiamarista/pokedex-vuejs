<template>
  <v-app id="inspire">
    <Header :handleDrawer="handleDrawer" />
    <v-navigation-drawer v-model="drawer" absolute temporary>
      <DrawerMenu />
    </v-navigation-drawer>
    <v-main class="overflow-y-auto grey lighten-4">
      <v-container fluid>
        <transition name="fade">
          <router-view />
        </transition>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import DrawerMenu from './components/layout/DrawerMenu.vue'
import Header from './components/layout/Header.vue'
export default {
  components: { Header, DrawerMenu },
  data: () => ({ drawer: null }),
  methods: {
    handleDrawer() {
      this.drawer = !this.drawer
    },
  },
}
</script>
