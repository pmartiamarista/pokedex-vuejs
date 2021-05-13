<template>
  <v-card class="mx-auto" width="256" flat>
    <v-list nav dense>
      <v-list-item>
        <v-list-item-avatar>
          <v-img :src="logo" />
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="title">Pokédex</v-list-item-title>
        </v-list-item-content>
        <v-list-item-action>
          <v-switch
            v-model="dark"
            hide-details
            inset
            @change="onDarkModeChange"
          />
        </v-list-item-action>
      </v-list-item>
    </v-list>
    <v-divider></v-divider>
    <v-list nav dense>
      <v-list-item-group v-model="selectedItem" color="primary">
        <v-list-item
          v-for="({ title, to, icon }, i) in items"
          :key="i"
          :to="to"
        >
          <v-list-item-icon>
            <v-icon v-text="icon" />
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="title" />
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>
import logo from '../../assets/poke-menu-logo.png'

export default {
  name: 'DrawerMenu',
  data() {
    return {
      logo,
      dark: this.$vuetify.theme.dark,
      selectedItem: 0,
      items: this.$router.options.routes.map(({ name, path, icon }) => ({
        title: name,
        to: path,
        icon,
      })),
    }
  },
  methods: {
    onDarkModeChange() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
      localStorage.setItem('theme', this.$vuetify.theme.dark ? 'dark' : 'light')
    },
  },
}
</script>
