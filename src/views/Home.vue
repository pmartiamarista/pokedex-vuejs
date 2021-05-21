<template>
  <PageWrapper>
    <v-col class="ma-0 pa-0" style="border-radius: 4px">
      <v-img
        max-height="1080"
        alt="pokemon"
        style="opacity: 0.7; border-radius: 4px; "
        :src="getImage"
        :lazy-src="getImage"
      />
    </v-col>
  </PageWrapper>
</template>

<script>
import PageWrapper from "../components/PageWrapper.vue";
export default {
  components: { PageWrapper },
  name: "Home",
  computed: {
    isDark() {
      return this.$vuetify.theme.isDark;
    },
    isMobile() {
      return this.$vuetify.breakpoint.xs;
    },
    getImage() {
      if (this.isDark) {
        if (this.isMobile) {
          return require("../assets/home-mobile-dark.png");
        }
        return require("../assets/home-wide-dark.jpeg");
      }
      if (this.isMobile) {
        return require("../assets/home-mobile-light.jpeg");
      }
      return require("../assets/home-wide-light.jpg");
    },
  },
};
</script>
