<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { store } from "./store";
export default {
  created() {
    store.dispatch("bindSoftwares");
    store.dispatch("bindMachines");
    store.dispatch("bindUsers");
  },
};
</script>

<style>
body {
  font-family: "Roboto", sans-serif;
  font-weight: 400;
}
v-select.vs__search::placeholder,
v-select.vs__dropdown-toggle,
v-select.vs__dropdown-menu {
  color: gray;
  text-transform: lowercase;
  font-variant: small-caps;
}
</style>
