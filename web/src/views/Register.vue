<template>
  <HeaderVue />
  <v-container>
    <div class="text-center mt-8">
      <h1>Bem vindo ao teste da +A Educação</h1>
    </div>
    <div class="mt-10">
      <RegisterCardForm />
    </div>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HeaderVue from "@/components/Header.vue";
import RegisterCardForm from "../components/RegisterCardForm.vue";

export default defineComponent({
  name: "RegisterPage",
  components: {
    HeaderVue,
    RegisterCardForm,
  },
});
</script>

<style>
body,
h1,
h2,
h3,
h4,
h5,
h6 {
  color: #2c3b48;
}
</style>
