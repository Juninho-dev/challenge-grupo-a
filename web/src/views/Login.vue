<template>
  <HeaderVue />
  <v-container>
    <div class="text-center mt-8">
      <h1>Bem vindo ao teste da +A Educação</h1>
    </div>
    <div class="mt-10 d-flex justify-center">
      <LoginCardFormVue @login="handleLogin" />
    </div>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HeaderVue from "@/components/Header.vue";
import LoginCardFormVue from "@/components/LoginCardForm.vue";
import { login } from "@/services/auth";
import { getError } from "@/helpers/getError";

export default defineComponent({
  name: "LoginPage",
  components: {
    HeaderVue,
    LoginCardFormVue,
  },
  methods: {
    async handleLogin(email: string, password: string) {
      try {
        const response = await login({ email, password });

        if (response.isSuccess) {
          this.$router.push({ name: "Dashboard" });
        }
      } catch (error) {
        const tratativeError = getError(error, "Erro ao fazer login");
        this.$swal({
          title: tratativeError.title,
          text: tratativeError.message,
          icon: "error",
        });
      }
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
