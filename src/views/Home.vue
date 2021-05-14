<template>
  <PageWrapper>
    <v-parallax
      style="opacity: 0.7; border-radius: 4px;"
      :src="
        require('../assets/papers.co-ad28-cute-pokemon-illust-29-wallpaper.jpg')
      "
    />
  </PageWrapper>
</template>

<script>
import PageWrapper from '../components/PageWrapper.vue'
export default {
  components: { PageWrapper },
  name: 'Home',
}
</script>
