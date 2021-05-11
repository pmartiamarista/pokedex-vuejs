<template>
  <v-app-bar app>
    <v-app-bar-nav-icon @click="handleDrawer"></v-app-bar-nav-icon>
    <v-toolbar-title>{{ routeName }}</v-toolbar-title>
    <template v-slot:extension v-if="hasTabs && !isHeaderTabsLoading">
      <v-tabs
        center-active
        fixed-tabs
        next-icon="mdi-arrow-right-bold-circle-outline"
        prev-icon="mdi-arrow-left-bold-circle-outline"
        show-arrows
        @change="setSelectedTab"
      >
        <v-tabs-slider color="yellow"></v-tabs-slider>
        <v-tab v-for="{ name, id } in tabs" :key="id">
          {{ name }}
        </v-tab>
      </v-tabs>
    </template>
  </v-app-bar>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapGetters, mapState, mapMutations } = createNamespacedHelpers('layout')

export default {
  name: 'Drawer',
  props: {
    handleDrawer: {
      type: Function,
      default: () => console.log('No action'),
    },
  },
  methods: {
    ...mapMutations(['setSelectedTab']),
  },
  computed: {
    ...mapGetters(['isHeaderTabsLoading', 'hasTabs']),
    ...mapState(['tabs', 'selectedTab']),
    routeName() {
      return this.$route.name
    },
  },
}
</script>
