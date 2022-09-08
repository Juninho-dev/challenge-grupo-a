<template>
  <v-app theme="dark">
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",

  data() {
    return {
      //
    };
  },
});
</script>

<style>
a {
  text-decoration: none;
}

body,
h1,
h2,
h3,
h4,
h5,
h6 {
  color: #2c3b48;
}

div.swal2-container {
  z-index: 999999999;
}
</style>
