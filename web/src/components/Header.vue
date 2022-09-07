<template>
  <header class="bg-white pa-4 d-flex justify-center">
    <div>
      <v-img :src="logo" width="90" />
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import logo from "../assets/logo-mais-a-educacao.svg";

export default defineComponent({
  name: "HeaderComponent",
  data() {
    return {
      logo,
    };
  },
});
</script>
