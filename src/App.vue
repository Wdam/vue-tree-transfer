<template>
  <div id="app">
    <vue-tree-transfer></vue-tree-transfer>
  </div>
</template>

<script>

import VueTreeTransfer from '@/components/vue-tree-transfer.vue'

export default {
  name: 'App',
  components: {
    VueTreeTransfer
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
