<template>
  <v-speed-dial v-model="fab" :direction="direction" :transition="transition">
    <template v-slot:activator>
      <v-btn v-model="fab" color="blue darken-2" fab x-small>
        <transition name="fade">
          <v-icon v-if="fab">
            mdi-close
          </v-icon>
          <v-icon v-else>
            mdi-dots-vertical
          </v-icon>
        </transition>
      </v-btn>
    </template>
    <v-tooltip
      bottom
      v-for="(button, index) in tooltipButtons"
      :key="`tooltip-buttons-${index}-${_uid}`"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          x-small
          @click="button.action"
          :color="button.color || 'black'"
          v-bind="attrs"
          :dark="button.dark"
          v-on="on"
          fab
        >
          <v-icon v-text="button.icon" />
        </v-btn>
      </template>
      <span v-text="button.tooltip.text" />
    </v-tooltip>
    <v-btn
      v-for="(button, index) in simpleButtons"
      :key="`simple-buttons-${index}-${_uid}`"
      x-small
      fab
      @click="button.action"
      :color="button.color || 'black'"
      :dark="button.dark"
    >
      <v-icon v-text="button.icon" />
    </v-btn>
  </v-speed-dial>
</template>
<script>
export default {
  name: 'FabButtons',
  props: {
    buttons: {
      type: Array,
      default: () => [
        {
          action: () => console.log('default action'),
          color: 'black',
          icon: 'mdi-home',
          tooltip: {
            active: false,
            text: 'default tooltip text',
          },
        },
      ],
    },
    direction: { type: String, default: 'top' },
    transition: { type: String, default: 'scale-transition' },
  },
  data: () => ({
    fab: false,
  }),
  computed: {
    tooltipButtons() {
      return this.buttons.filter((button) => button.tooltip.active)
    },
    simpleButtons() {
      return this.buttons.filter((button) => !button.tooltip.active)
    },
  },
}
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
