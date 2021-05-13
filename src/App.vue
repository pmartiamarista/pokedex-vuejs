<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app>
      <DrawerMenu />
    </v-navigation-drawer>
    <Header :handleDrawer="handleDrawer" />
    <v-main>
      <v-container fluid>
        <transition name="fade">
          <router-view />
        </transition>
      </v-container>
    </v-main>
    <!-- <v-footer app></v-footer> -->
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
