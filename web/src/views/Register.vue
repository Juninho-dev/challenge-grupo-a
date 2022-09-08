<template>
  <HeaderVue />
  <v-container>
    <div class="text-center mt-8">
      <h1>Bem vindo ao teste da +A Educação</h1>
    </div>
    <div class="mt-10">
      <RegisterCardForm @register="handleRegister" />
    </div>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HeaderVue from "@/components/Header.vue";
import RegisterCardForm from "../components/RegisterCardForm.vue";
import { register } from "@/services/auth";
import { getError } from "@/helpers/getError";

export default defineComponent({
  name: "RegisterPage",
  components: {
    HeaderVue,
    RegisterCardForm,
  },
  methods: {
    async handleRegister(name: string, email: string, password: string) {
      try {
        const response = await register({ name, email, password });

        if (response && response.isSuccess) {
          localStorage.setItem("token", response.payload.token);
          localStorage.setItem("user", JSON.stringify(response.payload.user));
          this.$router.push("/dashboard");
        }
      } catch (error) {
        const tratativeError = getError(error, "Erro ao registrar usuário");
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
