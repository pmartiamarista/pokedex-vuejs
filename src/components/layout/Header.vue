<template>
  <v-app-bar app>
    <v-app-bar-nav-icon @click="handleDrawer"></v-app-bar-nav-icon>
    <v-toolbar-title v-text="routeName" />
    <v-spacer />
    <Searchbar />
    <v-progress-linear
      :active="showLoading"
      :indeterminate="true"
      absolute
      bottom
    />
    <template v-slot:extension v-if="showTabs">
      <v-tabs
        centered
        center-active
        next-icon="mdi-arrow-right-bold-circle-outline"
        prev-icon="mdi-arrow-left-bold-circle-outline"
        show-arrows
        @change="setSelectedTab"
      >
        <v-tabs-slider />

        <v-tab v-for="({ name, id }, index) in tabs" :key="id">
          <v-badge :content="badgeCount" v-if="index === selectedTab">
            {{ name }}
          </v-badge>
          <span v-else v-text="name" />
        </v-tab>
      </v-tabs>
    </template>
  </v-app-bar>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import { fetchStatus } from '../../utils/constants'
import Searchbar from '../Searchbar.vue'
const { mapGetters, mapState, mapActions } = createNamespacedHelpers('layout')

export default {
  name: 'Drawer',
  components: { Searchbar },
  props: {
    handleDrawer: {
      type: Function,
      default: () => console.log('No action'),
    },
  },
  methods: {
    ...mapActions(['setSelectedTab']),
  },
  computed: {
    ...mapGetters(['hasTabs']),
    ...mapState(['tabs', 'selectedTab', 'isTabBarLoading', 'badgeCount']),
    routeName() {
      return this.$route.name
    },
    showLoading() {
      return this.isTabBarLoading === fetchStatus.fetching
    },
    showTabs() {
      return this.hasTabs && this.isTabBarLoading === fetchStatus.done
    },
  },
}
</script>
