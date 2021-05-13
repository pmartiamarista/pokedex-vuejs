<template>
  <v-text-field
    :disabled="disabled"
    :label="`Filter by name`"
    filled
    rounded
    dense
    hide-details
    single-line
    v-model="search"
    clearable
  />
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapMutations: layoutMutation } = createNamespacedHelpers('layout')

const DEBOUNCE_TIME = 400
export default {
  name: 'Searchbar',
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    search: '',
  }),
  methods: {
    ...layoutMutation(['setSearch']),
  },
  watch: {
    search(newValue) {
      if (this._debounce) clearTimeout(this._debounce)
      this._debounce = setTimeout(() => this.setSearch(newValue), DEBOUNCE_TIME)
    },
    $route: {
      handler() {
        this.search = ''
      },
      deep: true,
      immediate: true,
    },
  },
}
</script>
