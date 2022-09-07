<template>
  <HeaderVue />
  <v-container>
    <div class="text-center mt-8">
      <h1>Bem vindo ao teste da +A Educação</h1>
    </div>
    <div class="mt-10">
      <LoginCardFormVue @login="login" />
    </div>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HeaderVue from "@/components/Header.vue";
import LoginCardFormVue from "@/components/LoginCardForm.vue";
import { login } from "@/services/auth";

export default defineComponent({
  name: "LoginPage",
  components: {
    HeaderVue,
    LoginCardFormVue,
  },
  methods: {
    async login(email: string, password: string) {
      await login({ email, password });
    },
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
